import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { criminalDto } from 'src/cases/dto';
import { CriminalService } from './criminal.service';
import { Request, Response } from 'express';

@Controller('criminal')
export class CriminalController {
    constructor(private criminalService: CriminalService) { }

    @Post('new')
    caseRegister(@Res({ passthrough: true }) res: Response, @Body() dto : criminalDto) {
        return this.criminalService.newCriminal(dto,res)
    }

    @Post('photo')
    uploadPhoto(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
        return this.criminalService.uploadPhoto(req,res)
    }

    // @Get(':filename')
    // viewPhoto(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    //     return this.criminalService.viewPhoto(req,res)
    // }

    @Get(':id')
    async getFile(@Param('id') id: string, @Res() res: Response) {     
        const filestream = await this.criminalService.readStream(id)
        return filestream.pipe(res)
    }

}
