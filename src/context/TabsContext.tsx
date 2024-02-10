import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react'

type TabsState = {
  active: null | string
  setActive: Dispatch<SetStateAction<null | string>>
}

const TabsContext = createContext<TabsState | null>(null)

type TabsProviderProps = {
  children: ReactNode
  initialValue: string
}

export const TabsProvider = ({ children, initialValue }: TabsProviderProps) => {
  const [active, setActive] = useState<string | null>(initialValue)

  return (
    <TabsContext.Provider
      value={{
        active,
        setActive,
      }}
    >
      {children}
    </TabsContext.Provider>
  )
}

export const useTabsContext = () => {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error('useTabsContext should used inside TabsProvider')
  }

  return context
}
