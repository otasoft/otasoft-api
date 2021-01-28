import { NextFunction, Request, Response } from 'express';

// This array should be filled with all routes that will be processing HTML forms
//(i.e. creating new content, changing password)
const includedRoutes = ['change-user-password'];

/**
 * A middleware wrapper for CSRF (csurf) middleware.
 * Checks if a current route should be validated with CSRF Token or handled normally.
 * Uses `includedRoutes` array to check the routes
 */
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
