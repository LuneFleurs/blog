import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import logo from '@/data/logo.png'
import Image from 'next/image'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import React, { useState, useEffect, useRef, useContext } from 'react'
import { MobileNavContext } from './MobileNavContext'

const LayoutWrapper = ({ children }) => {
  const { navShow } = useContext(MobileNavContext)
  const [isNavBarVisible, setIsNavBarVisible] = useState(true)
  const timeoutId = useRef(null)

  useEffect(() => {
    const handleUserActivity = () => {
      if (timeoutId.current) clearTimeout(timeoutId.current)

      // 페이지 최상단에 있거나 모바일 네비게이션 메뉴가 활성화된 상태일 때는 네비게이션 바를 항상 표시합니다.
      if (window.scrollY === 0 || navShow) {
        setIsNavBarVisible(true)
      } else {
        setIsNavBarVisible(true)

        timeoutId.current = setTimeout(() => {
          setIsNavBarVisible(false)
        }, 2000)
      }
    }
    window.addEventListener('mousemove', handleUserActivity)
    window.addEventListener('keydown', handleUserActivity)
    window.addEventListener('scroll', handleUserActivity)

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current)
      window.removeEventListener('mousemove', handleUserActivity)
      window.removeEventListener('keydown', handleUserActivity)
      window.removeEventListener('scroll', handleUserActivity)
    }
  }, [navShow])

  const headerStyle = {
    transform: isNavBarVisible ? 'translateY(0)' : 'translateY(-100%)',
    opacity: isNavBarVisible ? '1' : '0',
  }
  const blurBackgroundStyle = { transform: isNavBarVisible ? 'translateY(0)' : 'translateY(-100%)' }

  return (
    <SectionContainer>
      <div className="flex h-auto flex-col justify-between rounded-b-xl">
        <header
          className={`sticky top-0 z-10 flex w-full items-center justify-between rounded-b-xl bg-opacity-80 py-5 shadow-lg transition-all duration-500 ease-in-out ${
            isNavBarVisible ? '' : 'translate-y-full'
          } `}
          style={headerStyle}
        >
          <div
            className="transition-backdrop-filter absolute inset-0 -z-10 rounded-b-xl bg-opacity-80 backdrop-blur-md delay-200 duration-300 ease-in-out"
            style={blurBackgroundStyle}
          ></div>
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                {/* {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )} */}
                <div className="mr-3">
                  <Image src={logo} alt="blog logo" width={104} height={75} />
                  {/* <Logo /> */}
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
