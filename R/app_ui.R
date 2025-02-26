#' The application User-Interface
#'
#' @param request Internal parameter for `{shiny}`.
#'     DO NOT REMOVE.
#' @inheritParams golem_add_external_resources
#' @import shiny
#' @noRd
app_ui <- function(request, title = NULL) {
  tagList(
    # Leave this function for adding external resources
    golem_add_external_resources(title),
    # Your application UI logic
    tags$body(
      div(id = "app"),
      tags$script(src = "www/index.js")
    )
  )
}

#' Add external Resources to the Application
#'
#' This function is internally used to add external
#' resources inside the Shiny application.
#'
#' @import shiny
#' @param title App title
#' @importFrom golem add_resource_path activate_js favicon bundle_resources
#' @noRd
golem_add_external_resources <- function(title){

  add_resource_path(
    'www', app_sys('app/www')
  )

  tags$head(
    favicon(),
    tags$meta(charset = "utf-8"),
    tags$meta(
      name = "viewport",
      content = "width=device-width, initial-scale=1,
      maximum-scale=1, minimum-scale=1, user-scalable=no,
      viewport-fit=cover"
    ),
    tags$meta(
      name = "apple-mobile-web-app-capable",
      content = "yes"
    ),
    tags$meta(
      name = "theme-color",
      content = "#2196f3"
    ),
    tags$title(title)
    #bundle_resources(
    #  path = app_sys('app/www'),
    #  app_title = 'shinyFramework7'
    #)
    # Add here other external resources
    # for example, you can add shinyalert::useShinyalert()
  )
}

