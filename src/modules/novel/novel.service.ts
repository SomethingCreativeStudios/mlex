import { Injectable } from '@nestjs/common';
import { load } from 'cheerio';
import { launch, Browser } from 'puppeteer';
import { NovelSearchResult } from './models/novel-search-item';
import { Novel } from './models/novel';
import { LNDBBuilder } from './utils/LNDBBuilder';

interface Page {
  title: string;
}

@Injectable()
export class NovelService {
  private browser: Browser;

  constructor() {}

  async searchNovel(name: string): Promise<NovelSearchResult[]> {
    const page = await this.browser.newPage();
    page.on('error', error => console.error(error));

    await page.goto(`http://lndb.info/search?text=${name}`);
    await page.waitFor(250);

    return await page.evaluate(async () => {
      const results = [] as NovelSearchResult[];

      const novelTitle = document.querySelector('#lightnovelcontentid .secondarytitle span');

      if (novelTitle) {
        return [{ name: novelTitle.innerHTML.trim(), url: document.URL }];
      }

      const links = document.querySelectorAll('#bodylightnovelscontentid a');

      for (let i = 0; i < links.length; i++) {
        const element = links[i];
        results.push({ name: element.innerHTML, url: element.getAttribute('href') });
      }

      await page.close();
      return results;
    });
  }

  async getNovel(url: string): Promise<Novel> {
    const page = await this.browser.newPage();
    page.on('error', error => console.error(error));

    await page.goto(url);
    await page.waitFor(250);
    const $ = load(await page.content());

    return new LNDBBuilder().getNovel($);
  }

  public async setUp() {
    // args needed for WSL
    this.browser = await launch({ args: ['--no-sandbox', '--single-process'] });
  }

  private nodeListToArray(list: NodeListOf<any>): Element[] {
    const eles = [];

    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      eles.push(eles);
    }
    return eles;
  }
}
