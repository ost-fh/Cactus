export interface Config {
  //nest: NestConfig;
  logging: LoggingConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  security: SecurityConfig;
}

/*
export interface NestConfig {
  port: number;
}
*/

export interface LoggingConfig {
  enabled: boolean;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

/*
  export interface GraphqlConfig {
    playgroundEnabled: boolean;
    debug: boolean;
    schemaDestination: string;
    sortSchema: boolean;
  }
  */

export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  //accessTokenSecret: string;
  bcryptSaltOrRound: string | number;
}
