import { Injectable } from '@nestjs/common';
import { UuidService } from '../common/uuid/uuid.service';

@Injectable()
export class UuidTestService {
  constructor(private readonly uuidService: UuidService) {}

  displayUuid(): string {
    const id = this.uuidService.generateUuid();
    console.log('UUID généré :', id);
    return id;
  }
}
