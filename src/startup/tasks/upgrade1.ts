import { INestApplication } from '@nestjs/common';
import { BaseTask } from '../BaseTask';
import { UserService, User } from '../../user';
import { ConfigService } from '../../config/config.service';
import { Role } from '../../role';
export class Upgrade1 extends BaseTask {
  private userService: UserService;

  private configService: ConfigService;

  constructor(app: INestApplication) {
    super(app);
    this.userService = app.get(UserService);
    this.configService = app.get(ConfigService);
  }
  async executeTask(): Promise<void> {
    console.log('Starting upgrade process 1...');
    console.log(' - Upgrade Process: Load Default Users');

    const player = await this.userService.findByUsername('User');
    const admin = await this.userService.findByUsername('Admin');

    if (player === undefined) {
      console.log('Creating default "player" user');
      const playerPassword = this.configService.defaultPasswords.user;
      await this.createUser('User', playerPassword, 'user');
    }

    if (admin === undefined) {
      console.log('Creating default "admin" user');
      const adminPassword = this.configService.defaultPasswords.admin;
      await this.createUser('Admin', adminPassword, 'admin');
    }
  }

  /**
   * Create new user with role and password
   * @param userName
   * @param password
   * @param role
   */
  private async createUser(userName: String, password: String, roleName: String) {
    const newUser = new User();
    const newRole = new Role();

    newRole.name = roleName;
    newRole.description = '';

    newUser.username = userName;
    newUser.password = password;
    newUser.roles = [newRole];

    return await this.userService.create(newUser);
  }
}
