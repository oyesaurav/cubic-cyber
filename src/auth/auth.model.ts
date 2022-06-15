import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PoliceStation = pstation & Document;
@Schema()
export class pstation {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;
  
  @Prop({ required: true })
  password: string;
    
  @Prop({ required: true })
  phone: number;
    
  @Prop()  
  state: String;

  @Prop()  
  dist: String;
  
  @Prop()
  block: String;
  
  @Prop()
  pin: Number;
  
  @Prop()
  stCode: String;
  
  @Prop()
  head: String
}

export const PStModel = SchemaFactory.createForClass(pstation);
