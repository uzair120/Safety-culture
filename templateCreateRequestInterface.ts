interface TemplateRequest {
  template: Template;
  templateItems: TemplateItem[];
}

interface Template {
  title: string;
  description: string;
  image: string;
  businessId: number;
  createdBy: number;
  totalScore: number;
  published: boolean;
}

interface TemplateItem {
  title: string;
  type: string; // ['PAGE', 'SECTION', 'QUESTION']
  orderIndex: number;
  status: boolean;
  children: Child[]; // Children of each item
}

interface Child {
  title: string;
  type: string;
  orderIndex: number;
  status: boolean;
  question?: Question; // incase type is QUESTION
  children?: Child[]; // incase type is QUESTION there won't be any children
}

interface Question {
  widgetId: number; // will be fetched from DB
  format: string; // TEXT_ANSWER -> SHORT, PARAGRAPH, NUMBER -> NUMBER, TEMPERATURE
  required: boolean;
  itemId: number;
  type: string;
  properties?: object; // TEMPERATURE -> {'condition', 'greater', 'smaller', 'dUnit'}, SLIDER -> {'min', 'max', 'increment'}, DATE_TIME -> {date(Boolean), time(Boolean)}
}
