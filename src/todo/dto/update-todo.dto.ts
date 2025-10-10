// src/todo/dto/update-todo.dto.ts
import { IsOptional, IsString, MinLength, MaxLength, IsIn } from 'class-validator';
import { ValidationMessages } from '../../common/messages/validation-messages';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: ValidationMessages.NAME_TOO_SHORT })
  @MaxLength(10, { message: ValidationMessages.NAME_TOO_LONG })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: ValidationMessages.DESCRIPTION_TOO_SHORT })
  description?: string;

  @IsOptional()
  @IsIn(['pending', 'in_progress', 'done'], { message: ValidationMessages.STATUS_INVALID })
  status?: 'pending' | 'in_progress' | 'done';
}

