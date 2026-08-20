import { es } from './es';
import { en } from './en';
import type { Dict } from './es';

export type Locale = 'es' | 'en';

export const useT = (locale: string | undefined): Dict => (locale === 'en' ? en : es);

export const asLocale = (locale: string | undefined): Locale => (locale === 'en' ? 'en' : 'es');
