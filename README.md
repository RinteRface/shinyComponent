
<!-- README.md is generated from README.Rmd. Please edit that file -->

# shinyComponent

<!-- badges: start -->

[![Lifecycle:
experimental](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://lifecycle.r-lib.org/articles/stages.html#experimental)
[![R-CMD-check](https://github.com/RinteRface/shinyComponent/workflows/R-CMD-check/badge.svg)](https://github.com/RinteRface/shinyComponent/actions)
<!-- badges: end -->

App powered by {golem}, webpack, Framework7 components (esm).

## Installation

You can install the released version of shinyComponent from
[CRAN](https://CRAN.R-project.org) with:

``` r
remotes::install_github("RinteRface/shinyComponent")
```

## Proof of Concept

Interface is built with Framework 7 from JS, powered by webpack. We
leverage Template components to create the app root and subroutes. On
the server side, we process data from R and send them back to JS to
update the components.

### UI

Components may be written with JSX (supported by the framework7-loader,
no need to install `React`\!), which is more convenient than the classic
template syntax. Components have either the old/new syntax so you can
compare both approaches.

### Main page

App component is driven by:

``` jsx
import ListItem from './custom-list.f7.jsx';

export default (props, {$f7, $f7ready, $on, $update }) => {
  const title = 'Hello World';
  let names = ['John', 'Vladimir', 'Timo'];

  Shiny.addCustomMessageHandler('init', function(message) {
    names = message;
    $update();
  });

  // App events callback
  $on('click', () => {
    // callback
  });

  // This method need to be used only when you use Main App Component
  // to make sure to call Framework7 APIs when app initialized.
  $f7ready(() => {
    // do stuff
    console.log('Hello');
  });

  const openAlert = () => {
    $f7.dialog.alert(title, function() {
      // ok button callback
      Shiny.setInputValue('alert_opened', false);
    });
    Shiny.setInputValue('alert_opened', true);
    Shiny.setInputValue(
      'alert',
      {
        message: 'Alert dialog was triggered!',
        title: title,
      },
      {priority: 'event'}
    );
  }

  const openPanel = () => {
    $f7.panel.open('.panel-left');
  }

  return () => (
    <div id="app">
      <div class="panel panel-left panel-init">
        <div class="block">"Hello"</div>
      </div>
      <div class="view view-main view-init safe-areas">
        <div class="page">
          <div class="navbar">
            <div class="navbar-bg"></div>
            <div class="navbar-inner">
              <div class="title">{title}</div>
            </div>
          </div>
          <div class="toolbar toolbar-bottom">
            <div class="toolbar-inner">
              <a onClick={() => openAlert()}>Open Alert</a>
              <a class="button button-fill" href="#" class="panel-open" data-panel=".panel-left">Left Panel</a>
              <a href="/extra/" data-transition="f7-cover">New Page</a>
            </div>
          </div>
          <div class="page-content">
            <ul>
              <ListItem title="Item 1" />
              <ListItem title="Item 2" />
              <ListItem title="Item 3" />
            </ul>
            <div class="list simple-list">
              <ul>
                {names.map((name) =>
                  <li>{name}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

Below is the code a of local sub-component, being invoked in the main
App template:

``` jsx
const ListItem = (props) => {
  return () => <li>{props.title}</li>;
}

export default ListItem
```

### Router

This app requires a router to navigate between pages. This is done with
the Framework7 builtin feature. You may pass entire app components to
the router, as shown below.

``` js
import Extra from '../components/extra.f7.jsx';

export default [
  //{
  //  path: '/'
  //},
  {
    path: '/extra/',
    asyncComponent: () => Extra
  }
]
```

### App init

Importantly, we only import Framework7 modules we need, to lighten the
final bundle:

``` js
import Dialog from 'framework7/esm/components/dialog/dialog.js';
import Gauge from 'framework7/esm/components/gauge/gauge.js';
import Panel from 'framework7/esm/components/panel/panel.js';
import View from 'framework7/esm/components/view/view.js';
Framework7.use([Dialog, Gauge, Panel, View]);
```

App UI is initialized passing the main app component, the routes and
targeting the `#app` element, located within the `app_ui()` function:

``` r
app_ui <- function(request) {
  tagList(
    # Leave this function for adding external resources
    golem_add_external_resources(),
    # Your application UI logic
    tags$body(
      div(id = "app"),
      tags$script(src = "www/index.js")
    )
  )
}
```

Since the JS assets have to go after the `#app` element in the `body`
tag, we had to comment out the `{golem}` predefined script:

``` r
tags$head(
  favicon(),
  #bundle_resources(
  #  path = app_sys('app/www'),
  #  app_title = 'shinyFramework7'
  #)
  # Add here other external resources
  # for example, you can add shinyalert::useShinyalert()
  )
```

Whole `index.js` code:

``` js
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
```

### Server

On the server side (R):

``` r
observeEvent(TRUE, {
  session$sendCustomMessage("init", colnames(mtcars))
})

observeEvent(input$alert, {
  message(sprintf("Received from JS: %s", input$alert$message))
  message(sprintf("App title is %s", input$alert$title))
})

observe({print(input$alert_opened)})
```

## Example

This is a basic example which shows you how to solve a common problem:

### Run app

``` r
library(shinyComponent)
## basic example code
run_app()
```

### Dev mode

``` r
library(shinyComponent)
## basic example code
packer::bundle_dev()
devtools::load_all()
run_app()
```
