import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UuidService } from './common/uuid/uuid.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly uuidService: UuidService,  // Injection de UuidService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('uuid')
  getUuid(): string {
    return this.uuidService.generateUuid(); // Méthode pour générer un UUID
  }
}
