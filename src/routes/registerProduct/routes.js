import { RegisterProduct } from "./services.js";

const registerProduct = async (fastify) => {
    const service = new RegisterProduct(fastify);

    fastify.post('/register',
        async (request,reply) => {
            const product = request.body
            service.createProduct(product)
            reply.code(201).send('realizado')
        }
    )
    fastify.get('/getproducts',
        async (request,reply) => {
            const response = service.getProducts()
            return response.then(res=>{
                reply.code(200).send(res)
            })
        }
    )
    fastify.get('/getproducts/:id',
        async (request,reply) => {
            const id = request.params.id
            const response = service.getProductsByShopId(parseInt(id))
            return response.then(res=>{
                reply.code(200).send(res)
            })
        }
    )
    fastify.get('/getproduct/:id',
        async (request,reply) => {
            const id = request.params.id
            const response = service.getProductById(parseInt(id))
            return response.then(res=>{
                reply.code(200).send(res)
            })
        }
    )
    
}

export default registerProduct