import { useState, useContext } from 'react'
import { AppC } from '../../context/Context';

interface GemsProps {
  idx: number | null,
  obj: {
    Grade: string | null;
    Icon: string | null;
    Level: number | null;
    Name: string | null | TrustedHTML;
    Slot: number | null;
    Tooltip: number | null;
  }
}

function Gems({idx, obj}: GemsProps) {
  const [tip, setTip] = useState(false);
  const {effects, legend, hero, gems} = useContext(AppC);
  
  //보석 마우스 아웃 시 이벤트
  const mouseOut = () => {
    setTip(!tip);
  }
  //보석 마우스 오버 시 이벤트
  const mouse = () => {
    setTip(!tip);
  }
  console.log(gems)
  if(obj.Grade === "전설") {
    return <li data-idx={idx} style={legend} onMouseEnter={mouse} onMouseLeave={mouseOut} >
    <img src={`${obj.Icon}`} alt="보석" />
    <p>{obj.Level}</p>
    <div className={tip ? 'tips' : 'hidden'}>
      <p className="gem-info" dangerouslySetInnerHTML={obj.Name ? {__html: obj.Name}: undefined}/>
      <p>{idx !== null && effects[idx] && effects[idx].Name}</p>
      <p>{idx !== null && effects[idx] && effects[idx].Description}</p>
    </div>
  </li>
  } else {
    return <li data-idx={idx} style={hero} onMouseEnter={mouse} onMouseLeave={mouseOut}>
    <img src={`${obj.Icon}`} alt="보석" />
    <p>{obj.Level}</p>
    <div className={tip ? 'tips' : 'hidden'}>
      <p className="gem-info " dangerouslySetInnerHTML={obj.Name ? {__html: obj.Name}: undefined} />
      <p>{idx !== null && effects[idx] && effects[idx].Name}</p>
      <p>{idx !== null && effects[idx] && effects[idx].Description}</p>
    </div>
  </li>
  }
}

export default Gems

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