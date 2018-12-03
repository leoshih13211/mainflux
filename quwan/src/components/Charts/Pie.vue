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
    pieCfg: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      myPieChart: {},
      config: {
        type: 'pie',
        data: {
          datasets: [],
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: [],
        },
        options: {},
      },
    };
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
        datasets: this.pieCfg.datasets,
        labels: this.pieCfg.labels,
      };
      config.options = this.pieCfg.options;

      return config;
    },
  },
};
</script>
