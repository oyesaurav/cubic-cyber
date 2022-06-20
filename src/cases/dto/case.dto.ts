import { IsNotEmpty, IsNumber } from "class-validator";

export class caseDTo {
    @IsNotEmpty()
    caseNo: String;

    section: String;
    solved: Boolean;
    stCode: String;
    severity: Number;

    accused: [{
        name: string,
        age: Number,
        aadhaarNo: Number,
        address: String,
        gender: String
    }]

    victim: [{
        name: String,
        age: Number,
        aadhaarNo: Number,
        address: String,
        gender: String
    }];

    category: String;
    latitude: String;
    longitude: String;
}

export class stationCasesDto {
    @IsNotEmpty()
    stCode: String;
}

export class caseInfoDto {
    @IsNotEmpty()
    caseNo: String;
}