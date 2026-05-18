'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { ARKEventGalleryImage } from '@/lib/events'

interface EventGalleryLightboxProps {
  images: ARKEventGalleryImage[]
  galleryLabel: string
  groupLabel: string
  closeLabel: string
  previousLabel: string
  nextLabel: string
}

export default function EventGalleryLightbox({
  images,
  galleryLabel,
  groupLabel,
  closeLabel,
  previousLabel,
  nextLabel,
}: EventGalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    if (activeIndex === null) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => {
          if (current === null) return current
          return current === 0 ? images.length - 1 : current - 1
        })
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => {
          if (current === null) return current
          return current === images.length - 1 ? 0 : current + 1
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, images.length])

  const activeImage = activeIndex !== null ? images[activeIndex] : null

  const showPrevious = () => {
    setActiveIndex((current) => {
      if (current === null) return current
      return current === 0 ? images.length - 1 : current - 1
    })
  }

  const showNext = () => {
    setActiveIndex((current) => {
      if (current === null) return current
      return current === images.length - 1 ? 0 : current + 1
    })
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#c8922a]"
            style={{ borderColor: '#d4c8b4' }}
            aria-label={`${galleryLabel}: ${groupLabel} ${index + 1}`}
          >
            <div className="relative aspect-[16/11]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </button>
        ))}
      </div>

      {activeImage && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 px-4 py-4 md:px-8 md:py-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${groupLabel} ${galleryLabel}`}
          onClick={() => setActiveIndex(null)}
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-0 top-0 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={closeLabel}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                showPrevious()
              }}
              className="absolute left-0 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={previousLabel}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
            </button>

            <div
              className="relative mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >

              <div className="relative h-full max-h-[82vh] w-full">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              <p className="mt-4 text-center text-sm text-white/80 md:text-base">
                {groupLabel}
              </p>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                showNext()
              }}
              className="absolute right-0 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={nextLabel}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

