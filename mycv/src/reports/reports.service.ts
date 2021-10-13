import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repo: Repository<Report>
  ) { }

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto)
    report.user = user
    return this.repo.save(report)
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne(id)
    if (!report) {
      throw new NotFoundException('report not found')
    }

    report.approved = approved
    return this.repo.save(report)
  }

  createEstimate({ make, model, lat, lng, year, mileage }: GetEstimateDto) {
    return this.repo.createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lat - :lat BETWEEN -5 and 5', { lat })
      .andWhere('lng - :lng BETWEEN -5 and 5', { lng })
      .andWhere('year - :year BETWEEN -3 and 3', { year })
      .andWhere('approved IS TRUE') 
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne()
  }
}

