import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change } from './passwordStore/PasswordSlice'
import { nanoid } from 'nanoid';
// import Window  from './components/LiveSymbols/LiteralsWindow.js'
import Generator  from './components/LiveSymbols/RandomGenerator'
import LiteralsWindow from './components/LiveSymbols/LiteralsWindow'
// import { checkPass } from 'API/checkPassword';

export const App = () => {

  const [userSymbols, setUserSymbols] = useState('');
  const dispatch = useDispatch();
  // const synbolsWindow = useRef();
  const selector = useSelector(state => state.password.userSimbols);
  const symbolsSelector = useSelector(state => state.password.symbols);
  const symbElementsSelector = useSelector(state => state.password.literalElements);
  
  useEffect(() => {

    
   dispatch(change({name: 'literalElements', value: {id: nanoid(), symbol: symbolsSelector[Generator(10)]}, operation: 'push'}));
    
   
    // dispatch(change({name: 'symbolsWimdowsLink', value: synbolsWindow.current, operation: 'change'}));

  },[])

  useEffect(() => {
    
    let interval = setTimeout(function() {
      dispatch(change({name: 'literalElements', value: {id: nanoid(), symbol: symbolsSelector[Generator(10)]}, operation: 'push'}));
    },  Generator(1000));
    
    if(symbElementsSelector.length >= 99)
    {
      clearInterval(interval);
    } 
    
  },[symbElementsSelector])

  const clearInputs = () => {
    setUserSymbols('');
  };

  const changeStore = evt => {

    evt.preventDefault();

    dispatch(change({name: 'userSymbols', value: userSymbols, operation: 'change'}));

    clearInputs();

  };

  const changeLocalState = evt => {

    // console.log(value);
    setUserSymbols(evt.target.value);
      
  };

  return (
    <section>
      <svg></svg>
      <form onSubmit={changeStore} action="">
        <h1>Password generator</h1>

        {symbElementsSelector.length !== 0 ? <LiteralsWindow data={symbElementsSelector}/> : ''}

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
