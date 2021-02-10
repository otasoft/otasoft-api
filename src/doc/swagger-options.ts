import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Otasoft API')
  .setDescription(
    'An API for microservice booking engine for Online Travel Agencies',
  )
  .setVersion(process.env.npm_package_version)
  .build();
