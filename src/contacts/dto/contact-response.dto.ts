import { Contact } from '../entities/contact.entity';

export class ContactResponseDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  createdAt: string;

  static fromEntity(contact: Contact): ContactResponseDto {
    const dto = new ContactResponseDto();
    dto.id = contact.id;
    dto.name = contact.name;
    dto.email = contact.email;
    dto.phone = contact.phone;
    dto.notes = contact.notes;
    dto.createdAt = contact.createdAt.toISOString();
    return dto;
  }
}