import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type caseDoc = cases & Document;
@Schema()
export class cases {
    @Prop({ required: true })
    caseNo: String;

    @Prop()
    section: String;

    @Prop()
    date: Date;

    @Prop()
    solved: Boolean;

    @Prop()
    stCode: String;

    @Prop()
    severity: Number;

    @Prop([Number])
    accusedAadhaarNo: [Number];

    @Prop()
    victim: [{
        name: String,
        age: Number,
        aadhaarNo: Number,
        address: String
    }];

    @Prop()
    category: String;
}

export const caseModel = SchemaFactory.createForClass(cases);

