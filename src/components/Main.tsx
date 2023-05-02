import { useContext, useEffect, useRef, useState } from "react";
import { AppC } from "../context/Context";
import Insert from "./SearchInput/Insert";
import { ObjectCharacter } from "../type/typeContext";
import Group from "./Group/Group";

interface CharacterName {
  CharacterName: string
}

function Main() {
  const { input, elName, organ } = useContext(AppC);
  const length = useRef<number>(0);
  const [state, setState] = useState(0);
  const body = document.getElementsByTagName("body")[0];

  ///검색 이벤트
  const searchE = () => {
    //map 돌면서 ref에 모든 캐릭터 정보가 들어감
    const update = (privacy: ObjectCharacter) => {
      organ.current = [...organ.current, privacy]
      // Ref에 쌓이고 렌더링이 일어날 수 있게 마지막에 렌더링시킴, 레벨순으로 정렬
      if (organ.current.length === length.current) {
        organ.current.sort((a, b)=> {
          if (a.ItemMaxLevel > b.ItemMaxLevel) {
            return -1;
          } else if (a.ItemMaxLevel < b.ItemMaxLevel) {
            return 1;
          } else {
            return 0;
          }
        });
        //렌더링 설정
        setState(state + 1);
      }
    }
    //입력한 캐릭터 검색
    input && fetch  (`https://developer-lostark.game.onstove.com/characters/${input}/siblings`, {
      headers:{
        'accept':'application/json',
        'authorization':'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxMDQzNjkifQ.m8gzbGMVUWCWjtKflQzWnUCoPipdIBqaB5g60LJmr_DA505X6PrDMtTIsH9O_1DqXKdapyXzhs3kHrMgGl_FPlUsDSjkX9aYH2B77mUOLaNDUpqRHQOsIvWZz4Pi0-StkK4OLec0Av_B3VPUBqd4XGgOyrzTh8umEJB5q5hdjPkk0mfjxCflmuVWtxC9TYx-JvM50thbbZ8tcDWUIOUX7AExcGp7wlJ64SejlpD3VUscA3x21-3xxjDn1TjmjbE41-2K8nGHZsXIJ86MGEbZnzxDkECjhHyKtxvNbDUJySIP4qRlzmOiUQuXGopvt-zeEWyNYkDvep7iQ2jhNFaQlQ'
      },
    })
    .then(res => res.json())
    .then(characters => {
      //캐릭터 이름 검색한걸로 보유중인 캐릭터 전부 map돌려서 재검색 하면서 update함수 실행
      group(characters)
      characters.map(async(obj: CharacterName)=> {
        return await fetch(`https://developer-lostark.game.onstove.com/armories/characters/${obj.CharacterName}/profiles`,{
            headers:{
              'accept':'application/json',
              'authorization':'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxMDQzNjkifQ.m8gzbGMVUWCWjtKflQzWnUCoPipdIBqaB5g60LJmr_DA505X6PrDMtTIsH9O_1DqXKdapyXzhs3kHrMgGl_FPlUsDSjkX9aYH2B77mUOLaNDUpqRHQOsIvWZz4Pi0-StkK4OLec0Av_B3VPUBqd4XGgOyrzTh8umEJB5q5hdjPkk0mfjxCflmuVWtxC9TYx-JvM50thbbZ8tcDWUIOUX7AExcGp7wlJ64SejlpD3VUscA3x21-3xxjDn1TjmjbE41-2K8nGHZsXIJ86MGEbZnzxDkECjhHyKtxvNbDUJySIP4qRlzmOiUQuXGopvt-zeEWyNYkDvep7iQ2jhNFaQlQ'
            }
        })
        .then(res => res.json())
        .then(privacy => {
          update(privacy)
        })
      })
    });
    
  };
   //마지막 개수 확인용 및 없는 닉네임 에러 출력
  const group = (groupLength: []) => {
    try {
      length.current = groupLength.length
    } catch {
      alert('닉네임 정보가 없습니다! 다시 입력하세요.')
      elName.current!.value = ''
    }
  }
  //인풋의 값이 바뀌면 img길이 초기화하고 searchE 실행
  useEffect(() => {
    organ.current = []
    searchE();
    body.style.height = "100vh";
    body.style.backgroundColor = "#15181d";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[input]);
  return (
    <div className="App">
      <header>
        <Insert/>
      </header>
      <main className="first-main">
        <div className="search-box">
          <ul>
            <Group />
          </ul>
        </div>
      </main>
    </div>
  )
}

export default Main