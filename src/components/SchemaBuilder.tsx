import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { SchemaFormData } from '@/types/schema';
import { SchemaPanel } from './SchemaPanel';
import { JsonPreview } from './JsonPreview';

export const SchemaBuilder: React.FC = () => {
  const methods = useForm<SchemaFormData>({
    defaultValues: {
      fields: []
    }
  });

  const onSubmit = (data: SchemaFormData) => {
    console.log('Schema submitted:', data);
    // Here you can handle the form submission
    // For example: send to API, download as JSON, etc.
    alert('Schema submitted! Check console for details.');
  };

  return (
    <div className="min-h-screen bg-schema-bg">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">JSON Schema Builder</h1>
          <p className="text-muted-foreground">
            Create dynamic JSON schemas with nested fields and live preview
          </p>
        </div>
        
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
              <SchemaPanel />
              <JsonPreview />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};