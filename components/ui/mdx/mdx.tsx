'use client'

import { useMDXComponent } from '@content-collections/mdx/react'
import clsx from 'clsx'
import { useEffect, useMemo } from 'react'
import { PhotoProvider, photoViewConfig } from '@/components/ui/photo-view'
import { usePolyglotStore } from '@/store/polyglot'
import { Figure } from './figure'
import { Image } from './image'
import { Link } from './link'

const components = {
  img: Image,
  a: Link,
  figure: Figure,
}

interface MDXProps {
  contentCode: {
    de: string
    en: string
  }
  classname?: string
}

export function MDX({ contentCode, classname }: MDXProps) {
  const { language, setHasMultipleLanguage } = usePolyglotStore()

  const displayLanguage = useMemo(() => {
    return contentCode[language] ? language : 'en'
  }, [language, contentCode])

  const code = contentCode[displayLanguage]
  const Component = useMDXComponent(code)

  useEffect(() => {
    const hasMultipleLanguage = !!contentCode.de && !!contentCode.en
    setHasMultipleLanguage(hasMultipleLanguage)
  }, [contentCode, setHasMultipleLanguage])

  return (
    <div
      className={clsx(
        classname,
        'prose prose-rosepine prose-strong:font-extrabold prose-strong:text-love prose-img:rounded-lg max-w-none',
      )}
      data-lang={displayLanguage}
    >
      <PhotoProvider {...photoViewConfig}>
        <Component components={components} />
      </PhotoProvider>
    </div>
  )
}
