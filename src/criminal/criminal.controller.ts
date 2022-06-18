import { Body, Controller, Post, Res } from '@nestjs/common';
import { criminalDto } from 'src/cases/dto';
import { CriminalService } from './criminal.service';
import { Response } from 'express';

@Controller('criminal')
export class CriminalController {
    constructor(private criminalService: CriminalService) { }

    @Post('new')
    caseRegister(@Res({ passthrough: true }) res: Response, @Body() dto : criminalDto) {
        return this.criminalService.newCriminal(dto,res)
    }

}
