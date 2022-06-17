import { IsNotEmpty, IsNumber } from "class-validator";

export class caseDTo {
    @IsNotEmpty()
    caseNo: String;

    section: String;
    solved: Boolean;
    stCode: String;
    severity: Number;

    @IsNumber()
    accusedAadhaarNo: Number;

    victim: [{
        name: String,
        age: Number,
        aadhaarNo: Number,
        address: String
    }];

    category: String;
}