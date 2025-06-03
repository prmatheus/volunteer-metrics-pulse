
export interface Pessoa {
  id: string;
  nome: string;
  email?: string;
  telefone?: string;
  etapa: string;
  primeiroContato: Date;
  ultimaAtualizacao: Date;
  dataBatismo?: Date;
  isVoluntario: boolean;
  dataInclusao?: Date;
  dataLideranca?: Date;
  responsavel?: string;
  observacoes?: string;
}

export interface Acompanhamento {
  id: string;
  pessoaId: string;
  data: Date;
  tipo: string;
  observacoes: string;
  responsavel: string;
}

export interface Voluntario {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  cargo: string;
  ativo: boolean;
  dataInicio: Date;
  areas: string[];
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

const nomes = [
  'João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira', 'Carlos Mendes',
  'Lucia Ferreira', 'Roberto Lima', 'Fernanda Souza', 'Diego Alves', 'Patricia Rocha',
  'Ricardo Martins', 'Juliana Castro', 'Marcos Pereira', 'Camila Dias', 'Felipe Torres',
  'Beatriz Gomes', 'André Cardoso', 'Leticia Barbosa', 'Thiago Nascimento', 'Natalia Pires'
];

const responsaveis = [
  'Pastor João', 'Líder Maria', 'Diácono Pedro', 'Irmã Ana', 'Presbítero Carlos'
];

export function generateMockPessoas(count: number = 50): Pessoa[] {
  const pessoas: Pessoa[] = [];
  const hoje = new Date();
  
  for (let i = 0; i < count; i++) {
    const nome = nomes[Math.floor(Math.random() * nomes.length)] + ` ${i + 1}`;
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
      nome,
      email: `${nome.toLowerCase().replace(' ', '.')}@email.com`,
      telefone: `(11) 9${Math.floor(Math.random() * 90000000) + 10000000}`,
      etapa,
      primeiroContato,
      ultimaAtualizacao: new Date(primeiroContato.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000),
      dataBatismo,
      isVoluntario: Math.random() > 0.7,
      dataInclusao,
      dataLideranca,
      responsavel: responsaveis[Math.floor(Math.random() * responsaveis.length)],
      observacoes: `Observações sobre ${nome}`
    });
  }
  
  return pessoas;
}

export function generateMockAcompanhamentos(count: number = 100): Acompanhamento[] {
  const acompanhamentos: Acompanhamento[] = [];
  const tipos = ['Visita', 'Ligação', 'WhatsApp', 'Email', 'Reunião', 'Culto'];
  
  for (let i = 0; i < count; i++) {
    acompanhamentos.push({
      id: `acomp-${i + 1}`,
      pessoaId: `pessoa-${Math.floor(Math.random() * 50) + 1}`,
      data: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
      tipo: tipos[Math.floor(Math.random() * tipos.length)],
      observacoes: `Acompanhamento ${i + 1}: Pessoa demonstrou interesse em participar mais das atividades.`,
      responsavel: responsaveis[Math.floor(Math.random() * responsaveis.length)]
    });
  }
  
  return acompanhamentos;
}

export function generateMockVoluntarios(): Voluntario[] {
  const cargos = ['Líder de Célula', 'Secretário', 'Tesoureiro', 'Ministério de Louvor', 'Ministério Infantil', 'Diácono', 'Presbítero'];
  const areas = ['Louvor', 'Ensino', 'Evangelismo', 'Assistência Social', 'Administração', 'Comunicação'];
  
  return nomes.slice(0, 15).map((nome, i) => ({
    id: `vol-${i + 1}`,
    nome,
    email: `${nome.toLowerCase().replace(' ', '.')}@igreja.com`,
    telefone: `(11) 9${Math.floor(Math.random() * 90000000) + 10000000}`,
    cargo: cargos[Math.floor(Math.random() * cargos.length)],
    ativo: Math.random() > 0.2,
    dataInicio: new Date(Date.now() - Math.random() * 1000 * 24 * 60 * 60 * 1000),
    areas: areas.slice(0, Math.floor(Math.random() * 3) + 1)
  }));
}
