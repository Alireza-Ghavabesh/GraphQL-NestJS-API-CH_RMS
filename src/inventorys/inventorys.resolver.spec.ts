import { Test, TestingModule } from '@nestjs/testing';
import { InventorysResolver } from './inventorys.resolver';
import { InventorysService } from './inventorys.service';

describe('InventorysResolver', () => {
  let resolver: InventorysResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventorysResolver, InventorysService],
    }).compile();

    resolver = module.get<InventorysResolver>(InventorysResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
