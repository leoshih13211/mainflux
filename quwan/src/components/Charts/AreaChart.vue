<template>
  <canvas ref="myPieChart"/>
</template>

<script>
import { cloneDeep } from 'lodash';
import Chart from 'chart.js';
import _ChartProto from './_Chart_Proto';

export default {
  extends: _ChartProto,
  props: {
    areaChartData: {
      type: Object,
      default: () => ({}),
    },
    datasets: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      config: {
        type: 'line',
        data: {},
      },
    };
  },
  watch: {
    datasets: {
      handler() {
        this.myPieChart.update();
      },
      deep: true,
    },
  },
  mounted() {
    const ctx = this.$refs.myPieChart.getContext('2d');
    const config = this.initCfg();

    this.myPieChart = new Chart(ctx, config);
  },
  methods: {
    initCfg() {
      const config = cloneDeep(this.config);
      config.data = {
        datasets: this.areaChartData.datasets,
        labels: this.areaChartData.labels,
      };
      config.options = this.areaChartData.options;

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
