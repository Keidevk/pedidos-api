import { registerShop } from "./services.js";

const registerShops = async (fastify) => {
    const service = new registerShop(fastify)

    fastify.post('/register',
        async (request,reply) => {
            service.createShop(request.body)
            reply.send({message:"Shop created",code:201}).code(201)
        }
    )
    fastify.get('/',
        async (request,reply) => {
            const res = await service.getTenShops()
            reply.send(res).code(200)
        }
    )
    fastify.get('/:id',
        async (request, reply) => {
            const res = await service.getById(request.params.id)
            reply.send(res).code(200)
        }
    )
}

export default registerShops;