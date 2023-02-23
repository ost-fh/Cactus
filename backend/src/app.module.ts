import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'src/common/configs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ComponentsModule } from './components/components.module';
import { LibraryModule } from './libraries/libraries.module';
import { TestsModule } from './tests/tests.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ComponentsModule,
    LibraryModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<EnvironmentVariables>('DATABASE_URL', {
          infer: true,
        }),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      ignoreEnvFile: false,
      envFilePath: ['.env.local', '.env'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      serveRoot: '/media',
    }),
    TestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
