import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import argon from 'argon2'

@Injectable()
export class AuthService {

    async signup(dto: AuthDto) {
        
        return 'hello'
    }

    signin() {
        
    }
}
