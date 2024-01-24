import { useContext, useRef } from "react"
import { AppC } from "../../context/Context"
import { Weapon, QualityCurrent, AblillityStoneDetail } from "../../type/typeContext"

function Weapons() {
  const { weapon, hide, legend, hero, relics,legendColor, heroColor, relicsColor, old, oldColor, estherColor, esther } = useContext(AppC);
  let qualityNumber: QualityCurrent[] = []
  //장비 찾기
  const filt = weapon && weapon.filter((item)=> item.Type !== '')
  //어빌리티 스톤 찾기
  const abil = weapon && weapon.filter((item)=> item.Type == "어빌리티 스톤")
  //2일 째 고생하다 마음 꺾이기 전에 현업 친구한테 물어본 코드...그것은 바로 깊은 복제란다...
  //겨우 한 줄로 며칠을 고생한거야...
  const abilTip = abil[0]?.Tooltip && JSON.parse(JSON.parse(JSON.stringify(abil[0]?.Tooltip)))

  //배열 순서 바꾸는 함수
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
  let list7:Weapon[]  = list6 && changeArrayOrder(list6, 8, -1)
  // 품질 숫자 따오기
  if (list7 !== undefined) {
    for (let i = 0; i < list7.length; i++) {
      qualityNumber = [...qualityNumber, JSON.parse(JSON.parse(JSON.stringify(list7[i].Tooltip)))]
    }
  }
  // 각인 활성화 이미지
  let emptyAblill = [];
  let ablillityStoneDetail:AblillityStoneDetail[] = [];
  let abilActive;
  emptyAblill = abilTip && Object.keys(abilTip)
  
  // 툴팁 
  if (abilTip) {
    for (let i = 0; i < emptyAblill.length; i++) { 
      ablillityStoneDetail = [...ablillityStoneDetail, (abilTip[emptyAblill[i]])]
    }
  }

  // 어빌리티스톤 찾아내기
  if (ablillityStoneDetail.length === 10 || ablillityStoneDetail.length === 9) {
    abilActive = ablillityStoneDetail.find((item: AblillityStoneDetail) => item.type === "IndentStringGroup");
  }
  
  // // 어빌리티스톤 상세하게 들어가기
  let abilNum = [];
  let abilEff:string[] = [];
  let abilDetail
  if (abilActive) {
    abilNum.push(abilActive.value.Element_000.contentStr)
    // 어빌리티 스톤 활성화 숫자 자르기
    for(let i = 0; i < 3; i++){
      abilDetail = emptyAblill && abilActive.value.Element_000.contentStr[`Element_00${i}`].contentStr
      abilEff.push(abilDetail.slice(abilDetail.indexOf('+')+1,abilDetail.lastIndexOf('<')))
    }
  }
  return (
    <div className={hide ? "eq show" : "eq noShow"}>
      <div className="weapon">
        {
          list7 && list7.map((obj, key)=> {
          if (obj.Type !== "팔찌" && obj.Type !== "나침반" && obj.Type !== "부적") {
            if (obj.Grade === "유물") {
              if (qualityNumber[key].Element_001.value.qualityValue == -1) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={relics}/>
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
              } else if (qualityNumber[key].Element_001.value.qualityValue == 0) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={relics}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor :'gray'}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (1 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 10) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={relics}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "red"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (9 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 30) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={relics}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(219, 192, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (29 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 70) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={relics}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 183, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (69 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 90) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={relics}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 84, 255)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (89 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 100) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={relics}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(255, 0, 221)"}}></p>
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
                    <img src={`${obj.Icon}`} alt="이미지" style={relics}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(255, 94, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              }
            } else if (obj.Grade === "전설") {
              if (qualityNumber[key].Element_001.value.qualityValue == -1) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={legend}/>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (qualityNumber[key].Element_001.value.qualityValue == 0) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={legend}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor :'gray'}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (1 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 10) {
              return <div key={key} className={`eq-weapon ${key}`}>
                <figure>
                  <img src={`${obj.Icon}`} alt="이미지" style={legend}/>
                  <div className="quality">
                    <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`}}></p>
                  </div>
                </figure>
                <div>
                  <p>{obj.Type}</p>
                  <p style={legendColor}>{obj.Name}</p>
                </div>
              </div>
              } else if (10 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 30) {
                return <div key={key} className={`eq-weapon ${key}`}>
                <figure>
                  <img src={`${obj.Icon}`} alt="이미지" style={legend}/>
                  <div className="quality">
                    <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(219, 192, 0)"}}></p>
                  </div>
                </figure>
                <div>
                  <p>{obj.Type}</p>
                  <p style={legendColor}>{obj.Name}</p>
                </div>
              </div>
              } else if (29 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 70) {
                return <div key={key} className={`eq-weapon ${key}`}>
                <figure>
                  <img src={`${obj.Icon}`} alt="이미지" style={legend}/>
                  <div className="quality">
                    <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 183, 0)"}}></p>
                  </div>
                </figure>
                <div>
                  <p>{obj.Type}</p>
                  <p style={oldColor}>{obj.Name}</p>
                </div>
              </div>
              } else if (69 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 90) {
                return <div key={key} className={`eq-weapon ${key}`}>
                <figure>
                  <img src={`${obj.Icon}`} alt="이미지" style={legend}/>
                  <div className="quality">
                    <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 84, 255)"}}></p>
                  </div>
                </figure>
                <div>
                  <p>{obj.Type}</p>
                  <p style={oldColor}>{obj.Name}</p>
                </div>
              </div>
              } else if (89 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 100){
                return <div key={key} className={`eq-weapon ${key}`}>
                <figure>
                  <img src={`${obj.Icon}`} alt="이미지" style={legend}/>
                  <div className="quality">
                    <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor: "rgb(255, 0, 221)"}}></p>
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
                  <img src={`${obj.Icon}`} alt="이미지" style={legend}/>
                  <div className="quality">
                    <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor: "rgb(255, 94, 0)"}}></p>
                  </div>
                </figure>
                <div>
                  <p>{obj.Type}</p>
                  <p style={oldColor}>{obj.Name}</p>
                </div>
              </div>
              }
            } else if (obj.Grade === "고대") {
              if (qualityNumber[key].Element_001.value.qualityValue == -1) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={old}/>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (qualityNumber[key].Element_001.value.qualityValue == 0) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={old}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor :'gray'}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (1 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 10) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={old}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={oldColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (9 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 30) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={old}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(219, 192, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={oldColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (29 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 70) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={old}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 183, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={oldColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (69 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 90) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={old}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 84, 255)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={oldColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (89 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 100){
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={old}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor: "rgb(255, 0, 221)"}}></p>
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
                  <img src={`${obj.Icon}`} alt="이미지" style={old}/>
                  <div className="quality">
                    <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor: "rgb(255, 94, 0)"}}></p>
                  </div>
                </figure>
                <div>
                  <p>{obj.Type}</p>
                  <p style={oldColor}>{obj.Name}</p>
                </div>
              </div>
              }
            }else if (obj.Grade === "에스더") {
              if (qualityNumber[key].Element_001.value.qualityValue == -1) {
                return <div key={key} className={`eq-weapon ${key}`} >
                <figure>
                  <img src={`${obj.Icon}`} alt="이미지" style={esther}/>
                </figure>
                <div>
                  <p>{obj.Type}</p>
                  <p style={relicsColor}>{obj.Name}</p>
                </div>
              </div>
              } else if (qualityNumber[key].Element_001.value.qualityValue == 0) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={esther}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor :'gray'}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (1 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 10) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={esther}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={estherColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (9 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 30) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={esther}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(219, 192, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={estherColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (29 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 70) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={esther}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 183, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={estherColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (69 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 90) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={esther}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 84, 255)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={estherColor}>{obj.Name}</p>
                  </div>
                </div>
              } else  if (89 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 100){
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={esther}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor: "rgb(255, 0, 221)"}}></p>
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
                    <img src={`${obj.Icon}`} alt="이미지" style={esther}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor: "rgb(255, 94, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={estherColor}>{obj.Name}</p>
                  </div>
                </div>
              }
            } else {
              if (qualityNumber[key].Element_001.value.qualityValue == -1) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={relics}/>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (qualityNumber[key].Element_001.value.qualityValue == 0) {
                return <div key={key} className={`eq-weapon ${key}`} >
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={relics}/>
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor :'gray'}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={relicsColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (1 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 10) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={hero} />
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={heroColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (9 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 30) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={hero} />
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(219, 192, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={heroColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (29 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 70) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={hero} />
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 183, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={heroColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (69 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 90) {
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={hero} />
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor : "rgb(0, 84, 255)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={heroColor}>{obj.Name}</p>
                  </div>
                </div>
              } else if (89 < qualityNumber[key].Element_001.value.qualityValue && qualityNumber[key].Element_001.value.qualityValue < 100){
                return <div key={key} className={`eq-weapon ${key}`}>
                  <figure>
                    <img src={`${obj.Icon}`} alt="이미지" style={hero} />
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor: "rgb(255, 0, 221)"}}></p>
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
                    <img src={`${obj.Icon}`} alt="이미지" style={hero} />
                    <div className="quality">
                      <p style={{width : `${qualityNumber[key].Element_001.value.qualityValue}%`, backgroundColor: "rgb(255, 94, 0)"}}></p>
                    </div>
                  </figure>
                  <div>
                    <p>{obj.Type}</p>
                    <p style={heroColor}>{obj.Name}</p>
                  </div>
                </div>
              }
            }
          }
          })
        }
      </div>
    </div>
  )
}

export default Weapons