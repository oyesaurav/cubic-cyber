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

    @Prop()
    address: String;

    @Prop()
    photourl: String;
    
    @Prop()
    cases: [{
        caseId: String
    }]
}

export const criminalModel = SchemaFactory.createForClass(criminals);
