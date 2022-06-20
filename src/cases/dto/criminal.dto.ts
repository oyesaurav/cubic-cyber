import {IsNotEmpty, IsNumber } from "class-validator";

export class criminalDto {
    @IsNumber()
    @IsNotEmpty()
    aadhaarNo: Number;

    name: String;
    age: Number;
    address: String;
    gender: String;
    cases: [{
        caseNo: String
    }]
}