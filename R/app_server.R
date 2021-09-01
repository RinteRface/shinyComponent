#' The application server-side
#'
#' @param input,output,session Internal parameters for {shiny}.
#'     DO NOT REMOVE.
#' @import shiny
#' @noRd
app_server <- function( input, output, session ) {

  pars <- reactive({
    req(input$mu)
    c(mu = input$mu)
  })

  model_output <- reactive({
    req(pars())
    solve_model(
      Y0 = c(X=1, Y=1),
      t = seq(0, 100, .1),
      vdp,
      pars()
    )
  })

  observeEvent(model_output(), {
    data <- data.frame(model_output())
    modelData <- list(t = data$time, X = data$X, Y = data$Y)
    grid <- seq(-10, 10)
    trajectoryData <- data.frame(model_output()[, "X"], model_output()[, "Y"])
    names(trajectoryData) <- NULL
    phaseData <- build_phase_data(grid, grid, pars())
    names(phaseData) <- NULL
    session$sendCustomMessage(
      "model-data",
      list(
        lineData = modelData,
        phaseData = jsonlite::toJSON(phaseData, pretty = TRUE),
        trajectoryData = jsonlite::toJSON(trajectoryData, pretty = TRUE)
      )
    )
  })

  # Your application server logic
  observeEvent(TRUE, {
    session$sendCustomMessage("init", colnames(mtcars))
  })

  observeEvent(input$alert, {
    message(sprintf("Received from JS: %s", input$alert$message))
    message(sprintf("App title is %s", input$alert$title))
  })

  observe({
    print(input$alert_opened)
    print(input$mu)
  })
}
