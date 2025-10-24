
import { IsNotEmpty, IsString, MinLength, MaxLength, IsEnum, IsOptional } from 'class-validator';
import { ValidationMessages } from '../../common/messages/validation-messages';
import { StatusEnum } from '../status.enum';

export class CreateTodoDto {
  @IsNotEmpty({ message: ValidationMessages.NAME_REQUIRED })
  @IsString()
  @MinLength(3, { message: ValidationMessages.NAME_TOO_SHORT })
  @MaxLength(10, { message: ValidationMessages.NAME_TOO_LONG })
  name: string;

  @IsNotEmpty({ message: ValidationMessages.DESCRIPTION_REQUIRED })
  @IsString()
  @MinLength(10, { message: ValidationMessages.DESCRIPTION_TOO_SHORT })
  description: string;

  @IsEnum(StatusEnum, { message: ValidationMessages.STATUS_INVALID })
  status: StatusEnum;
  
  @IsOptional()
  userId: number;
}

