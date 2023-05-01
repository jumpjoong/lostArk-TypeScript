import React, { createContext, useRef, useState } from "react"
import { Effects, Gems, ObjectCharacter, Weapon } from "../type/typeContext"

interface AppContextProps {
  elName: React.RefObject<HTMLInputElement>;
  search: (e: React.FormEvent<HTMLFormElement>) => void;
  input?: string;
  organ: React.MutableRefObject<ObjectCharacter[]>;
  char: ObjectCharacter | undefined;
  setChar: React.Dispatch<React.SetStateAction<ObjectCharacter | undefined>>;
  effects: Effects[] | null;
  setEffects: React.Dispatch<React.SetStateAction<Effects[] | null>>;
  weapon: Weapon | undefined;
  setWeapon: React.Dispatch<React.SetStateAction<Weapon | undefined>>;
  gems: Gems;
  setGems:  React.Dispatch<React.SetStateAction<Gems>>
  legend: React.CSSProperties;
  hero: React.CSSProperties;
}


export const AppC = createContext<AppContextProps>({} as AppContextProps);

export const Context = ({children}: {children: JSX.Element}) => {
  const elName = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>();
  const organ = useRef<ObjectCharacter[]>([]);
  const [char, setChar] = useState<ObjectCharacter>();
  const [effects, setEffects] = useState<Effects[] | null>([]);
  const [gems, setGems] = useState<Gems>({
    Effects: [{
      Description: null,
      GemSlot: null,
      Icon: null,
      Name: null ,
      Tooltip: null
    }],
    Gems: [{
      Grade:  null,
      Icon:  null,
      Level:  null,
      Name:  null,
      Slot:  null,
      Tooltip:  null,
    }]
  });
  const [weapon, setWeapon] = useState<Weapon>()
  
  const legend = { //전설 백그라운드
    background : 'linear-gradient(135deg, #362003, #9e5f04)'
  };
  const hero = {  //영웅 백그라운드
    background : 'linear-gradient(135deg, #261331, #480d5d)'
  }

  const search: AppContextProps['search'] = (e) => {
    e.preventDefault();
    if (elName.current) {
      setInput(elName.current.value); //인풋창에 입력한 정보를 setInput으로 보냄
    }
    document.cookie = "safeCookie1=foo; SameSite=Lax"; 
    document.cookie = "safeCookie2=foo";  
    document.cookie = "crossCookie=bar; SameSite=None; Secure";
  }

  const value = { elName, search, input, organ, char, setChar, effects, setEffects, gems, setGems, weapon, setWeapon, legend, hero };

  return (
    <AppC.Provider value={value}>
      {children}
    </AppC.Provider>
  )
}
