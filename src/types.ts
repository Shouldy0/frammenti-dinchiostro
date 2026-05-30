/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Chapter {
  id: string;
  number: number;
  title: string;
  content: string;
}

export interface Novel {
  id: string;
  title: string;
  genre: string;
  synopsis: string;
  excerpt: string;
  atmosphere: string;
  coverQuery: string; // for styling or visual art cue
  publishedYear: string;
  chapters?: Chapter[];
}

export interface Poem {
  id: string;
  title: string;
  category: string;
  verses: string[];
  backdropCue: string;
  translated?: string;
}

export interface Artpiece {
  id: string;
  title: string;
  medium: string;
  story: string;
  imageUrl: string; 
  tags: string[];
}

export interface Blogpost {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: string;
}
