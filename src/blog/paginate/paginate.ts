import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class Paginate {
  constructor(private readonly prisma: PrismaService) {}

  async pages(page, size, search) {
    const results = await this.prisma.post.findMany({
      include: {
        author: true,
      },
      skip: page * size,
      take: Number(size),

      where: { title: { contains: search } },
    });

    console.log('results', results);
    const totalItems = await this.prisma.post.count({
      where: { title: { contains: search, mode: 'insensitive' } },
    });
    return {
      results,
      totalItems,
    };
  }
}
