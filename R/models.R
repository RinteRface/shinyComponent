vdp_equations <- c(
  "Y",
  "p['mu'] * (1 - X^2) * Y - X"
)


#' Brusselator model example
#'
#' 2D ODE model
#'
#' @keywords internal
vdp <- function(t, y, p) {
  with(as.list(y), {
    dX <- eval(parse(text = vdp_equations[1]))
    dY <- eval(parse(text = vdp_equations[2]))
    list(c(X=dX, Y=dY))
  })
}

#' Solve 2D ODE model
#'
#' Leverage deSolve package
#'
#' @keywords internal
solve_model <- function(Y0, t, model, parms) {
  deSolve::ode(y = Y0, times = t, model, parms)
}


build_phase_data <- function(xgrid, ygrid, p) {
  vectors <- expand.grid(x = xgrid, y = ygrid)
  X <- vectors$x
  Y <- vectors$y
  vectors$dx <- eval(parse(text = vdp_equations[1]))
  vectors$dy <- eval(parse(text = vdp_equations[2]))
  vectors$mag <- sqrt(vectors$dx * vectors$dx + vectors$dy * vectors$dy)
  vectors
}
