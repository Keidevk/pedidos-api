import { RegisterProduct } from "./services.js";

const registerProduct = async (fastify) => {
    const service = new RegisterProduct(fastify);

    fastify.post('/createcategory',
        async(request, reply) => {
            const category = request.body
            return service.createCategory(category).then(res=>{
                reply.code(res.code).send(res.message);
            })
        }
    )

    fastify.get('/getcategory',
        async (request,reply) => {
            return service.getAllCategory().then(res=>{
                reply.code(res.code).send(res.data);
            })
        }
    )

    fastify.post('/register',
        async (request,reply) => {
            const product = request.body
            return service.createProduct(product).then(res=>{
                reply.code(res.code).send(res.message)
            })
        }
    )
    fastify.get('/getproducts',
        async (request,reply) => {
            return service.getProducts().then(res=>{
                reply.code(res.code).send(res.data)
            })
        }
    )
    fastify.get('/getproducts/:id',
        async (request,reply) => {
            const id = request.params.id
            return service.getProductsByShopId(id).then(res=>{
                reply.code(res.code).send(res.data)
            })
        }
    )
    fastify.get('/getproduct/:id',
        async (request,reply) => {
            const id = request.params.id
            return service.getProductById(id).then(res=>{
                reply.code(res.code).send(res.data)
            })
        }
    )
    fastify.get('/getproductsbycategory/:category',
        async (request,reply) => {
            const category = request.params.category
            return service.getProductByCategory(category).then(res=>{
                reply.code(res.code).send(res.data)
            })
        }
    )
    fastify.post('/preorder/',
        async (request,reply) => {
            const filterData = request.body
            return service.getProductsByShopIdAndProductsId(filterData).then(res=>{
                reply.code(200).send(res)
            })
        })
    
}

export default registerProduct