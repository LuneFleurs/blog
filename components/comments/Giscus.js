import React, { useEffect, useCallback, useState } from 'react'
import { useTheme } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'

const Giscus = () => {
  const { theme, resolvedTheme } = useTheme()
  const [commentsTheme, setCommentsTheme] = useState(
    theme === 'dark' || resolvedTheme === 'dark'
      ? siteMetadata.comment.giscusConfig.darkThemeURL
      : siteMetadata.comment.giscusConfig.lightThemeURL
  )

  const COMMENTS_ID = 'comments-container'

  const LoadComments = useCallback((themeToUse) => {
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
    script.setAttribute('data-theme', themeToUse)
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    const comments = document.getElementById(COMMENTS_ID)
    if (comments) comments.appendChild(script)
  }, [])

  const handleThemeChange = useCallback(
    (event) => {
      const newTheme = event.detail.newTheme
      const newCommentsTheme =
        newTheme === 'dark'
          ? siteMetadata.comment.giscusConfig.darkThemeURL
          : siteMetadata.comment.giscusConfig.lightThemeURL

      // Update the comments theme state
      setCommentsTheme(newCommentsTheme)

      // Reload the comments with the new theme
      LoadComments(newCommentsTheme)
    },
    [LoadComments]
  )

  useEffect(() => {
    // Your existing logic for CSS link updates
    // ...

    // Initialize or reload comments
    LoadComments(commentsTheme)

    // Listen for the custom event for theme change
    window.addEventListener('themeChanged', handleThemeChange)

    // Cleanup
    return () => {
      // Remove the event listener when the component is unmounted
      window.removeEventListener('themeChanged', handleThemeChange)
    }
  }, [theme, resolvedTheme, LoadComments, handleThemeChange, commentsTheme])

  return (
    <div className="w-full pb-6 pt-6 text-center text-gray-700 dark:text-gray-300">
      <div className="giscus" id={COMMENTS_ID} />
    </div>
  )
}

export default Giscus
