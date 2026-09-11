import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado',
    schema: {
      example: {
        id: '3f1c2e7a-9b4d-4e6f-8a1b-2c3d4e5f6a7b',
        email: 'ana@example.com',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Email inválido o password menor a 8 caracteres',
  })
  @ApiResponse({ status: 409, description: 'Ya hay un usuario con ese correo' })
  register(@Body() dto: RegisterDto) {
    return this.service.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Entrar: email + password → tokens' })
  @ApiResponse({
    status: 200,
    description: 'accessToken vive 15 min; refreshToken, 7 días',
    schema: { example: { accessToken: 'eyJ…', refreshToken: 'eyJ…' } },
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  login(@Body() dto: LoginDto) {
    return this.service.login(dto);
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Access token nuevo a partir del refresh token' })
  @ApiResponse({ status: 200, schema: { example: { accessToken: 'eyJ…' } } })
  @ApiResponse({ status: 401, description: 'Refresh token inválido o expirado' })
  refresh(@Body() dto: RefreshDto) {
    return this.service.refresh(dto);
  }
}