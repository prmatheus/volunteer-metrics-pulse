
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { generateMockPessoas, Pessoa } from '@/data/mockData';
import { Plus, User, Phone, Mail, Calendar } from 'lucide-react';
import { toast } from 'sonner';

// Função para garantir que as datas sejam objetos Date
const ensureDateObject = (date: Date | string): Date => {
  if (typeof date === 'string') {
    return new Date(date);
  }
  return date;
};

export default function Kanban() {
  const [pessoas, setPessoas] = useLocalStorage<Pessoa[]>('pessoas', generateMockPessoas(50));
  const [selectedPerson, setSelectedPerson] = useState<Pessoa | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const etapas = [
    { name: 'Prospecção', color: 'bg-yellow-100 border-yellow-300' },
    { name: 'Primeiro Contato', color: 'bg-blue-100 border-blue-300' },
    { name: 'Acompanhamento', color: 'bg-purple-100 border-purple-300' },
    { name: 'Inclusão', color: 'bg-green-100 border-green-300' },
    { name: 'Discipulado', color: 'bg-indigo-100 border-indigo-300' },
    { name: 'Liderança', color: 'bg-red-100 border-red-300' },
    { name: 'Batizado', color: 'bg-emerald-100 border-emerald-300' }
  ];

  const movePersonToStage = (personId: string, newStage: string) => {
    setPessoas(prev => 
      prev.map(person => 
        person.id === personId 
          ? { 
              ...person, 
              etapa: newStage, 
              ultimaAtualizacao: new Date(),
              ...(newStage === 'Inclusão' && !person.dataInclusao ? { dataInclusao: new Date() } : {}),
              ...(newStage === 'Liderança' && !person.dataLideranca ? { dataLideranca: new Date() } : {}),
              ...(newStage === 'Batizado' && !person.dataBatismo ? { dataBatismo: new Date() } : {})
            }
          : person
      )
    );
    toast.success(`${pessoas.find(p => p.id === personId)?.nome} movido para ${newStage}`);
  };

  const handleDragStart = (e: React.DragEvent, person: Pessoa) => {
    e.dataTransfer.setData('text/plain', person.id);
  };

  const handleDrop = (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    const personId = e.dataTransfer.getData('text/plain');
    movePersonToStage(personId, targetStage);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const openPersonDetails = (person: Pessoa) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Kanban - Fluxo de Pessoas</h1>
          <p className="text-muted-foreground">Gerencie o fluxo de pessoas por etapas</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Pessoa
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {etapas.map((etapa) => {
          const pessoasNaEtapa = pessoas.filter(p => p.etapa === etapa.name);
          
          return (
            <Card 
              key={etapa.name} 
              className={`h-[600px] ${etapa.color}`}
              onDrop={(e) => handleDrop(e, etapa.name)}
              onDragOver={handleDragOver}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>{etapa.name}</span>
                  <Badge variant="secondary" className="ml-2">
                    {pessoasNaEtapa.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 overflow-y-auto max-h-[500px]">
                {pessoasNaEtapa.map((pessoa) => (
                  <Card 
                    key={pessoa.id}
                    className="cursor-move hover:shadow-md transition-shadow bg-white border-2 border-gray-200"
                    draggable
                    onDragStart={(e) => handleDragStart(e, pessoa)}
                    onClick={() => openPersonDetails(pessoa)}
                  >
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <h4 className="font-medium text-sm truncate">{pessoa.nome}</h4>
                        </div>
                        
                        {pessoa.telefone && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span className="truncate">{pessoa.telefone}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{ensureDateObject(pessoa.primeiroContato).toLocaleDateString()}</span>
                        </div>
                        
                        {pessoa.responsavel && (
                          <Badge variant="outline" className="text-xs">
                            {pessoa.responsavel}
                          </Badge>
                        )}
                        
                        {pessoa.isVoluntario && (
                          <Badge className="text-xs bg-purple-100 text-purple-800">
                            Voluntário
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {pessoasNaEtapa.length === 0 && (
                  <div className="text-center text-muted-foreground text-sm py-8">
                    Nenhuma pessoa nesta etapa
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modal de detalhes da pessoa */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Pessoa</DialogTitle>
          </DialogHeader>
          
          {selectedPerson && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Nome</label>
                  <Input value={selectedPerson.nome} readOnly />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input value={selectedPerson.email || ''} readOnly />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Telefone</label>
                  <Input value={selectedPerson.telefone || ''} readOnly />
                </div>
                <div>
                  <label className="text-sm font-medium">Etapa Atual</label>
                  <Input value={selectedPerson.etapa} readOnly />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Primeiro Contato</label>
                  <Input value={ensureDateObject(selectedPerson.primeiroContato).toLocaleDateString()} readOnly />
                </div>
                <div>
                  <label className="text-sm font-medium">Responsável</label>
                  <Input value={selectedPerson.responsavel || ''} readOnly />
                </div>
              </div>
              
              {selectedPerson.observacoes && (
                <div>
                  <label className="text-sm font-medium">Observações</label>
                  <Input value={selectedPerson.observacoes} readOnly />
                </div>
              )}
              
              <div className="flex gap-2 flex-wrap">
                {selectedPerson.isVoluntario && (
                  <Badge className="bg-purple-100 text-purple-800">Voluntário</Badge>
                )}
                {selectedPerson.dataBatismo && (
                  <Badge className="bg-blue-100 text-blue-800">Batizado</Badge>
                )}
                {selectedPerson.dataInclusao && (
                  <Badge className="bg-green-100 text-green-800">Membro</Badge>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Fechar
                </Button>
                <Button>
                  Editar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
