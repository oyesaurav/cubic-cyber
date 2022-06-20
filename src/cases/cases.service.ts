import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { caseDTo, caseInfoDto, stationCasesDto } from './dto';
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
          const accusedAadhaars = [];
          await Promise.all(
            dto.accused.map(async (criminal) => {
              accusedAadhaars.push(criminal.aadhaarNo);
              await this.criminalModel
                .findOne({ aadhaarNo: criminal.aadhaarNo })
                .exec()
                .then(async (saved) => {
                  if (saved) {
                    await this.criminalModel.updateOne(
                      { aadhaarNo: saved.aadhaarNo },
                      {
                        $set: { age: criminal.age },
                        $push: {
                          address: criminal.address,
                          cases: { caseNo: dto.caseNo },
                        },
                      },
                    );
                  } else {
                    const newCriminal = new this.criminalModel({
                      aadhaarNo: criminal.aadhaarNo,
                      name: criminal.name,
                      age: criminal.age,
                      address: criminal.address,
                      cases: [
                        {
                          caseNo: dto.caseNo,
                        },
                      ],
                    });
                    await newCriminal
                      .save()
                      .then((result) => {
                        console.log(result);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }),
          );

          const newCase = new this.caseModel({
            caseNo: dto.caseNo,
            section: dto.section,
            date: new Date(),
            solved: dto.solved,
            stCode: dto.stCode,
            severity: dto.severity,
            accusedAadhaarNo: accusedAadhaars,
            victim: dto.victim,
            category: dto.category,
          });
          await newCase
            .save()
            .then(async (result) => {
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

  async monthlycases(dto: stationCasesDto, res) {
    await this.caseModel
      .find({ stCode: dto.stCode })
      .exec()
      .then(async (stCases) => {
        if (!stCases) {
          res.status(409).json({
            message: 'No registered cases',
          });
        } else {
          let arr = new Array(12);
          for (let i = 0; i < 12; ++i) arr[i] = 0;
          await Promise.all(
            stCases.map((eachcase) => {
              arr[eachcase.date.getMonth()]++;
            }),
          );
          res.status(200).json({
            monthCases: arr,
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

  async categoryWise(dto: stationCasesDto, res) {
    await this.caseModel
      .find({ stCode: dto.stCode })
      .exec()
      .then(async (stCases) => {
        if (!stCases) {
          res.status(409).json({
            message: 'No registered cases',
          });
        } else {
          var map = new Map();
          await Promise.all(
            stCases.map((eachcase) => {
              if (map.has(eachcase.category)) {
                map.set(eachcase.category, map.get(eachcase.category) + 1);
              } else {
                map.set(eachcase.category, 1);
              }
            }),
          );
          const arr = []
          for (const [key,value] of map)
          {
            arr.push({
              key,
              value
            })
          }
          console.log(arr);
          res.status(200).json({
            categoryCases: arr
          })         
        }
      })
      .catch((err) => {
        console.log(err);

        res.status(500).json({
          message: 'Db error, please try again',
        });
      });
  }

  async caseInfo(dto: caseInfoDto, res) {
    await this.caseModel.findOne({ caseNo: dto.caseNo })
      .exec()
      .then(async savedcase => {
        if (!savedcase) {
        res.status(409).send("case not found")
        } else {
          const criminals = []
          await Promise.all(savedcase.accusedAadhaarNo.map(async criminalAadhaar => {
            await this.criminalModel.findOne({ aadhaarNo: criminalAadhaar })
              .exec()
              .then(criminalInfo => {
              criminals.push(criminalInfo)
            })
          }))

          res.status(200).json({
            caseInfo: savedcase,
            criminalsInfo: criminals
          })
      }
      })
      .catch(err => {
        console.log(err);

        res.status(500).json({
          message: 'Db error, please try again',
        });
    })
  }
}
