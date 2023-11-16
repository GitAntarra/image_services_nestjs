import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Galeries } from 'src/entities/galeries.entity';
import { Users } from 'src/entities/users.entity';

export const ConfigDatabase = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT')),
    username: configService.get<string>('DB_USER'),
    password: `${configService.get<string>('DB_PASS')}`,
    database: configService.get<string>('DB_NAME'),
    entities: [...entities(configService.get<boolean>('DB_SYNC'))],
    synchronize: configService.get<boolean>('DB_SYNC'),
    autoLoadEntities: false,
  }),
});

const entities = (sync: boolean) => {
  const databaseMigration = [Users, Galeries];

  const databaseExisting = [];

  if (sync) {
    return [...databaseMigration];
  } else {
    return [...databaseMigration, ...databaseExisting];
  }
};
