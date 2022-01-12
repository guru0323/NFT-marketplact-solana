## Setup

Switch to the dev branch:

`git checkout dev`

Initialize the environment by creating a conda environment:

`conda env create -f environment.yaml`

## Installation

Be sure to be running Node v14.17.6 and yarn version 1.22.10.

Copy env file:

`cp ./app/packages/web/.env.sample ./app/packages/web/.env`

Build deployment:

`cd ./app && ./deploy-web.sh`

Bootstrap:

`yarn bootstrap`

Run development deployment:

`yarn start`

Or run testing deployment:

`yarn deploy:test && yarn start:prod`

Or run production deployment:

`yarn deploy && yarn start:prod`

You may have to rebuild your package more than one time to secure a
running environment.


## Reset

The map files generated by the 'deploy-web.sh' script cant be remove with:
`./reset.sh`

## Docker

Select which development environment to run (for SOL_NET choose sample or dev, test, main-beta once you've made the env files):

`conda env config vars set SOL_NET="sample" && conda activate nft-marketplace`

Set the env file location:

`conda env config vars set ENV_FILE="./app/packages/web/.env.${SOL_NET}" && conda activate nft-marketplace`

or if you're not using conda:

`export SOL_NET="sample" && export ENV_FILE="./app/packages/web/.env.${SOL_NET}`

Start a docker container by running:

`sudo --preserve-env docker-compose --env-file ${ENV_FILE} up -d`

Changes to the Docker file requires rebuilding:

`sudo --preserve-env docker-compose --env-file ${ENV_FILE} -v && sudo --preserve-env docker-compose --env-file ${ENV_FILE} build --no-cache && sudo --preserve-env docker-compose --env-file ${ENV_FILE} up -d`

You may need to clear out your docker cache periodically to save disk space (This will delete all your docker volumes and images, be careful!):

`sudo --preserve-env docker-compose --env-file ${ENV_FILE} down -v && sudo docker system prune -a`

To force a rebuild on changes using the build cache:
`sudo --preserve-env docker-compose --env-file ${ENV_FILE} up -d --build --force-recreate`

## Known Issues

### Can't find CSS files in common

Common currently uses a less library to compile down less files into css in both the src directory for the TS server
in vscode to pick up and in the dist folder for importers like lending and proposal projects to pick up. If you do not see these files appear when running the `npm start lending` or other commands, and you see missing CSS errors,
you likely did not install the packages for common correctly. Try running:

`lerna exec npm install --scope @oyster/common` to specifically install packages for common.

Then, test that css transpiling is working:

`lerna exec npm watch-css-src --scope @oyster/common` and verify css files appear next to their less counterparts in src.

### Can't run git commit
This is an issue with husky interfering with git. Confirm there's nothing important in hooks (shouldn't be) and run:

`rm -rf .git/hooks`

Ref:
- https://github.com/typicode/husky/issues/881

## ⚠️ Warning

Any content produced by Solana, or developer resources that Solana provides, are for educational and inspiration purposes only. Solana does not encourage, induce or sanction the deployment of any such applications in violation of applicable laws or regulations.

