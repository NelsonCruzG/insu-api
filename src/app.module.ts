import { Module } from '@nestjs/common';
import { AuthGuard, AuthModule } from './auth';
import { ConfigModule } from '@nestjs/config';
import { databaseOptions, validationSchema } from './config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PoliciesModule } from './policies/policies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    AuthModule,
    UsersModule,
    PoliciesModule,
  ],
  controllers: [],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
