
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VolunteerModal({ isOpen, onClose }: VolunteerModalProps) {
  const volunteers = [
    { name: 'João Silva', role: 'Líder de Célula', active: true },
    { name: 'Maria Santos', role: 'Secretária', active: true },
    { name: 'Pedro Costa', role: 'Tesoureiro', active: false },
    { name: 'Ana Oliveira', role: 'Ministério de Louvor', active: true },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Voluntários Ativos</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {volunteers.map((volunteer, index) => (
            <Card key={index}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-medium">{volunteer.name}</h3>
                  <p className="text-sm text-muted-foreground">{volunteer.role}</p>
                </div>
                <Badge variant={volunteer.active ? "default" : "secondary"}>
                  {volunteer.active ? "Ativo" : "Inativo"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
