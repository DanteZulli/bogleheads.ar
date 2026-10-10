# List available recipes.
help:
    just --list

# Start the local dev server with live reload.
run:
    npm run dev

# Build the static site into dist/.
build:
    npm run build

# Serve the production build locally (includes dist/404.html).
preview:
    npm run preview
