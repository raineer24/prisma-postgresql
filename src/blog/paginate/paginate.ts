import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class Paginate {
  constructor(private readonly prisma: PrismaService) {}

  async pages(page, size) {
    const results = await this.prisma.post.findMany({
      include: {
        author: true,
      },
      skip: page * size,
      take: Number(size),
    });

    console.log('results', results);
    // const totalItems = await this.prisma.post.count({
    //   where: { title: { contains: search, mode: 'insensitive' } },
    // });
    return {
      results,
      //  totalItems,
    };
  }
}
