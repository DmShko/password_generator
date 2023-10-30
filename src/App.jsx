import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change } from './passwordStore/PasswordSlice';
import { nanoid } from 'nanoid';
import { useClipboard } from 'use-clipboard-copy';

// import Window  from './components/LiveSymbols/LiteralsWindow.js'
import Generator  from './components/LiveSymbols/RandomGenerator';
import LiteralsWindow from './components/LiveSymbols/LiteralsWindow';
import Notiflix from 'notiflix';

//icons import
import { ReactComponent as IconSecurity } from './images/security-2-svgrepo-com.svg'; 
import { ReactComponent as IconClipboard } from './images/clipboard-text-svgrepo-com.svg';

import User from './components/GeneratePass/UserPass';

import app from './App.module.css';
// import { checkPass } from 'API/checkPassword';

export const App = () => {

  const [userSymbols, setUserSymbols] = useState('');
  const [mixSymbols, setMixSymbols] = useState([]);
  const [changeLiteral, setchangeLiteral] = useState('');
  const [passwordRange, setPasswordRange] = useState(8);
  const [userSymbolDrive, setUserSymbolDrive] = useState(false);
  const [autoDrive, setAutoDrive] = useState(true);
  const [mixDrive, setMixDrive] = useState(false);
  const [specialUse, setSpecialUse] = useState(false);
  const [disableInput, setDisableInput] = useState(true);
  const [resultPassword, setResultPassword] = useState('');

  const dispatch = useDispatch();

  const selector = useSelector(state => state.password.userSymbols);
  const symbolsSelector = useSelector(state => state.password.symbols);
  const symbElementsSelector = useSelector(state => state.password.literalElements);
  const selectorElementSize = useSelector(state => state.password.elementSize);
  const selectorPassword = useSelector(state => state.password.randomUserSymbols);
  const selectorElementLinks = useSelector(state => state.password.symbolsWimdowsLink);
  
  const clipboard = useClipboard({
    onSuccess() {
      Notiflix.Notify.warning('Text was copied successfully!', {
        position: 'center-top',
        fontSize: '24px',
      });
    },
    onError() {
      Notiflix.Notify.warning('Failed to copy text!', {
        position: 'center-top',
        fontSize: '24px',
      });
    }
  });

  useEffect(() => {


   dispatch(change({name: 'literalElements', value: {id: nanoid(), symbol: symbolsSelector[Generator(symbolsSelector.length)], activeKey: false}, operation: 'push'}));
  

  },[])

  useEffect(() => {
    
    // console.log(Math.ceil((selectorElementSize.elementWidth / 1.24 - 20) / 24))
    let interval = setTimeout(function() {
      if(selectorElementSize.elementWidth !== 0) dispatch(change({name: 'literalElements', value: {id: nanoid(), symbol: symbolsSelector[Generator(symbolsSelector.length)], activeKey: false}, operation: 'push'}));
    },  10);
    
    if(symbElementsSelector.length >= (Math.ceil((selectorElementSize.elementWidth / 1.25 - 25) / 24)) * Math.ceil(((selectorElementSize.elementHeight / 1.25 - 25) / 24)))
    {
      clearTimeout(interval);
      setTimeout(function() {
        dispatch(change({name: 'literalElements', value: {symbol: symbolsSelector[Generator(symbolsSelector.length)], activeKey: false}, operation: 'replace'}));
      },  200);
    } 
    
  },[symbElementsSelector, selectorElementLinks])

  useEffect(() => {

    if(selector.length !== 0) dispatch(change({name: 'randomUserSymbols', value: User(selector), operation: 'change'}));  
   
   
  },[selector])

  useEffect(() => {

    dispatch(change({name: 'randomUserSymbols', value: mixSymbols, operation: 'change'}));  
   
  },[mixSymbols])

  const rangeChange = (evt) => {
    setPasswordRange(evt.target.value);
  };

  const radioDrive =(evt) => {
    
    switch(evt.target.name){
      case 'userSymbol':
        if(userSymbolDrive === false) {
       
        setDisableInput(false);
        setUserSymbolDrive(true);
        setMixDrive(false);
        setAutoDrive(false); 

        }
        break;
      case 'mix':
        if(mixDrive === false) {
          
          setDisableInput(false);
          setMixDrive(true);   
          setUserSymbolDrive(false);
          setAutoDrive(false);

        }
        break;
      case 'auto':
        if(autoDrive === false) {
  
          setDisableInput(true);
          setAutoDrive(true);   
          setUserSymbolDrive(false);
          setMixDrive(false);
          
        }
        break;
      default:;
      }
  };

  const getElementLink = value => {
    
    // add element size (main symbol window)
    dispatch(change({name: 'elementSize', value: {elementWidth: value.current.offsetWidth, elementHeight: value.current.offsetHeight}, operation: 'change'}));
  } 
  
  const clearInputs = () => {
    setUserSymbols('');
  };

  const changeStore = evt => {

    evt.preventDefault();

    if(autoDrive) {

      let autoSymbols = [];
      if(symbElementsSelector.length !== 0) {
        
        for(let i = 0; i < passwordRange; i += 1) {
          let l = Generator(symbElementsSelector.length);
          
          if(Generator(2) === 0){  

            // hilight seleted symbol
            dispatch(change({name: 'literalElements', element: l, value: true, operation: 'changeActive'}));
            autoSymbols.push(symbElementsSelector[l].symbol.toUpperCase())
          } else {

            // hilight seleted symbol
            dispatch(change({name: 'literalElements', element: l, value: true, operation: 'changeActive'}));
            autoSymbols.push(symbElementsSelector[l].symbol);
          };
          
        } 
        
        dispatch(change({name: 'randomUserSymbols', value: autoSymbols, operation: 'change'}))
       
      }
    }

    if(mixDrive) {
      
      let toArray = userSymbols.split('')
      let l = 0;
      userSymbols.split('').map((value, index) => 
         
        {if(value === ' ') {
          l = Generator(symbElementsSelector.length)

          if(Generator(2) === 0){  
            toArray.splice(index, 1, symbElementsSelector[l].symbol);
          } else {
            toArray.splice(index, 1, symbElementsSelector[l].symbol.toUpperCase());
          }

          // hilight seleted symbol
          dispatch(change({name: 'literalElements', element: l, value: true, operation: 'changeActive'}));
        }}
      )  
      
      // fill missing elements 
      while(toArray.length < passwordRange) {
        l = Generator(symbElementsSelector.length)

        if(Generator(2) === 0){  
          toArray.splice(toArray.length + 1, 0, symbElementsSelector[l].symbol);
        } else {
          toArray.splice(toArray.length + 1, 0, symbElementsSelector[l].symbol.toUpperCase());
        }
        // hilight seleted symbol
        dispatch(change({name: 'literalElements', element: l, value: true, operation: 'changeActive'}));
      }
     
      setMixSymbols(toArray);
      
    }

    clearInputs();

  };

  const changeLocalState = evt => {

    setUserSymbols(evt.target.value);
      
  };

  const clickButton = (evt) => {
    evt.target.style.boxShadow  = 'inset 0px 0px 4px 5px #d1d1d1';
  };

  return (
    <section className={app.section}>
     
      <form onSubmit={changeStore} action="">
        
        {symbElementsSelector.length !== 0 ? <LiteralsWindow  data={symbElementsSelector} elementLink={getElementLink}/> : ''}
        
        <div className={app.title}>
          <IconSecurity width="55px" height="55px"/>
          <h1>Password generator</h1>
        </div>

        <p className={app.instruction}>Your symbols separated by space in any combination. "Space" - automatic simbols.</p>

        <label className={app.userSymbols} htmlFor="text"> Enter required password symbols
          <input type="text" onChange={changeLocalState} id="text" value={userSymbols} name='userSymbols' disabled={disableInput} required/>
        </label>

        <div className={app.settings}>

          <label htmlFor="combo"> combo
            <input type="radio" name="mix" id="combo"  onChange={radioDrive} checked={mixDrive}></input>
          </label>

          <label htmlFor="auto"> auto
            <input type="radio" name="auto" id="auto" onChange={radioDrive} checked={autoDrive}></input>
          </label> 

          <label htmlFor="range"> 
            <input type="range" min="8" max="16" step="1" id="range" onChange={rangeChange} value={passwordRange}></input>
            {` ${passwordRange} symbols`}
          </label>
        </div>
        
        <button type="submit" >Generate password</button>
        
        <label>
          <textarea ref={clipboard.target} value={selectorPassword.join('')}></textarea>
        </label>

        <button className={app.clipboard} onClick={clipboard.copy} type="button" >
          <IconClipboard className={app.clipboard} width="35" height="35"/>
        </button>
        
      </form>
      <h2 style={{fontSize: '11px', color: '#757575', width: '20%', margin: '0 auto'}}>by Dmitry Shevchenko 2023</h2>
    </section>
  );
};
