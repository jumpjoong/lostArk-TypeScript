import { useContext, useState } from "react";
import { AppC } from "../../context/Context";

function Gems() {
  const {gems, effects, legend, hero} = useContext(AppC);
  const [tip, setTip] = useState([false,false,false,false,false,false,false,false,false,false,false]);
  
  const mouse = (key: number) => {
    let test = [...tip];
    test[key] = true;
    setTip(test);
  }
  const mouseOut = () => {
    let test = [false,false,false,false,false,false,false,false,false,false,false];
    setTip(test);
  }
  return (
    <>
    {
      gems && gems.Gems.map((obj, key)=> {
        if (obj.Grade === "전설" || obj.Grade === "유물") {
          return <li key={key} style={legend} onMouseEnter={()=>mouse(key)} onMouseLeave={()=>mouseOut()} >
              <img src={`${obj.Icon}`} alt="보석" />
              <p>{obj.Level}</p>
              <div className={tip[key] ? 'tips' : 'hidden'}>
                <p className="gem-info" dangerouslySetInnerHTML={{__html: obj?.Name ?? ''}}/>
                {
                  effects !== null && 
                  <>
                    <p>{effects[key].Name}</p>
                    <p>{effects[key].Description}</p>
                  </>
                }
                
              </div>
            </li>
        } else {
          return <li key={key} style={hero} onMouseEnter={()=>mouse(key)} onMouseLeave={()=>mouseOut()}>
              <img src={`${obj.Icon}`} alt="보석" />
              <p>{obj.Level}</p>
              <div className={tip[key] ? 'tips' : 'hidden'}>
                <p className="gem-info " dangerouslySetInnerHTML={{__html: obj?.Name?? ''}} />
                {
                  effects !== null && 
                  <>
                    <p>{effects[key].Name}ㅎㅇㅎㅇ</p>
                    <p>{effects[key].Description}</p>
                  </>
                }
              </div>
            </li>
        }
      })
    }
  </>
  )
}

export default Gems