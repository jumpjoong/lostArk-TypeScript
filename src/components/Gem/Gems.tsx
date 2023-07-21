import { useState, useContext, useEffect, SetStateAction } from 'react'
import { AppC } from '../../context/Context';
import { ElementNumber, GemsType } from '../../type/typeContext';

interface GemsProps {
  idx: number | null,
  obj: GemsType,
}

//idx == 보석 갯수
function Gems({idx, obj}: GemsProps) {
  const [tip, setTip] = useState(false);
  // const [gemsToolTip, setGemsToolTip] = useState<SetStateAction<ElementNumber[]>>([]);
  const {effects, legend, hero } = useContext(AppC);
  
  //보석 마우스 아웃 시 이벤트
  const mouseOut = () => {
    setTip(!tip);
  }
  //보석 마우스 오버 시 이벤트
  const mouse = () => {
    setTip(!tip);
  }
  //gems에 있는 Tooltip deep clone
  const json = JSON.parse(JSON.stringify(obj.Tooltip))
  //변수명 json을 parse **안하면 객체가 아닌 스트링임
  const jsonParse = JSON.parse(json)
  //객체로 만든걸 깊게 들어가기
  const gemsDetails = jsonParse && jsonParse.Element_004.value.Element_001
  //스킬 이름 자르기
  const skillName = gemsDetails !== null && gemsDetails.slice(gemsDetails.indexOf('>')+1, gemsDetails.lastIndexOf(('<')));
  //스킬 설명 자르기
  const skillDescription = gemsDetails !== null && gemsDetails.slice(gemsDetails.indexOf('</FONT>')+8);
  //이벤트 보석을 가진 캐릭터 구분 해야함
    if(obj.Grade === "전설") {
      return <li data-idx={idx} style={legend} onMouseEnter={mouse} onMouseLeave={mouseOut} >
      <img src={`${obj.Icon}`} alt="보석" />
      <p>{obj.Level}</p>
      <div className={tip ? 'tips' : 'hidden'}>
        <p className="gem-info" dangerouslySetInnerHTML={obj.Name ? {__html: obj.Name}: undefined}/>
        <p>{idx !== null && effects[idx] && skillName}</p>
        <p>{idx !== null && effects[idx] && skillDescription}</p>
      </div>
    </li>
    } else {
      return <li data-idx={idx} style={hero} onMouseEnter={mouse} onMouseLeave={mouseOut}>
      <img src={`${obj.Icon}`} alt="보석" />
      <p>{obj.Level}</p>
      <div className={tip ? 'tips' : 'hidden'}>
        <p className="gem-info " dangerouslySetInnerHTML={obj.Name ? {__html: obj.Name}: undefined} />
        <p>{idx !== null && effects[idx] && skillName}</p>
        <p>{idx !== null && effects[idx] && skillDescription}</p>
      </div>
    </li>
    }
  } 
  // else {
    ////이벤트 보석을 가진 캐릭터 설정 해야함
    // return <></>
  // }


export default Gems;


////////////////gems
//   "Element_004": {
//     "type": "ItemPartBox",
//     "value": {
//       "Element_000": "<FONT COLOR='#A9D0F5'>효과</FONT>",
//       "Element_001": "[기상술사] <FONT COLOR='#FFD200'>소용돌이</FONT> 피해 21.00% 증가"
//     }
//   },

/////////////////////////effects
// "{
//   "Element_000": {
//     "type": "NameTagBox",
//     "value": "<P ALIGN='CENTER'><FONT COLOR='#F99200'>7레벨 멸화의 보석</FONT></P>"
//   },
//   "Element_001": {
//     "type": "ItemTitle",
//     "value": {
//       "bEquip": 0,
//       "leftStr0": "<FONT SIZE='12'><FONT COLOR='#F99200'>전설 보석</FONT></FONT>",
//       "leftStr2": "<FONT SIZE='14'>아이템 티어 3</FONT>",
//       "qualityValue": -1,
//       "rightStr0": "",
//       "slotData": {
//         "advBookIcon": 0,
//         "battleItemTypeIcon": 0,
//         "cardIcon": false,
//         "friendship": 0,
//         "iconGrade": 4,
//         "iconPath": "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_52.png",
//         "imagePath": "",
//         "islandIcon": 0,
//         "rtString": "Lv.7",
//         "seal": false,
//         "temporary": 0,
//         "town": 0,
//         "trash": 0
//       }
//     }
//   },
//   "Element_002": {
//     "type": "MultiTextBox",
//     "value": "|거래가능"
//   },
//   "Element_003": {
//     "type": "SingleTextBox",
//     "value": "보석 레벨 7"
//   },
//   "Element_004": {
//     "type": "ItemPartBox",
//     "value": {
//       "Element_000": "<FONT COLOR='#A9D0F5'>효과</FONT>",
//       "Element_001": "[기상술사] <FONT COLOR='#FFD200'>소용돌이</FONT> 피해 21.00% 증가"
//     }
//   },
//   "Element_005": {
//     "type": "SingleTextBox",
//     "value": "<FONT SIZE='12'><FONT COLOR='#C24B46'>분해불가</FONT></FONT>"
//   }
// }"