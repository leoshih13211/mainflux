<template>
  <div class="SystemStatus">
    <div class="ctlPanel qBlock">
      <div class="periodSelection">
        <span class="title">Time Period</span>
        <SingleSelect :selected-cfg="periodSelection" @optionEmit="optionEmit"/>
      </div>
    </div>
    <div class="charts">
      <div v-if="showCPU" class="cpu chart qBlock">
        <AreaChart
          :area-chart-cfg="cpuChartCfg"
          :update-time="updateChartTime"
          :style="areaChartStyle"/>
      </div>
      <div v-if="showMemory" class="memory chart qBlock">
        <AreaChart
          :area-chart-cfg="memoryChartCfg"
          :update-time="updateChartTime"
          :style="areaChartStyle"/>
      </div>
      <div v-if="showSession" class="session chart qBlock">
        <AreaChart
          :area-chart-cfg="sessionChartCfg"
          :update-time="updateChartTime"
          :style="areaChartStyle"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { cloneDeep } from 'lodash';
import AreaChart from 'components/Charts/AreaChart.vue';
import SingleSelect from 'components/Select/SingleSelect.vue';
import SystemStatus_1hr from 'mock/nebula/SystemStatus_1hr.json';
import SystemStatus_6hr from 'mock/nebula/SystemStatus_6hr.json';
import SystemStatus_12hr from 'mock/nebula/SystemStatus_12hr.json';
import SystemStatus_day from 'mock/nebula/SystemStatus_day.json';
import SystemStatus_week from 'mock/nebula/SystemStatus_week.json';
import SystemStatus_month from 'mock/nebula/SystemStatus_month.json';

export default {
  components: {
    AreaChart,
    SingleSelect,
  },
  data() {
    return {
      periodSelection: {
        defaultValue: 1,
        options: [
          { name: 'Past 1 hr', value: 1 },
          { name: 'Past 6 hrs', value: 2 },
          { name: 'Past 12 hrs', value: 3 },
          { name: 'Past day', value: 4 },
          { name: 'Past week', value: 5 },
          { name: 'Past month', value: 6 },
        ],
      },
      cpuChartCfg: this.areaChartCfgGen({
        title: 'CPU',
        datasets: [],
      }),
      memoryChartCfg: this.areaChartCfgGen({
        title: 'Memory',
        datasets: [],
      }),
      sessionChartCfg: this.areaChartCfgGen({
        title: 'Session',
        datasets: [],
      }),
      SystemStatusData: {
        ifNameList: [],
        data: [],
      },
      updateChartTime: 0,
    };
  },
  computed: {
    areaChartStyle() {
      return {
        position: 'relative',
        width: '100%',
        height: '30vh',
      };
    },
    ifNameList() {
      return this.SystemStatusData.ifNameList;
    },
    cupNameList() {
      return this.ifNameList.filter(name => name.toLowerCase().includes('core'));
    },
    memoryNameList() {
      return this.ifNameList.filter(name => name.toLowerCase().includes('memory'));
    },
    sessionNameList() {
      return this.ifNameList.filter(name => name.toLowerCase().includes('session'));
    },
    SysData() {
      let currentTime = new Date().getTime();
      const SystemStatusData = cloneDeep(this.SystemStatusData);
      for (let i = SystemStatusData.data.length - 1; i >= 0; i--) {
        SystemStatusData.data[i].unixtime = currentTime;
        currentTime -= 60000;
      }
      return SystemStatusData.data;
    },
    showCPU() {
      return !!this.cpuChartCfg.datasets.length;
    },
    showMemory() {
      return !!this.memoryChartCfg.datasets.length;
    },
    showSession() {
      return !!this.sessionChartCfg.datasets.length;
    },
  },
  mounted() {
    this.setGroup('System Status');
    this.setSystemStatusData();
    this.setCharts();
  },
  methods: {
    ...mapActions('Sidebar', [
      'setGroup',
    ]),
    setSystemStatusData() {
      this.SystemStatusData = this.gstSystemStatusData(this.periodSelection.defaultValue);
      if (this.SystemStatusData.data.length) this.updateChartTime = new Date().getTime();
    },
    optionEmit(value) {
      this.SystemStatusData = this.gstSystemStatusData(value);
      if (this.SystemStatusData.data.length) {
        this.updateOptions(value);
        this.updateChart();
      }
    },
    setCPU() {
      if (!this.cpuChartCfg.datasets.length) {
        // init
        this.cpuChartCfg.datasets = this.cupNameList.map(label => this.getChartDataset(label));
      } else {
        // update
        this.cupNameList.forEach((label, index) => {
          this.cpuChartCfg.datasets[index] = this.getChartDataset(label);
        });
      }
    },
    setMemory() {
      if (!this.memoryChartCfg.datasets.length) {
        // init
        this.memoryChartCfg.datasets = this.memoryNameList
          .map(label => this.getChartDataset(label));
      } else {
        // update
        this.memoryNameList.forEach((label, index) => {
          this.memoryChartCfg.datasets[index] = this.getChartDataset(label);
        });
      }
    },
    setSession() {
      if (!this.sessionChartCfg.datasets.length) {
        // init
        this.sessionChartCfg.datasets = this.sessionNameList
          .map(label => this.getChartDataset(label));
      } else {
        // update
        this.memoryNameList.forEach((label, index) => {
          this.sessionChartCfg.datasets[index] = this.getChartDataset(label);
        });
      }
    },
    setCharts() {
      this.setCPU();
      this.setMemory();
      this.setSession();
    },
    updateOptions(optVal) {
      switch (optVal) {
        case 1:
        case 2:
        case 3:
        case 4:
          this.updateXAxesFormat(this.cpuChartCfg, 'HH:mm');
          this.updateXAxesFormat(this.memoryChartCfg, 'HH:mm');
          this.updateXAxesFormat(this.sessionChartCfg, 'HH:mm');
          break;
        case 5:
        case 6:
          this.updateXAxesFormat(this.cpuChartCfg, 'MM/DD');
          this.updateXAxesFormat(this.memoryChartCfg, 'MM/DD');
          this.updateXAxesFormat(this.sessionChartCfg, 'MM/DD');
          break;
        default:
          break;
      }
      console.log('this.sessionChartCfg :', this.sessionChartCfg);
    },
    updateXAxesFormat(config, timeFormat) {
      Object.keys(config.options.scales.xAxes[0].time.displayFormats)
        .forEach((key) => {
          config.options.scales.xAxes[0].time.displayFormats[key] = timeFormat;
        });
    },
    updateChart() {
      this.setCharts();
      this.updateChartTime = new Date().getTime();
    },
    getChartDataset(label) {
      const data = this.SysData.map(d => this.areaChartDataFormat({
        x: d.unixtime,
        y: d[label],
      }));
      return {
        label,
        data,
        fill: 'origin',
        borderWidth: 1,
        pointRadius: 1,
      };
    },
    areaChartCfgGen({ title, datasets }) {
      const config = {
        datasets: datasets || [],
        options: {
          responsive: true,
          title: {
            display: true,
            text: title || 'Data Flow Chart',
          },
          tooltips: {
            callbacks: {
              label(tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || '';
                if (label) {
                  label += ': ';
                }
                label += `${Math.round(tooltipItem.yLabel * 100) / 100}%`;
                return label;
              },
            },
          },
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                displayFormats: this.timeFormatsGen('HH:mm'),
                tooltipFormat: 'YYYY/MM/DD HH:mm',
              },
            }],
          },
        },
      };

      return config;
    },
    areaChartDataFormat({ x, y }) {
      return {
        t: x,
        y,
      };
    },
    gstSystemStatusData(value) {
      let rs = {
        ifNameList: [],
        data: [],
      };
      switch (value) {
        case 1:
          rs = cloneDeep(SystemStatus_1hr);
          break;
        case 2:
          rs = cloneDeep(SystemStatus_6hr);
          break;
        case 3:
          rs = cloneDeep(SystemStatus_12hr);
          break;
        case 4:
          rs = cloneDeep(SystemStatus_day);
          break;
        case 5:
          rs = cloneDeep(SystemStatus_week);
          break;
        case 6:
          rs = cloneDeep(SystemStatus_month);
          break;
        default:
          break;
      }
      return rs;
    },
    timeFormatsGen(type) {
      return {
        millisecond: type,
        second: type,
        minute: type,
        hour: type,
        day: type,
        week: type,
        month: type,
        quarter: type,
        year: type,
      };
    },
  },
};
</script>

<style scoped lang="scss">
  .SystemStatus{
    .ctlPanel, .charts{
      width: 100%;
      margin-bottom: 1rem;
    }
    .ctlPanel, .chart{
      padding: 1rem;
    }
  }
</style>
