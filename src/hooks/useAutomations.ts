
import { useState, useEffect } from 'react';

export interface Automation {
  id: string;
  name: string;
  isActive: boolean;
  trigger: string;
  action: string;
}

export function useAutomations() {
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: '1',
      name: 'Lembrete de Acompanhamento',
      isActive: true,
      trigger: 'Sem contato por 7 dias',
      action: 'Enviar notificação'
    },
    {
      id: '2',
      name: 'Transição Automática',
      isActive: false,
      trigger: 'Após 3 acompanhamentos',
      action: 'Mover para próxima etapa'
    }
  ]);

  const toggleAutomation = (id: string) => {
    setAutomations(prev => 
      prev.map(auto => 
        auto.id === id ? { ...auto, isActive: !auto.isActive } : auto
      )
    );
  };

  return { automations, toggleAutomation };
}
