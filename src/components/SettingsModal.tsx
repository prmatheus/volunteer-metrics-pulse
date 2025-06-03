
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAutomationsContext } from '@/components/AutomationsProvider';
import { useSettings } from '@/hooks/useSettings';
import { Settings, Bot, Bell, Users, Clock, Plus, X, Target, UserPlus, Building2 } from 'lucide-react';
import { toast } from 'sonner';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { automations, toggleAutomation } = useAutomationsContext();
  const { 
    timeTargets, 
    ministerios, 
    usuarios, 
    updateTimeTargets, 
    addMinisterio, 
    removeMinisterio, 
    addUsuario, 
    removeUsuario 
  } = useSettings();

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  // Estados para formulários
  const [localTimeTargets, setLocalTimeTargets] = useState(timeTargets);
  const [novoMinisterio, setNovoMinisterio] = useState('');
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    email: '',
    tipo: 'Consolidador' as const
  });

  const handleSaveTimeTargets = () => {
    updateTimeTargets(localTimeTargets);
    toast.success('Prazos e metas salvos com sucesso!');
  };

  const handleAddMinisterio = () => {
    if (novoMinisterio.trim()) {
      addMinisterio(novoMinisterio.trim());
      setNovoMinisterio('');
      toast.success('Ministério adicionado com sucesso!');
    }
  };

  const handleAddUsuario = () => {
    if (novoUsuario.nome.trim() && novoUsuario.email.trim()) {
      addUsuario(novoUsuario.nome.trim(), novoUsuario.email.trim(), novoUsuario.tipo);
      setNovoUsuario({ nome: '', email: '', tipo: 'Consolidador' });
      toast.success('Usuário adicionado com sucesso!');
    }
  };

  const handleSaveSettings = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações do Sistema
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="targets" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="targets" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Prazos & Metas
            </TabsTrigger>
            <TabsTrigger value="ministerios" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Ministérios
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="automations" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Automações
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="targets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Metas de Tempo
                </CardTitle>
                <CardDescription>
                  Configure os prazos ideais para cada etapa do processo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="prospeccao-inclusao">Prospecção → Inclusão (dias)</Label>
                    <Input
                      id="prospeccao-inclusao"
                      type="number"
                      value={localTimeTargets.prospeccaoInclusao}
                      onChange={(e) => setLocalTimeTargets(prev => ({
                        ...prev,
                        prospeccaoInclusao: parseInt(e.target.value) || 0
                      }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="inclusao-lideranca">Inclusão → Liderança (dias)</Label>
                    <Input
                      id="inclusao-lideranca"
                      type="number"
                      value={localTimeTargets.inclusaoLideranca}
                      onChange={(e) => setLocalTimeTargets(prev => ({
                        ...prev,
                        inclusaoLideranca: parseInt(e.target.value) || 0
                      }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tempo-medio">Tempo Médio por Etapa (dias)</Label>
                    <Input
                      id="tempo-medio"
                      type="number"
                      value={localTimeTargets.tempoMedioEtapa}
                      onChange={(e) => setLocalTimeTargets(prev => ({
                        ...prev,
                        tempoMedioEtapa: parseInt(e.target.value) || 0
                      }))}
                    />
                  </div>
                </div>
                
                <Button onClick={handleSaveTimeTargets} className="bg-carrot-orange hover:bg-carrot-orange/90">
                  Salvar Prazos
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ministerios" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Ministérios Disponíveis
                </CardTitle>
                <CardDescription>
                  Gerencie os ministérios da sua igreja
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Nome do novo ministério"
                    value={novoMinisterio}
                    onChange={(e) => setNovoMinisterio(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddMinisterio()}
                  />
                  <Button onClick={handleAddMinisterio} size="icon" className="bg-carrot-orange hover:bg-carrot-orange/90">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {ministerios.map((ministerio) => (
                    <Badge key={ministerio.id} variant="secondary" className="flex items-center gap-2 px-3 py-2">
                      <div className={`w-3 h-3 rounded-full ${ministerio.cor}`} />
                      {ministerio.nome}
                      <button
                        onClick={() => removeMinisterio(ministerio.id)}
                        className="ml-1 hover:bg-red-100 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Usuários do Sistema
                </CardTitle>
                <CardDescription>
                  Gerencie os usuários e suas permissões
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input
                    placeholder="Nome completo"
                    value={novoUsuario.nome}
                    onChange={(e) => setNovoUsuario(prev => ({ ...prev, nome: e.target.value }))}
                  />
                  <Input
                    placeholder="E-mail"
                    type="email"
                    value={novoUsuario.email}
                    onChange={(e) => setNovoUsuario(prev => ({ ...prev, email: e.target.value }))}
                  />
                  <Select value={novoUsuario.tipo} onValueChange={(value: any) => setNovoUsuario(prev => ({ ...prev, tipo: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consolidador">Consolidador</SelectItem>
                      <SelectItem value="Líder">Líder</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddUsuario} className="bg-carrot-orange hover:bg-carrot-orange/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {usuarios.map((usuario) => (
                    <div key={usuario.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{usuario.nome}</div>
                        <div className="text-sm text-muted-foreground">{usuario.email}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={usuario.tipo === 'Admin' ? 'default' : 'secondary'}>
                          {usuario.tipo}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeUsuario(usuario.id)}
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Automações Ativas</CardTitle>
                <CardDescription>
                  Configure as automações que ajudam no acompanhamento das pessoas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {automations.map((automation) => (
                  <div key={automation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={automation.id} className="text-base font-medium">
                          {automation.name}
                        </Label>
                        {automation.isActive && (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                            Ativo
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Trigger:</strong> {automation.trigger}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Ação:</strong> {automation.action}
                      </p>
                    </div>
                    <Switch
                      id={automation.id}
                      checked={automation.isActive}
                      onCheckedChange={() => toggleAutomation(automation.id)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>
                  Configure como você deseja receber notificações do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Notificações por Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba relatórios e alertas por email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, email: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Notificações por SMS</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba alertas urgentes por SMS
                      </p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, sms: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Notificações Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba notificações no navegador
                      </p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, push: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSaveSettings}>
            Salvar Configurações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
