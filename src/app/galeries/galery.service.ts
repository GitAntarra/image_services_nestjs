import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/utils/response/response.dto';
import { Repository } from 'typeorm';
import { Galeries } from 'src/entities/galeries.entity';
import { CreateGaleryDto } from 'src/dto/galeries/createGalery.dto';
import { Users } from 'src/entities/users.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GaleryService {
  constructor(
    @InjectRepository(Galeries)
    private galeryRepository: Repository<Galeries>,
    private configService: ConfigService,
  ) {}

  async create(
    createGaleryDto: CreateGaleryDto,
    isLogin: Users,
    file: Express.Multer.File,
  ): Promise<ResponseDto<string, Galeries>> {
    const { title, description } = createGaleryDto;
    const { filename, path, mimetype, size } = file;
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.') + 1,
    );
    const createImage = this.galeryRepository.create({
      title,
      description,
      filename,
      path,
      mimetype,
      size,
      ext,
      user: isLogin,
    });

    const saveImage = await this.galeryRepository.save(createImage);
    return new ResponseDto('Image Saved', saveImage);
  }

  async showAll(): Promise<ResponseDto<string, Galeries[]>> {
    const base_url = `${this.configService.get('BASE_URL')}`;

    const images = await this.galeryRepository
      .createQueryBuilder('gallery')
      .leftJoinAndSelect('gallery.user', 'user')
      .select([
        'gallery.id as id',
        'gallery.title as title',
        'gallery.description as description',
        `CONCAT('${base_url}/galery/file/', gallery.filename) as url`,
        'gallery.updatedAt as lastupdate',
        'user.firstName as user',
      ])
      .getRawMany();

    return new ResponseDto('show all images', images);
  }

  async update(
    id: string,
    createGaleryDto: CreateGaleryDto,
    isLogin: Users,
  ): Promise<ResponseDto<string, Galeries>> {
    const { title, description } = createGaleryDto;
    const image = await this.galeryRepository.findOne({ where: { id } });
    if (!image) {
      throw new BadRequestException('Image not Found');
    }

    image.title = title;
    image.description = description;
    image.user = isLogin;
    const updateImage = await this.galeryRepository.save(image);
    return new ResponseDto('Image text updated', updateImage);
  }

  async Delete(id: string): Promise<ResponseDto<string, null>> {
    const Image = await this.galeryRepository.findOne({ where: { id } });
    if (!Image) {
      throw new BadRequestException('Not Image Availabel');
    }

    await this.galeryRepository.delete(id);
    return new ResponseDto('Delete Image Success', null);
  }
}
