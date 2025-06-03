
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Kanban() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Kanban</h1>
        <p className="text-muted-foreground">Gerencie o fluxo de pessoas por etapas</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {['Prospecção', 'Primeiro Contato', 'Acompanhamento', 'Inclusão'].map((etapa) => (
          <Card key={etapa} className="h-96">
            <CardHeader>
              <CardTitle className="text-sm">{etapa}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Componente em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
