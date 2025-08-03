import fastify from "fastify";
// import authPlugin from './src/plugins/auth.js';
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from 'path';

import registerRoutes from "./src/routes/registerClient/routes.js";
import AuthRoutes from "./src/routes/authClient/routes.js";
import registerShops from "./src/routes/registerShop/routes.js";
import registerProduct from "./src/routes/registerProduct/routes.js";
import registerStats from "./src/routes/sellerClient/routes.js";
import registerOrders from "./src/routes/registerOrder/router.js";
import registerdelivery from "./src/routes/registerDelivery/routes.js";
import AuthKeys from "./src/routes/sensitiveData/routes.js";
import messageRoutes from "./src/routes/message/routes.js";
// import uploadImages from "./src/routes/uploadImage/router.js";

const app = fastify({ logger: true });

// Registra plugins globales
// app.register(authPlugin); // Autenticación JWT
await app.register(cors, {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
app.register(fastifyStatic,{root:path.join(path.resolve(),'uploads'),prefix:'/uploads'});
app.register(multipart, {
  attachFieldsToBody: false,
  limits: {
    fieldNameSize: 100,
    fieldSize: 1000,
    fields: 10,
    fileSize: 1000000,
    files: 1,
    headerPairs: 2000,
  },
  attachFieldsToBody: true,
});
app.register(cookie, {
  secret: process.env.COOKIE,
  parseOptions: {},
});

// Registra rutas
app.register(registerRoutes, { prefix: "/api/client" });
app.register(AuthRoutes, { prefix: "/api/auth" });
app.register(registerShops, { prefix: "/api/shop" });
app.register(registerProduct, { prefix: "/api/product" });
app.register(registerStats, { prefix: "/api/stats" });
app.register(registerOrders,{prefix:"/api/order"})
app.register(registerdelivery,{prefix:'/api/delivery'})
app.register(AuthKeys,{prefix:'/api/keys/'})
app.register(messageRoutes,{prefix:'api/message'})
// app.register(uploadImages,{prefix:'/api/uploads'})
// Inicia el servidor
const start = async () => {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Servidor corriendo en http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
