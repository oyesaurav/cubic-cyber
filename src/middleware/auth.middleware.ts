import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.cookies.AT;
    const refreshToken = req.cookies.RT;

  if (accessToken === null) return res.sendStatus(401);

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, user) => {
          if (error) return res.status(400).send('Auth failed');
          const newAccessToken = jwt.sign(
            {
              email: user.email,
              name: user.name,
              phone: user.phone,
              stCode: user.stCode,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: '1d',
            },
          );
          res.cookie('AT', newAccessToken);
          req.user = user;
          next();
        },
      );
    } else {
      req.user = user;
      next();
    }
  });
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: any
  } 
}
