import { Widget, initializeWidget } from './widget.f7.jsx';
import { VdpWidget, initializeVdpWidget } from './vdp.f7.jsx';

export default (props, { $, $f7, $f7router, $onMounted, $update }) => {
  const back = () => {
    $f7router.back();
  }

  initializeWidget('customWidget', $onMounted, $f7, $update);
  initializeVdpWidget($onMounted, $, $f7);

  return () => (
    <div class="page">
      <div class="navbar">
        <div class="navbar-bg"></div>
        <div class="navbar-inner">
          <div class="title">Other page</div>
        </div>
      </div>
      <div class="toolbar toolbar-bottom">
        <div class="toolbar-inner">
          <a>Nothing</a>
          <a onClick={() => back()} data-transition="f7-cover">Back</a>
        </div>
      </div>
      <div class="page-content">
        <VdpWidget label="Van der Pol Model"/>
        <Widget id="customWidget" label="Gauge and Range API"/>
      </div>
    </div>
  )
}


