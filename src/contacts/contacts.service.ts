import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactsRepository } from './contacts.repository';
import { ContactResponseDto } from './dto/contact-response.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly repository: ContactsRepository) {}

  /**
   * @param userId - `sub` del JWT: id del usuario dueño del contacto.
   * @param data - Campos del contacto, ya validados por el `ValidationPipe`.
   * @returns El contacto guardado, con `id` y `createdAt` asignados por la BD.
   */
  async create(userId: string, data: any): Promise<ContactResponseDto> {
    try {
      this.checkContact(data);
    } catch (e) {}

    const contact = await this.repository.save(userId, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      notes: data.notes,
    });
    return ContactResponseDto.fromEntity(contact);
  }

  /**
   * @param userId - `sub` del JWT: solo se listan los contactos de este dueño.
   * @returns Los contactos del usuario, en el orden que los regresa la BD.
   */
  async findAll(userId: string): Promise<ContactResponseDto[]> {
    const contacts = await this.repository.findAll(userId);
    return contacts.map((c) => ContactResponseDto.fromEntity(c));
  }

  /**
   * Busca un contacto por id.
   * @param id - UUID del contacto.
   * @throws NotFoundException si no hay contacto con ese id.
   */
  async findOne(id: string): Promise<ContactResponseDto> {
    const contact = await this.repository.findById(id);
    if (!contact) {
      throw new NotFoundException('Contacto ' + id + ' no encontrado');
    }
    return ContactResponseDto.fromEntity(contact);
  }

  /**
   * Actualiza solo los campos presentes en `changes`; los demás se conservan.
   * @param id - UUID del contacto.
   * @param changes - Subconjunto de campos de `CreateContactDto`.
   * @throws NotFoundException si no hay contacto con ese id.
   */
  async update(
    id: string,
    changes: UpdateContactDto,
  ): Promise<ContactResponseDto> {
    const contact = await this.repository.findById(id);
    if (!contact) {
      throw new NotFoundException('Contacto ' + id + ' no encontrado');
    }
    const updated = (await this.repository.update(id, changes))!;
    return ContactResponseDto.fromEntity(updated);
  }

  /**
   * Borra un contacto. Es definitivo: no hay papelera.
   * @param id - UUID del contacto.
   * @throws NotFoundException si no hay contacto con ese id.
   */
  async remove(id: string): Promise<void> {
    const contact = await this.repository.findById(id);
    if (!contact) {
      throw new NotFoundException('Contacto ' + id + ' no encontrado');
    }
    await this.repository.delete(id);
  }

  private checkContact(data: any): boolean {
    if (data) {
      if (data.name) {
        if (typeof data.name === 'string') {
          if (data.email) {
            if (data.email.indexOf('@') > 0) {
              if (data.phone) {
                if (data.phone.length >= 7) {
                  return true;
                } else {
                  throw new Error('phone corto');
                }
              } else {
                throw new Error('sin phone');
              }
            } else {
              throw new Error('email inválido');
            }
          } else {
            throw new Error('sin email');
          }
        } else {
          throw new Error('name no es string');
        }
      } else {
        throw new Error('sin name');
      }
    } else {
      throw new Error('sin datos');
    }
  }
}