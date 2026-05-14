'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface AnimateOnScrollProps {
  children: ReactNode
  className?: string
  stagger?: boolean
  delay?: number
}

export default function AnimateOnScroll({
  children,
  className = '',
  stagger = false,
  delay = 0,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible')
      return
    }

    // Apply delay if specified
    if (delay > 0) {
      el.style.transitionDelay = `${delay}ms`
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          // Once visible, disconnect to avoid re-triggering
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`${stagger ? 'stagger-children' : 'animate-on-scroll'} ${className}`}
    >
      {children}
    </div>
  )
}
