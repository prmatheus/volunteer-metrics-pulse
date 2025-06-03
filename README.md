# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/cd869c39-e58d-4467-9ecc-3ca4e7d47fd4

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/cd869c39-e58d-4467-9ecc-3ca4e7d47fd4) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/cd869c39-e58d-4467-9ecc-3ca4e7d47fd4) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Migrating to Laravel with Blade

If you want to recreate this project using Laravel for the backend and Blade for
the frontend, an expanded example is provided in the `laravel-skeleton` directory.
The skeleton now includes controllers and multiple Blade views demonstrating how the React pages can be translated to Blade.

You will need PHP and Composer installed:

```bash
composer create-project laravel/laravel volunteer-metrics-pulse-laravel
```

After creating the project, copy the contents of `laravel-skeleton` into the corresponding folders of your Laravel application (`routes`, `resources`, and `app/Http/Controllers`).
Run `php artisan serve` to view the pages. Expand the controllers and Blade templates to fully replicate the React functionality.

