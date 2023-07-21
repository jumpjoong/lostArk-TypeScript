import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppC } from "../context/Context";
import { Effects } from "../type/typeContext";
import List from "./List/List";
import Gems from "./Gem/Gems";
import Weapons from "./Weapon/Weapons";

interface WarStats {
  Type: string;
  Value: string;
}

interface BasicStats {
  Type: string;
  Value: string;
}

interface Engra {
  Effects: {
    Description: string;
    Name: string;
  }[];
  Engravings: {
    Icon: string;
    Name: string;
    Slot: number
  }[];
}

interface Levels {
  Grade: string | null;
  Icon: string | null;
  Level: number | null;
  Name: string | null | TrustedHTML;
  Slot: number | null;
  Tooltip: number | null;
};

function Characters() {
  const name = useLocation();
  const [engra, setEngra] = useState<Engra>();
  const { gems, char, setChar, setEffects, setGems, setWeapon, hide, setHide } = useContext(AppC);
  useEffect(() => {
    name && fetch(`https://developer-lostark.game.onstove.com/armories/characters/${name.state.name}/profiles`,{
      headers:{
        'accept':'application/json',
        'authorization':'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxMDQzNjkifQ.m8gzbGMVUWCWjtKflQzWnUCoPipdIBqaB5g60LJmr_DA505X6PrDMtTIsH9O_1DqXKdapyXzhs3kHrMgGl_FPlUsDSjkX9aYH2B77mUOLaNDUpqRHQOsIvWZz4Pi0-StkK4OLec0Av_B3VPUBqd4XGgOyrzTh8umEJB5q5hdjPkk0mfjxCflmuVWtxC9TYx-JvM50thbbZ8tcDWUIOUX7AExcGp7wlJ64SejlpD3VUscA3x21-3xxjDn1TjmjbE41-2K8nGHZsXIJ86MGEbZnzxDkECjhHyKtxvNbDUJySIP4qRlzmOiUQuXGopvt-zeEWyNYkDvep7iQ2jhNFaQlQ'
      }
    })
    .then(res=>res.json())
    .then(abc => {
      //캐릭터 상세 스펙
      setChar(abc);
      fetch(`https://developer-lostark.game.onstove.com/armories/characters/${name.state.name}/engravings`,{
        headers:{
          'accept':'application/json',
          'authorization':'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxMDQzNjkifQ.m8gzbGMVUWCWjtKflQzWnUCoPipdIBqaB5g60LJmr_DA505X6PrDMtTIsH9O_1DqXKdapyXzhs3kHrMgGl_FPlUsDSjkX9aYH2B77mUOLaNDUpqRHQOsIvWZz4Pi0-StkK4OLec0Av_B3VPUBqd4XGgOyrzTh8umEJB5q5hdjPkk0mfjxCflmuVWtxC9TYx-JvM50thbbZ8tcDWUIOUX7AExcGp7wlJ64SejlpD3VUscA3x21-3xxjDn1TjmjbE41-2K8nGHZsXIJ86MGEbZnzxDkECjhHyKtxvNbDUJySIP4qRlzmOiUQuXGopvt-zeEWyNYkDvep7iQ2jhNFaQlQ'
        }
      })
      .then(res=>res.json())
      .then(abc => {
        //착용 중인 각인//
        setEngra(abc);
        //////////////
        fetch(`https://developer-lostark.game.onstove.com/armories/characters/${name.state.name}/gems`,{
          headers:{
            'accept':'application/json',
            'authorization':'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxMDQzNjkifQ.m8gzbGMVUWCWjtKflQzWnUCoPipdIBqaB5g60LJmr_DA505X6PrDMtTIsH9O_1DqXKdapyXzhs3kHrMgGl_FPlUsDSjkX9aYH2B77mUOLaNDUpqRHQOsIvWZz4Pi0-StkK4OLec0Av_B3VPUBqd4XGgOyrzTh8umEJB5q5hdjPkk0mfjxCflmuVWtxC9TYx-JvM50thbbZ8tcDWUIOUX7AExcGp7wlJ64SejlpD3VUscA3x21-3xxjDn1TjmjbE41-2K8nGHZsXIJ86MGEbZnzxDkECjhHyKtxvNbDUJySIP4qRlzmOiUQuXGopvt-zeEWyNYkDvep7iQ2jhNFaQlQ'
          }
        })
        .then(res=>res.json())
        .then(gem => {
          //보석 정보
          if (gem !== null) {
            setEffects(gem.Effects.sort((a: Effects, b: Effects) => {
              if (a.GemSlot && b.GemSlot) {
                if (a.GemSlot < b.GemSlot) {
                  return -1;
                };
              };
            }));
            // setGems(gem);
            setGems(gem.Gems.sort((a: Levels, b: Levels) => {
              if (a.Level && b.Level) {
                if (a.Level > b.Level) {
                  return -1;
                };
              };
            }));
            fetch(`https://developer-lostark.game.onstove.com/armories/characters/${name.state.name}/equipment`,{
              headers:{
                'accept':'application/json',
                'authorization':'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxMDQzNjkifQ.m8gzbGMVUWCWjtKflQzWnUCoPipdIBqaB5g60LJmr_DA505X6PrDMtTIsH9O_1DqXKdapyXzhs3kHrMgGl_FPlUsDSjkX9aYH2B77mUOLaNDUpqRHQOsIvWZz4Pi0-StkK4OLec0Av_B3VPUBqd4XGgOyrzTh8umEJB5q5hdjPkk0mfjxCflmuVWtxC9TYx-JvM50thbbZ8tcDWUIOUX7AExcGp7wlJ64SejlpD3VUscA3x21-3xxjDn1TjmjbE41-2K8nGHZsXIJ86MGEbZnzxDkECjhHyKtxvNbDUJySIP4qRlzmOiUQuXGopvt-zeEWyNYkDvep7iQ2jhNFaQlQ'
              }
            })
            .then(res => res.json())
            .then(abc => {
              setWeapon(abc);
            });
          } else {
            setEffects([{
              Description: null,
              GemSlot: null,
              Icon: null,
              Name: null,
              Tooltip: null,
            }]);
            setGems([{
              Grade:  null,
              Icon:  null,
              Level:  null,
              Name:  null,
              Slot:  null,
              Tooltip:  null,
            }]);
            fetch(`https://developer-lostark.game.onstove.com/armories/characters/${name.state.name}/equipment`,{
              headers:{
              'accept':'application/json',
              'authorization':'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxMDQzNjkifQ.m8gzbGMVUWCWjtKflQzWnUCoPipdIBqaB5g60LJmr_DA505X6PrDMtTIsH9O_1DqXKdapyXzhs3kHrMgGl_FPlUsDSjkX9aYH2B77mUOLaNDUpqRHQOsIvWZz4Pi0-StkK4OLec0Av_B3VPUBqd4XGgOyrzTh8umEJB5q5hdjPkk0mfjxCflmuVWtxC9TYx-JvM50thbbZ8tcDWUIOUX7AExcGp7wlJ64SejlpD3VUscA3x21-3xxjDn1TjmjbE41-2K8nGHZsXIJ86MGEbZnzxDkECjhHyKtxvNbDUJySIP4qRlzmOiUQuXGopvt-zeEWyNYkDvep7iQ2jhNFaQlQ'
              }
            })
            .then(res => res.json())
            .then(abc => {
              setWeapon([{
                Grade: null,
                Icon: null,
                Name: null,
                Tooltip: null,
                Type: null,
              }]);
            });
          };
        });
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[name]);
  
  let ws: WarStats[] = [];
  let bs: BasicStats[] = [];
  
  // 기본특성, 전투특성 나누기
  if(char !== undefined){
    ws = char.Stats.slice(0,6).map((obj: any) => ({
      Type: obj.Type,
      Value: obj.Value,
    }));
    bs = char.Stats.slice(6,8).map((obj: any) => ({
      Type: obj.Type,
      Value: obj.Value,
    }));
  }
  //더보기 컨트롤
  const more = () => {
    setHide(!hide)
  }
  return (
    <main className="second-main">
      <div className='char'>
        <List />
        <div className="info">
          <div className="info-box">
            <div>
              <img src = {char && char.CharacterImage} alt="" className='image'></img>
            </div>
            <div className="serve">
              <dl className='server'>
                <dt>&nbsp;서&nbsp;&nbsp;&nbsp;&nbsp;버&nbsp;</dt>
                <dd>
                  {
                    char && char.ServerName
                  }
                </dd>
              </dl>
              <dl className='class'>
                <dt>&nbsp;클래스&nbsp;</dt>
                <dd>
                  {
                    char && char.CharacterClassName
                  }
                </dd>
              </dl>
              <dl className='expedition-level'>
                <dt>&nbsp;원정대&nbsp;</dt>
                <dd>
                  {
                    char && char.ExpeditionLevel
                  }
                </dd>
              </dl>
              <dl className='level'>
                <dt>&nbsp;전&nbsp;&nbsp;&nbsp;&nbsp;투&nbsp;</dt>
                <dd>
                  {
                    char && char.CharacterLevel
                  }
                </dd>
              </dl>
              <dl className='item-level'>
                <dt>&nbsp;템&nbsp;&nbsp;&nbsp;&nbsp;렙&nbsp;</dt>
                <dd>
                  {
                    char && char.ItemAvgLevel
                  }
                </dd>
              </dl>
              <dl className='town-level'>
                <dt>&nbsp;영&nbsp;&nbsp;&nbsp;&nbsp;지&nbsp;</dt>
                <dd>Lv. 
                  {
                    char && char.TownLevel
                  }&nbsp;
                  {
                    char && char.TownName
                  }
                </dd>
              </dl>
              <dl className='pvp-level'>
                <dt>&nbsp;P&nbsp;&nbsp;V&nbsp;&nbsp;P&nbsp;</dt>
                <dd>
                  {
                    char && char.PvpGradeName
                  }
                </dd>
              </dl>
              <dl className='guild'>
                <dt>&nbsp;길&nbsp;&nbsp;&nbsp;&nbsp;드&nbsp;</dt>
                <dd>
                  {
                    char && char.GuildName
                  }
                </dd>
              </dl>
            </div>
            <div className="stats">
              <div className="stats-box">
                <div className="basic">
                  <p>기본특성</p>
                  <div className="basic-second">
                    {
                      bs && bs.map((obj, key)=> {
                        return <div key={key}>
                          <p >
                            {obj.Type}
                          </p>
                          <p>
                            {obj.Value}
                          </p>
                        </div>
                      })
                    }
                  </div>
                </div>
                <div className="war">
                <p>전투특성</p>
                  <div className="war-second">
                    {
                      char && ws.map((obj, key)=> {
                        return <div key={key}>
                          <p >
                            {obj.Type}
                          </p>
                          <p>
                            {obj.Value}
                          </p>
                        </div>
                      })
                    }
                  </div>
                </div>
                <div className="mococo">
                <p>성향</p>
                  <div className="mococo-second">
                    {
                      char && char.Tendencies.map((obj, key)=> {
                        return <div key={key}>
                          <p >
                            {obj.Type}
                          </p>
                          <p>
                            {obj.Point}
                          </p>
                        </div>
                      })
                    }
                  </div>
                </div>
                <div className="engrave">
                <p>각인 효과</p>
                  <div className="engrave-second">
                    {
                      engra && engra.Effects.map((obj, key)=> {
                        return <div key={key}>
                          <p >
                            {obj.Name}
                          </p>
                        </div>
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="more">
          <div className="">
            <ul>
            {
              gems && gems.map((obj, key) => {
                return <Gems key={key} idx={obj.Slot} obj={obj} />
              })
            }
            </ul>
          </div>
        </div>
        <div className="weapon-wrap">
          <div className="wrap">
            <div className="see">
              <button className="w" onClick={more}><p>더보기</p></button>
            </div>
            <Weapons />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Characters