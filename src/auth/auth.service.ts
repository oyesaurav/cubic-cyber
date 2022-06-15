import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto, loginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PoliceStation, pstation } from './auth.model';
import { domainToASCII } from 'url';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(pstation.name) private readonly model: Model<PoliceStation>,
  ) {}

  async signup(dto: AuthDto, res) {
    await this.model
      .findOne({ email: dto.email })
      .exec()
      .then(async (pst) => {
        if (pst) {
          res.status(409).json({
            message: 'Email Exists',
          });
        } else {
          const hash = await bcrypt.hash(dto.password, 10);
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
            head: dto.head,
          });
          await newPSt
            .save()
            .then(async (saved) => {
              console.log(saved);
              res.json({
                data: saved,
              });
            })
            .catch((err) => {
              console.log(err);
              res.json({
                message: err,
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: err,
        });
      });
  }

  async signin(dto: loginDto, res) {
    await this.model
      .findOne({ email: dto.email })
      .exec()
      .then(async (pst) => {
          if (!pst) {
              res.status(400).json({
                  message: "Register first"
              })
          } else {
              const correctPass = await bcrypt.compare(dto.password, pst.password)
              if (!correctPass) {
                  res.status(403).json({
                      message: "Incorrect password"
                  })
              } else {
                  res.status(200).json({
                      data : pst
                  })
              }
        }
      })
        .catch(err => {
            res.status(500).json({
              message: err
          })
      })
  }
}
