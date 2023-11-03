import { createSlice } from '@reduxjs/toolkit';
import { checkPass } from 'API/checkPassword';
import Generator  from '../components/LiveSymbols/RandomGenerator'

const passwordInitialState = {
  userSimbols: '',
  specialSymbols: false,
  onlyUserSimbols: false,
  isLoading: false,
  error: null,
  valid: false,
  symbols: [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ],
  literalElements: [],
  userSymbols: [],
  symbolsWimdowsLink: null,
  elementSize: {elementWidth: 0, elementHeight: 0},
  randomUserSymbols: [],
  securityLevel: '',
};

const passwordSlice = createSlice({
  name: 'password',
  initialState: passwordInitialState,
  reducers: {
    change(state, action) {
        
        switch(action.payload.operation) {
            case 'change':
                state[action.payload.name] = action.payload.value;
                break;
            case 'changeActive':
                state[action.payload.name][action.payload.element].activeKey = action.payload.value;
                break;
            case 'changeAnima':
              if(state[action.payload.name].length !== 0)
                state[action.payload.name][action.payload.element].animaKey = action.payload.value;
                break;
            case 'push':
                state[action.payload.name].push(action.payload.value);
                break;
            case 'replace':
                state[action.payload.name].splice(Generator(state.literalElements.length), 1, action.payload.value);
                break; 
                   
            default:;
        }
    }
      
  },

  extraReducers: builder => {
    builder.addCase(checkPass.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkPass.fulfilled, (state, action) => {
      state.isLoading = false;
      state.valid = action.payload;
    });
    builder.addCase(checkPass.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { change } = passwordSlice.actions;
export default passwordSlice.reducer;
