import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  UseGuards,
  Param,
  Res,
} from '@nestjs/common';
import { ResponseDto } from 'src/utils/response/response.dto';
import { Users } from 'src/entities/users.entity';
import { ApiTags, ApiConsumes, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { GaleryService } from './galery.service';
import { Galeries } from 'src/entities/galeries.entity';
import { IsLogin } from '../auth/isLogin.decorator';
import { CreateGaleryDto } from 'src/dto/galeries/createGalery.dto';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/upload.utils';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { AuthGuard } from '@nestjs/passport';

@Controller('galery')
@ApiTags('galery')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class GaleryController {
  constructor(private readonly galeryService: GaleryService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async create(
    @Body() createGaleryDto: CreateGaleryDto,
    @IsLogin() isLogin: Users,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5000000 })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<ResponseDto<string, Galeries>> {
    return await this.galeryService.create(createGaleryDto, isLogin, file);
  }

  @Get()
  async showAll(): Promise<ResponseDto<string, Galeries[]>> {
    return await this.galeryService.showAll();
  }

  @Get('file/:imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createGaleryDto: CreateGaleryDto,
    @IsLogin() isLogin: Users,
  ): Promise<ResponseDto<string, Galeries>> {
    return await this.galeryService.update(id, createGaleryDto, isLogin);
  }

  @Delete(':id')
  async Delete(@Param('id') id: string): Promise<ResponseDto<string, null>> {
    return await this.galeryService.Delete(id);
  }
}
