const Widget = (props) => {

    return () => (
        <div>
            <div class="block-title">{props.label}</div>
            <div id={props.id} class="block block-strong text-align-center">
                <h3>Move me!</h3>
                <div class="range-slider" id={props.id + '_range'}></div>
                <br></br>
                <div class="gauge" id={props.id + '_gauge'}></div>
            </div>
        </div>
    )
}

// This method has to be called inside the parent component
// Cannot be called inside widget 
const initializeWidget = (id, event, app, refresh) => {
    let gaugeEl, sliderEl;

    event(() => {
      // Init gauge el
      gaugeEl = app.gauge.create({
        el: '#' + id + '_gauge',
        type: 'circle',
        value: 0.5,
        size: 250,
        borderColor: '#2196f3',
        borderWidth: 10,
        valueText: '50%',
        valueFontSize: 41,
        valueTextColor: '#2196f3'
      });

        // access range instance to get value
        // and update gauge on drag
        const sliderId = id + '_range';
        sliderEl = app.range.create({
          el: '#' + sliderId,
          min: 0,
          max: 100,
          value: 50,
          scale: true,
          on: {
            changed: function(_range, value) {
              gaugeEl.update({ 
                  value: value / 100, 
                  valueText: value + '%'
              });
              Shiny.setInputValue(sliderId, value);
              refresh();
            }
          }
        });
    });
}

export { Widget, initializeWidget};