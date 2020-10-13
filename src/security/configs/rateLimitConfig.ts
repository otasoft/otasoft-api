const quarterOfAnHour: number = 15 * 60 * 1000;
const numberOfRequestsBeforeBan: number = 100;
const returnedMessage: string = 'Too many requests sent from this IP Address';

export const rateLimitConfigObject = {
  windowMs: quarterOfAnHour,
  max: numberOfRequestsBeforeBan,
  message: returnedMessage,
};
