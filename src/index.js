import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
// import { ThemeProvider } from 'styled-components';
import './index.css';
import './styles.css';

// const theme = {
//   colors: {
//     black: 'black',
//     blue_ciel: 'rgb(230, 243, 250)',
//     white: 'white',
//     gray: 'rgb(204, 204, 204)',
//     accent: '#3f51b5',
//     hover: 'linear-gradient(rgb(93, 196, 255), rgb(255, 250, 102))',
//   },
// };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
