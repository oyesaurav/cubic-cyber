import { Injectable,} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt'
import { PoliceStation, pstation } from './auth.model';


@Injectable()
export class AuthService {
    constructor(@InjectModel(pstation.name) private readonly model: Model<PoliceStation>) {}

    async signup(dto: AuthDto, res) {
        await this.model.findOne({ email: dto.email }).exec()
        .then(async (pst) => {
            if (pst) {
                res.status(409).json({
                    message: "Email Exists",
                })
            } else {
            const hash = await bcrypt.hash(dto.password, 10)
            const newPSt = new this.model({
                name: dto.name,
                email: dto.email,
                password: hash,
                phone: dto.phone,
                state: dto.state,
                dist: dto.dist,
                block: dto.block,
                pin: dto.pin,
                stCode: dto.stCode,
                head: dto.head
            })
            await newPSt.save()
                .then(async (saved) => {
                    console.log(saved)
                    res.json({
                        data: saved
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.json({
                        message: err
                    })
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: err
            })
        })
    }

    signin() {
        
    }
}
