import { useContext, useRef } from "react"
import { AppC } from "../../context/Context"
interface ddd {
  type: string ,
  value: string
}
function Weapons() {
  const {weapon, hide} = useContext(AppC);
  const ccc = useRef<object[]>([])
  const num = [];
  const filt = weapon && weapon.filter((item)=> item.Type !== '')
  const abil = weapon && weapon.filter((item)=> item.Type == "어빌리티 스톤")
  //2일 째 고생하다 마음 꺾이기 전에 현업 친구한테 물어본 코드...그것은 바로 깊은 복제란다...
  //겨우 한 줄로 며칠을 고생한거야...
  const abilTip = abil[0]?.Tooltip && JSON.parse(JSON.parse(JSON.stringify(abil[0]?.Tooltip)))

  const changeArrayOrder = function(list: object[], targetIdx: number, moveValue: number) {
    // 배열값이 없는 경우 나가기
    if (list.length < 0) return;
  
    // 이동할 index 값을 변수에 선언
    const newPosition = targetIdx + moveValue;
  
    // 이동할 값이 0보다 작거나 최대값을 벗어나는 경우 종료
    if (newPosition < 0 || newPosition >= list.length) return;
  
    // 임의의 변수를 하나 만들고 배열 값 저장
    const tempList = JSON.parse(JSON.stringify(list));
  
    // 옮길 대상을 target 변수에 저장하기
    const target = tempList.splice(targetIdx, 1)[0];
  
    // 새로운 위치에 옮길 대상을 추가하기
    tempList.splice(newPosition, 0, target);
    return tempList;
  };
  
  // 장비 배열 순서 바꿈
  let list1 = filt && changeArrayOrder(filt, 1, -1)
  let list2 = list1 && changeArrayOrder(list1, 6, -5)
  let list3 = list2 && changeArrayOrder(list2, 2, 8)
  let list4 = list3 && changeArrayOrder(list3, 5, -3)
  let list5 = list4 && changeArrayOrder(list4, 6, -3)
  let list6 = list5 && changeArrayOrder(list5, 7, -2)
  let list7 = list6 && changeArrayOrder(list6, 8, -1)

  // 품질 숫자 따오기
  if (list7 !== undefined) {
    for (let i = 0; i < list7.length; i++) {
      ccc.current = [...ccc.current, JSON.parse(list7[i].Tooltip)]
    }
  }
  // 각인 활성화 이미지
  let bb = [];
  let cc:ddd[] = [];
  let abilActive:ddd | undefined;
  bb = abilTip && Object.keys(abilTip)
  

  // 툴팁 
  if (abilTip) {
    for (let i = 0; i < bb.length; i++) { 
      cc = [...cc, (abilTip[bb[i]])]
    }
  }
  // 어빌리티스톤 찾아내기
  if (cc.length === 10 || cc.length === 9) {
    abilActive = cc.find((item: ddd) => item.type === "IndentStringGroup");
  }
  abilActive && console.log(abilActive)
  
  // 어빌리티스톤 상세하게 들어가기
  // let abilNum = [];
  // let abilEff = [];
  // if (abilActive) {
  //   abilNum.push(abilActive[0].value.Element_000.contentStr)
  // }
  
  // 어빌리티 스톤 숫자 자르기
  // for(let i = 0; i < 3; i++){
  //   let abilDetail = bb && abilActive[0].value.Element_000.contentStr[`Element_00${i}`].contentStr
  //   abilEff = bb && [...abilEff, abilDetail.slice(abilDetail.indexOf('+')+1,abilDetail.lastIndexOf('<'))]
  // }

  return (
    <div className={hide ? "eq show" : "eq noShow"}>
      {/* <div className="weapon">
        {
          list7 && list7.map((obj, key)=> {
            if (obj.Grade === "유물") {
              if (ccc.current[key].Element_001.value.qualityValue == -1) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={relics}/>
                    <div className="num">
                      <img src = {`./icon/p${abilEff[0]}.png`} alt="이미지"/>
                      <img src = {`./icon/p${abilEff[1]}.png`} alt="이미지"/>
                      <img src = {`./icon/m${abilEff[2]}.png`} alt="이미지"/>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (ccc.current[key].Element_001.value.qualityValue == 0) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={relics}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor :'gray'}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (1 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 10) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={relics}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "red"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (9 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 30) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={relics}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(219, 192, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (29 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 70) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={relics}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 183, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (69 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 90) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={relics}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 84, 255)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (89 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 100) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={relics}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(255, 0, 221)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={relics}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(255, 94, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              }
            } else if (obj.Grade === "전설") {
              if (ccc.current[key].Element_001.value.qualityValue == -1) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={legend}/>
                    <p>{num}</p>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (ccc.current[key].Element_001.value.qualityValue == 0) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={legend}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor :'gray'}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (1 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 10) {
              return <div key={key} className={`eq-weapon ${key}`}>
                <figure>
                  <img src={obj.Icon} alt="이미지" style={legend}/>
                  <div className="quality">
                    <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`}}></p>
                  </div>
                </figure>
                <div>
                  <p>{obj.Type}</p>
                  <p style={legendColor}>{obj.Name}</p>
                </div>
              </div>
              } else if (10 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 30) {
                return <div key={key} className={`eq-weapon ${key}`}>
                <figure>
                  <img src={obj.Icon} alt="이미지" style={legend}/>
                  <div className="quality">
                    <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(219, 192, 0)"}}></p>
                  </div>
                </figure>
                <div>
                  <p>{obj.Type}</p>
                  <p style={legendColor}>{obj.Name}</p>
                </div>
              </div>
              } else if (29 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 70) {
                return <div key={key} className={`eq-weapon ${key}`}>
                <figure>
                  <img src={obj.Icon} alt="이미지" style={legend}/>
                  <div className="quality">
                    <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 183, 0)"}}></p>
                  </div>
                </figure>
                <div>
                  <p>{obj.Type}</p>
                  <p style={oldColor}>{obj.Name}</p>
                </div>
              </div>
              } else if (69 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 90) {
                return <div key={key} className={`eq-weapon ${key}`}>
                <figure>
                  <img src={obj.Icon} alt="이미지" style={legend}/>
                  <div className="quality">
                    <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 84, 255)"}}></p>
                  </div>
                </figure>
                <div>
                  <p>{obj.Type}</p>
                  <p style={oldColor}>{obj.Name}</p>
                </div>
              </div>
              } else if (89 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 100){
                return <div key={key} className={`eq-weapon ${key}`}>
                <figure>
                  <img src={obj.Icon} alt="이미지" style={legend}/>
                  <div className="quality">
                    <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor: "rgb(255, 0, 221)"}}></p>
                  </div>
                </figure>
                <div>
                  <p>{obj.Type}</p>
                  <p style={oldColor}>{obj.Name}</p>
                </div>
              </div>
              } else {
                return <div key={key} className={`eq-weapon ${key}`}>
                <figure>
                  <img src={obj.Icon} alt="이미지" style={legend}/>
                  <div className="quality">
                    <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor: "rgb(255, 94, 0)"}}></p>
                  </div>
                </figure>
                <div>
                  <p>{obj.Type}</p>
                  <p style={oldColor}>{obj.Name}</p>
                </div>
              </div>
              }
            } else if (obj.Grade === "고대") {
              if (ccc.current[key].Element_001.value.qualityValue == -1) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={old}/>
                    <p>{num}</p>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (ccc.current[key].Element_001.value.qualityValue == 0) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={old}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor :'gray'}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (1 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 10) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={old}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={oldColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (9 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 30) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={old}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(219, 192, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={oldColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (29 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 70) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={old}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 183, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={oldColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (69 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 90) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={old}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 84, 255)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={oldColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (89 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 100){
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={old}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor: "rgb(255, 0, 221)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={oldColor}>{obj.Name}</p>
                  </div>
                </div>
              } else {
                return <div key={key} className={`eq-weapon ${key}`}>
                <figure>
                  <img src={obj.Icon} alt="이미지" style={old}/>
                  <div className="quality">
                    <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor: "rgb(255, 94, 0)"}}></p>
                  </div>
                </figure>
                <div>
                  <p>{obj.Type}</p>
                  <p style={oldColor}>{obj.Name}</p>
                </div>
              </div>
              }
            }else if (obj.Grade === "에스더") {
              if (ccc.current[key].Element_001.value.qualityValue == -1) {
                return <div key={key} className={`eq-weapon ${key}`} >
                <figure>
                  <img src={obj.Icon} alt="이미지" style={esther}/>
                  <p>{num}</p>
                </figure>
                <div>
                  <p>{obj.Type}</p>
                  <p style={relicsColor}>{obj.Name}</p>
                </div>
              </div>
              } else if (ccc.current[key].Element_001.value.qualityValue == 0) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={esther}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor :'gray'}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (1 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 10) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={esther}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={estherColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (9 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 30) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={esther}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(219, 192, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={estherColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (29 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 70) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={esther}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 183, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={estherColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (69 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 90) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={esther}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 84, 255)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={estherColor}>{obj.Name}</p>
                  </div>
                </div>
              } else  if (89 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 100){
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={esther}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor: "rgb(255, 0, 221)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={estherColor}>{obj.Name}</p>
                  </div>
                </div>
              } else {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={esther}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor: "rgb(255, 94, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={estherColor}>{obj.Name}</p>
                  </div>
                </div>
              }
            } else {
              if (ccc.current[key].Element_001.value.qualityValue == -1) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={relics}/>
                    <p>{num}</p>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (ccc.current[key].Element_001.value.qualityValue == 0) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={relics}/>
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor :'gray'}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (1 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 10) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={hero} />
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={heroColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (9 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 30) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={hero} />
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(219, 192, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={heroColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (29 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 70) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={hero} />
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 183, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={heroColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (69 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 90) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={hero} />
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 84, 255)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={heroColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (89 < ccc.current[key].Element_001.value.qualityValue && ccc.current[key].Element_001.value.qualityValue < 100){
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={hero} />
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor: "rgb(255, 0, 221)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={heroColor}>{obj.Name}</p>
                  </div>
                </div>
              } else {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={obj.Icon} alt="이미지" style={hero} />
                    <div className="quality">
                      <p style={{width : `${ccc.current[key].Element_001.value.qualityValue}%`, backgroundColor: "rgb(255, 94, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={heroColor}>{obj.Name}</p>
                  </div>
                </div>
              }
            }
          })
        }
      </div> */}
    </div>
  )
}

export default Weapons