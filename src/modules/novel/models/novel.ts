export class Novel {
  title: string;
  altTitles: string[];

  description: string;

  relatedNovels: RelatedNovel[];

  meta: NovelMeta;

  coverUrls: string[];

  volumeNames: string[];

  constructor() {
    this.title = '';
    this.altTitles = [];
    this.description = '';
    this.relatedNovels = [];
    this.meta = new NovelMeta();
    this.coverUrls = [];
    this.volumeNames = [];
  }
}

export class NovelMeta {
  author: string;
  illustrator: string;
  targetReadership: string;
  extraLinks: string[];
  totalVolumes: number;
  genres: string[];

  constructor() {
    this.author = '';
    this.illustrator = '';
    this.targetReadership = '';
    this.extraLinks = [];
    this.totalVolumes = 0;
    this.genres = [];
  }
}

export interface RelatedNovel {
  url: string;
  title: string;
  relation: string;
}
