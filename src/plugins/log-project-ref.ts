import fastifyPlugin from 'fastify-plugin'

export default fastifyPlugin(async (fastify) => {
  fastify.addHook('onRequest', async (request, reply) => {
    reply.log = request.log = request.log.child({ projectRef: request.projectRef })
  })
})
