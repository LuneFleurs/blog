import { createContext, useState } from 'react'

export const MobileNavContext = createContext()

export const MobileNavProvider = ({ children }) => {
  const [navShow, setNavShow] = useState(false)

  return (
    <MobileNavContext.Provider value={{ navShow, setNavShow }}>
      {children}
    </MobileNavContext.Provider>
  )
}
