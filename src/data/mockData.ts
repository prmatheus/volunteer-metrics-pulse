
export interface Pessoa {
  id: string;
  nome: string;
  etapa: string;
  primeiroContato: Date;
  ultimaAtualizacao: Date;
  dataBatismo?: Date;
  isVoluntario: boolean;
  dataInclusao?: Date;
  dataLideranca?: Date;
}

export interface Acompanhamento {
  id: string;
  pessoaId: string;
  data: Date;
  tipo: string;
  observacoes: string;
}

const etapas = [
  'Prospecção',
  'Primeiro Contato',
  'Acompanhamento',
  'Inclusão',
  'Discipulado',
  'Liderança',
  'Batizado'
];

export function generateMockPessoas(count: number = 50): Pessoa[] {
  const pessoas: Pessoa[] = [];
  const hoje = new Date();
  
  for (let i = 0; i < count; i++) {
    const primeiroContato = new Date(hoje.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000);
    const etapa = etapas[Math.floor(Math.random() * etapas.length)];
    
    let dataBatismo: Date | undefined;
    let dataInclusao: Date | undefined;
    let dataLideranca: Date | undefined;
    
    if (etapa === 'Batizado') {
      dataBatismo = new Date(primeiroContato.getTime() + Math.random() * 180 * 24 * 60 * 60 * 1000);
    }
    
    if (['Inclusão', 'Discipulado', 'Liderança', 'Batizado'].includes(etapa)) {
      dataInclusao = new Date(primeiroContato.getTime() + Math.random() * 90 * 24 * 60 * 60 * 1000);
    }
    
    if (['Liderança'].includes(etapa)) {
      dataLideranca = new Date((dataInclusao || primeiroContato).getTime() + Math.random() * 120 * 24 * 60 * 60 * 1000);
    }
    
    pessoas.push({
      id: `pessoa-${i + 1}`,
      nome: `Pessoa ${i + 1}`,
      etapa,
      primeiroContato,
      ultimaAtualizacao: new Date(primeiroContato.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000),
      dataBatismo,
      isVoluntario: Math.random() > 0.7,
      dataInclusao,
      dataLideranca
    });
  }
  
  return pessoas;
}

export function generateMockAcompanhamentos(count: number = 100): Acompanhamento[] {
  const acompanhamentos: Acompanhamento[] = [];
  const tipos = ['Visita', 'Ligação', 'WhatsApp', 'Email', 'Reunião'];
  
  for (let i = 0; i < count; i++) {
    acompanhamentos.push({
      id: `acomp-${i + 1}`,
      pessoaId: `pessoa-${Math.floor(Math.random() * 50) + 1}`,
      data: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
      tipo: tipos[Math.floor(Math.random() * tipos.length)],
      observacoes: `Observação do acompanhamento ${i + 1}`
    });
  }
  
  return acompanhamentos;
}
