import * as dotenv from 'dotenv';
import { from } from 'env-var';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
const env = from(process.env, {});

export class ApiServerConfig {
  public static readonly ENV: string = env
    .get('NODE_ENV')
    .default('development')
    .asString();

  public static readonly HOST: string = env
    .get('API_HOST')
    .required()
    .asString();

  public static readonly PORT: number = env
    .get('API_PORT')
    .required()
    .asPortNumber();

  public static readonly ACCESS_TOKEN_SECRET: string = env
    .get('API_ACCESS_TOKEN_SECRET')
    .required()
    .asString();

  public static readonly ACCESS_TOKEN_TTL_IN_MINUTES: number = env
    .get('API_ACCESS_TOKEN_TTL_IN_MINUTES')
    .required()
    .asInt();

  public static readonly ACCESS_TOKEN_HEADER: string = env
    .get('API_ACCESS_TOKEN_HEADER')
    .required()
    .asString();

  public static readonly LOGIN_USERNAME_FIELD: string = env
    .get('API_LOGIN_USERNAME_FIELD')
    .required()
    .asString();

  public static readonly LOGIN_PASSWORD_FIELD: string = env
    .get('API_LOGIN_PASSWORD_FIELD')
    .required()
    .asString();

  public static readonly LOG_ENABLE: boolean = env
    .get('API_LOG_ENABLE')
    .required()
    .asBool();
}
