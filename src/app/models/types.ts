import { IEditArticleBody } from "./request";

export type ThemeType = 'light' | 'dark';

export type TechnologyStackType =
  | 'JavaScript'
  | 'Typescript'
  | 'Angular'
  | 'Vue'
  | 'DataScience';

export type RoleType = 'admin' | 'user' | 'guest';

export type IEditArticleForm = Omit<IEditArticleBody, 'id'>
