import { Test, TestingModule } from '@nestjs/testing';
import { NovelService } from './novel.service';

jest.setTimeout(7000);

describe('Novel service', () => {
  let testingModule: TestingModule;
  let service: NovelService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [],
      providers: [NovelService],
    }).compile();

    service = testingModule.get(NovelService);
    await service.setUp();
  });

  describe('Search Results', () => {
    it('Many Results', async () => {
      const result = await service.searchNovel('Spice');

      expect(result).not.toBeNull();
      expect(result.length).toEqual(3);
    });

    it('One Result', async () => {
      const result = await service.searchNovel('Spice and wolf');

      expect(result).not.toBeNull();
      expect(result.length).toEqual(1);
      expect(result[0].url).toEqual('http://lndb.info/light_novel/Spice_and_Wolf');
    });

    it('No Result', async () => {
      const result = await service.searchNovel('this should have no results');

      expect(result).not.toBeNull();
      expect(result.length).toEqual(0);
    });
  });

  describe('Get Novel', () => {
    it('Standard', async () => {
      const result = await service.getNovel('http://lndb.info/light_novel/Spice_and_Wolf');

      expect(result).not.toBeNull();
      expect(result.title).toEqual('Spice and Wolf');
      expect(result.altTitles.length).toEqual(3);
      expect(result.description).not.toBeNull();
      expect(result.relatedNovels.length).toEqual(1);
      expect(result.relatedNovels[0].relation).toEqual('sequel');
      expect(result.meta.author).toEqual('Hasekura Isuna');
      expect(result.coverUrls.length).toBeGreaterThan(20);
    });
  });
});
