import 'shiny';
// Import Framework7
import Framework7 from 'framework7';
// Import Framework7 Styles
import 'framework7/framework7-bundle.min.css';

// Install F7 Components using .use() method on class:
import Dialog from 'framework7/esm/components/dialog/dialog.js';
import Gauge from 'framework7/esm/components/gauge/gauge.js';
import Panel from 'framework7/esm/components/panel/panel.js';
import View from 'framework7/esm/components/view/view.js';
Framework7.use([Dialog, Gauge, Panel, View]);

//import ListItem from './components/other-page.f7.jsx';
//Framework7.registerComponent(
//  'my-list-item',
//
//  // component function
//  ListItem
//)

// Import App component
import App from './components/app.f7.jsx';

// Import other routes
import routes from './modules/routes.js';

// Initialize app
var app = new Framework7({
  el: '#app',
  theme: 'ios',
  // specify main app component
  routes: routes,
  component: App
});

