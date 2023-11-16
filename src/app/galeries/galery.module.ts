import { Module } from '@nestjs/common';
import { GaleryController } from './galery.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GaleryService } from './galery.service';
import { Galeries } from 'src/entities/galeries.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    TypeOrmModule.forFeature([Galeries]),
    AuthModule,
  ],
  controllers: [GaleryController],
  providers: [GaleryService],
})
export class GaleryModule {}
