declare const module: any

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { CONNECT_DB } from 'src/config/mongodb'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  await CONNECT_DB()

  await app.listen(3002)
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
