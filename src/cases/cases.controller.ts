import { Body, Controller, Get, Post, Res} from '@nestjs/common';
import { CasesService } from './cases.service';
import { caseDTo, criminalDto,stationCasesDto,caseInfoDto } from './dto';
import { Response } from 'express';

@Controller('case')
export class CasesController {
    constructor(private caseService: CasesService) { }

    @Post('register')
    caseRegister(@Res({ passthrough: true }) res: Response, @Body() dto : caseDTo) {
        return this.caseService.caseRegister(dto , res)
    }

    @Post('monthcases')
    monthlyCases(@Res({ passthrough: true }) res: Response, @Body() dto: stationCasesDto) {
        return this.caseService.monthlycases(dto,res)
    }

    @Post('categorycases')
    categoryWise(@Res({ passthrough: true }) res: Response, @Body() dto: stationCasesDto) {
        return this.caseService.categoryWise(dto,res)
    }

    @Post('get')
    getCaseInfo(@Res({ passthrough: true }) res: Response, @Body() dto: caseInfoDto) {
        return this.caseService.caseInfo(dto,res)
    }

}
