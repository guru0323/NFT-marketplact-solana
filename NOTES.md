# TODO

- Move `./app/packages/web/src/pages/api` folder to `app/packages/web/src/api` and adjust corresponding routes
- Determine whether checkout will be a page redirect or stay as a modal. Remove/archive the unused method?
- Make use of @stripe/checkout imports as much as possible, if possible, otherwise import relative modules and remove package imports
- Cleanup the root and packages `package.json` files; remove uneccesary modules. Install takes too long.

# BUGS
- Fix empty wallet bug, try buying with SOL with an empty wallet.