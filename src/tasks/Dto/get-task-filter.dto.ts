import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TasksStatus } from '../task.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsString()
  @IsEnum(TasksStatus)
  status?: TasksStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
