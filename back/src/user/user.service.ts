import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { bcryptConstant } from '../common/config/constants'
import { EmailAlreadyExistException } from '../common/exception/error.exception'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const isExist = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    });
    if (isExist) {
      throw new EmailAlreadyExistException()
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, bcryptConstant.saltOrRounds);
    const { password, ...result } = await this.userRepository.save(createUserDto);
    return result;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ["id", "email", "userName", "role"],
    });
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      select: ["id", "email", "userName", "role"],
      where: { email: id },
    });
  }
}
