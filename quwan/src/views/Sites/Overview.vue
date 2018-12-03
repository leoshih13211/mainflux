<template>
  <div class="Site_Overview">
    <div class="sysStats">
      <div class="qBlock">
        <div class="wanStatus">
          <h4 class="title">Online WAN Port</h4>
          <div class="stats" @click="redirectDevicePage">
            <span class="online">{{ wanPortStat.online }}</span>
            <sub class="total">/{{ wanPortStat.total }}</sub>
          </div>
        </div>
      </div>
      <div class="qBlock">
        <div class="wanStatus">
          <h4 class="title">Online LAN Port</h4>
          <div class="stats" @click="redirectDevicePage">
            <span class="online">{{ lanPortStat.online }}</span>
            <sub class="total">/{{ lanPortStat.total }}</sub>
          </div>
        </div>
      </div>
    </div>
    <div class="siteStats">
      <div v-if="showThroughput" class="throughput qBlock">
        <AreaChart
          :area-chart-cfg="throughputCfg"
          :update-time="throughputUpdateTime"
          :style="areaChartStyle"/>
      </div>
      <div v-if="showUsage" class="resPie usage qBlock">
        <Pie id="pieApp" :pie-cfg="usageCfg" :style="pieChartStyle"/>
      </div>
    </div>
    <section class="branchInfo">
      <div class="siteMap qBlock">
        <Map v-if="showMap" :cfg="mapData"/>
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
import Map from 'components/Map/Map.vue';
import mockPorts from 'mock/nebula/Port.json';
import mockSite from 'mock/nebula/Site.json';

export default {
  components: {
    TableRes,
    Pie,
    AreaChart,
    Map,
  },
  data() {
    return {
      wanPortCfg: {
        heads: [
          { id: 'zone', name: 'Port Name' },
          { id: 'enable', name: 'Status', spCell: 'PortEnable' },
        ],
        body: [],
      },
      lanPortCfg: {
        heads: [
          { id: 'port', name: 'Port Name' },
          { id: 'enable', name: 'Status', spCell: 'PortEnable' },
        ],
        body: [],
      },
      mapData: {
        type: 'FeatureCollection',
        features: [],
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
            fullWidth: false,
            labels: {
              fontSize: 12,
              boxWidth: 20,
            },
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
      throughputUpdateTime: 0,
      pieTooltipVal: '',
      timer: null,
    };
  },
  computed: {
    showMap() {
      return this.mapData.features.length;
    },
    showUsage() {
      return !!this.usageCfg.datasets.length;
    },
    showThroughput() {
      return !!this.throughputCfg.datasets.length;
    },
    areaChartStyle() {
      return {
        position: 'relative',
        width: '100%',
        height: '70%',
      };
    },
    pieChartStyle() {
      return {
        position: 'relative',
        width: '100%',
        height: '80%',
      };
    },
    wanPortStat() {
      const total = mockPorts.wanSetting.length;
      const online = mockPorts.wanSetting.filter(p => p.enable).length;
      return {
        online,
        total,
      };
    },
    lanPortStat() {
      const total = mockPorts.lanSetting.length;
      const online = mockPorts.lanSetting.filter(p => p.enable).length;
      return {
        online,
        total,
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
      this.setMapData();
      this.setThroughput();
      this.setUsage();
      this.setDevices();
    },
    setMapData() {
      const [lat, lng] = mockSite.location.split(',')
        .map(d => Number(d.trim()));
      const feature = {
        id: this.mapData.features.length + 1,
        place: mockSite.siteName,
        targets: [],
        coordinate: {
          lat,
          lng,
        },
        desc: mockSite.description,
      };
      this.mapData.features.push(feature);
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
        this.throughputUpdateTime = new Date().getTime();
      }, 5000);
      this.throughputUpdateTime = new Date().getTime();
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
      this.wanPortCfg.body = mockPorts.wanSetting.filter(p => p.enable);
      this.lanPortCfg.body = mockPorts.lanSetting.filter(p => p.enable);
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
    redirectDevicePage() {
      this.$router.push('/site/device');
    },
  },
};
</script>

<style lang="scss" scoped>
$text-color: color('black');

.Site_Overview{
  display: flex;
  flex-wrap: wrap;
  h4{
    margin-bottom: 0px;
  }
  .branchInfo{
    width: 100%;
    .siteMap{
      border-radius: 3px;
      padding: 10px;
      width: 100%;
      height: 40vh;
      max-height: 250px
    }
  }
  .sysStats{
    width: 100%;
    display: flex;
    justify-content: space-between;
    .qBlock{
      &:not(:last-child){
        margin-right: 20px;
      }
      .stats{
        display: flex;
        justify-content: center;
        height: 100px;
        align-items: baseline;
        cursor: pointer;
        .online{
          text-decoration: underline;
          font-size: 4rem;
          color: theme-color('success');
          margin-right: 5px;

        }
        .total{
          font-size: 1.5rem;
          color: lighten($text-color, 25%)
        }
        &:hover{
          background: theme-color('background');
        }
      }
    }
  }
  .siteStats{
    display: flex;
    align-content: flex-start;
    width: 100%;
    .wanStatus{
      width: 100%;
      .stats{
        height: 300px;
      }
    }
  }
  .title {
    padding: 1rem;
    border-bottom: 1px solid color('light-gray');
    color: lighten($text-color, 25%);
  }
  .resPie{
    width: 50%;
    height: 40vh;
    max-height: 250px;
    position: relative;
    display: inline-flex;
    align-items: center;
  }
  .throughput{
    width: 50%;
    max-height: 250px;
    height: 40vh;
    margin-right: 20px;
    display: inline-flex;
    align-items: center;
  }
}
</style>
