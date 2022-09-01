import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteMenu } from './entities/site_menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SiteMenu])],
  controllers: [SiteController],
  providers: [SiteService],
})
export class SiteModule {}
