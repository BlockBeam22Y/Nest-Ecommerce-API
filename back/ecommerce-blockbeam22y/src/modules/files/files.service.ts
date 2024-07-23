import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as toStream from 'buffer-to-stream';
import { InjectRepository } from '@nestjs/typeorm';
import Product from '../products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async uploadImage(id: string, file: Express.Multer.File) {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      throw new BadRequestException(`Couldn't find product with id '${id}'`);
    }

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      toStream(file.buffer).pipe(upload);
    });

    product.imgUrl = result.secure_url;
    await this.productsRepository.save(product);

    return product;
  }
}
