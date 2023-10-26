import { createSlice } from '@reduxjs/toolkit';
import { checkPass } from 'API/checkPassword';

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
    '@',
    '_',
    '*',
    '#',
  ],
  literalElements: [],
  symbolsWimdowsLink: null,
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
            case 'push':
                state[action.payload.name].push(action.payload.value);
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