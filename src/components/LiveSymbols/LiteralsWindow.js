import { React, useRef, useEffect, createRef, useState } from 'react';
import { useSelector } from 'react-redux';

// add css modules
import l from './LiteralsWindow.module.css';

// const useRefDimensions = (ref) => {
 
//   return dimensions
// }

const Window = ({ data, elementLink }) => {

  // const selectorsymbolsWindow = useSelector(state => state.password.elementSize);
  // const symbolsWindow = useRef(null);
  // const selectorElementSize = useSelector(state => state.password.elementSize);
  // const [dim, setDimensions] = useState({ width: 1, height: 2 })
  const symbolsWindow = createRef()

  // useEffect(() => {

  //   // if (window.offsetWidth) {
  //     const { current } = symbolsWindow
  //     const boundingRect = current.getBoundingClientRect()
  //     const { width, height } = boundingRect
  //     console.log(window.offsetWidth)
  //     setDimensions({ width: Math.round(width), height: Math.round(height) })
  //   // }
  // }, [window.offsetWidth]);
   
  useEffect(() => {
    
    elementLink(symbolsWindow);
   
  },[window.innerWidth])

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