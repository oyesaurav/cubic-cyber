import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto, loginDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    
    @Post('signup')
    signup(@Body() dto : AuthDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.signup(dto, res )
    }

    @Post('signin')
    signin(@Body() dto : loginDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.signin(dto, res )
    }

    @Get('check')
    checkToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        return this.authService.checkAuth(req,res)
    }
}
