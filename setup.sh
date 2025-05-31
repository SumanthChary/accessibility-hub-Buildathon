#!/bin/bash

# Check if required environment variables are set
if [ -z "$VITE_SUPABASE_URL" ] || [ -z "$VITE_SUPABASE_ANON_KEY" ] || [ -z "$VITE_GROQ_API_KEY" ]; then
    echo "Error: Required environment variables are not set"
    echo "Please ensure the following variables are set:"
    echo "- VITE_SUPABASE_URL"
    echo "- VITE_SUPABASE_ANON_KEY"
    echo "- VITE_GROQ_API_KEY"
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Run database migrations
echo "Running database migrations..."
npx supabase db push

# Build the application
echo "Building the application..."
npm run build

echo "Setup complete! You can now start the application with 'npm run dev'"
