
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { generateMockPessoas, Pessoa } from '@/data/mockData';
import { Plus, Search, Filter, User, Phone, Mail, Calendar, Edit } from 'lucide-react';
import { toast } from 'sonner';

export default function Prospeccao() {
  const [pessoas, setPessoas] = useLocalStorage<Pessoa[]>('pessoas', generateMockPessoas(50));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPerson, setNewPerson] = useState({
    nome: '',
    email: '',
    telefone: '',
    observacoes: ''
  });

  const prospects = pessoas.filter(p => 
    ['Prospecção', 'Primeiro Contato'].includes(p.etapa)
  );

  const filteredProspects = prospects.filter(person => {
    const matchesSearch = person.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.telefone?.includes(searchTerm);
    
    const matchesFilter = filterStage === 'all' || person.etapa === filterStage;
    
    return matchesSearch && matchesFilter;
  });

  const addNewProspect = () => {
    if (!newPerson.nome.trim()) {
      toast.error('Nome é obrigatório');
      return;
    }

    const newProspect: Pessoa = {
      id: `pessoa-${Date.now()}`,
      nome: newPerson.nome,
      email: newPerson.email || undefined,
      telefone: newPerson.telefone || undefined,
      etapa: 'Prospecção',
      primeiroContato: new Date(),
      ultimaAtualizacao: new Date(),
      isVoluntario: false,
      responsavel: 'Sistema',
      observacoes: newPerson.observacoes || undefined
    };

    setPessoas(prev => [...prev, newProspect]);
    
    setNewPerson({
      nome: '',
      email: '',
      telefone: '',
      observacoes: ''
    });
    
    setIsAddModalOpen(false);
    toast.success('Prospect adicionado com sucesso!');
  };

  const moveToNextStage = (personId: string) => {
    setPessoas(prev => 
      prev.map(person => 
        person.id === personId 
          ? { 
              ...person, 
              etapa: person.etapa === 'Prospecção' ? 'Primeiro Contato' : 'Acompanhamento',
              ultimaAtualizacao: new Date()
            }
          : person
      )
    );
    
    const person = pessoas.find(p => p.id === personId);
    const nextStage = person?.etapa === 'Prospecção' ? 'Primeiro Contato' : 'Acompanhamento';
    toast.success(`${person?.nome} movido para ${nextStage}`);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Prospecção</h1>
          <p className="text-muted-foreground">Gerencie novos contatos e prospects</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Prospect
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Prospect</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={newPerson.nome}
                  onChange={(e) => setNewPerson(prev => ({ ...prev, nome: e.target.value }))}
                  placeholder="Digite o nome completo"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newPerson.email}
                    onChange={(e) => setNewPerson(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={newPerson.telefone}
                    onChange={(e) => setNewPerson(prev => ({ ...prev, telefone: e.target.value }))}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={newPerson.observacoes}
                  onChange={(e) => setNewPerson(prev => ({ ...prev, observacoes: e.target.value }))}
                  placeholder="Observações sobre o prospect..."
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={addNewProspect}>
                  Adicionar Prospect
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros e Busca */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por nome, email ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">Todas as etapas</option>
            <option value="Prospecção">Prospecção</option>
            <option value="Primeiro Contato">Primeiro Contato</option>
          </select>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total de Prospects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prospects.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Em Prospecção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {prospects.filter(p => p.etapa === 'Prospecção').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Primeiro Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {prospects.filter(p => p.etapa === 'Primeiro Contato').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Prospects */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Prospects ({filteredProspects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProspects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum prospect encontrado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProspects.map((person) => (
                <Card key={person.id} className="border-l-4 border-l-yellow-400">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <h4 className="font-medium">{person.nome}</h4>
                          </div>
                          <Badge 
                            variant={person.etapa === 'Prospecção' ? 'secondary' : 'default'}
                            className={person.etapa === 'Prospecção' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}
                          >
                            {person.etapa}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          {person.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              {person.email}
                            </div>
                          )}
                          {person.telefone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {person.telefone}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {person.primeiroContato.toLocaleDateString()}
                          </div>
                        </div>
                        
                        {person.observacoes && (
                          <p className="text-sm text-muted-foreground">
                            {person.observacoes}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => moveToNextStage(person.id)}
                        >
                          Avançar Etapa
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
