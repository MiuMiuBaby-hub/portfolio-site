import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const version = pkg.version;
const gitCommit = execSync('git rev-parse --short HEAD').toString().trim();

function versionJsonPlugin(ver: string, commit: string): Plugin {
  const makeJson = () =>
    JSON.stringify(
      {
        version: ver,
        gitCommit: commit,
        buildDate: new Date().toISOString(),
      },
      null,
      2,
    );

  return {
    name: 'version-json',
    configureServer(server) {
      server.middlewares.use('/portfolio-site/version.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-cache');
        res.end(makeJson());
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: makeJson(),
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), versionJsonPlugin(version, gitCommit)],
  base: '/portfolio-site/',
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(version),
    __GIT_COMMIT__: JSON.stringify(gitCommit),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
});
