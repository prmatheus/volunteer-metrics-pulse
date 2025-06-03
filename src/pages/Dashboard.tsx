
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingUp, TrendingDown, Users, Clock, Target, UserCheck } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { generateMockPessoas, generateMockAcompanhamentos, Pessoa, Acompanhamento } from '@/data/mockData';
import { VolunteerModal } from '@/components/VolunteerModal';
import { SettingsModal } from '@/components/SettingsModal';

// Função para garantir que as datas sejam objetos Date
const ensureDateObject = (date: Date | string | undefined): Date | undefined => {
  if (!date) return undefined;
  if (typeof date === 'string') {
    return new Date(date);
  }
  return date;
};

interface Metrics {
  visitantes_mes: number;
  taxa_batismo: number;
  tempo_medio_etapa: number;
  voluntarios_ativos: number;
  conversao_prospeccao_inclusao: number;
  tempo_medio_prospeccao_inclusao: number;
  tempo_medio_inclusao_lideranca: number;
}

export default function Dashboard() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<Metrics>({
    visitantes_mes: 0,
    taxa_batismo: 0,
    tempo_medio_etapa: 0,
    voluntarios_ativos: 0,
    conversao_prospeccao_inclusao: 0,
    tempo_medio_prospeccao_inclusao: 0,
    tempo_medio_inclusao_lideranca: 0
  });

  const [pessoas] = useLocalStorage<Pessoa[]>('pessoas', generateMockPessoas(50));
  const [acompanhamentos] = useLocalStorage<Acompanhamento[]>('acompanhamentos', generateMockAcompanhamentos(100));

  useEffect(() => {
    const hoje = new Date();
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    
    // Visitantes este mês
    const visitantesMes = pessoas.filter(p => {
      const primeiroContato = ensureDateObject(p.primeiroContato);
      return primeiroContato && primeiroContato >= inicioMes;
    }).length;
    
    // Taxa de batismo
    const batizados = pessoas.filter(p => p.dataBatismo).length;
    const taxaBatismo = pessoas.length > 0 ? (batizados / pessoas.length) * 100 : 0;
    
    // Voluntários ativos
    const voluntariosAtivos = pessoas.filter(p => p.isVoluntario).length;
    
    // Conversão prospecção para inclusão
    const prospeccao = pessoas.filter(p => p.etapa === 'Prospecção').length;
    const incluidos = pessoas.filter(p => p.dataInclusao).length;
    const conversaoProspeccaoInclusao = prospeccao > 0 ? (incluidos / (prospeccao + incluidos)) * 100 : 0;
    
    // Tempo médio prospecção → inclusão
    const pessoasComInclusao = pessoas.filter(p => p.dataInclusao);
    const tempoMedioProspeccaoInclusao = pessoasComInclusao.length > 0 
      ? pessoasComInclusao.reduce((acc, p) => {
          const primeiroContato = ensureDateObject(p.primeiroContato);
          const dataInclusao = ensureDateObject(p.dataInclusao);
          if (primeiroContato && dataInclusao) {
            const dias = Math.abs((dataInclusao.getTime() - primeiroContato.getTime()) / (1000 * 60 * 60 * 24));
            return acc + dias;
          }
          return acc;
        }, 0) / pessoasComInclusao.length
      : 0;
    
    // Tempo médio inclusão → liderança
    const pessoasComLideranca = pessoas.filter(p => p.dataLideranca && p.dataInclusao);
    const tempoMedioInclusaoLideranca = pessoasComLideranca.length > 0
      ? pessoasComLideranca.reduce((acc, p) => {
          const dataInclusao = ensureDateObject(p.dataInclusao);
          const dataLideranca = ensureDateObject(p.dataLideranca);
          if (dataInclusao && dataLideranca) {
            const dias = Math.abs((dataLideranca.getTime() - dataInclusao.getTime()) / (1000 * 60 * 60 * 24));
            return acc + dias;
          }
          return acc;
        }, 0) / pessoasComLideranca.length
      : 0;

    setMetrics({
      visitantes_mes: visitantesMes,
      taxa_batismo: taxaBatismo,
      tempo_medio_etapa: 15, // Placeholder
      voluntarios_ativos: voluntariosAtivos,
      conversao_prospeccao_inclusao: conversaoProspeccaoInclusao,
      tempo_medio_prospeccao_inclusao: tempoMedioProspeccaoInclusao,
      tempo_medio_inclusao_lideranca: tempoMedioInclusaoLideranca
    });
  }, [pessoas]);

  const handleMetricClick = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Distribuição por etapa
  const etapasDistribuicao = pessoas.reduce((acc, pessoa) => {
    acc[pessoa.etapa] = (acc[pessoa.etapa] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const etapasComPessoas = Object.entries(etapasDistribuicao).filter(([_, count]) => count > 0);
  const totalPessoas = pessoas.length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral das métricas da igreja</p>
        </div>
      </div>

      {/* Alert de conversão baixa */}
      {metrics.conversao_prospeccao_inclusao < 25 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Atenção: A taxa de conversão de prospecção para inclusão está baixa ({metrics.conversao_prospeccao_inclusao.toFixed(1)}%).
            Considere revisar as estratégias de acompanhamento.
          </AlertDescription>
        </Alert>
      )}

      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          className="border-carrot-orange border-2 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleMetricClick('settings')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitantes este Mês</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-carrot-orange">{metrics.visitantes_mes}</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card 
          className="border-carrot-orange border-2 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleMetricClick('volunteers')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Batismo</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-carrot-orange">{metrics.taxa_batismo.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Meta: 80%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio por Etapa</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.tempo_medio_etapa} dias</div>
            <p className="text-xs text-muted-foreground">Última atualização</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voluntários Ativos</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.voluntarios_ativos}</div>
            <p className="text-xs text-muted-foreground">Pessoas engajadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Cards de tempo médio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio: Prospecção → Inclusão</CardTitle>
            {metrics.tempo_medio_prospeccao_inclusao > 60 ? (
              <TrendingDown className="h-4 w-4 text-red-500" />
            ) : (
              <TrendingUp className="h-4 w-4 text-green-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(metrics.tempo_medio_prospeccao_inclusao)} dias</div>
            <p className={`text-xs ${metrics.tempo_medio_prospeccao_inclusao > 60 ? 'text-red-500' : 'text-green-500'}`}>
              {metrics.tempo_medio_prospeccao_inclusao > 60 ? 'Acima da meta' : 'Dentro da meta'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio: Inclusão → Liderança</CardTitle>
            {metrics.tempo_medio_inclusao_lideranca > 90 ? (
              <TrendingDown className="h-4 w-4 text-red-500" />
            ) : (
              <TrendingUp className="h-4 w-4 text-green-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(metrics.tempo_medio_inclusao_lideranca)} dias</div>
            <p className={`text-xs ${metrics.tempo_medio_inclusao_lideranca > 90 ? 'text-red-500' : 'text-green-500'}`}>
              {metrics.tempo_medio_inclusao_lideranca > 90 ? 'Acima da meta' : 'Dentro da meta'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição por Etapa */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Etapa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {etapasComPessoas.map(([etapa, count]) => {
            const percentage = (count / totalPessoas) * 100;
            return (
              <div key={etapa} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{etapa}</span>
                  <Badge variant="outline">{count} pessoas</Badge>
                </div>
                <Progress value={percentage} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {percentage.toFixed(1)}% do total
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Modais */}
      <VolunteerModal isOpen={activeModal === 'volunteers'} onClose={closeModal} />
      <SettingsModal isOpen={activeModal === 'settings'} onClose={closeModal} />
    </div>
  );
}
