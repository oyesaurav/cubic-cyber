import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type criminalDoc = criminals & Document;
@Schema()
export class criminals {
    @Prop({ required: true })
    aadhaarNo: Number;

    @Prop()
    name: String;

    @Prop()
    age: Number;

    @Prop([String])
    address: [String];

    @Prop()
    photourl: String;
    
    @Prop()
    cases: [{
        caseNo: String
    }]
}

export const criminalModel = SchemaFactory.createForClass(criminals);
