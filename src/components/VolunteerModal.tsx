
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { generateMockVoluntarios, Voluntario } from '@/data/mockData';
import { Mail, Phone, Calendar, Users } from 'lucide-react';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VolunteerModal({ isOpen, onClose }: VolunteerModalProps) {
  const [volunteers] = useLocalStorage<Voluntario[]>('volunteers', generateMockVoluntarios());

  const activeVolunteers = volunteers.filter(v => v.ativo);
  const inactiveVolunteers = volunteers.filter(v => !v.ativo);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Voluntários ({activeVolunteers.length} ativos)
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-green-600">Voluntários Ativos</h3>
            <div className="grid gap-3">
              {activeVolunteers.map((volunteer) => (
                <Card key={volunteer.id} className="border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-lg">{volunteer.nome}</h4>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            {volunteer.cargo}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {volunteer.email}
                          </div>
                          {volunteer.telefone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {volunteer.telefone}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Desde {volunteer.dataInicio.toLocaleDateString()}
                          </div>
                        </div>
                        
                        <div className="flex gap-1 flex-wrap">
                          {volunteer.areas.map((area) => (
                            <Badge key={area} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Badge variant="default" className="bg-green-500">
                        Ativo
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {inactiveVolunteers.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-600">Voluntários Inativos</h3>
              <div className="grid gap-3">
                {inactiveVolunteers.map((volunteer) => (
                  <Card key={volunteer.id} className="border-gray-200 opacity-75">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">{volunteer.nome}</h4>
                            <Badge variant="outline">
                              {volunteer.cargo}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {volunteer.email}
                            </div>
                          </div>
                        </div>
                        
                        <Badge variant="secondary">
                          Inativo
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Button>
              Adicionar Voluntário
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
