import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, FindConditions } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  findOne(query: FindConditions<User>): Promise<User> {
    return this.userRepository.findOne(query);
  }

  async createUser(user: any): Promise<InsertResult> {
    try {
      /**
       * Perform all needed checks
       */

      const userEntity = this.userRepository.create(user);

      const res = await this.userRepository.insert(userEntity);

      Logger.log('createUser - Created user');

      return res;
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }
}