import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtil {
    constructor(private readonly jwtService: JwtService) {}

    decode(auth: string): { username: string } { // username 형식 선언
        const jwt = auth.replace('Bearer ', '');
        return this.jwtService.decode(jwt, { json: true }) as { username: string };
    }
}