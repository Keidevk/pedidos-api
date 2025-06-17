import { Auth } from "./services.js";

const AuthRoutes = async (fastify) => {
    const service = new Auth(fastify)

    fastify.post('/', async (request, reply) => {
  const res = await service.createNewSection(request.body);
  
  if(!res) return reply.code(404).send({message: "Client not found"});

  return { 
    message: 'logged', 
    code: 200,
    token: 'true' 
  }
});
}

export default AuthRoutes