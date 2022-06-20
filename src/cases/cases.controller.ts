import { Body, Controller, Get, Post, Res} from '@nestjs/common';
import { CasesService } from './cases.service';
import { caseDTo, criminalDto,stationCasesDto } from './dto';
import { Response } from 'express';

@Controller('case')
export class CasesController {
    constructor(private caseService: CasesService) { }

    @Post('register')
    caseRegister(@Res({ passthrough: true }) res: Response, @Body() dto : caseDTo) {
        return this.caseService.caseRegister(dto , res)
    }

    @Get('monthcases')
    monthlyCases(@Res({ passthrough: true }) res: Response, @Body() dto: stationCasesDto) {
        return this.caseService.monthlycases(dto,res)
    }

    @Get('categorywise')
    categoryWise(@Res({ passthrough: true }) res: Response, @Body() dto: stationCasesDto) {
        return this.caseService.categoryWise(dto,res)
    }
}
