import Color from 'color';
import Chart from 'chart.js';
import { palette } from 'common/utilities';

const COLORS = [
  'blue',
  'indigo',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'orange',
  'red',
  'pink',
  'grape',
  'violet',
];

function pickColor(idx) {
  const colorIdx = idx % COLORS.length;
  const color = COLORS[colorIdx];
  const spectrum = 5 - Math.floor(idx % COLORS.length);

  return palette(color, spectrum);
}

const setDefaultColor = {
  bar(chart) {
    chart.data.datasets.forEach((dataset) => {
      if (!dataset.borderColor) {
        dataset.borderColor = dataset.data
          .map((d, idx) => pickColor(idx));

        if (!dataset.backgroundColor) {
          dataset.backgroundColor = dataset.borderColor.map((hex) => {
            const color = new Color(hex).alpha(0.5);
            return color.string();
          });
        }
      }
    });
  },
  line(chart) {
    chart.data.datasets.forEach((dataset, idx) => {
      if (!dataset.borderColor) {
        dataset.borderColor = pickColor(idx);
        if (!dataset.backgroundColor) {
          dataset.backgroundColor = dataset.borderColor;
        }
      }
    });
  },
  pie(chart) {
    chart.data.datasets.forEach((dataset) => {
      if (!dataset.borderColor) {
        dataset.borderColor = dataset.data
          .map((d, idx) => pickColor(idx));

        if (!dataset.backgroundColor) {
          dataset.backgroundColor = dataset.borderColor;
        }
      }
    });
  },
};

Chart.pluginService.register({
  beforeUpdate(chart) {
    switch (chart.config.type) {
      case 'bar': {
        setDefaultColor.bar(chart);
        break;
      }
      case 'line': {
        setDefaultColor.line(chart);
        break;
      }
      case 'pie':
        setDefaultColor.pie(chart);
        break;
      default:
        break;
    }
  },
});

const ChartProto = {
};

export default ChartProto;
