import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppC } from '../../context/Context'

function Insert() {
  const { elName, search } = useContext(AppC);
  
  //메인버튼 누를 시 새고고침과 input값 빈 값으로 설정
  const clear = () => {
    elName.current!.value = '';
    window.location.reload();
  }
  return (
    <>
      <div>
        <Link to='/'>
          <p onClick={()=>clear()}>
            <img src="./icon/main.png" alt='로아' />
          </p>
        </Link>
      </div>
      <form onSubmit={search} autoComplete="off">
        <div className="inputwrapper">
          <input ref={elName} type="text" placeholder="캐릭터 명을 입력하세요" />
          <button onClick={()=> search}>
            <img src="icon/search.gif" alt="검색" />
          </button>
        </div>
      </form>
    </>
  )
}

export default Insert
