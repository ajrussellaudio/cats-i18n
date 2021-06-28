import { useTranslation } from 'next-i18next'
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import Link from 'next/link'
import styles from '../styles/cat.module.css'
import { useRouter } from 'next/dist/client/router'

function Cat({ locale }: { locale: string }) {
  const { t } = useTranslation('common')
  const { locales, pathname } = useRouter()

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className={styles.content}>
      <h1>{t('title')}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://placekitten.com/640/500" alt={t('title')} />
      <p>{t('body')}</p>
      <ul>
        {locales?.map((locale) => (
          <li key={locale}>
            <Link href={pathname} locale={locale}>
              <a className={styles.link}>{t(`language.${locale}`)}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || '', ['common'])),
      locale,
    },
  }
}

export default Cat
