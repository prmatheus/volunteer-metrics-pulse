<nav class="bg-white border-b border-gray-200 px-4 py-3 mb-4">
    <div class="flex items-center justify-between max-w-7xl mx-auto">
        <div class="flex items-center space-x-8">
            <div class="text-xl font-bold text-primary">
                Igreja Manager
            </div>
            <div class="flex space-x-4">
                <a href="{{ route('dashboard') }}" class="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors {{ request()->routeIs('dashboard') ? 'bg-primary text-primary-foreground' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' }}">
                    <span>Dashboard</span>
                </a>
                <a href="{{ route('kanban') }}" class="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors {{ request()->routeIs('kanban') ? 'bg-primary text-primary-foreground' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' }}">
                    <span>Kanban</span>
                </a>
                <a href="{{ route('prospeccao') }}" class="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors {{ request()->routeIs('prospeccao') ? 'bg-primary text-primary-foreground' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' }}">
                    <span>Prospecção</span>
                </a>
            </div>
        </div>
    </div>
</nav>
