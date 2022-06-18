import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { caseDTo } from './dto';
import { caseDoc, cases } from './schema/cases.model';
import { criminalDoc, criminals } from './schema/criminals.model';

@Injectable()
export class CasesService {
  constructor(
    @InjectModel(cases.name) private readonly caseModel: Model<caseDoc>,
    @InjectModel(criminals.name)
    private readonly criminalModel: Model<criminalDoc>,
  ) {}

  async caseRegister(dto: caseDTo, res) {
    await this.caseModel
      .findOne({ caseNo: dto.caseNo })
      .exec()
      .then(async (savedCase) => {
        if (savedCase) {
          res.status(409).json({
            message: 'Case no. already registered',
          });
        } else {
          const newCase = new this.caseModel({
            caseNo: dto.caseNo,
            section: dto.section,
            date: new Date(),
            solved: dto.solved,
            stCode: dto.stCode,
            severity: dto.severity,
            accusedAadhaarNo: dto.accusedAadhaarNo,
            victim: dto.victim,
            category: dto.category,
          });
          await newCase
            .save()
              .then(async (result) => {
                
                  await Promise.all(result.accusedAadhaarNo.map(async (aadhaar) => {
                    await this.criminalModel.updateOne({ aadhaarNo: aadhaar }, {
                     $push: {cases: {caseId : result._id}}
                  })
              })) 
              console.log(result);
              res.status(201).json({
                message: 'case registered',
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                message: "Couldn't save the case",
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
