import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { criminalDto } from 'src/cases/dto';
import { caseDoc, cases } from 'src/cases/schema/cases.model';
import { criminalDoc, criminals } from 'src/cases/schema/criminals.model';

@Injectable()
export class CriminalService {
  constructor(
    @InjectModel(cases.name) private readonly caseModel: Model<caseDoc>,
    @InjectModel(criminals.name)
    private readonly criminalModel: Model<criminalDoc>,
  ) {}

  async newCriminal(dto: criminalDto, res) {
    await this.criminalModel
      .findOne({ aadhaarNo: dto.aadhaarNo })
      .exec()
      .then(async (saved) => {
        if (saved) {
          res.status(200).json({
            new: false,
            data: saved,
          });
        } else {
          const newCriminal = new this.criminalModel({
            aadhaarNo: dto.aadhaarNo,
            name: dto.name,
            age: dto.age,
            address: dto.address,
            cases: [],
          });
          await newCriminal
            .save()
            .then((result) => {
              console.log(result);
              res.status(201).json({
                new: true,
                message: 'criminal added',
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                message: "Couldn't add",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: 'Db error, please try again',
        });
      });
  }
}
