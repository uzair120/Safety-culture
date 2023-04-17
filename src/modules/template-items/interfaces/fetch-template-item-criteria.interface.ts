import { TemplateItemType } from '../enums';

export interface FetchTemplateItemCriteria {
  title?: string;
  type?: TemplateItemType;
  parentId?: number;
  status?: boolean;
}
