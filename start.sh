#!/bin/bash

echo 'Executing deployment script...'
bash ./deploy-web.sh

echo 'Bootstraping yarn...'
yarn bootstrap

echo 'Starting server...'
yarn start

