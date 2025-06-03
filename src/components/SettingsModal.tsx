
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAutomationsContext } from '@/components/AutomationsProvider';
import { Settings, Bot, Bell, Users, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { automations, toggleAutomation } = useAutomationsContext();
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

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
        
        <Tabs defaultValue="automations" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="automations" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Automações
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Geral
            </TabsTrigger>
          </TabsList>

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

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
                <CardDescription>
                  Gerencie permissões e acessos do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nome do Usuário</Label>
                      <Input placeholder="Digite o nome" />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input placeholder="Digite o email" type="email" />
                    </div>
                  </div>
                  <Button>Adicionar Usuário</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>
                  Configurações básicas do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nome da Igreja</Label>
                    <Input defaultValue="Igreja Exemplo" />
                  </div>
                  <div>
                    <Label>Cidade</Label>
                    <Input defaultValue="São Paulo" />
                  </div>
                </div>
                
                <div>
                  <Label>Tempo limite para acompanhamento (dias)</Label>
                  <Input type="number" defaultValue="7" />
                </div>

                <div>
                  <Label>Meta de conversão (%)</Label>
                  <Input type="number" defaultValue="80" />
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
