import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApartmentModule } from './modules/apartment/apartment.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'uploads'), // Path to your uploads directory
			serveRoot: '/uploads', // URL prefix for serving static files
		}),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ApartmentModule,
		PrismaModule,
	],
	controllers: [],
	providers: [PrismaService],
})
export class AppModule {}
