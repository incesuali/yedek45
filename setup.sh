#!/bin/bash

# NVM yüklü değilse yükle
if [ ! -d "$HOME/.nvm" ]; then
  echo "Installing NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Node.js 18.17.0'ı yükle ve kullan
echo "Installing Node.js 18.17.0..."
nvm install 18.17.0
nvm use 18.17.0
nvm alias default 18.17.0

# Bağımlılıkları yükle
echo "Installing dependencies..."
npm install

echo "Setup complete! You can now run 'npm run dev' to start the development server." 