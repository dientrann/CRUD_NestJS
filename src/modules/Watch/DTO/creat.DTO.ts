import { watchDTO } from "./watch.DTO";
import { IsString, Length, IsInt} from 'class-validator';

export class CreateWatchDTO extends watchDTO {

    @IsString()
    @Length(2,50)
    name: string;

    @IsString()
    image: string;

    @IsString()
    @Length(2,225)
    describe: string;

    @IsInt()
    price: number;

}