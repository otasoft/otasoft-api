import { NextFunction, Request, Response } from 'express';

// This array should be filled with all routes that will be processing HTML forms
//(i.e. creating new content, changing password)
const includedRoutes = ['change-user-password'];

export const csrfMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  csrf,
) => {
  const includedRoute = includedRoutes.find((route) => req.url.includes(route));

  if (!includedRoute) return next();

  csrf(req, res, next);
};
