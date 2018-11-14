<template>
  <div class="home">
    <TopBar />
    <section>
      <Sidebar/>
      <transition name="component-fade" mode="out-in">
        <router-view class="main"/>
      </transition>
    </section>
  </div>
</template>

<script>
import TopBar from './TopBar.vue';
import Sidebar from './Sidebar.vue';

export default {
  name: 'Home',
  components: {
    TopBar,
    Sidebar,
  },
};
</script>

<style lang="scss" scoped>
  section{
    width: 100%;
    height: 92vh;
    display: flex;
  }
  .home{
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .main{
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
  }
</style>
