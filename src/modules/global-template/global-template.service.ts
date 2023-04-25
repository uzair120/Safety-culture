import { Injectable } from '@nestjs/common';
import { CreateGlobalTemplateDto } from './dto/create-global-template.dto';
import { UpdateGlobalTemplateDto } from './dto/update-global-template.dto';
import { TemplateService } from '../template/template.service';
import { TemplateItemService } from '../template-items/template-items.service';
import { CreateTemplateItemDto, UpdateTemplateItemDto } from '../template-items/dto';
import { CreateTemplateItemQuestionDto } from './dto/template-item-question.dto';
import { QuestionService } from '../questions/questions.service';
import { TemplateItemType } from '../template-items/enums';
import { constructErrorResponse, constructSuccessResponse } from 'src/common';
import * as Joi from 'joi';
import { getAttributesByType, schema } from '../widgets/validation';
import { WidgetService } from '../widgets/widgets.service';
import { throwError } from 'rxjs';
import { WidgetValue } from '../widget_values/entities/widget_value.entity';
import { WidgetValuesService } from '../widget_values/widget_values.service';
import { Question } from '../questions/entities/question.entity';
import { getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GlobalTemplateService {
  constructor(
    private templateService: TemplateService,
    private readonly templateItemsService: TemplateItemService,
    private readonly questionService: QuestionService,
    private readonly widgetService: WidgetService,
    private readonly widgetValueService: WidgetValuesService,

    @InjectRepository(WidgetValue)
    private readonly widgetRepository: Repository<WidgetValue>,
  ) {}

  async create(createGlobalTemplateDto: CreateGlobalTemplateDto, createdBy: number = 1) {
    //checks
    if (
      createGlobalTemplateDto.templateItems.filter((a) => a.type === TemplateItemType.QUESTION && a.children).length > 0
    ) {
      return constructErrorResponse({ error: 'Question item must not have any children' });
    } else if (
      createGlobalTemplateDto.templateItems.filter((a) => a.type !== TemplateItemType.QUESTION && a.question).length > 0
    ) {
      return constructErrorResponse({ error: 'Only Question item have question property' });
    }

    try {
      const template = await this.templateService.createInternal(createGlobalTemplateDto.template, createdBy);

      const arrayItems = await this.saveTemplateItemData(createGlobalTemplateDto.templateItems, template.id);
      return constructSuccessResponse({ template, templateItems: arrayItems });
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  private async saveTemplateItems(createTemplateItemDto: CreateTemplateItemQuestionDto) {
    const templateItem = await this.templateItemsService.createInternal(createTemplateItemDto as UpdateTemplateItemDto);
    if (createTemplateItemDto.question) {
      createTemplateItemDto.question.itemId = templateItem.id;
      const question = await this.questionService.createInternal(createTemplateItemDto.question);
      const widget = await this.widgetService.findOneInternal(question.widgetId);
      question.type = widget.type;
      const result = schema.validate(question);
      if (result.error) {
        throw Error(result.error.message);
      }
      const attributes = getAttributesByType(question.type);

      const attributesExists = await this.checkAttributesExists(question?.id, attributes);
      const properties = [];
      if (!attributesExists) {
        await this.deleteAttribute(question?.id);

        for (let index = 0; index < attributes.length; index++) {
          const element = attributes[index];
          const data = await this.widgetValueService.createInternal({
            questionId: question.id,
            attributeName: element,
            attributeValue: createTemplateItemDto.question[element],
          });

          properties.push({ [data?.attributeName]: data?.attributeValue });
        }
      }
    }
    return templateItem;
  }

  private async deleteAttribute(questionId: number) {
    const queryBuilder = this.widgetRepository.createQueryBuilder('widget_values');
    await queryBuilder.softDelete().where('widget_values.question_id = :questionId', { questionId }).execute();
  }

  private async checkAttributesExists(questionId: number, attributes: any) {
    const queryBuilder = this.widgetRepository.createQueryBuilder('widget_values');

    const queryResult = await queryBuilder
      .where('widget_values.question_id = :questionId', { questionId })
      .andWhere('widget_values.attribute_name IN (:...valuesToCheck)', { valuesToCheck: attributes })
      .getMany();

    return queryResult?.length > 0;
  }

  private async saveTemplateItemData(templateItems: CreateTemplateItemQuestionDto[], templateId: number) {
    templateItems.map((a) => (a.templateId = templateId));
    const arrayItems = [];
    for (let index = 0; index < templateItems.length; index++) {
      const element = templateItems[index];
      const data = await this.saveTemplateItems(element);
      if (templateItems[index].children) {
        templateItems[index].children.map((a) => (a.parentId = data.id));
        const arrayData = await this.saveTemplateItemData(templateItems[index].children, templateId);
        arrayItems.push({ ...data, children: arrayData });
      } else {
        arrayItems.push(data);
      }
    }
    return arrayItems;
  }

  findAll() {
    return `This action returns all globalTemplate`;
  }

  async findOne(id: number) {
    const template = await this.templateService.findOneInternal(id);
    let children = template.templateItems.filter((template) => template.parentId !== null);
    const parent = template.templateItems.filter((template) => template.parentId === null);
    parent.map((template) => {
      children.map((template) => {
        const child2 = children.filter((a) => a.parentId == template.id);
        if (child2 && child2.length > 0) template['children'] = child2;
      });
      const child = children.filter((a) => a.parentId == template.id);
      if (child && child.length > 0) template['children'] = child;
    });
    return { ...template, templateItems: parent };
  }

  update(id: number, updateGlobalTemplateDto: UpdateGlobalTemplateDto) {
    return `This action updates a #${id} globalTemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} globalTemplate`;
  }
}
