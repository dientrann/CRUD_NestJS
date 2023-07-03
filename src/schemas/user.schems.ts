import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { now } from 'mongoose';


export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop({default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;
};
export const UserSchema = SchemaFactory.createForClass(User);