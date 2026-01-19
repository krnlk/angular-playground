import { NavigablePage, SelectableLanguage } from '../models/navbar.models';

export const PAGES_LIST: NavigablePage[] = [
  {
    path: 'register',
    translation: 'navbar.menu.registerPage',
  },
  { path: 'login', translation: 'navbar.menu.loginPage' },
  { path: '', translation: 'navbar.menu.homePage' },
];

export const AVAILABLE_LANGUAGES: SelectableLanguage[] = [
  {
    languageCode: 'en',
    translation: 'language.english',
  },
  {
    languageCode: 'pl',
    translation: 'language.polish',
  },
];
