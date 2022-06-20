import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto, loginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PoliceStation, pstation } from './auth.model';
import * as jwt from 'jsonwebtoken';

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
      .findOne({ stCode : dto.stCode })
      .exec()
      .then(async (pst) => {
        if (!pst) {
          res.status(400).json({
            message: 'Register first',
          });
        } else {
          const correctPass = await bcrypt.compare(dto.password, pst.password);
          if (!correctPass) {
            res.status(403).json({
              message: 'Incorrect password',
            });
          } else {
            const accessToken = jwt.sign(
              {
                email: pst.email,
                name: pst.name,
                phone: pst.phone,
                stCode: pst.stCode,
              },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: '1d',
              },
            );
            const refreshToken = jwt.sign(
              {
                email: pst.email,
                name: pst.name,
                phone: pst.phone,
                stCode: pst.stCode,
              },
              process.env.REFRESH_TOKEN_SECRET,
            );
            // res.set('Authorization', 'Bearer ' + accessToken);
            
            res.cookie('AT', accessToken);
            res.cookie('RT', refreshToken);
            
            res.status(200).json({
              data: pst,
            });
          }
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  }

  checkAuth(req, res) {
    res.status(200).send(true)
  }
}
