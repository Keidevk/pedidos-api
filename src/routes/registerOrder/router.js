import { registerOrder } from "./services.js";

const registerOrders = async (fastify) => {
    const service = new registerOrder(fastify)

    fastify.post('/create',
        async (request,reply)=>{
            const body = request.body;
            return await service.createOrder(body).then(res=>{
                reply.code(res.code).send(res)
            })
        })
    fastify.get('/:id',
        async (request,reply)=>{
            const id = request.params.id
            return await service.getOrderByUserId(id).then(res=>{
                reply.code(res.code).send(res)
            })

        }
    )

    fastify.get('/details/:uuid',
        async(request,reply) => {
            const id = request.params.uuid
            console.log(id)
            return await service.getDetailsOrderByOrderUuid(id).then(res=>{
                reply.code(res.code).send(res)
            })
        }
    )

    fastify.put('/update',
        async (request,reply) => {
            const body = request.body;
            return await service.updateOrderStatusByOrderUuid(body).then(res=>{
                reply.code(res.code).send(res)
            })
        }
    )
}

export default registerOrders