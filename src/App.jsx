import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change } from './passwordStore/PasswordSlice';
import { nanoid } from 'nanoid';
// import Window  from './components/LiveSymbols/LiteralsWindow.js'
import Generator  from './components/LiveSymbols/RandomGenerator';
import LiteralsWindow from './components/LiveSymbols/LiteralsWindow';
import { ReactComponent as IconSecurity } from './images/security-2-svgrepo-com.svg';
import ComputingPass from './components/GeneratePass/UserPass';
import User from './components/GeneratePass/UserPass';

import app from './App.module.css';
// import { checkPass } from 'API/checkPassword';

export const App = () => {

  const [userSymbols, setUserSymbols] = useState('');
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
  
  useEffect(() => {

  //  dispatch(change({name: 'literalElements', value: [], operation: 'change'}));
   dispatch(change({name: 'literalElements', value: {id: nanoid(), symbol: symbolsSelector[Generator(symbolsSelector.length)], activeKey: false}, operation: 'push'}));
  
    // dispatch(change({name: 'symbolsWimdowsLink', value: synbolsWindow.current, operation: 'change'}));

  },[])

  useEffect(() => {
    
    console.log(Math.ceil((selectorElementSize.elementWidth / 1.24 - 20) / 24))
    let interval = setTimeout(function() {
      if(selectorElementSize.elementWidth !== 0) dispatch(change({name: 'literalElements', value: {id: nanoid(), symbol: symbolsSelector[Generator(symbolsSelector.length)], activeKey: false}, operation: 'push'}));
    },  10);
    
    if(symbElementsSelector.length >= (Math.ceil((selectorElementSize.elementWidth / 1.25 - 20) / 24)) * Math.ceil(((selectorElementSize.elementHeight / 1.25 - 20) / 24)))
    {
      clearTimeout(interval);
      setTimeout(function() {
        dispatch(change({name: 'literalElements', value: {symbol: symbolsSelector[Generator(symbolsSelector.length)], activeKey: false}, operation: 'replace'}));
      },  200);
    } 
    
  },[symbElementsSelector, selectorElementLinks])

  useEffect(() => {

    if(selector.length !== 0) dispatch(change({name: 'randomUserSymbols', value: User(selector), operation: 'change'}));  
    
   
    // ComputingPass(userSymbols, userSymbolDrive, autoDrive, mixDrive);
   
  },[selector])

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
    
    if(userSymbolDrive) {
      dispatch(change({name: 'userSymbols', value: userSymbols.split(''), operation: 'change'}));
    }

    if(autoDrive) {

      let autoSymbols = [];
      if(symbElementsSelector.length !== 0) {
        
        for(let i = 0; i < passwordRange; i += 1) {
          let l = Generator(symbElementsSelector.length);
          console.log(l);
          if(Generator(2) === 0){  
            dispatch(change({name: 'literalElements', element: l, value: true, operation: 'changeActive'}));
            autoSymbols.push(symbElementsSelector[l].symbol.toUpperCase())
          } else {
            dispatch(change({name: 'literalElements', element: l, value: true, operation: 'changeActive'}));
            autoSymbols.push(symbElementsSelector[l].symbol);
          };
          
        } 
        console.log(symbElementsSelector);
        dispatch(change({name: 'randomUserSymbols', value: autoSymbols, operation: 'change'}))
        // autoSymbols = [];
      }
    }

    if(mixDrive) {
      
    }

    clearInputs();

  };

  const changeLocalState = evt => {

    setUserSymbols(evt.target.value);
      
  };

  return (
    <section className={app.section}>
     
      <form onSubmit={changeStore} action="">
        
        {symbElementsSelector.length !== 0 ? <LiteralsWindow  data={symbElementsSelector} elementLink={getElementLink}/> : ''}
        
        <div className={app.title}>
          <IconSecurity width="55px" height="55px"/>
          <h1>Password generator</h1>
        </div>
        
        <label className={app.userSymbols}> Enter your password symbols
           <input type="text" onChange={changeLocalState} value={userSymbols} name='userSymbols' disabled={disableInput} required/>
        </label>

        <div className={app.settings}>

          <label> only user symbol
            <input type="radio" name="userSymbol" onChange={radioDrive} checked={userSymbolDrive}></input>
          </label>

          <label> mix
            <input type="radio" name="mix"  onChange={radioDrive} checked={mixDrive}></input>
          </label>

          <label> auto
            <input type="radio" name="auto"  onChange={radioDrive} checked={autoDrive}></input>
          </label> 

          <label> 
            <input type="range" min="8" max="16" step="1" onChange={rangeChange} value={passwordRange}></input>
            {` ${passwordRange} symbols`}
          </label>
        </div>
        
        <button type="submit">Generate password</button>
        
        <label>
          <textarea value={selectorPassword.join('')}></textarea>
        </label>
        
      </form>
    </section>
  );
};
