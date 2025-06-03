
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Prospeccao() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Prospecção</h1>
          <p className="text-muted-foreground">Gerencie novos contatos e prospects</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Prospect
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Prospects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Componente em desenvolvimento...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
