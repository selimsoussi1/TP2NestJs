import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request & { userId?: any }, res: Response, next: NextFunction) {
    const token = req.header('auth-user');
    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      const decoded = this.jwtService.verify(token);
      if (!decoded || !decoded.userId) {
        throw new UnauthorizedException('Token invalid or missing userId');
      }
      req.userId = decoded.userId;
      next();
    } catch (err) {
      console.error('Token verification error:', err);
      throw new UnauthorizedException('Token invalid');
    }
  }
}