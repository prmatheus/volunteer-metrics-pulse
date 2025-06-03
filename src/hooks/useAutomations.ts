
import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface Automation {
  id: string;
  name: string;
  isActive: boolean;
  trigger: string;
  action: string;
}

const defaultAutomations: Automation[] = [
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
  },
  {
    id: '3',
    name: 'Boas-vindas Automáticas',
    isActive: true,
    trigger: 'Primeira visita registrada',
    action: 'Enviar mensagem de boas-vindas'
  },
  {
    id: '4',
    name: 'Convite para Batismo',
    isActive: false,
    trigger: 'Após 6 meses no discipulado',
    action: 'Agendar conversa sobre batismo'
  }
];

export function useAutomations() {
  const [automations, setAutomations] = useLocalStorage<Automation[]>('automations', defaultAutomations);

  const toggleAutomation = (id: string) => {
    setAutomations(prev => 
      prev.map(auto => 
        auto.id === id ? { ...auto, isActive: !auto.isActive } : auto
      )
    );
  };

  const addAutomation = (automation: Omit<Automation, 'id'>) => {
    const newAutomation = {
      ...automation,
      id: Date.now().toString()
    };
    setAutomations(prev => [...prev, newAutomation]);
  };

  const removeAutomation = (id: string) => {
    setAutomations(prev => prev.filter(auto => auto.id !== id));
  };

  return { 
    automations, 
    toggleAutomation, 
    addAutomation, 
    removeAutomation 
  };
}
