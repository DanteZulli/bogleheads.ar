# List available recipes.
help:
    just --list

# Start the local dev server with live reload.
run:
    npm run dev

# Build the static site into dist/ and index it with Pagefind.
build:
    npm run build
