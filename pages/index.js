import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Image from '@/components/Image'
import Avatar from '@/data/avatar.png'
import projectsData from '@/data/projectsData'
import Card from '@/components/CardView'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import TypingEffect from './typingEffect'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import SwiperCore from 'swiper/core'

import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5
const indices = [0, 1, 2, 3]
const selectedProjects = indices.map((index) => projectsData[index])
SwiperCore.use([Pagination, Navigation])

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  const avatarRef = useRef(null)
  const swiperRef = useRef(null)

  const handlePrev = () => {
    swiperRef.current?.swiper.slidePrev()
  }

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext()
  }

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
      <style jsx global>{`
        /* Pagination */
        .swiper-pagination-bullet-active {
          background: #06b6d4 !important; /* Tailwind's cyan.500 */
        }

        /* Pagination */
        .swiper-pagination {
          position: absolute;
          bottom: -20px; /* adjust as needed */
          transform: -translate-y-full;
        }

        .swiper-container {
          overflow: visible;
        }
      `}</style>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <div className="flex flex-col items-center pt-8">
            <div className="rounded-full shadow-lg">
              <div ref={avatarRef} className="rounded-full">
                <Image
                  src={Avatar}
                  alt="avatar"
                  width={192}
                  height={192}
                  className="h-48 w-48 rounded-full"
                />
              </div>
            </div>

            {/* <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">Hello!</h3> */}

            <div className="flex flex-col items-center py-5">
              <TypingEffect />
              <div className="text-gray-500 dark:text-gray-400">Hi there!</div>
              <div className="text-gray-500 dark:text-gray-400">
                개발자 지망생의 블로그에 어서오세요
              </div>
              <div className="flex space-x-3 pt-6">개발 관련 일상 & 취미 생활</div>
              <div className="text-gray-500 dark:text-gray-400">아마도 🍁?</div>
            </div>
            <br />
          </div>
          <div className="pt-4">
            <h2 className="py-5 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              최근 소식
            </h2>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {siteMetadata.description}
            </p>
          </div>
        </div>
        <div className="container relative py-12">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 z-10 -translate-x-full -translate-y-1/2 transform p-2 text-4xl text-cyan-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22 22"
              width="60"
              height="60"
              style={{ transform: 'scaleX(-1)' }}
            >
              <defs>
                <clipPath>
                  <path fill="#06b6d4" fillOpacity=".514" d="m-7 1024.36h34v34h-34z" />
                </clipPath>
                <clipPath>
                  <path fill="#06b6d4" fillOpacity=".472" d="m-6 1028.36h32v32h-32z" />
                </clipPath>
              </defs>
              <path
                d="m345.44 248.29l-194.29 194.28c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744l171.91-171.91-171.91-171.9c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.29 194.28c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373"
                transform="matrix(.03541-.00013.00013.03541 2.98 3.02)"
                fill="#06b6d4"
              />
            </svg>
          </button>
          <Swiper
            ref={swiperRef}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              el: '.custom-pagination',
              clickable: true,
            }}
            loop={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            }}
          >
            {selectedProjects.map((d, index) => (
              <SwiperSlide key={index}>
                <Card title={d.title} description={d.description} imgSrc={d.imgSrc} href={d.href} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-full transform p-2 text-4xl text-cyan-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" width="60" height="60">
              <defs>
                <clipPath>
                  <path fill="#06b6d4" fillOpacity=".514" d="m-7 1024.36h34v34h-34z" />
                </clipPath>
                <clipPath>
                  <path fill="#06b6d4" fillOpacity=".472" d="m-6 1028.36h32v32h-32z" />
                </clipPath>
              </defs>
              <path
                d="m345.44 248.29l-194.29 194.28c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744l171.91-171.91-171.91-171.9c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.29 194.28c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373"
                transform="matrix(.03541-.00013.00013.03541 2.98 3.02)"
                fill="#06b6d4"
              />
            </svg>
          </button>
          <div className="custom-pagination z-10 flex justify-center"></div>
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
