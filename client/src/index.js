import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider} from 'react-redux';
import store from './redux/store';
import './fonts/Ageya-Regular.otf'
import './fonts/SpaceGrotesk-SemiBold.ttf'
import './fonts/SpaceGrotesk-Medium.ttf'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </Provider>
);

