export type FieldType = 'string' | 'number' | 'boolean' | 'objectId' | 'float' | 'nested';

export interface SchemaField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  fields?: SchemaField[]; // For nested type
}

export interface SchemaFormData {
  fields: SchemaField[];
}

export const DEFAULT_VALUES: Record<FieldType, any> = {
  string: "STRING",
  number: "number",
  boolean: true,
  objectId: "",
  float: 0.0,
  nested: {}
};

export const FIELD_TYPE_OPTIONS = [
  { value: 'string', label: 'String' },
  { value: 'number', label: 'Number' },
  { value: 'boolean', label: 'Boolean' },
  { value: 'objectId', label: 'ObjectId' },
  { value: 'float', label: 'Float' },
  { value: 'nested', label: 'Nested' }
] as const;