import React, { createContext, useRef, useState } from "react"
import { Effects, Gems, ObjectCharacter, Weapon } from "../type/typeContext"

interface AppContextProps {
  elName: React.RefObject<HTMLInputElement>;
  search: (e: React.FormEvent<HTMLFormElement>) => void;
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
  relics: React.CSSProperties;
  old: React.CSSProperties;
  esther: React.CSSProperties;
  oldColor: React.CSSProperties;
  heroColor: React.CSSProperties;
  legendColor: React.CSSProperties;
  relicsColor: React.CSSProperties;
  estherColor: React.CSSProperties;
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
  const relics = {  //유물 백그라운드
    background : 'linear-gradient(135deg, #341a09, #a24006)'
  }
  const old = {     //고대 백그라운드
    background : 'linear-gradient(135deg, #3d3325, #dcc999)'
  }
  const esther = {  //에스더 백그라운드
    background : 'linear-gradient(135deg,#0c2e2c,#2faba8)'
  }
  const oldColor = {
    color : '#dcc999'
  }
  const legendColor = {
    color :  '#9e5f04'
  }
  const heroColor = {
    color :  '#480d5d'
  }
  const relicsColor = {
    color :  '#a24006'
  }
  const estherColor = {
    color : '#2faba8'
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

  const value = { char, setChar, gems, setGems, effects, setEffects, weapon, setWeapon, hide, setHide,estherColor, relicsColor, heroColor, legendColor, oldColor, esther, old, relics, hero, legend, organ, elName, search, input };

  return (
    <AppC.Provider value={value}>
      {children}
    </AppC.Provider>
  )
}
