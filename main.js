import fastify from 'fastify';
// import authPlugin from './src/plugins/auth.js';
import registerRoutes from './src/routes/registerClient/routes.js';
import AuthRoutes from './src/routes/authClient/routes.js';
import registerShops from './src/routes/registerShop/routes.js';

import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import registerProduct from './src/routes/registerProduct/routes.js';

const app = fastify({ logger: true });

// Registra plugins globales
// app.register(authPlugin); // Autenticación JWT
await app.register(cors, {
  origin: 'http://localhost:8081', 
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})
app.register(cookie, {
  secret: process.env.COOKIE, 
  parseOptions: {}     
})

// Registra rutas
app.register(registerRoutes, { prefix: '/api/client' });
app.register(AuthRoutes, {prefix:'/api/auth'})
app.register(registerShops, {prefix:'/api/shop'})
app.register(registerProduct,{prefix:'/api/product'})
// Inicia el servidor
const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Servidor corriendo en http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();