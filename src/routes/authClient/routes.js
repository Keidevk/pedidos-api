import { Auth } from "./services.js";

const AuthRoutes = async (fastify) => {
    const service = new Auth(fastify)

  fastify.post('/', async (request, reply) => {
    return service.createNewSection(request.body).then(res=>{
      reply.code(res.code).send(res)
    })
});
}

export default AuthRoutes