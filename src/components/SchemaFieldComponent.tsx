import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { SchemaFormData, SchemaField, FIELD_TYPE_OPTIONS, FieldType } from '@/types/schema';
import { generateId } from '@/lib/utils';

interface SchemaFieldComponentProps {
  fieldIndex: number;
  nestingLevel: number;
  parentPath: string;
}

export const SchemaFieldComponent: React.FC<SchemaFieldComponentProps> = ({
  fieldIndex,
  nestingLevel,
  parentPath
}) => {
  const { register, watch, setValue, control } = useFormContext<SchemaFormData>();
  const currentPath = `${parentPath}.${fieldIndex}` as const;
  const fieldType = watch(`${currentPath}.type` as any);
  
  const { fields: nestedFields, append: appendNested, remove: removeNested } = useFieldArray({
    control,
    name: `${currentPath}.fields` as any
  });

  const { remove } = useFieldArray({
    control,
    name: parentPath as any
  });

  const addNestedField = () => {
    const newField: SchemaField = {
      id: generateId(),
      name: '',
      type: 'string',
      required: false
    };
    appendNested(newField);
  };

  const handleTypeChange = (value: FieldType) => {
    setValue(`${currentPath}.type` as any, value);
    if (value === 'nested') {
      setValue(`${currentPath}.fields` as any, []);
    } else {
      setValue(`${currentPath}.fields` as any, undefined);
    }
  };

  const paddingLeft = nestingLevel * 24;
  const isNested = fieldType === 'nested';

  return (
    <div className="space-y-2" style={{ paddingLeft: `${paddingLeft}px` }}>
      <Card className={`border-schema-border ${isNested ? 'bg-schema-nested-bg' : 'bg-schema-field-bg'} transition-smooth`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            {/* Field Name Input */}
            <div className="flex-1 min-w-0">
              <Label htmlFor={`${currentPath}.name`} className="sr-only">
                Field Name
              </Label>
              <Input
                {...register(`${currentPath}.name` as any)}
                placeholder="Field name"
                className="border-schema-border focus:ring-primary"
              />
            </div>

            {/* Type Select */}
            <div className="w-32">
              <Label htmlFor={`${currentPath}.type`} className="sr-only">
                Field Type
              </Label>
              <Select
                value={fieldType}
                onValueChange={handleTypeChange}
              >
                <SelectTrigger className="border-schema-border focus:ring-primary">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-schema-border">
                  {FIELD_TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Required Toggle */}
            <div className="flex items-center gap-2">
              <Label htmlFor={`${currentPath}.required`} className="text-sm font-medium">
                Required
              </Label>
              <Switch
                {...register(`${currentPath}.required` as any)}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            {/* Delete Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(fieldIndex)}
              className="text-destructive hover:text-destructive hover:bg-schema-delete-hover p-2 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Nested Fields */}
      {isNested && (
        <div className="space-y-2 ml-6">
          {nestedFields && nestedFields.map((nestedField, nestedIndex) => (
            <SchemaFieldComponent
              key={nestedField.id}
              fieldIndex={nestedIndex}
              nestingLevel={nestingLevel + 1}
              parentPath={`${currentPath}.fields`}
            />
          ))}
          
          <Button
            type="button"
            onClick={addNestedField}
            variant="outline"
            size="sm"
            className="w-full border-schema-add-button text-schema-add-button hover:bg-schema-add-button hover:text-primary-foreground transition-smooth"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Nested Field
          </Button>
        </div>
      )}
    </div>
  );
};