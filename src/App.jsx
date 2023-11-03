import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change } from './passwordStore/PasswordSlice';
import { nanoid } from 'nanoid';
import { useClipboard } from 'use-clipboard-copy';
import { SecurityControl } from './components/SecurityControl/SecurityControl'

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
 
  const [passwordRange, setPasswordRange] = useState(8);
  const [userSymbolDrive, setUserSymbolDrive] = useState(false);
  const [autoDrive, setAutoDrive] = useState(true);
  const [mixDrive, setMixDrive] = useState(false);

  const [disableInput, setDisableInput] = useState(true);
  const [disableButton, setDisableButton] = useState(true);


  const dispatch = useDispatch();

  const selector = useSelector(state => state.password.userSymbols);
  const symbolsSelector = useSelector(state => state.password.symbols);
  const symbElementsSelector = useSelector(state => state.password.literalElements);
  const selectorElementSize = useSelector(state => state.password.elementSize);
  const selectorPassword = useSelector(state => state.password.randomUserSymbols);
  const selectorElementLinks = useSelector(state => state.password.symbolsWimdowsLink);
  const selectorSecurityLevel = useSelector(state => state.password.securityLevel);
  
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

   dispatch(change({name: 'literalElements', value: {id: nanoid(), symbol: symbolsSelector[Generator(symbolsSelector.length)], activeKey: false, animaKey: false}, operation: 'push'}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
   
    // console.log(Math.ceil((selectorElementSize.elementWidth / 1.24 - 20) / 24))
    let a = Generator(symbolsSelector.length);

    let interval = setTimeout(function() {
      if(selectorElementSize.elementWidth !== 0) dispatch(change({name: 'literalElements', value: {id: nanoid(), symbol: symbolsSelector[a], activeKey: false, animaKey: false}, operation: 'push'}));
      setDisableButton(true);
    },  10);
    
    if(symbElementsSelector.length >= (((selectorElementSize.elementWidth / 1.25 - 50) / 24) * (selectorElementSize.elementHeight / 1.25 - 50) / 24))
    {
      setDisableButton(false);
      clearTimeout(interval);
      setTimeout(function() {
        dispatch(change({name: 'literalElements', value: {symbol: symbolsSelector[a], activeKey: false, animaKey: false}, operation: 'replace'}));
        // dispatch(change({name: 'literalElements', element: a, value: true, operation: 'changeAnima'}));
      },  200);
    } 
    
    // check password strong
    dispatch(change({name: 'securityLevel', value: SecurityControl(selectorPassword), operation: 'change'}));

    // eslint-disable-next-line  
  },[symbElementsSelector, selectorElementLinks])

  useEffect(() => {
    
    // clear 'literalElements'
  
    dispatch(change({name: 'literalElements', value: [], operation: 'change'}));
    dispatch(change({name: 'literalElements', value: {id: nanoid(), symbol: symbolsSelector[Generator(symbolsSelector.length)], activeKey: false, animaKey: false}, operation: 'push'}));
   // eslint-disable-next-line
  },[selectorElementSize])


  useEffect(() => {

    if(selector.length !== 0) dispatch(change({name: 'randomUserSymbols', value: User(selector), operation: 'change'}));  
   
   // eslint-disable-next-line
  },[selector])

  useEffect(() => {

    dispatch(change({name: 'randomUserSymbols', value: mixSymbols, operation: 'change'}));  
    // eslint-disable-next-line
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
      // eslint-disable-next-line
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

  return (
    <section className={app.section}>
     
      <form onSubmit={changeStore} >
        
        {symbElementsSelector.length !== 0 ? <LiteralsWindow  data={symbElementsSelector}/> : ''}
        
        <div className={app.title}>
          <IconSecurity width="55px" height="55px"/>
          <h1>Password generator</h1>
        </div>

        
        <fieldset className={app.settingsTwo}>
          <legend className={app.instruction}>Your symbols separated by space in any combination. "Space" - automatic simbols.</legend>
          <label className={app.userSymbols} htmlFor="text"> Enter required password symbols
            <input type="text" onChange={changeLocalState} id="text" value={userSymbols} name='userSymbols' maxLength={passwordRange} disabled={disableInput} required/>
          </label>
        </fieldset>
                
        <fieldset className={app.settings}>

          <legend className={app.instructionTwo}>A strong password must contain capital letters, numbers, and special characters. Use 'combo' mode for it.</legend>

          <label htmlFor="combo"> combo 
            <input type="radio" name="mix" id="combo" onChange={radioDrive} checked={mixDrive}></input>
          </label>

          <label htmlFor="auto"> auto
            <input type="radio" name="auto" id="auto" onChange={radioDrive} checked={autoDrive}></input>
          </label> 

          <label htmlFor="range"> 
            <input type="range" min="8" max="16" step="1" id="range" onChange={rangeChange} value={passwordRange}></input>
            {` ${passwordRange} symbols`}
          </label>

        </fieldset>
        
        <button className={disableButton ? app.disButton : app.activButton}type="submit" disabled={disableButton}>Generate password</button>
        
        <label>
          <textarea  className={selectorSecurityLevel === 'green' ? app.green : app.orange} ref={clipboard.target} defaultValue={selectorPassword.join('')}>
          
          </textarea>
        </label>

        <button className={app.clipboard} onClick={clipboard.copy} type="button" >
          <IconClipboard className={app.clipboard} width="35" height="35"/>
        </button>
        
      </form>
        <h2 style={{fontSize: '11px', color: '#757575', width: '150px', margin: '0 auto'}}>by Dmitry Shevchenko 2023</h2>
    </section>
  );
};
