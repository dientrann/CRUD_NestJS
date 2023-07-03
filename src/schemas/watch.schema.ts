import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { now } from 'mongoose';


export type WatchDocument = Watch & Document;

@Schema()
export class Watch{

    @Prop()
    name: string;

    @Prop()
    image: string;

    @Prop()
    describe: string;

    @Prop()
    price: number;

    @Prop({default: now()})
    createdAt?: Date;

    @Prop({default: now()})
    updatedAt?: Date;

};
export const WatchSchema = SchemaFactory.createForClass(Watch);