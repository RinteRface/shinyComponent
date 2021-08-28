#' The application server-side
#'
#' @param input,output,session Internal parameters for {shiny}.
#'     DO NOT REMOVE.
#' @import shiny
#' @importFrom datasets mtcars
#' @noRd
app_server <- function( input, output, session ) {
  # Your application server logic
  observeEvent(TRUE, {
    session$sendCustomMessage("init", colnames(mtcars))
  })
}
