import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Contact } from '../entities/contact.entity';

export class ContactResponseDto {
  @ApiProperty({ example: '3f1c2e7a-9b4d-4e6f-8a1b-2c3d4e5f6a7b' })
  id: string;

  @ApiProperty({ example: 'Ana López' })
  name: string;

  @ApiProperty({ example: 'ana@example.com' })
  email: string;

  @ApiProperty({ example: '811-000-0000' })
  phone: string;

  @ApiPropertyOptional({ example: 'Equipo de proyecto' })
  notes?: string;

  @ApiProperty({ example: '2026-09-10T15:00:00.000Z', description: 'ISO 8601' })
  createdAt: string;

  static fromEntity(contact: Contact): ContactResponseDto {
    const dto = new ContactResponseDto();
    dto.id = contact.id!;
    dto.name = contact.name!;
    dto.email = contact.email!;
    dto.phone = contact.phone!;
    dto.notes = contact.notes;
    dto.createdAt = contact.createdAt!.toISOString();
    return dto;
  }
}