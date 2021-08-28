
<!-- README.md is generated from README.Rmd. Please edit that file -->

# shinyComponent

<!-- badges: start -->

[![Lifecycle:
experimental](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://lifecycle.r-lib.org/articles/stages.html#experimental)
[![R-CMD-check](https://github.com/RinteRface/shinyComponent/workflows/R-CMD-check/badge.svg)](https://github.com/RinteRface/shinyComponent/actions)
<!-- badges: end -->

App powered by {golem}, webpack, Framework7 components (esm). WIP

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

App component is driven by:

``` jsx
<!-- component template, uses same tagged template literals -->
<template>
  <div class="page">
    <div class="navbar">
      <div class="navbar-bg"></div>
      <div class="navbar-inner">
        <div class="title">${title}</div>
      </div>
    </div>
    <div class="page-content">
      <a @click=${openAlert}>Open Alert</a>
      <div class="list simple-list">
        <ul>
          ${names.map((name) => $h`
            <li>${name}</li>
          `)}
        </ul>
      </div>
      ${gaugeVisible && $h`
        <!-- must have unique key -->
        <div key="gauge" class="gauge gauge-init" data-type="circle"
          data-value="0.60"
          data-value-text="60%"
          data-value-text-color="#ff9800"
          data-border-color="#ff9800"
        ></div>
      `}
      <a href="#" class="button" @click=${toggleGauge}>Toggle Gauge</a>
    </div>
  </div>
</template>
<!-- component styles -->
<style>
  .red-link {
    color: red;
  }
</style>
<!-- rest of component logic -->
<script>
  import 'shiny';
  export default (props, { $f7ready, $f7, $on, $update }) => {
    const title = 'Hello World';
    let names = ['John', 'Vladimir', 'Timo'];

    Shiny.addCustomMessageHandler('init', function(message) {
      names = message;
      $update();
    });

    const openAlert = () => {
      $f7.dialog.alert(title, function() {
        // ok button callback
        Shiny.setInputValue('alert_opened', false)
      });

      Shiny.setInputValue('alert_opened', true)
      Shiny.setInputValue(
        'alert',
        {
          message: 'Alert dialog was triggered!',
          title: title,
        },
        {priority: 'event'}
      )
    }

    $f7ready(() => {
      // now it is safe to call Framework7 APIs
      $f7.dialog.alert('Hello!');
    });

    // Gauge
    let gaugeVisible = false;

    const toggleGauge = () => {
      gaugeVisible = !gaugeVisible;
      $update();
    }

    // component function must return render function
    return $render;
  }

</script>
```

App UI is initialized by:

``` js
import 'shiny';
// Import Framework7
import Framework7 from 'framework7';
// Import Framework7 Styles
import 'framework7/framework7-bundle.min.css';

// Install F7 Components using .use() method on class:
import Dialog from 'framework7/esm/components/dialog/dialog.js';
import Gauge from 'framework7/esm/components/gauge/gauge.js';
Framework7.use([Dialog, Gauge]);

// Import App component
import App from './components/app.f7.html';

// Init app
var app = new Framework7({
  // specify main app component
  component: App
})
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

``` r
library(shinyComponent)
## basic example code
run_app()
```
