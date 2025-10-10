// src/todo/dto/create-todo.dto.ts
import { IsNotEmpty, IsString, MinLength, MaxLength, IsIn } from 'class-validator';
import { ValidationMessages } from '../../common/messages/validation-messages';

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

  @IsIn(['pending', 'in_progress', 'done'], { message: ValidationMessages.STATUS_INVALID })
  status: 'pending' | 'in_progress' | 'done';
}

