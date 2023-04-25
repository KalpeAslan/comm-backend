import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import {useContainer} from "class-validator";
import {CommonModule} from "./common/common.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())
  // useContainer(app.select(AppModule))
  await app.listen(8000);
}
bootstrap();
