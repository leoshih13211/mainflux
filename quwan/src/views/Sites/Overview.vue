<template>
  <div class="d-flex">
    <div class="d-flex flex-wrap align-content-start siteStats">
      <div v-if="showThroughput" class="throughput qBlock">
        <AreaChart
          :area-chart-data="throughputCfg"
          :datasets="throughputData"
          :style="areaChartStyle"/>
      </div>
      <div v-if="showUsage" class="resPie usage qBlock">
        <Pie id="pieApp" :pie-data="usageCfg" :style="pieChartStyle"/>
      </div>
    </div>
    <section class="branchInfo">
      <div class="siteMap qBlock">
        <Map :cfg="mapData"/>
      </div>
      <div class="qBlock">
        <div class="wanStatus">
          <div class="title">WAN Status</div>
          <div class="stats">
            <TableRes :table-data="devicesCfg"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Color from 'color';
import { palette } from 'common/utilities';
import TableRes from 'components/Table/TableRes.vue';
import Pie from 'components/Charts/Pie.vue';
import AreaChart from 'components/Charts/AreaChart.vue';
import Map from 'components/Map.vue';
import mockDevices from '@/../mock/mock_devices.json';

export default {
  components: {
    TableRes,
    Pie,
    AreaChart,
    Map,
  },
  data() {
    return {
      devicesCfg: {
        caption: 'Device Info',
        heads: [
          { id: 'name', name: 'Interface Name' },
          { id: 'status', name: 'Connection Status', spCell: 'CnntStatus' },
          // { id: 'macAddress', name: 'MAC Address' },
          // { id: 'method', name: 'Method' },
          // { id: 'routeMode', name: 'Rooute Mode' },
          // { id: 'priority', name: 'priority' },
        ],
        body: [],
      },
      mapData: {
        markerGroup: [
          [
            {
              pos: [25.0599030, 121.6369863],
              popupText: 'This is Xizhi, CO.',
            },
          ],
        ],
        fitMap: 'marker', // default marker
        showController: false,
      },
      usageCfg: {
        datasets: [],
        labels: [],
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Appication Usage',
          },
          cutoutPercentage: 50,
          legend: {
            position: 'right',
          },
          tooltips: {
            callbacks: {
              label: this.pieTooltipCb,
            },
          },
        },
      },
      throughputCfg: {
        datasets: [],
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Network Throughput',
          },
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                displayFormats: {
                  millisecond: 'h:mm:ss a',
                  second: 'h:mm:ss a',
                  minute: 'h:mm:ss a',
                  hour: 'h:mm:ss a',
                  day: 'h:mm:ss a',
                  week: 'h:mm:ss a',
                  month: 'h:mm:ss a',
                  quarter: 'h:mm:ss a',
                  year: 'h:mm:ss a',
                },
                tooltipFormat: 'h:mm:ss a',
              },
            }],
          },
        },
      },
      throughputData: [
        [this.randomData()],
        [this.randomData()],
      ],
      pieTooltipVal: '',
      timer: null,
    };
  },
  computed: {
    showUsage() {
      return !!this.usageCfg.datasets.length;
    },
    showThroughput() {
      return !!this.throughputCfg.datasets.length;
    },
    areaChartStyle() {
      return {
        position: 'relative',
        width: '50vw',
        height: '30vh',
      };
    },
    pieChartStyle() {
      return {
        position: 'relative',
        width: '50vw',
        height: '30vh',
      };
    },
  },
  mounted() {
    this.setNav('Overview');
    this.setData();
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    ...mapActions('Site', [
      'setNav',
    ]),
    setData() {
      this.setThroughput();
      this.setUsage();
      this.setDevices();
    },
    setThroughput() {
      const txColor = 'orange';
      const rxColor = 'green';
      const datasets = [
        {
          label: 'Tx',
          backgroundColor: this.colorFade(palette(txColor, 5)),
          borderColor: this.colorFade(palette(txColor, 3)),
          data: this.throughputData[0],
          fill: 'origin',
        }, {
          label: 'Rx',
          backgroundColor: this.colorFade(palette(rxColor, 5)),
          borderColor: this.colorFade(palette(rxColor, 3)),
          data: this.throughputData[1],
          fill: 'origin',
        },
      ];
      this.throughputCfg.datasets = datasets;
      this.timer = setInterval(() => {
        if (this.throughputData[0].length === 12) this.throughputData[0].shift();
        if (this.throughputData[1].length === 12) this.throughputData[1].shift();

        this.throughputData[0].push(this.randomData());
        this.throughputData[1].push(this.randomData());
        this.throughputCfg.datasets = datasets;
      }, 5000);
    },
    setUsage() {
      let labels = ['LINE', 'Facebook', 'Yahoo', 'YouTube', 'VPN', 'WAN', 'Others'];
      const dataset = [7, 20, 3, 44, 22, 33, 5];
      const datasets = [{
        data: dataset,
      }];
      const sumDataset = dataset.reduce((sum, val) => {
        const rs = sum + val;

        return rs;
      }, 0);

      labels = labels.map((l, index) => {
        const percentage = Math.round((dataset[index] / sumDataset) * 100);
        return `${l} - ${percentage}%`;
      });

      this.usageCfg.labels = labels;
      this.usageCfg.datasets = datasets;
    },
    setDevices() {
      this.devicesCfg.body = mockDevices;
    },
    pieTooltipCb(tooltipItem, data) {
      const datasetIndex = tooltipItem.datasetIndex || 0;
      const dataset = data.datasets[datasetIndex];
      const tooltipIndex = tooltipItem.index;
      const tooltipVal = dataset.data[tooltipIndex];

      let label = data.labels[tooltipIndex] || '';
      this.pieTooltipVal = tooltipVal;
      if (label) {
        [label] = label.split(' - ');
        label += ': ';
      }

      label += `${tooltipVal}MB`;
      return label;
    },
    colorFade(color) {
      return new Color(color).fade(0.7).string();
    },
    randomData() {
      const randomNum = Math.floor(Math.random() * 100) + 1;
      return {
        t: new Date(),
        y: randomNum,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  .branchInfo{
    height: 100%;
    width: 30%;
    .siteMap{
      border-radius: 3px;
      padding: 10px;
      width: 100%;
      height: 40vh;
    }
  }
  .siteStats{
    width: 70%;
    margin: 0px 20px;
    .wanStatus{
      width: 100%;
      .stats{
        height: 300px;
      }
    }
  }
  .title {
    padding: 1rem;
  }
  .resPie{
    width: 100%;
    position: relative;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .throughput{
    min-width: 600px;
    width: 100%;
    height: 40vh;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
  }
</style>
