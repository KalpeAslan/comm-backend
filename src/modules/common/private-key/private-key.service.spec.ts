import { Test, TestingModule } from '@nestjs/testing';
import { PrivateKeyService } from './private-key.service';

describe('PrivateKeyService', () => {
  let service: PrivateKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrivateKeyService],
    }).compile();

    service = module.get<PrivateKeyService>(PrivateKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
