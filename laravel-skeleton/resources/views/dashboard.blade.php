@extends('layouts.app')

@section('content')
<x-navigation />
<h1 class="text-2xl font-bold mb-4">Dashboard</h1>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="bg-white p-4 rounded shadow">
        <h2 class="font-semibold mb-2">Visitantes este mês</h2>
        <p>{{ $metrics['visitantes_mes'] }}</p>
    </div>
    <div class="bg-white p-4 rounded shadow">
        <h2 class="font-semibold mb-2">Taxa de Batismo</h2>
        <p>{{ number_format($metrics['taxa_batismo'], 2) }}%</p>
    </div>
    <div class="bg-white p-4 rounded shadow">
        <h2 class="font-semibold mb-2">Voluntários Ativos</h2>
        <p>{{ $metrics['voluntarios_ativos'] }}</p>
    </div>
</div>
@endsection
