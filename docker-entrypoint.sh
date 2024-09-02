#!/bin/sh

echo "Gilded-Sentinel Docker Entrypoint v0.0.1"
# Ensure envsubst is available (Alpine-based images should have it installed by default)
if ! command -v envsubst >/dev/null 2>&1; then
    echo "envsubst could not be found. Installing..."
    apk add --no-cache gettext
fi

# Substitute environment variables into the env.js template
echo "Substituting environmental variables into env.js"
envsubst < /usr/share/nginx/html/env.js.template > /usr/share/nginx/html/env.js
echo "env.js generated with content:"
cat /usr/share/nginx/html/env.js

# Start Nginx
echo "Executing Nginx"
exec nginx -g 'daemon off;'