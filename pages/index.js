import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Image from '@/components/Image'
import Avatar from '@/data/avatar.png'
import React, { useRef, useEffect } from 'react'
import TypingEffect from './typingEffect'

import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  const avatarRef = useRef(null)

  useEffect(() => {
    const avatar = avatarRef.current
    if (!avatar) return

    const handleMouseMove = (e) => {
      const rect = avatar.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const deg = (Math.atan2(y, x) * 180) / Math.PI + 90
      avatar.style.transform = `rotate(${deg}deg)`
    }

    const handleMouseEnter = () => {
      // Set the transition property before the mouse moves
      avatar.style.transition = ''
      avatar.addEventListener('mousemove', handleMouseMove)
    }

    const handleMouseLeave = () => {
      avatar.style.transition = 'transform 1s' // Add transition
      avatar.style.transform = 'rotate(0deg)' // Reset the rotation
      avatar.removeEventListener('mousemove', handleMouseMove)
    }

    avatar.addEventListener('mouseenter', handleMouseEnter)
    avatar.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      avatar.removeEventListener('mouseenter', handleMouseEnter)
      avatar.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <div className="flex flex-col items-center pt-8">
            <div ref={avatarRef}>
              <Image
                src={Avatar}
                alt="avatar"
                width={192}
                height={192}
                className="border-rainbow h-48 w-48 rounded-full border-4 border-solid"
              />
            </div>
            {/* <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">Hello!</h3> */}
            <TypingEffect />
            <div className="text-gray-500 dark:text-gray-400">Hi there!</div>
            <div className="text-gray-500 dark:text-gray-400">
              개발자 지망생의 블로그에 어서오세요
            </div>
            <div className="flex space-x-3 pt-6">개발 관련 일상 & 취미 생활</div>
            <div className="text-gray-500 dark:text-gray-400">아마도 🍁?</div>
          </div>
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            최근 글
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          모두 보기 &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {/* {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )} */}
    </>
  )
}
