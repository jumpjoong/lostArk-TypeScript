import React, { createContext, useRef, useState } from "react"
import { Effects, Gems, ObjectCharacter, Weapon } from "../type/typeContext"

interface AppContextProps {
  elName: React.RefObject<HTMLInputElement>;
  search: (e: React.FormEvent<HTMLFormElement>) => void;
  setInput: React.Dispatch<React.SetStateAction<string | null>>;
  input: string | null;
  organ: React.MutableRefObject<ObjectCharacter[]>;
  char: ObjectCharacter | undefined;
  setChar: React.Dispatch<React.SetStateAction<ObjectCharacter | undefined>>;
  effects: Effects[];
  setEffects: React.Dispatch<React.SetStateAction<Effects[]>>;
  weapon: Weapon[];
  setWeapon: React.Dispatch<React.SetStateAction<Weapon[]>>;
  gems: Gems;
  setGems:  React.Dispatch<React.SetStateAction<Gems>>
  legend: React.CSSProperties;
  hero: React.CSSProperties;
  hide: boolean;
  setHide: React.Dispatch<boolean>;
}


export const AppC = createContext<AppContextProps>({} as AppContextProps);

export const Context = ({children}: {children: JSX.Element}) => {
  const elName = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string | null>(null);
  const organ = useRef<ObjectCharacter[]>([]);
  const [char, setChar] = useState<ObjectCharacter>();
  const [effects, setEffects] = useState<Effects[]>([{
    Description: null,
    GemSlot: null,
    Icon: null,
    Name: null,
    Tooltip: null,
  }]);
  const [gems, setGems] = useState<Gems>({
    Effects: {
      Description: null,
      GemSlot: null,
      Icon: null,
      Name: null,
      Tooltip: null,
    },
    Gems: [{
      Grade:  null,
      Icon:  null,
      Level:  null,
      Name:  null,
      Slot:  null,
      Tooltip:  null,
    }]
  });
  const [weapon, setWeapon] = useState<Weapon[]>([])
  const [hide, setHide] = useState(false)
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

  const value = { setInput, elName, search, input, organ, char, setChar, effects, setEffects, gems, setGems, weapon, setWeapon, legend, hero, setHide, hide };

  return (
    <AppC.Provider value={value}>
      {children}
    </AppC.Provider>
  )
}
