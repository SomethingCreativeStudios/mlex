import { Novel, RelatedNovel, NovelMeta } from '../models/novel';
import { load } from 'cheerio';

export class LNDBBuilder {
  constructor() {}

  public getNovel(cheerioQuery: CheerioStatic): Novel {
    const novel = new Novel();

    novel.title = this.getTitle(cheerioQuery);

    novel.altTitles = this.getAltTitles(cheerioQuery);

    novel.relatedNovels = this.getRelatedNovels(cheerioQuery);

    novel.description = this.getDescription(cheerioQuery);

    novel.coverUrls = this.getCovers(cheerioQuery);

    novel.meta = this.getNovelMeta(cheerioQuery);

    return novel;
  }

  private getTitle($: CheerioStatic) {
    return this.stripAndTrim($('.secondarytitle span').text());
  }

  private getAltTitles($: CheerioStatic) {
    return this.stripAndTrim($('.lightnovelassociatedtitles .paragraph-info').html())
      .split('<br>')
      .filter(item => item);
  }

  private getRelatedNovels($: CheerioStatic): RelatedNovel[] {
    const relatedNovelElement = $('.lightnovelrelatedtitles p');

    if (!relatedNovelElement) return [];

    const text = relatedNovelElement
      .html()
      .split('<br>')
      .filter(item => this.stripAndTrim(item));

    return text.map(html => {
      const query = load(`<p>${this.stripAndTrim(html)}</p>`);

      const getRelation = query('p')
        .text()
        .replace(query('a').text(), '')
        .replace('(', '')
        .replace(')', '');

      return { title: query('a').text(), relation: getRelation.trim(), url: query('a').attr()['href'] };
    });
  }

  private getDescription($: CheerioStatic) {
    return this.stripAndTrim($('.lightnovelabout .paragraph-info').text());
  }

  private getCovers($: CheerioStatic): string[] {
    const covers = $('.lightnovelcovers .view-covers div .cover');
    const coverUrls = [];

    covers.each((index, ele) => {
      coverUrls.push(ele.attribs['src']);
    });

    return coverUrls;
  }

  private getNovelMeta($: CheerioStatic): NovelMeta {
    const meta = new NovelMeta();

    const tableHeaders = $(`.lightnovelheader table tr > td:nth-child(1)`);
    const tableValues = $(`.lightnovelheader table tr > td:nth-child(2)`);

    meta.author = this.findRow($, 'author', tableHeaders, tableValues);
    meta.illustrator = this.findRow($, 'illustrator', tableHeaders, tableValues);
    meta.targetReadership = this.findRow($, 'target readership', tableHeaders, tableValues);
    meta.totalVolumes = Number(this.findRow($, 'volumes', tableHeaders, tableValues));

    meta.genres = this.findRow($, 'genre', tableHeaders, tableValues)?.split(',') ?? [];
    meta.genres = meta.genres.map(genre => this.stripAndTrim(genre));

    return meta;
  }

  private findRow($: CheerioStatic, rowTitle: string, headers: Cheerio, values: Cheerio) {
    let rowValue = null;

    headers.each((index, ele) => {
      if (
        $(ele)
          .text()
          .toLowerCase() === rowTitle.toLowerCase()
      ) {
        rowValue = this.stripAndTrim($(values[index]).text());
      }
    });

    return rowValue;
  }

  private stripAndTrim(text: string) {
    return text.replace('\\n', '').trim();
  }
}
