<template>
  <div>
    <h4>Service Class Parameters</h4>
    <section class="realTime qBlock">
      <div class="title">
        <span>Real Time</span>
        <Tooltip :msg="realTimeTip">
          <i><font-awesome-icon icon="question-circle"/></i>
        </Tooltip>
      </div>
      <div class="form">
        <div class="line">
          <span class="name">Jitter(ms)</span>
          <qInput :default-value="rtjitter"/>
        </div>
        <div class="line">
          <span class="name">Latency(ms)</span>
          <qInput/>
        </div>
        <div class="line">
          <span class="name">Packet Loss Rate(%)</span>
          <qInput/>
        </div>
      </div>
    </section>
    <section class="realTime qBlock">
      <div class="title">
        <span>Tranctional</span>
        <Tooltip :msg="transactionalTip">
          <i><font-awesome-icon icon="question-circle"/></i>
        </Tooltip>
      </div>
      <div class="form">
        <div class="line">
          <span class="name">Jitter(ms)</span>
          <qInput/>
        </div>
        <div class="line">
          <span class="name">Latency(ms)</span>
          <qInput/>
        </div>
        <div class="line">
          <span class="name">Packet Loss Rate(%)</span>
          <qInput/>
        </div>
      </div>
    </section>
    <section class="realTime qBlock">
      <div class="title">
        <span>Bulk</span>
        <Tooltip :msg="bulkTip" :options="tooltipOptions">
          <i><font-awesome-icon icon="question-circle"/></i>
        </Tooltip>
      </div>
      <div class="form">
        <div class="line">
          <span class="name">Jitter(ms)</span>
          <qInput/>
        </div>
        <div class="line">
          <span class="name">Latency(ms)</span>
          <qInput/>
        </div>
        <div class="line">
          <span class="name">Packet Loss Rate(%)</span>
          <qInput/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Corpplan from 'mock/nebula/Corpplan.json';
import qInput from 'components/Input/Input.vue';
import Tooltip from 'components/Tip/Tooltip.vue';

export default {
  components: {
    qInput,
    Tooltip,
  },
  data() {
    return {
      realTimeTip: 'Real Time traffic: Streaming traffic such as voice, video…',
      transactionalTip: 'Transactional Traffic: Request-Reply traffic, such as Remote Procedure Calls(RPC), HTTP, DNS…',
      bulkTip: 'Bulk Traffic: Network backup traffic such as File Transfer Protocol(FTP)',
      tooltipOptions: {},
      serviceData: {},
    };
  },
  computed: {
    rtjitter() {
      const jitter = this.serviceData.rtjitter || 0;
      return String(jitter);
    },
  },
  mounted() {
    this.setNav('Service');
    this.setTooltipOptions();
    this.setInitData();
  },
  methods: {
    ...mapActions('Site', [
      'setNav',
    ]),
    setTooltipOptions() {
      this.$nextTick(() => {
        this.tooltipOptions = {
          modifiers: {
            preventOverflow: {
              boundariesElement: this.$el.parentElement,
            },
          },
        };
      });
    },
    setInitData() {
      const [planData] = Corpplan;
      const { serviceClassParameters } = planData;
      Object.assign(this.serviceData, serviceClassParameters);
      console.log(this.serviceData);
    },
  },
};
</script>

<style scoped lang="scss">
  .qBlock{
    padding: 1rem;
    .title i {
      font-size: 1rem;
      margin-left: 10px;
      margin: 1rem;
    }
  }
  section{
    .form{
      display: flex;
      .line{
        margin-left: 1rem;
        margin-bottom: .5rem;
        .name{
          font-size: .5rem;
          margin-right: 20px;
        }
        input{
          width: 100%;
        }
      }
    }
  }
</style>
