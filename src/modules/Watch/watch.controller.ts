import {
  HttpStatus,
  HttpException,
  Controller,
  Get,
  Res,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CreateWatchDTO } from './DTO/creat.DTO';
import { WatchService } from './watch.service';
import { UpdateWatchDTO } from './DTO/update.DTO';
import { Watch } from 'src/schemas/watch.schema';

@Controller('watchs')
export class WatchController {
  constructor(private readonly WatchService: WatchService) {}

  @Get('search')
  async searchWatch(@Res() res, @Query('name') name: string) {
    const watchs = await this.WatchService.searchWatch(name);

    if (watchs.length == 0)
      res.status(HttpStatus.OK).json({ message: 'Not found watch' });
    return res.status(HttpStatus.OK).json({ watchs });
  }

  @Get()
  async pageWatch(@Res() res, @Query('page') page: number) {
    const intPage = page || 1;
    const dataPage = await this.WatchService.pageWatch(intPage);
    res.status(HttpStatus.OK).json({ dataPage, message: 'Page: ' + page });
  }

  @Post('add')
  async createWatch(@Res() res, @Body() watch: CreateWatchDTO) {
    const newWatch = await this.WatchService.createWatch(watch);
    if (!newWatch) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return res.status(HttpStatus.CREATED).json({ message: 'Create Succeed' });
  }

  @Put('edit/:id')
  async editWatch(
    @Res() res,
    @Body() watch: UpdateWatchDTO,
    @Param('id') id: string,
  ) {
    const editWatch = await this.WatchService.editWatch(id, watch);
    if (!editWatch) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return res.status(HttpStatus.CREATED).json({ message: 'Update Succeed' });
  }

  @Delete('delete/:id')
  async delWatch(@Res() res, @Param('id') id: string) {
    const result = await this.WatchService.delWatch(id);
    if (!result) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return res.status(HttpStatus.CREATED).json({ message: 'Delete Succeed' });
  }
}
