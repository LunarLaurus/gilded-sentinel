#!/bin/bash

# Function to check if envsubst is installed
check_and_install_envsubst() {
    if ! command -v envsubst &> /dev/null; then
        echo "envsubst not found. Installing it..."
        
        # Determine the package manager and install gettext (which includes envsubst)
        if [ -x "$(command -v apt-get)" ]; then
            sudo apt-get update && sudo apt-get install -y gettext
        elif [ -x "$(command -v yum)" ]; then
            sudo yum install -y gettext
        elif [ -x "$(command -v dnf)" ]; then
            sudo dnf install -y gettext
        elif [ -x "$(command -v zypper)" ]; then
            sudo zypper install -y gettext-tools
        elif [ -x "$(command -v apk)" ]; then
            sudo apk add --no-cache gettext
        elif [ -x "$(command -v pacman)" ]; then
            sudo pacman -S --noconfirm gettext
        else
            echo "No suitable package manager found. Please install 'gettext' manually."
            exit 1
        fi
    else
        echo "envsubst is already installed."
    fi
}

check_and_install_envsubst

# Use envsubst to replace variables in the env.js.template
envsubst < /usr/share/nginx/html/env.js.template > /usr/share/nginx/html/env.js

# Start NGINX
exec nginx -g 'daemon off;'
