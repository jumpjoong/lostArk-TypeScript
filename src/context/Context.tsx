import React, { createContext, useRef, useState } from "react"
import { Effects, Gems, ObjectCharacter } from "../type/typeContext"

interface AppContextProps {
  elName: React.RefObject<HTMLInputElement>;
  search: (e: React.FormEvent<HTMLFormElement>) => void;
  input?: string;
  organ: React.MutableRefObject<ObjectCharacter[]>;
  char: ObjectCharacter | undefined;
  setChar: React.Dispatch<React.SetStateAction<ObjectCharacter | undefined>>;
  effects: Effects | undefined;
  setEffects: React.Dispatch<React.SetStateAction<Effects | undefined>>;
  gems: Gems | undefined;
  setGems: React.Dispatch<React.SetStateAction<Gems | undefined>>
}

export const AppC = createContext<AppContextProps>({} as AppContextProps);

export const Context = ({children}: {children: JSX.Element}) => {
  const elName = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>();
  const organ = useRef<ObjectCharacter[]>([]);
  const [char, setChar] = useState<ObjectCharacter>();
  const [effects, setEffects] = useState<Effects>();
  const [gems, setGems] = useState<Gems>()
  
  const search: AppContextProps['search'] = (e) => {
    e.preventDefault();
    if (elName.current) {
      setInput(elName.current.value); //인풋창에 입력한 정보를 setInput으로 보냄
    }
    document.cookie = "safeCookie1=foo; SameSite=Lax"; 
    document.cookie = "safeCookie2=foo";  
    document.cookie = "crossCookie=bar; SameSite=None; Secure";
  }

  const value = { elName, search, input, organ, char, setChar, effects, setEffects, gems, setGems };

  return (
    <AppC.Provider value={value}>
      {children}
    </AppC.Provider>
  )
}
