import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';

@Module({
  controllers: [SiteController],
  providers: [SiteService]
})
export class SiteModule {}
