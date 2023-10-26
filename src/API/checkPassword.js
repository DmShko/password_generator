import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const checkPass = createAsyncThunk(
    'password/checkPassword',
    async function(arg, {rejectWithValue}) {
   
        const options = {
            method: 'GET',
            url: 'https://api.backendless.com/28066942-8273-BE6Q-AAD4-A1ZK34948E11/DCBACAA6-EF5B-49AA-8013-7BDF7A3A9A6B/users/verifypassword',
            params: {
              password: arg
            },
            headers: {
              'X-RapidAPI-Key': '09420BF2-9A41-4FD5-B8FB-8AD56AB35782',
              'X-RapidAPI-Host': ''
            }
          };

        return await axios.request(options).then(responce => {
            console.log(responce);
            return responce.data;
        }).catch(error =>  {
            return rejectWithValue(error.message);
        });
           
    }
);