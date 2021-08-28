import { message } from './modules/message.js';
import 'shiny';
// Import Framework7
import Framework7 from 'framework7';
// Import Framework7 Styles
import 'framework7/framework7-bundle.min.css';
// import main app component

// Install F7 Components using .use() method on class:
import Dialog from 'framework7/esm/components/dialog/dialog.js';
import Gauge from 'framework7/esm/components/gauge/gauge.js';
Framework7.use([Dialog, Gauge]);

import App from './components/app.f7.html';


var app = new Framework7({
  // specify main app component
  component: App
})

