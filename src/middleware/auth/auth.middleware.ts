import { Injectable, NestMiddleware, UnauthorizedException, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthMessages, JWTConstants, LogMessages } from '../../common/messages/auth-messages';

// Extended Request interface for better TypeScript support
export interface AuthenticatedRequest extends Request {
  userId?: string;
  user?: any; // Consider adding more user context if needed
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private jwtService: JwtService) {}

  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.header(JWTConstants.TOKEN_HEADER);
    
    this.logger.debug(`${LogMessages.AUTH_METHOD_PATH}${req.method} ${req.path}`);

    if (!token) {
      this.logger.warn(`${LogMessages.AUTH_TOKEN_MISSING}${req.method} ${req.path}`);
      throw new UnauthorizedException(AuthMessages.TOKEN_MISSING);
    }

    try {
      const decoded = this.jwtService.verify(token);
      
      if (!decoded || !decoded.userId) {
        this.logger.warn('Token missing userId', { token: token.substring(0, 20) + '...' });
        throw new UnauthorizedException(AuthMessages.TOKEN_INVALID_USERID);
      }

      req.userId = decoded.userId;
      // Optional: Add full user object if needed
      req.user = decoded;
      
      this.logger.debug(`${AuthMessages.USER_AUTHENTICATED}${decoded.userId}`);
      next();
    } catch (err) {
      this.handleJwtError(err);
    }
  }

  private handleJwtError(err: any): never {
    this.logger.error(`${LogMessages.JWT_VERIFY_ERROR} ${err.message}`, err.stack);

    if (err.name === 'TokenExpiredError') {
      throw new UnauthorizedException(AuthMessages.TOKEN_EXPIRED);
    } else if (err.name === 'JsonWebTokenError') {
      throw new UnauthorizedException(AuthMessages.TOKEN_INVALID);
    } else if (err.name === 'NotBeforeError') {
      throw new UnauthorizedException('Accès refusé : Token pas encore valide');
    }

    throw new UnauthorizedException(AuthMessages.AUTH_ERROR);
  }
}