<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ config('app.name', 'Volunteer Metrics Pulse') }}</title>
    @vite('resources/css/app.css')
</head>
<body class="font-sans antialiased">
    <div class="container mx-auto p-4">
        @yield('content')
    </div>
</body>
</html>
