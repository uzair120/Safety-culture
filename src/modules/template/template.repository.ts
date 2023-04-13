import { EntityRepository, Repository } from 'typeorm';
import { CreateTemplateDto, UpdateTemplateDto } from './dto';
import { FindManyOptions } from 'typeorm';

import { Template } from './entities/template.entity';

@EntityRepository(Template)
export class TemplateRepository extends Repository<Template> {
  async findAll(options?: FindManyOptions<Template>): Promise<Template[]> {
    return this.find(options);
  }

  async findById(id: number): Promise<Template> {
    return this.findOneBy({ id });
  }

  async createTemplate(template: CreateTemplateDto): Promise<Template> {
    return this.save(template);
  }

  async updateTemplate(
    id: number,
    data: Partial<UpdateTemplateDto>,
  ): Promise<Template> {
    await this.update(id, data);
    return this.findOneBy({ id });
  }

  async deleteTemplate(id: number): Promise<boolean> {
    await this.delete(id);
    return true;
  }
}
