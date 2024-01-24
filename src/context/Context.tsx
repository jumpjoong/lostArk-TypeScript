import React, { createContext, useRef, useState } from "react"
import { Effects, GemsType, ObjectCharacter, Weapon } from "../type/typeContext"

interface AppContextProps {
  elName: React.RefObject<HTMLInputElement>;
  search: (e: React.FormEvent<HTMLFormElement>) => void;
  input: string | null;
  test: ObjectCharacter[];
  setTest: React.Dispatch<React.SetStateAction<ObjectCharacter[]>>;
  char: ObjectCharacter | undefined;
  setChar: React.Dispatch<React.SetStateAction<ObjectCharacter | undefined>>;
  effects: Effects[];
  setEffects: React.Dispatch<React.SetStateAction<Effects[]>>;
  weapon: Weapon[];
  setWeapon: React.Dispatch<React.SetStateAction<Weapon[]>>;
  gems: GemsType[];
  setGems:  React.Dispatch<React.SetStateAction<GemsType[]>>
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
  //input 창에 입력되는 텍스트 (Insert.tsx, Main.tsx, )
  const elName = useRef<HTMLInputElement>(null);
  //입력창에 입력된 값(Main.tsx)
  const [input, setInput] = useState<string | null>(null);
  //보유중인 캐릭터 그룹 (Group.tsx, List.tsx)
  const [test, setTest] = useState<ObjectCharacter[]>([]);
  //입력한 캐릭터 정보 (List.tsx)
  const [char, setChar] = useState<ObjectCharacter>();
  //보유중인 보석 정보(ex.보석 이름, 보석 효과) (Gem.tsx)
  const [effects, setEffects] = useState<Effects[]>([{
    Description: null,
    GemSlot: null,
    Icon: null,
    Name: null,
    Tooltip: null,
  }]);
  //보유중인 보석 (Gems.tsx)
  const [gems, setGems] = useState<GemsType[]>([{
    Grade:  null,
    Icon:  null,
    Level:  null,
    Name:  null,
    Slot:  null,
    Tooltip:  null,
  }]);
  //보유중인 장비 (Weapon.tsx)
  const [weapon, setWeapon] = useState<Weapon[]>([])
  //더보기 컨트롤(Weapon.tsx)
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
  const value = { test, setTest, char, setChar, gems, setGems, effects, setEffects, weapon, setWeapon, hide, setHide,estherColor, relicsColor, heroColor, legendColor, oldColor, esther, old, relics, hero, legend, elName, search, input };
  
  return (
    <AppC.Provider value={value}>
      {children}
    </AppC.Provider>
  )
}