
import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface TimeTargets {
  prospeccaoInclusao: number;
  inclusaoLideranca: number;
  tempoMedioEtapa: number;
}

export interface Ministerio {
  id: string;
  nome: string;
  cor: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: 'Admin' | 'Consolidador' | 'Líder';
}

const defaultTimeTargets: TimeTargets = {
  prospeccaoInclusao: 30,
  inclusaoLideranca: 180,
  tempoMedioEtapa: 15
};

const defaultMinisterios: Ministerio[] = [
  { id: '1', nome: 'Louvor', cor: 'bg-blue-500' },
  { id: '2', nome: 'Recepção', cor: 'bg-green-500' },
  { id: '3', nome: 'Infantil', cor: 'bg-yellow-500' },
  { id: '4', nome: 'Jovens', cor: 'bg-purple-500' },
  { id: '5', nome: 'Intercessão', cor: 'bg-red-500' },
  { id: '6', nome: 'Mídia', cor: 'bg-indigo-500' },
  { id: '7', nome: 'Limpeza', cor: 'bg-gray-500' }
];

const defaultUsuarios: Usuario[] = [
  { id: '1', nome: 'João Silva', email: 'joao@bereana.com', tipo: 'Admin' },
  { id: '2', nome: 'Maria Santos', email: 'maria@bereana.com', tipo: 'Consolidador' }
];

export function useSettings() {
  const [timeTargets, setTimeTargets] = useLocalStorage<TimeTargets>('timeTargets', defaultTimeTargets);
  const [ministerios, setMinisterios] = useLocalStorage<Ministerio[]>('ministerios', defaultMinisterios);
  const [usuarios, setUsuarios] = useLocalStorage<Usuario[]>('usuarios', defaultUsuarios);

  const updateTimeTargets = (newTargets: TimeTargets) => {
    setTimeTargets(newTargets);
  };

  const addMinisterio = (nome: string) => {
    const cores = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500', 'bg-indigo-500', 'bg-pink-500', 'bg-orange-500'];
    const cor = cores[Math.floor(Math.random() * cores.length)];
    
    const novoMinisterio: Ministerio = {
      id: Date.now().toString(),
      nome,
      cor
    };
    
    setMinisterios(prev => [...prev, novoMinisterio]);
  };

  const removeMinisterio = (id: string) => {
    setMinisterios(prev => prev.filter(m => m.id !== id));
  };

  const addUsuario = (nome: string, email: string, tipo: Usuario['tipo']) => {
    const novoUsuario: Usuario = {
      id: Date.now().toString(),
      nome,
      email,
      tipo
    };
    
    setUsuarios(prev => [...prev, novoUsuario]);
  };

  const removeUsuario = (id: string) => {
    setUsuarios(prev => prev.filter(u => u.id !== id));
  };

  const updateUsuario = (id: string, updates: Partial<Usuario>) => {
    setUsuarios(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
  };

  return {
    timeTargets,
    ministerios,
    usuarios,
    updateTimeTargets,
    addMinisterio,
    removeMinisterio,
    addUsuario,
    removeUsuario,
    updateUsuario
  };
}
