import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { VideoContextProvider } from "./context/videoContext/VideoContext";
import { ListContextProvider } from "./context/listContext/ListContext";
import { UserContextProvider } from './context/userContext/UserContext';

/*
//Disable react dev tools for production (npm i @fvilers/disable-react-devtools)
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') disableReactDevTools()
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <UserContextProvider>
        <AuthContextProvider>
          <VideoContextProvider>
            <ListContextProvider>
              <App />
            </ListContextProvider>
          </VideoContextProvider>
        </AuthContextProvider>
      </UserContextProvider>
  </React.StrictMode>,
);