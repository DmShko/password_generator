import { React, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

// add css modules
import l from './LiteralsWindow.module.css';

const Window = ({ data, elementLink }) => {

  // const selectorsymbolsWindow = useSelector(state => state.password.elementSize);
  const symbolsWindow = useRef(null);
  // const selectorElementSize = useSelector(state => state.password.elementSize);
  
  useEffect(() => {

    elementLink(symbolsWindow);
   
  },[window.innerWidth, window.innerHeight])

  return (
    // style={{left: Generator(selectorElementSize.elementWidth),
    //   top: Generator(selectorElementSize.elementHeight),
    //   position: 'absolute'}}
    <div className={l.list} ref={symbolsWindow}>
        {
          data.length !== 0 ? data.map(element => {return <div  className={element.activeKey === false ? l.symbol : l.activeSymbol}><p key={element.id}>{element.symbol}</p></div> }) : ''
        }
    </div>
  )
}
 
export default Window;