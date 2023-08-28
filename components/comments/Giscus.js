import React, { useState, useEffect, useCallback } from 'react'
import { useTheme } from 'next-themes'

import siteMetadata from '@/data/siteMetadata'

const Giscus = () => {
  const { theme, resolvedTheme } = useTheme()
  const commentsTheme =
    siteMetadata.comment.giscusConfig.themeURL === ''
      ? theme === 'dark' || resolvedTheme === 'dark'
        ? siteMetadata.comment.giscusConfig.darkTheme
        : siteMetadata.comment.giscusConfig.theme
      : siteMetadata.comment.giscusConfig.themeURL

  const COMMENTS_ID = 'comments-container'

  // Determine the appropriate CSS file based on the theme
  const giscusCSSLink = document.getElementById('giscus-theme-css')
  const newCSSHref =
    theme === 'dark' || resolvedTheme === 'dark' ? '/giscus-custom-dark.css' : '/giscus-light.css'
  if (giscusCSSLink) {
    giscusCSSLink.href = newCSSHref
  } else {
    const link = document.createElement('link')
    link.id = 'giscus-theme-css'
    link.rel = 'stylesheet'
    link.href = newCSSHref
    document.head.appendChild(link)
  }

  const LoadComments = useCallback(() => {
    const {
      repo,
      repositoryId,
      category,
      categoryId,
      mapping,
      reactions,
      metadata,
      inputPosition,
      lang,
    } = siteMetadata?.comment?.giscusConfig

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', repo)
    script.setAttribute('data-repo-id', repositoryId)
    script.setAttribute('data-category', category)
    script.setAttribute('data-category-id', categoryId)
    script.setAttribute('data-mapping', mapping)
    script.setAttribute('data-reactions-enabled', reactions)
    script.setAttribute('data-emit-metadata', metadata)
    script.setAttribute('data-input-position', inputPosition)
    script.setAttribute('data-lang', lang)
    script.setAttribute('data-theme', commentsTheme)
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    const comments = document.getElementById(COMMENTS_ID)
    if (comments) comments.appendChild(script)
    // Make the background of the giscus iframe transparent
    const iframeObserver = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        if (mutation.type === 'childList') {
          const iframe = document.querySelector('iframe.giscus-frame')
          if (iframe) {
            iframe.style.background = 'black'
            iframe.style.width = '100%'
            if (theme === 'dark' || resolvedTheme === 'dark') {
              const giscusDocument = iframe.contentWindow.document
              const giscusBody = giscusDocument.querySelector('body')
              if (giscusBody) {
                giscusBody.style.backgroundColor = 'black'
              }
            }
            iframeObserver.disconnect()
          }
        }
      }
    })

    iframeObserver.observe(document.getElementById(COMMENTS_ID), { childList: true })

    return () => {
      const comments = document.getElementById(COMMENTS_ID)
      if (comments) comments.innerHTML = ''
    }
  }, [commentsTheme])

  // Reload on theme change
  useEffect(() => {
    const iframe = document.querySelector('iframe.giscus-frame')
    if (!iframe) LoadComments()
  }, [theme, resolvedTheme, LoadComments])

  return (
    <div className="w-full pb-6 pt-6 text-center text-gray-700 dark:text-gray-300">
      <div className="giscus" id={COMMENTS_ID} />
    </div>
  )
}

export default Giscus
