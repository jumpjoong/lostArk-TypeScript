import { useState, useContext } from 'react'
import { AppC } from '../../context/Context';
import { GemsType } from '../../type/typeContext';

interface GemsProps {
  idx: number | null,
  obj: GemsType,
}

//idx == 보석 갯수
function Gems({idx, obj}: GemsProps) {
  const [tip, setTip] = useState(false);
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
  const json = JSON.parse(JSON.stringify(obj.Tooltip));

  //변수명 json을 parse **안하면 객체가 아닌 스트링임
  //아...jsonParse 일반 전설 = 6, 일반 영웅 = 7, 이벤트 영웅 = 8 의 길이를 가지고 있음
  const jsonParse = JSON.parse(json);
  
  //객체로 만든걸 깊게 들어가기 (이벤트 캐릭일 경우 Element_005로 접근 해야함)
  let gemsDetails = null
  //보석이 없는 경우 예외 처리 했음
  if (
    (jsonParse && Object.keys(jsonParse).length === 6 && jsonParse.Element_004.value.Element_001) ||
    (jsonParse && Object.keys(jsonParse).length === 7 && jsonParse.Element_004.value.Element_001) ||
    (jsonParse && Object.keys(jsonParse).length === 8 && jsonParse.Element_005.value.Element_001)
  ) {
    gemsDetails =
      (jsonParse && Object.keys(jsonParse).length === 6 && jsonParse.Element_004.value.Element_001) ||
      (jsonParse && Object.keys(jsonParse).length === 7 && jsonParse.Element_004.value.Element_001) ||
      (jsonParse && Object.keys(jsonParse).length === 8 && jsonParse.Element_005.value.Element_001);
  } else {
    return null;
  }

  //스킬 이름 자르기
  const skillName = gemsDetails !== null && gemsDetails.slice(gemsDetails.indexOf('>')+1, gemsDetails.lastIndexOf(('<')));

  //스킬 설명 자르기
  const skillDescription = gemsDetails !== null && gemsDetails.slice(gemsDetails.indexOf('</FONT>')+8);
  //반환
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
        <p>{idx !== null && skillName}</p>
        <p>{idx !== null && skillDescription}</p>
      </div>
    </li>
    }
  } 
  
export default Gems;