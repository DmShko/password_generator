import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change } from './passwordStore/PasswordSlice'
import { nanoid } from 'nanoid';
// import Window  from './components/LiveSymbols/LiteralsWindow.js'
import Generator  from './components/LiveSymbols/RandomGenerator'
import LiteralsWindow from './components/LiveSymbols/LiteralsWindow'

import app from './App.module.css'
// import { checkPass } from 'API/checkPassword';

export const App = () => {

  const [userSymbols, setUserSymbols] = useState('');
  const dispatch = useDispatch();

  const selector = useSelector(state => state.password.userSimbols);
  const symbolsSelector = useSelector(state => state.password.symbols);
  const symbElementsSelector = useSelector(state => state.password.literalElements);
  const selectorElementSize = useSelector(state => state.password.elementSize);
  
  useEffect(() => {

   
   dispatch(change({name: 'literalElements', value: [], operation: 'change'}));
   dispatch(change({name: 'literalElements', value: {id: nanoid(), symbol: symbolsSelector[Generator(symbolsSelector.length)]}, operation: 'push'}));
  
    // dispatch(change({name: 'symbolsWimdowsLink', value: synbolsWindow.current, operation: 'change'}));

  },[selectorElementSize])

  useEffect(() => {

    
    console.log(Math.ceil((selectorElementSize.elementWidth - 24) / 24))
    let interval = setTimeout(function() {
      if(selectorElementSize.elementWidth !== 0) dispatch(change({name: 'literalElements', value: {id: nanoid(), symbol: symbolsSelector[Generator(symbolsSelector.length)]}, operation: 'push'}));
    },  10);
    
    if(symbElementsSelector.length > (Math.ceil((selectorElementSize.elementWidth - 24) / 24)) * Math.ceil(((selectorElementSize.elementHeight - 24) / 24)))
    {
      clearTimeout(interval);
      setTimeout(function() {
        dispatch(change({name: 'literalElements', value: {symbol: symbolsSelector[Generator(symbolsSelector.length)]}, operation: 'replace'}));
      },  400);
    } 
    
  },[symbElementsSelector])

  const getElementLink = value => {
    
    // add element size (main symbol window)
    dispatch(change({name: 'elementSize', value: {elementWidth: value.current.offsetWidth, elementHeight: value.current.offsetHeight}, operation: 'change'}));
  } 
  
  const clearInputs = () => {
    setUserSymbols('');
  };

  const changeStore = evt => {

    evt.preventDefault();

    dispatch(change({name: 'userSymbols', value: userSymbols, operation: 'change'}));

    clearInputs();

  };

  const changeLocalState = evt => {

    setUserSymbols(evt.target.value);
      
  };

  return (
    <section>
     
      <form onSubmit={changeStore} action="">

        {symbElementsSelector.length !== 0 ? <LiteralsWindow data={symbElementsSelector} elementLink={getElementLink}/> : ''}

        <div className={app.title}>
          <svg></svg>
          <h1>Password generator</h1>
        </div>
        
        <label> Enter your symbols
           <input type="text" onChange={changeLocalState} value={userSymbols} name='userSimbols' required/>
        </label>

        <label> only your simbol
          <input type="radio" name="only your simbol"></input>
        </label>

        <label> mix
          <input type="radio" name=""></input>
        </label>

        <label> use special simbols
           <input type="checkbox" name=""></input>
        </label>
       
        <button type="submit">Generate password</button>
      </form>
    </section>
  );
};
