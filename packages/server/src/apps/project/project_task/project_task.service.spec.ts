import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTaskService } from './project_task.service';

describe('ProjectTaskService', () => {
  let service: ProjectTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectTaskService],
    }).compile();

    service = module.get<ProjectTaskService>(ProjectTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
