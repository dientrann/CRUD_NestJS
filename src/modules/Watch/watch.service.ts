import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model, now } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Watch, WatchDocument } from 'src/schemas/watch.schema';
import { UpdateWatchDTO } from './DTO/update.DTO';
import { CreateWatchDTO } from './DTO/creat.DTO';
import { ConfigService } from '@nestjs/config';
import { WatchModule } from './watch.module';

@Injectable()
export class WatchService {
  constructor(
    @InjectModel(Watch.name) private readonly WatchModel: Model<WatchDocument>,
    private readonly configService: ConfigService,
  ) {}

  async pageWatch(page: number) {
    const sizePage = this.configService.get<number>('app.SIZEPAGE');
    const dataPage = await this.WatchModel.find({})
      .skip(page * sizePage - sizePage)
      .limit(sizePage);
    if (dataPage.length == 0)
      throw new HttpException(
        'Exceeded the maximum number of pages',
        HttpStatus.BAD_REQUEST,
      );
    return dataPage;
  }

  async createWatch(watch: CreateWatchDTO): Promise<Watch> {
    const check = await this.WatchModel.findOne({ name: watch.name });
    if (check)
      throw new HttpException(
        'The Watch already exists in the database',
        HttpStatus.CONFLICT,
      );
    const newWatch = new this.WatchModel(watch);
    return newWatch.save();
  }

  async editWatch(id: string, watch: UpdateWatchDTO): Promise<Watch> {
    const check = await this.WatchModel.findById(id);
    if (!check) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const { name, image, describe, price } = check;
    const newdata: Watch = {
      name: watch.name || name,
      image: watch.image || image,
      describe: watch.describe || describe,
      price: watch.price || price,
      updatedAt: now(),
    };

    const editWatch = await this.WatchModel.findByIdAndUpdate(id, newdata);
    return editWatch;
  }

  async delWatch(id: string): Promise<boolean> {
    const check = await this.WatchModel.findById(id);
    if (!check) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    const delWatch = await this.WatchModel.findByIdAndRemove(id);
    return true;
  }

  async searchWatch(name: string) {
    const findName = new RegExp(name);
    const watchs = await this.WatchModel.find({ name: findName });

    if (!watchs) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return watchs;
  }
}
