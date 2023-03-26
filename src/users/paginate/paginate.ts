import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
@Injectable()
export class Paginate {
  constructor(private readonly prisma: PrismaService) {}

  async pages(page, size, search) {
    const results = await this.prisma.user.findMany({
      skip: page * size,
      take: Number(size),

      where: { firstName: { contains: search } },
      //   include: {
      //     lastName: true;
      //   },
    });

    results.forEach(function (v) {
      delete v.hashedPassword;
    });
    console.log('results', results);
    const totalItems = await this.prisma.user.count({
      where: { lastName: { contains: search, mode: 'insensitive' } },
    });
    return {
      results,
      totalItems,
    };
  }
}
