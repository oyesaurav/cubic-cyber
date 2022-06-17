import { Body, Controller, Post, Res} from '@nestjs/common';
import { CasesService } from './cases.service';
import { caseDTo, criminalDto } from './dto';
import { Response } from 'express';

@Controller('case')
export class CasesController {
    constructor(private caseService: CasesService) { }

    @Post('register')
    caseRegister(@Res({ passthrough: true }) res: Response, @Body() dto : caseDTo) {
        return this.caseService.caseRegister(dto , res)
    }

    
}
