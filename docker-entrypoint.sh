#!/bin/sh

# Ensure envsubst is available (Alpine-based images should have it installed by default)
if ! command -v envsubst >/dev/null 2>&1; then
    echo "envsubst could not be found. Installing..."
    apk add --no-cache gettext
fi

# Substitute environment variables into the env.js template
envsubst < /usr/share/nginx/html/env.js.template > /usr/share/nginx/html/env.js

# Start Nginx
exec nginx -g 'daemon off;'