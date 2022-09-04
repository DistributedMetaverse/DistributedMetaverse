import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SignupUserDto } from './dto/signup-user.dto';
import * as bcrypt from 'bcrypt';
import { bcryptConstant } from '../common/config/constants'
import { EmailAlreadyExistException } from '../common/exception/error.exception'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(signupUserDto: SignupUserDto): Promise<any> {
    const isExist = await this.userRepository.findOne({
      where: { email: signupUserDto.email }
    });
    if (isExist) {
      throw new EmailAlreadyExistException()
    }

    signupUserDto.password = await bcrypt.hash(signupUserDto.password, bcryptConstant.saltOrRounds);
    const { password, ...result } = await this.userRepository.save(signupUserDto);
    return result;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ["id", "email", "username", "role"],
    });
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      select: ["id", "email", "username", "role"],
      where: { email: id },
    });
  }
}
