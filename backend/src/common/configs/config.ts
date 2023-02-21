import type { Config } from './config.interface';

const config: Config = {
  //nest: {
  //  port: //() => parseInt(process.env.PORT || '', 10),
  //},
  logging: {
    enabled: true,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Cactus FTW',
    description: 'The cactus API description',
    version: '1.0',
    path: 'api',
  },
  security: {
    expiresIn: '60m',
    refreshIn: '7d',
    //accessTokenSecret: () => process.env.ACCESS_TOKEN_SECRET || '',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
