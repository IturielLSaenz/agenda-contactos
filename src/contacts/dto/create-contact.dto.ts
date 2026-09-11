import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ description: 'Nombre completo', example: 'Ana López' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Correo del contacto',
    example: 'ana@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Teléfono: dígitos, espacios o guiones; puede empezar con +',
    example: '811-000-0000',
  })
  @Matches(/^(\+?[0-9][\s-]*)+$/, { message: 'phone inválido' })
  phone: string;

  @ApiPropertyOptional({
    description: 'Notas libres',
    example: 'Equipo de proyecto',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}