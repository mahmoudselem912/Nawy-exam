import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import multipart from 'fastify-multipart';
import * as cors from 'cors';

async function bootstrap() {
	const config = new ConfigService();

	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
	app.register(multipart);

	if (config.get('ENABLE_SWAGGER') === 'true') {
		const swaggerConfig = new DocumentBuilder()
			.setTitle('Nawy API')
			.setDescription('Nawy API for Exam.')
			.setVersion('1.0.0')
			.addGlobalParameters()
			.build();

		const document = SwaggerModule.createDocument(app, swaggerConfig);
		SwaggerModule.setup('/7MryyCi5Sd/swagger-docs', app, document, {
			swaggerOptions: {
				docExpansion: 'none',
			},
		});
	}
	app.enableCors({
		origin: '*',
	});
	app.use(
		cors({
			origin: '*',
		}),
	);

	await app.listen(4000);
}
bootstrap();
