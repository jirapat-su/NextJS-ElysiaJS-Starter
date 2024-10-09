import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

const app = new Elysia({ prefix: '/api' })
  .use(
    swagger({
      documentation: {
        info: {
          title: 'API Documentation',
          version: '1.0.0',
        },
      },
      scalarConfig: {
        spec: { url: '/api/docs/json' },
        defaultHttpClient: {
          clientKey: 'fetch',
          targetKey: 'javascript',
        },
      },
      path: '/docs',
      exclude: ['/api/docs', '/api/docs/json'],
    })
  )
  .get('/', () => 'Hello Elysia!', {
    detail: {
      tags: ['Default'],
    },
  });

export { app };
