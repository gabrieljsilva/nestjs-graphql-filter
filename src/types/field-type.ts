import { Type } from '@nestjs/common';

export interface FieldType {
  fieldName: string;
  type: Type;
  isArray: boolean;
}
