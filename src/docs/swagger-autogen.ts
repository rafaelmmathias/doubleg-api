import swaggerAutogen from 'swagger-autogen'
import path from 'path'
const swagger = swaggerAutogen()


const outputFile = path.resolve('src/docs/swagger.json')
const routes = [path.resolve('src/routes/file.routes.ts')]



const doc = {
  info: {
    title: 'File Management API',
    description: 'API para gerenciamento de arquivos com Prisma',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  basePath: '/api',
  schemes: ['http', 'https'],
  tags: [
    {
      name: 'Files',
      description: 'Operações com arquivos'
    }
  ]
}
async function generate() {
  await swagger(outputFile, routes, doc)
  console.log(`✅ Documentação Swagger gerada em ${outputFile}`)
}

generate()
