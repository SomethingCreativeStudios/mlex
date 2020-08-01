import { Test, TestingModule } from '@nestjs/testing';
import { NameFormatterService } from './name-formatter.service';

jest.setTimeout(7000);

describe('Formatter service', () => {
  let testingModule: TestingModule;
  let service: NameFormatterService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [],
      providers: [NameFormatterService],
    }).compile();

    service = testingModule.get(NameFormatterService);
  });

  describe('Series Clean Up', () => {
    it('Almost Clean Name', async () => {
      const result = await service.cleanSeriesName('Is It Wrong to Try to Pick Up Girls in a Dungeon - Sword Oratoria (Digital) (LuCaZ)');

      expect(result).not.toBeNull();
      expect(result).toEqual('Is It Wrong to Try to Pick Up Girls in a Dungeon - Sword Oratoria');
    });

    it('Brackets Clean Name', async () => {
      const result = await service.cleanSeriesName('Is It Wrong to Try to Pick Up Girls in a Dungeon [test] - Sword Oratoria (Digital) (LuCaZ)');

      expect(result).not.toBeNull();
      expect(result).toEqual('Is It Wrong to Try to Pick Up Girls in a Dungeon - Sword Oratoria');
    });

    it('Full Mix', async () => {
      const result = await service.cleanSeriesName(
        '(Digital)Is It Wrong to [test]Try to Pick(Digital) Up Girls in a Dungeon [test] - Sword Oratoria (Digital) (LuCaZ)',
      );

      expect(result).not.toBeNull();
      expect(result).toEqual('Is It Wrong to Try to Pick Up Girls in a Dungeon - Sword Oratoria');
    });

    it('Dates Clean Name', async () => {
      const result = await service.cleanSeriesName('Is It Wrong to Try to Pick Up Girls in a Dungeon - Sword Oratoria (2019) (2020-2110)');

      expect(result).not.toBeNull();
      expect(result).toEqual('Is It Wrong to Try to Pick Up Girls in a Dungeon - Sword Oratoria');
    });
  });

  describe('Volume Clean Up', () => {
    it('No Vol', async () => {
      const result = await service.findVolume('Is It Wrong to Try to Pick Up Girls in a Dungeon - Sword Oratoria');

      expect(result).toBeNull();
    });

    it('Volume Simple (vXX)', async () => {
      const result = await service.findVolume('Is It Wrong to Try to Pick Up Girls in a Dungeon - Sword Oratoria v01');

      expect(result).not.toBeNull();
      expect(result).toEqual(1);
    });

    it('Volume Simple (- XX)', async () => {
      const result = await service.findVolume('Is It Wrong to Try to Pick Up Girls in a Dungeon - Sword Oratoria - 03');

      expect(result).not.toBeNull();
      expect(result).toEqual(3);
    });

    it('Volume Simple (Volume XX)', async () => {
      const result = await service.findVolume('Is It Wrong to Try to Pick Up Girls in a Dungeon - Sword Oratoria Volume 100');

      expect(result).not.toBeNull();
      expect(result).toEqual(100);
    });

    it('Volume At Start (XX title)', async () => {
      const result = await service.findVolume('23 Is It Wrong to Try to Pick Up Girls in a Dungeon - Sword Oratoria');

      expect(result).not.toBeNull();
      expect(result).toEqual(23);
    });
  });
});
