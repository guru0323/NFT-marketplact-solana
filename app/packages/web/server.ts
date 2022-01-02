import { createServer } from 'http';
import { parse } from 'url';
import fs from 'fs';
import next from 'next';
import getConfig from 'next/config';


let nextConfig = getConfig();
const serverRuntimeConfig = nextConfig.serverRuntimeConfig;

let port = parseInt(serverRuntimeConfig.port || '3000', 10);
const production = serverRuntimeConfig.nodeEnv === 'production';
const dev = !production;
const app = next({ dev });
const handle = app.getRequestHandler();

if (production) {
  port = 3000;
}

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(port);

  if (production) {
    fs.writeFileSync('/tmp/app-initialized', '');
  }

  // tslint:disable-next-line:no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : serverRuntimeConfig.nodeEnv
    }`,
  );
});
