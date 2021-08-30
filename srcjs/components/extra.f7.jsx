export default (props, { $f7router }) => {
  const back = () => {
    $f7router.back();
  }

  return () => (
    <div class="page">
      <div class="navbar">
        <div class="navbar-bg"></div>
        <div class="navbar-inner">
          <div class="title">Prout</div>
        </div>
      </div>
      <div class="toolbar toolbar-bottom">
        <div class="toolbar-inner">
          <a>Nothing</a>
          <a onClick={() => back()} data-transition="f7-cover">Back</a>
        </div>
      </div>
      <div class="page-content">...</div>
    </div>
  )
}


