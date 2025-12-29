#!/bin/bash
# Build the project
npm run build

# Navigate into the build output directory
cd dist

# Initialize a new git repository
git init
git add -A
git commit -m 'Deploy to GitHub Pages'

# Push to gh-pages branch
git push -f https://github.com/rosemin928/todo-app.git main:gh-pages

cd ..
rm -rf dist/.git
