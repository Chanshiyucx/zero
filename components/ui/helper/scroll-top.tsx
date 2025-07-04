'use client'

import { CaretDoubleUpIcon } from '@phosphor-icons/react/dist/ssr'
import { useEffect, useState } from 'react'
import { throttle } from '@/lib/utils/lodash'
import { TinyButton } from './tiny-button'

export function ScrollTop() {
  const [showBackTop, setShowBackTop] = useState(false)

  const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  useEffect(() => {
    const readViewport = throttle(() => {
      const { innerHeight, scrollY } = window
      setShowBackTop(scrollY > innerHeight / 5)
    }, 16)

    readViewport()

    window.addEventListener('resize', readViewport)
    return () => {
      window.removeEventListener('resize', readViewport)
    }
  }, [])

  useEffect(() => {
    const scrollHandler = throttle(
      () => {
        const { innerHeight, scrollY } = window
        setShowBackTop(scrollY > innerHeight / 5)
      },
      16,
      {
        leading: false,
      },
    )

    scrollHandler()

    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  return (
    <TinyButton className={!showBackTop ? 'hidden' : ''} onClick={backToTop}>
      <CaretDoubleUpIcon className="text-xl" weight="duotone" />
    </TinyButton>
  )
}
