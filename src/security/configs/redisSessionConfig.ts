import * as connectRedis from 'connect-redis';
import * as session from 'express-session';
import * as redis from 'redis';

const redisStore = connectRedis(session);
const RedisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
RedisClient.auth(process.env.REDIS_PASSWORD);

const redisSessionConfig = {
  store: new redisStore({ client: RedisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false, // will default to false in near future: https://github.com/expressjs/session#resave
  saveUninitialized: false, // will default to false in near future: https://github.com/expressjs/session#saveuninitialized
  rolling: true, // keep session alive
  cookie: {
    maxAge: 30 * 60 * 1000, // session expires in 1hr, refreshed by `rolling: true` option.
    httpOnly: true, // so that cookie can't be accessed via client-side script
  },
};

export const createRedisSession = () => {
  return session(redisSessionConfig);
};
