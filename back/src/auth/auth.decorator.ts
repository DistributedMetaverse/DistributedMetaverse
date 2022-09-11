import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthToken = createParamDecorator((
    data: unknown, ctx: ExecutionContext
) => {
    const request = ctx.switchToHttp().getRequest();
    // 클라이언트에서 보낸 request의 정보를 가져옵니다.

    // Middleware에서 받은 user의 정보를 확인합니다.
    return request.user;
})