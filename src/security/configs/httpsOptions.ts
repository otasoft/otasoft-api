import * as fs from 'fs';

export const httpsOptions = {
  key: fs.readFileSync('./src/security/secrets/private-key.pem', 'utf-8'),
  cert: fs.readFileSync('./src/security/secrets/public-cert.pem', 'utf-8'),
};
