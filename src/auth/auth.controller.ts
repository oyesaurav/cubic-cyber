import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    
    @Post('signup')
    signup(@Body() dto : AuthDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.signup(dto, res )
    }

    @Get('signin')
    signin() {
        return this.authService.signin()
    }
}
