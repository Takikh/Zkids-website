'use client';

import { useState, useEffect } from 'react';
import { translations, Locale, getTranslation } from '@/lib/i18n';

export const useTranslation = () => {
  const [locale, setLocale] = useState<Locale>('fr');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && translations[savedLocale]) {
      setLocale(savedLocale);
    }
  }, []);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    // Update document direction for Arabic
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
  };

  const t = (key: string): string => {
    return getTranslation(locale, key);
  };

  return { locale, changeLocale, t };
};