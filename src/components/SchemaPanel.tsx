import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SchemaFormData, SchemaField } from '@/types/schema';
import { SchemaFieldComponent } from './SchemaFieldComponent';
import { generateId } from '@/lib/utils';

export const SchemaPanel: React.FC = () => {
  const { control } = useFormContext<SchemaFormData>();
  const { fields, append } = useFieldArray({
    control,
    name: 'fields'
  });

  const addField = () => {
    const newField: SchemaField = {
      id: generateId(),
      name: '',
      type: 'string',
      required: false
    };
    append(newField);
  };

  return (
    <Card className="h-full bg-schema-panel-bg border-schema-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          Schema Fields
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 overflow-y-auto max-h-[calc(100%-80px)]">
        {fields.map((field, index) => (
          <SchemaFieldComponent
            key={field.id}
            fieldIndex={index}
            nestingLevel={0}
            parentPath="fields"
          />
        ))}
        
        {fields.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-4">No fields added yet</p>
            <p className="text-sm">Click "Add Field" to get started</p>
          </div>
        )}
        
        <Button
          type="button"
          onClick={addField}
          className="w-full bg-schema-add-button hover:bg-schema-add-button-hover text-primary-foreground transition-smooth"
          size="lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Field
        </Button>
        
        <div className="pt-4 border-t border-schema-border">
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground transition-smooth"
            size="lg"
          >
            Submit Schema
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};