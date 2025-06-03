# Laravel Skeleton

This folder shows a basic example of how you can port the Vite + React project to a Laravel application using Blade.

## Setup
1. Install PHP and Composer on your system.
2. Create a new Laravel project:
   ```bash
   composer create-project laravel/laravel volunteer-metrics-pulse-laravel
   ```
3. Copy the contents of the `laravel-skeleton` directory into the new Laravel project. Place the `routes` and `resources` folders as well as the `app/Http/Controllers` files.
4. Run `php artisan serve` to start the development server.

The example controllers generate mock data similar to the React version and render it using Blade templates. Expand these templates and controllers to fully recreate the React UI and logic.
