import { FC, ReactNode, createContext, useContext, useState } from 'react'

interface SwitchConfig {
  status: boolean
  toggle: () => void
}

const SwitchContext = createContext<SwitchConfig | null>(null)

export const SwitchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState(false)

  return (
    <SwitchContext.Provider
      value={{
        status,
        toggle: () => setStatus(!status)
      }}
    >
      {children}
    </SwitchContext.Provider>
  )
}

export const useSwitch = (): SwitchConfig => {
  const context = useContext(SwitchContext)
  if (!context) {
    throw new Error('Missing switch context')
  }

  const { status, toggle } = context
  return { status, toggle }
}
