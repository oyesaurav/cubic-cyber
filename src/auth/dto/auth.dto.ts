import { IsEmail, IsNotEmpty, IsNumber } from "class-validator"

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    phone: Number;

    name: string;
    pstid: string; 
    password: string;
}