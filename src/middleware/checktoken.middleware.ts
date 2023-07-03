import { Injectable, NestMiddleware, HttpException, HttpStatus, CanActivate } from '@nestjs/common';
import { Request, Response, NextFunction} from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class checkToken implements NestMiddleware{
    constructor( private readonly jwt: JwtService){}
    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies.token;
        if(!token)
            throw new HttpException('Unauthorized. No Token', HttpStatus.UNAUTHORIZED);
        const User = await this.jwt.verify(token);
        next();
    }
}

// export class errPath implements NestMiddleware{
//     async use(req: Request, res: Response, next: NextFunction) {
//         res.status(HttpStatus.NOT_FOUND).json({status: 'Error', message: 'Not Path'});
//     }
// }


