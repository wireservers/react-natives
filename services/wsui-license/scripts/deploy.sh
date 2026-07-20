#!/usr/bin/env bash
#
# Deploy wsui-license to Azure App Service via Kudu zipdeploy.
#
# Dependencies are installed ON THE SERVER by Oryx (SCM_DO_BUILD_DURING_DEPLOYMENT=true) rather
# than being zipped from this machine. All deps here are pure JS today, but building on the
# target platform avoids any chance of shipping a macOS-built artifact to a Linux host.
#
# Usage:
#   APP_NAME=wsui-license RESOURCE_GROUP=<rg> ./scripts/deploy.sh
#
set -euo pipefail

APP_NAME="${APP_NAME:-wsui-license}"
RESOURCE_GROUP="${RESOURCE_GROUP:-}"
SERVICE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ZIP_PATH="${TMPDIR:-/tmp}/wsui-license-$(date +%s).zip"

if [[ -z "$RESOURCE_GROUP" ]]; then
  echo "RESOURCE_GROUP is required" >&2
  exit 1
fi

echo "==> Packaging $SERVICE_DIR"
cd "$SERVICE_DIR"

# Ship source only. node_modules is excluded deliberately — Oryx installs from package.json on
# the server. Tests and local env files must never reach the deployed app.
zip -r "$ZIP_PATH" \
  package.json \
  src \
  README.md \
  -x '*/node_modules/*' \
  -x 'node_modules/*' \
  -x 'test/*' \
  -x 'scripts/*' \
  -x '.env*' \
  -x '*.key' \
  -x 'signing-key.json' \
  > /dev/null

echo "    $(du -h "$ZIP_PATH" | cut -f1) -> $ZIP_PATH"

echo "==> Ensuring Oryx build is enabled"
az webapp config appsettings set \
  --name "$APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --settings SCM_DO_BUILD_DURING_DEPLOYMENT=true \
  --output none

echo "==> Setting startup command"
az webapp config set \
  --name "$APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --startup-file "node src/server.js" \
  --output none

echo "==> Deploying via Kudu zipdeploy"
az webapp deploy \
  --name "$APP_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --src-path "$ZIP_PATH" \
  --type zip \
  --output none

rm -f "$ZIP_PATH"

echo "==> Deployed. Verify with:"
echo "    BASE_URL=https://${APP_NAME}.azurewebsites.net node scripts/smoke.js"
echo
echo "    Reminder: with NODE_ENV=production the service refuses to start unless"
echo "    AZURE_TABLES_CONNECTION_STRING and ACS_CONNECTION_STRING/ACS_SENDER_ADDRESS are set."
