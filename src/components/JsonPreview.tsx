import React, { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SchemaFormData, SchemaField, DEFAULT_VALUES } from '@/types/schema';

export const JsonPreview: React.FC = () => {
  const watchedFields = useWatch<SchemaFormData>({ name: 'fields' });

  const jsonOutput = useMemo(() => {
    const generateJsonFromFields = (fields: SchemaField[]): Record<string, any> => {
      const result: Record<string, any> = {};
      
      fields.forEach((field) => {
        if (!field.name) return;
        
        if (field.type === 'nested' && field.fields) {
          result[field.name] = generateJsonFromFields(field.fields);
        } else {
          result[field.name] = DEFAULT_VALUES[field.type];
        }
      });
      
      return result;
    };

    return generateJsonFromFields(Array.isArray(watchedFields) ? watchedFields : []);
  }, [watchedFields]);

  const formattedJson = JSON.stringify(jsonOutput, null, 2);

  return (
    <Card className="h-full bg-schema-panel-bg border-schema-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          JSON Preview
        </CardTitle>
      </CardHeader>
      
      <CardContent className="h-[calc(100%-80px)]">
        <div className="h-full bg-schema-field-bg rounded-md border border-schema-border">
          <pre className="h-full p-4 overflow-auto text-sm font-mono text-foreground whitespace-pre-wrap">
            {formattedJson || '{}'}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};