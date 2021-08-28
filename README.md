
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

## Example

This is a basic example which shows you how to solve a common problem:

``` r
library(shinyComponent)
## basic example code
run_app()
```
