import {Module, Global} from "@nestjs/common";
import { UuidService } from "./uuid/uuid.service";

@Global()
@Module({
  imports: [],
  exports: [UuidService],
  controllers: [],
  providers: [UuidService],
})
export class CommonModule {}