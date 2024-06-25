import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Command, CommandRunner, InquirerService, Option } from 'nest-commander';
import { Repository } from 'typeorm';
// import { User } from '../../entities/user.entity';
// import { Role } from '../../entities/role.entity';
// import { Roles } from '../../app/enums/common.enum';
import { commandConstants, questionConstants } from "../app/constants/command.constant";

@Command({
  name: commandConstants.createAdmin,
  description: 'Create a system admin',
  arguments: '[email] [password]',
})
export class CreateAdminCommand extends CommandRunner {
  constructor(
    private readonly inquirer: InquirerService,
    // @InjectRepository(User) private userRepo: Repository<User>,
    // @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {
    super();
  }

  async run(): Promise<void> {
    const answers = await this.inquirer.prompt<{ email: string; password: string }>(
      questionConstants.createAdmin,
      undefined,
    );
    /*const email = answers.email;
    const pass = answers.password;
    const adminRole = await this.roleRepo.findOneBy({ code: Roles.ADMIN });
    if (!adminRole) {
      console.log('CreateAdminCommand Error: Admin role not found.');
      throw new Error();
    }

    // Password hashing
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(pass, salt);
    try {
      const filterData = {
        email: email,
        password: passwordHash,
        role: adminRole,
      };
      await this.userRepo.save(filterData);
      console.log('\nCreate admin successfully.');
    } catch (err) {
      console.log('CreateAdminCommand Error: ', err);
    }*/
  }

  @Option({
    flags: '-s, --shell <shell>',
  })
  parseShell(val: string) {
    return val;
  }
}
