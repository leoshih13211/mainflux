<template>
  <canvas ref="myLineChart"/>
</template>

<script>
import { cloneDeep } from 'lodash';
import Chart from 'chart.js';
import _ChartProto from './_Chart_Proto';

export default {
  extends: _ChartProto,
  props: {
    areaChartCfg: {
      type: Object,
      default: () => ({}),
    },
    updateTime: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      config: {
        type: 'line',
        data: {},
        fill: true, // non-offical attrbute
      },
    };
  },
  watch: {
    updateTime() {
      this.myLineChart.options = this.areaChartCfg.options;
      this.myLineChart.update();
    },
  },
  mounted() {
    const ctx = this.$refs.myLineChart.getContext('2d');
    const config = this.initCfg();

    this.myLineChart = new Chart(ctx, config);
    console.log(this.myLineChart);
  },
  methods: {
    initCfg() {
      const config = cloneDeep(this.config);
      config.data = {
        datasets: this.areaChartCfg.datasets,
        labels: this.areaChartCfg.labels,
      };
      config.options = this.areaChartCfg.options;

      return config;
    },
  },
};
</script>

<style lang="scss" scoped>
  canvas{
    height: 100%;
  }
</style>
