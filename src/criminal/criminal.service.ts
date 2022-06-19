import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { criminalDto } from 'src/cases/dto';
import { caseDoc, cases } from 'src/cases/schema/cases.model';
import { criminalDoc, criminals } from 'src/cases/schema/criminals.model';
import { Connection } from 'mongoose'
import { MongoGridFS } from 'mongo-gridfs'
import { GridFSBucketReadStream } from 'mongodb'

@Injectable()
export class CriminalService {
  private fileModel: MongoGridFS;
  constructor(
    @InjectModel(cases.name) private readonly caseModel: Model<caseDoc>,
    @InjectModel(criminals.name) private readonly criminalModel: Model<criminalDoc>,
    @InjectConnection() private readonly connection: Connection
  ) {
    // this.fileModel = new MongoGridFS(this.connection.db, 'photos');
  }

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
            photourl: dto.photourl,
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

  async uploadPhoto(req, res) {
    if (req.file === undefined) res.send('choose file first');
    else {
      const file1 = `http://localhost:4000/criminal/${req.file.filename}`;
      console.log('uploaded.');

      res.json({
        url: file1,
      });
    }
  }

  // async viewPhoto(req, res) {
  //   let gfs, gridfsBucket;
    
  //   try {
  //     const conn = mongoose.connection;
  //     console.log(req.params.filename);
  //     gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
  //       bucketName: 'photos',
  //     });
  //     // const file = await grid(conn.db, mongoose.mongo).photos.files.findOne({ filename: req.params.filename });
  //     const readStream = gridfsBucket.openDownloadStreamByName(req.params.filename);
  //     readStream.pipe(res);
  //   } catch (err) {
  //     console.log(err);
  //     res.send('file not found');
  //   }
  // }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }

}
