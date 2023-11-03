import { React, useEffect, createRef } from 'react';
import { useDispatch } from 'react-redux';

import { change } from '../../passwordStore/PasswordSlice';

// add css modules
import l from './LiteralsWindow.module.css';

const Window = ({ data }) => {

  const symbolsWindow = createRef()
  const dispatch = useDispatch();
  // const toLink = () => elementLink(symbolsWindow);


  useEffect(() => {
    
    // add element size (main symbol window)
    dispatch(change({name: 'elementSize', value: {elementWidth: symbolsWindow.current.offsetWidth, elementHeight: symbolsWindow.current.offsetHeight}, operation: 'change'}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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