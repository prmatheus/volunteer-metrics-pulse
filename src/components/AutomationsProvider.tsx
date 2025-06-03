
import React, { createContext, useContext, ReactNode } from 'react';
import { useAutomations, Automation } from '@/hooks/useAutomations';

interface AutomationsContextType {
  automations: Automation[];
  toggleAutomation: (id: string) => void;
}

const AutomationsContext = createContext<AutomationsContextType | undefined>(undefined);

export function AutomationsProvider({ children }: { children: ReactNode }) {
  const automationsData = useAutomations();

  return (
    <AutomationsContext.Provider value={automationsData}>
      {children}
    </AutomationsContext.Provider>
  );
}

export function useAutomationsContext() {
  const context = useContext(AutomationsContext);
  if (context === undefined) {
    throw new Error('useAutomationsContext must be used within an AutomationsProvider');
  }
  return context;
}
