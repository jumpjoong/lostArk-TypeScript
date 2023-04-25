import { createContext, useRef, useState } from "react"

export interface AppContextProps {
  elName: React.RefObject<HTMLInputElement>;
  search: (e: React.FormEvent<HTMLFormElement>) => void;
  input?: string;
  organ: React.MutableRefObject<object[]>;
}

interface aaaa {
  CharacterClassName: string;
  CharacterImage?: string;
  CharacterLevel: number;
  CharacterName: string;
  ExpeditionLevel: number;
  GuildMemberGrade?: string;
  GuildName?: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
  PvpGradeName?: string;
  ServerName: string;
  Stats: [];
  Tendencies: [];
  Title?: string | null
  TotalSkillPoint: number;
  TownLevel: number;
  TownName: string;
  UsingSkillPoint: number
}

export const AppC = createContext<AppContextProps>({} as AppContextProps);

export const Context = ({children}: {children: JSX.Element}) => {
  const elName = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>();
  const organ = useRef<object[]>([]);
  
  const search: AppContextProps['search'] = (e) => {
    e.preventDefault();
    if (elName.current) {
      setInput(elName.current.value); //인풋창에 입력한 정보를 setInput으로 보냄
    }
    document.cookie = "safeCookie1=foo; SameSite=Lax"; 
    document.cookie = "safeCookie2=foo";  
    document.cookie = "crossCookie=bar; SameSite=None; Secure";
  }

  const value = {elName, search, input, organ}

  return (
    <AppC.Provider value={value}>
      {children}
    </AppC.Provider>
  )
}
