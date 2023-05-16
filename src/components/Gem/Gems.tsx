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
  const {effects, legend, hero} = useContext(AppC);
  
  //보석 마우스 아웃 시 이벤트
  const mouseOut = () => {
    setTip(!tip)
  }
  //보석 마우스 오버 시 이벤트
  const mouse = () => {
    setTip(!tip)
  }
  return (
    <>
      {
        obj.Grade === "전설" || obj.Grade === "유물" ? 
        <li data-idx={idx} style={legend} onMouseEnter={mouse} onMouseLeave={mouseOut} >
          <img src={`${obj.Icon}`} alt="보석" />
          <p>{obj.Level}</p>
          <div className={tip ? 'tips' : 'hidden'}>
            <p className="gem-info" dangerouslySetInnerHTML={obj.Name ? {__html: obj.Name}: undefined}/>
            <p>{idx !== null && effects[idx] && effects[idx].Name}</p>
            <p>{idx !== null && effects[idx] && effects[idx].Description}</p>
          </div>
        </li>
        : <li data-idx={idx} style={hero} onMouseEnter={mouse} onMouseLeave={mouseOut}>
            <img src={`${obj.Icon}`} alt="보석" />
            <p>{obj.Level}</p>
            <div className={tip ? 'tips' : 'hidden'}>
              <p className="gem-info " dangerouslySetInnerHTML={obj.Name ? {__html: obj.Name}: undefined} />
              <p>{idx !== null && effects[idx] && effects[idx].Name}</p>
              <p>{idx !== null && effects[idx] && effects[idx].Description}</p>
            </div>
          </li>
      }
    </>
    
  )
}

export default Gems