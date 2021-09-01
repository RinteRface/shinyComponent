// Import plotting library
import * as echarts from 'echarts';
import 'echarts-gl';

const VdpWidget = (props, { $f7, $update}) => {

    // Handle range change for ODE model computation
    const getRangeValue = (e) => {
        const range = $f7.range.get(e.target);
        Shiny.setInputValue(range.el.id, range.value);
        $update();
    };

    return () => (
        <div>
            <div class="block-title">{props.label}</div>
            <div class="block block-strong text-align-center">
              <p>The below model is computed by R. R receives the slider value, solves the system and returns
                data as JSON. JS creates the chart with echartsJS and provided data.
              </p>
              <div class="block-title">Parameter value (mu)</div>
              <div class="block">
                <div
                  class="range-slider range-slider-init"
                  data-min="0"
                  data-max="2"
                  data-step="0.1"
                  data-label="true"
                  data-value="0.1"
                  data-scale="true"
                  data-scale-sub-steps="4"
                  id="mu"
                  onrangeChange={(e) => getRangeValue(e)}
                  ></div>
              </div>
              <div class="row">
                <div class="col">
                  <div id="line-plot" style="width:600px; height:400px;"></div>
                </div>
                <div class="col">
                  <div id="phase-plot" style="width:600px; height:400px;"></div>
                </div>
              </div>
            </div>
        </div>
    )
}

const initializeVdpWidget = (app) => {
  let linePlot, phasePlot;
  $(document).on('shiny:connected', () => {
    // Init vals for ODE model computation
    Shiny.setInputValue(
        'mu', 
        parseFloat($('#mu').attr('data-value'), 10), 
        {priority: 'event'}
    );
    // prepare echarts plot
    linePlot = echarts.init(document.getElementById('line-plot'));
    phasePlot = echarts.init(document.getElementById('phase-plot'));
  });

  // Recover ODE data from R
  let lineData, phaseData, trajectoryData, linePlotOptions, phasePlotOptions;

  Shiny.addCustomMessageHandler(
    'model-data', (message) => {
    lineData = message.lineData;
    phaseData = message.phaseData;
    trajectoryData = message.trajectoryData;

    linePlotOptions = {
      title: {
          text: 'Van der Pol oscillator: line plot'
      },
      tooltip: {},
      legend: {
          data:['X', 'Y']
      },
      xAxis: {
          data: lineData['t']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'X',
          type: 'line',
          data: lineData['X']
        },
        {
          name: 'Y',
          type: 'line',
          data: lineData['Y']
        }
      ]
    };

    phasePlotOptions = {
      title: {
        text: 'Van der Pol oscillator: phase plot'
      },
      visualMap: {
        show: false,
        min: 0,
        max: 8,
        dimension: 4,
        inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        }
      },
      xAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255,255,255,0.2)'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255,255,255,0.2)'
          }
        }
      },
      series: [
        {
          type: 'flowGL',
          data: phaseData,
          particleDensity: 64,
          particleSize: 5,
          particleSpeed: 4,
          supersampling: 4, 
          particleType: 'point',
          itemStyle: {
            opacity: 0.5
          }
        },
        {
          type: 'line',
          data: trajectoryData,
          symbol: 'none'
        }
      ]
    };

    // use configuration item and data specified to show chart
    linePlot.setOption(linePlotOptions);
    phasePlot.setOption(phasePlotOptions);

    // Notify plot update
    app.toast.create({
      text: 'Model successfuly computed',
      closeTimeout: 2000,
    }).open();

  });
}

export { VdpWidget, initializeVdpWidget };