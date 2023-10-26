import { React } from 'react';
import { useDispatch } from 'react-redux';
import { change } from 'passwordStore/PasswordSlice';

// add css modules
import l from './LiteralsWindow.module.css';

const Window = ({ data }) => {

  // const synbolsWindow = useRef();
  return (
    <div className={l.list}>
        {
          data.length !== 0 ? data.map(element => {return <div className={l.symbol}><p key={element.id}>{element.symbol}</p></div> }) : ''
        }
    </div>
  )
}
 
export default Window;