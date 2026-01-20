import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';

export class Swagger {
  private static readonly config = {
    title: 'Tobacco Backend API',
    description: `
      Tobacco Backend API
      **Modules:** Tobacco
    `,
    version: '0.0.1',
    tags: [],
  };

  static apply(app: INestApplication) {
    const documentConfig = new DocumentBuilder()
      .setTitle(this.config.title)
      .setDescription(this.config.description)
      .setVersion(this.config.version)
      // .addBearerAuth(
      //   {
      //     type: 'http',
      //     scheme: 'bearer',
      //     bearerFormat: 'JWT',
      //     description: 'JWT токен из /tobacco/login',
      //     name: 'Authorization',
      //     in: 'header',
      //   },
      //   'bearer', // Security scheme name - must match @ApiBearerAuth('bearer')
      // )
      .addTag('Tobacco', 'Tobacco endpoints')
      .build();

    const document = SwaggerModule.createDocument(app, documentConfig);

    SwaggerModule.setup('api/docs', app, cleanupOpenApiDoc(document), {
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        docExpansion: 'list',
        defaultModelsExpandDepth: 3,
        defaultModelExpandDepth: 3,
      },
      customSiteTitle: 'Tobacco API Documentation',
      customCss: `
        .swagger-ui .topbar { display: none; }
        .swagger-ui .info { margin: 20px 0; }
        .swagger-ui .scheme-container { margin: 20px 0; padding: 20px; background: #fafafa; border-radius: 4px; }
      `,
    });
  }
}
