<template>
  <div class="Topbar">
    <h2 class="title bg-primary" @click="backHome">QuWAN</h2>
    <div class="utilities">
      <div class="subTitle"/>
      <div class="items">
        <div class="item" title="Account">
          <font-awesome-icon icon="user" alt="logout"/>
        </div>
        <div class="item" title="Help">
          <font-awesome-icon icon="question-circle" alt="logout"/>
        </div>
        <div class="item" title="logout" @click="logout">
          <font-awesome-icon icon="sign-out-alt" alt="logout"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import auth from 'services/auth';
import cookieManager from 'services/cookieManager';

export default {
  name: 'TopBar',
  beforeDestroy() {
    this.dialogClose({ type: 'Loading' });
  },
  methods: {
    ...mapActions('Dialog', {
      dialogOpen: 'open',
      dialogClose: 'close',
    }),
    ...mapActions('SysMsg', [
      'setSysMsg',
    ]),
    async logout() {
      this.dialogOpen({ type: 'Loading' });
      try {
        await auth.logout();
        this.$router.push('/');
      } catch (error) {
        this.dialogOpen({ type: 'Loading' });
        this.setSysMsg({ type: 'danger', msg: error });
      }

      cookieManager.deleteAllCookies();
      this.$router.push('login');
    },
    backHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped lang="scss">
$color-gray: color('light-gray');
$theme-primary: theme-color('primary');
$item-color: $color-gray;
$item-hover-color: $theme-primary;
$item-hover-bg: lighten($color-gray, 5%);

  h1{
    text-align: left;;
  }
  .Topbar{
    width: 100%;
    height: $topbar-height;
    min-height: $topbar-min-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: color('white');
    /* Shadow */
    -webkit-box-shadow: 0px 5px 9px 0px rgba(0,0,0,0.34);
    -moz-box-shadow: 0px 5px 9px 0px rgba(0,0,0,0.34);
    box-shadow: 0px 5px 9px 0px rgba(0,0,0,0.34);
    z-index: 2;
    .title{
      width: 10vw;
      height: 100%;
      max-width: 230px;
      min-width: 200px;
      display: flex;
      align-items: center;
      margin: 0;
      padding-left: 20px;
      cursor: pointer;
    }
    .utilities{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      .subTitle{
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 20px;
      }
      .items{
        display: flex;
      }
      .item{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 5vw;
        min-width: 50px;
        max-width: 65px;
        height: 100%;
        cursor: pointer;
        color: $item-color;
        &:hover{
          color: $item-hover-color;
          background-color: $item-hover-bg;
        }
      }
    }
  }
</style>
