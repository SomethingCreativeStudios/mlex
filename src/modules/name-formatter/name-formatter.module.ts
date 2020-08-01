import { Module } from '@nestjs/common';
import { NameFormatterService } from './name-formatter.service';

@Module({
  imports: [NameFormatterService],
  controllers: [],
  providers: [NameFormatterService],
})
export class NameFormatterModule {}
