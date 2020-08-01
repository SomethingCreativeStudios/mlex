import { Injectable } from '@nestjs/common';

@Injectable()
export class NameFormatterService {
  private blackList = [
    '(digital)',
    '(Digital)',
    '(LuCaZ)',
    '(danke-Empire)',
    '(PNG4)',
    '(Complete)',
    '(Yen Press)',
    '(Fixed)',
    '(Seven Seas translation)',
    '(ongoing)',
    '(Vertical)',
    '(Random Scans)',
  ];
  constructor() {}

  cleanSeriesName(name: string): string {
    return this.blackList
      .reduce((acc, item) => {
        return acc.replace(new RegExp(item, 'g'), '');
      }, name)
      .replace(/ *\[[^)]*\] */g, ' ')
      .replace(/\B(?=[A-Z])|\s*\d{4}\b/g, '')
      .replace(new RegExp(/\(\-\)/g, 'g'), '')
      .replace(new RegExp(/\(\)/g, 'g'), '')
      .trim();
  }

  findVolume(name: string): number {
    const noVolumeVersion = new RegExp(/\s\-\s\d+/gi).exec(name)?.[0]?.replace('-', '') ?? null;
    const vVersion = new RegExp(/\sv\d+/gi).exec(name)?.[0]?.replace('v', '') ?? null;
    const volumeVersion = new RegExp(/\s(Volume)\s\d+/gi).exec(name)?.[0]?.replace('Volume ', '') ?? null;
    const volumeAtStart = new RegExp(/^\d+\s/gi).exec(name)?.[0]?.trim() ?? null;

    if (vVersion) {
      return Number(vVersion);
    }

    if (volumeVersion) {
      return Number(volumeVersion);
    }

    if (volumeAtStart) {
      return Number(volumeAtStart);
    }

    if (noVolumeVersion) {
      return Number(noVolumeVersion);
    }

    return null;
  }
}
