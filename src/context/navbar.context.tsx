import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

type SidebarContextType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export const SidebarContext = createContext<SidebarContextType>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => null,
});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const value = { isSidebarOpen, setIsSidebarOpen };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
