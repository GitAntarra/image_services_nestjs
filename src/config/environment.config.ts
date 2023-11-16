import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

export const ConfigEnvironment = ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .default('development'),
    APP_PORT: Joi.number().default(3001).required(),
    DB_HOST: Joi.string().default('localhost').required(),
    DB_PORT: Joi.number().default(3306).required(),
    DB_USER: Joi.string().default('root').required(),
    DB_PASS: Joi.string().default('').required(),
    DB_NAME: Joi.string().required(),
    DB_SYNC: Joi.boolean().default(false).required(),
    JWT_KEY: Joi.string().required(),
    JWT_EXP: Joi.string().required(),
  }),
});
