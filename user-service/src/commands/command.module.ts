import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSourceOptions from 'ormconfig';
// import { User } from '../../entities/user.entity';
// import { Role } from 'src/entities/role.entity';
import { CreateAdminCommand } from './create-admin.command';
import { CreateAdminQuestions } from './questions/create-admin.questions';
import { BaseModule } from "../modules/base/base.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    BaseModule,
    // TypeOrmModule.forFeature([User, Role]),
  ],
  providers: [
    CreateAdminCommand,
    CreateAdminQuestions,
  ],
  exports: [],
})
export class CommandModule {}
