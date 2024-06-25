import { Global, Module } from '@nestjs/common';
import { RecordBuilderHelper } from './record-builder.helper';

@Global()
@Module({
  providers: [RecordBuilderHelper],
  exports: [RecordBuilderHelper]
})
export class RecordBuilderModule {}
