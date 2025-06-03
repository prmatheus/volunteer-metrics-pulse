<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $pessoas = $this->generateMockPessoas(50);
        $metrics = $this->calculateMetrics($pessoas);
        return view('dashboard', ['metrics' => $metrics]);
    }

    private function generateMockPessoas(int $count = 50): array
    {
        $etapas = ['Prospecção','Primeiro Contato','Acompanhamento','Inclusão','Discipulado','Liderança','Batizado'];
        $nomes = ['João Silva','Maria Santos','Pedro Costa','Ana Oliveira','Carlos Mendes','Lucia Ferreira','Roberto Lima','Fernanda Souza','Diego Alves','Patricia Rocha','Ricardo Martins','Juliana Castro','Marcos Pereira','Camila Dias','Felipe Torres','Beatriz Gomes','André Cardoso','Leticia Barbosa','Thiago Nascimento','Natalia Pires'];
        $responsaveis = ['Pastor João','Líder Maria','Diácono Pedro','Irmã Ana','Presbítero Carlos'];
        $pessoas = [];
        $hoje = new \DateTime();
        for ($i = 0; $i < $count; $i++) {
            $nome = $nomes[array_rand($nomes)] . ' ' . ($i + 1);
            $primeiroContato = (clone $hoje)->modify('-'.rand(0,365).' days');
            $etapa = $etapas[array_rand($etapas)];
            $dataBatismo = null;
            $dataInclusao = null;
            $dataLideranca = null;
            if ($etapa === 'Batizado') {
                $dataBatismo = (clone $primeiroContato)->modify('+'.rand(0,180).' days');
            }
            if (in_array($etapa, ['Inclusão','Discipulado','Liderança','Batizado'])) {
                $dataInclusao = (clone $primeiroContato)->modify('+'.rand(0,90).' days');
            }
            if ($etapa === 'Liderança') {
                $dataLideranca = (clone $dataInclusao ?: $primeiroContato)->modify('+'.rand(0,120).' days');
            }
            $pessoas[] = [
                'id' => 'pessoa-'.($i+1),
                'nome' => $nome,
                'email' => strtolower(str_replace(' ', '.', $nome)).'@email.com',
                'telefone' => '(11) 9'.rand(10000000,99999999),
                'etapa' => $etapa,
                'primeiroContato' => $primeiroContato,
                'ultimaAtualizacao' => (clone $primeiroContato)->modify('+'.rand(0,30).' days'),
                'dataBatismo' => $dataBatismo,
                'isVoluntario' => rand(0,1) > 0.7,
                'dataInclusao' => $dataInclusao,
                'dataLideranca' => $dataLideranca,
                'responsavel' => $responsaveis[array_rand($responsaveis)],
            ];
        }
        return $pessoas;
    }

    private function calculateMetrics(array $pessoas): array
    {
        $hoje = new \DateTime();
        $inicioMes = new \DateTime($hoje->format('Y-m-01'));
        $visitantesMes = 0;
        $batizados = 0;
        $voluntariosAtivos = 0;
        $prospeccao = 0;
        $incluidos = 0;
        $diasProspeccaoInclusao = 0;
        $countProspeccaoInclusao = 0;
        $diasInclusaoLideranca = 0;
        $countInclusaoLideranca = 0;

        foreach ($pessoas as $p) {
            if ($p['primeiroContato'] >= $inicioMes) $visitantesMes++;
            if ($p['dataBatismo']) $batizados++;
            if ($p['isVoluntario']) $voluntariosAtivos++;
            if ($p['etapa'] === 'Prospecção') $prospeccao++;
            if ($p['dataInclusao']) {
                $incluidos++;
                $diasProspeccaoInclusao += $p['dataInclusao']->diff($p['primeiroContato'])->days;
                $countProspeccaoInclusao++;
            }
            if ($p['dataLideranca']) {
                if ($p['dataInclusao']) {
                    $diasInclusaoLideranca += $p['dataLideranca']->diff($p['dataInclusao'])->days;
                    $countInclusaoLideranca++;
                }
            }
        }
        $total = count($pessoas);
        return [
            'visitantes_mes' => $visitantesMes,
            'taxa_batismo' => $total > 0 ? ($batizados / $total) * 100 : 0,
            'tempo_medio_etapa' => 15,
            'voluntarios_ativos' => $voluntariosAtivos,
            'conversao_prospeccao_inclusao' => ($prospeccao + $incluidos) > 0 ? ($incluidos / ($prospeccao + $incluidos)) * 100 : 0,
            'tempo_medio_prospeccao_inclusao' => $countProspeccaoInclusao > 0 ? $diasProspeccaoInclusao / $countProspeccaoInclusao : 0,
            'tempo_medio_inclusao_lideranca' => $countInclusaoLideranca > 0 ? $diasInclusaoLideranca / $countInclusaoLideranca : 0,
        ];
    }
}
