import ListItem from './custom-list.f7.jsx';
import { VdpWidget, initializeVdpWidget } from './vdp.f7.jsx';

export default (props, {$, $f7, $f7ready, $on, $update }) => {
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

  initializeVdpWidget($f7);

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
            <VdpWidget label="Van der Pol Model"/>
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


