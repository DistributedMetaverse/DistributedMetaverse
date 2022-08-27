import { Injectable, ForbiddenException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { bcryptConstant } from '../constants'

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
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 등록된 사용자입니다.`],
        error: 'Forbidden'
      })
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
