import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber } from "class-validator"

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsMobilePhone()
    @IsNotEmpty()
    phone: number;

    name: string; 
    
    @IsNotEmpty()
    password: string;

    state: string;
    dist: string;
    block: string;

    @IsNumber()
    pin: number;
    
    stCode: string;
    head: string
}

export class loginDto {
    @IsNotEmpty()
    stCode: string;
    
    @IsNotEmpty()
    password: string;
}