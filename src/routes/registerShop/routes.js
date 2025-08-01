import { registerShop } from "./services.js";

const registerShops = async (fastify) => {
    const service = new registerShop(fastify)

    fastify.post('/register',
        async (request,reply) => {
            return await service.createShop(request.body).then(res=>{
                reply.code(res.code).send(res.message)
            })
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
    fastify.get('/userid/:id',
        async (request,reply) => {
            const res = await service.getByUserId(request.params.id)
            reply.code(200).send(res)
        }
    )
    fastify.get('/orders/:userId',
        async (request,reply) => {
            const {userId} = request.params
            return await service.getDeliveryOnRoad(parseInt(userId)).then(res=>{
                reply.code(res.code).send(res)
            })
        }
    )
}

export default registerShops;