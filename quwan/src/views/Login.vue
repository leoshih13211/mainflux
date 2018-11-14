<template>
  <div class="Login">
    <div class="title">
      <h1>QuWan Cloud</h1>
    </div>
    <div class="content">
      <qButtonIcon
        :front-icon="loginBtnLogo"
        name="Login"
        class="btn qButton-info loginBtn"
        @click.native="login"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import cookieManager from 'services/cookieManager';
import auth from 'services/auth';
import logoWhiteLogo from 'assets/logo_myqnapcloud.png';
import qButtonIcon from 'components/Button/ButtonIcon.vue';

export default {
  name: 'Login',
  components: {
    qButtonIcon,
  },
  data() {
    return {
      loginBtnLogo: logoWhiteLogo,
    };
  },
  computed: {
    accessToken() {
      return cookieManager.getValue('access_token');
    },
    refreshToken() {
      return cookieManager.getValue('refresh_token');
    },
    tokenExist() {
      return this.accessToken && this.refreshToken;
    },
  },
  created() {
    const { hash } = window.location;
    if (hash) {
      this.getOauthToken(hash);
      this.$router.push('login');
    }
  },
  mounted() {
    if (this.tokenExist) {
      this.dialogOpen({ type: 'Loading' });
      this.exchangeOauthToken()
        .then(({ token = null }) => {
          if (!token) throw new Error('Permission denied');
          cookieManager.setCookie('quwan_token', token);

          cookieManager.deleteCookie('access_token');
          cookieManager.deleteCookie('refresh_token');
          this.dialogClose({ type: 'Loading' });
          this.$router.push('/overview');
        })
        .catch((error) => {
          const e = error || '';
          this.dialogClose({ type: 'Loading' });
          this.setSysMsg({ type: 'danger', msg: e });
        });
    }
  },
  beforeDestroy() {
    this.dialogClose({ type: 'Loading' });
  },
  methods: {
    ...mapActions('SysMsg', [
      'setSysMsg',
    ]),
    ...mapActions('Dialog', {
      dialogOpen: 'open',
      dialogClose: 'close',
    }),
    login() {
      this.dialogOpen({ type: 'Loading' });
      auth.login();
    },
    getOauthToken(hash) {
      const params = hash.substring(1)
        .split('&')
        .reduce((rs, item) => {
          const [key, value] = item.split('=');
          rs[key] = value;
          return rs;
        }, {});

      const verifyFailed = this.checkOauthToken(params);
      if (verifyFailed) {
        throw new Error(verifyFailed);
      } else {
        cookieManager.setCookie('access_token', params.access_token);
        cookieManager.setCookie('refresh_token', params.refresh_token);
        // Object.keys(params)
        //   .forEach((key) => {
        //     cookieManager.setCookie(key, params[key]);
        //   });
      }
    },
    checkOauthToken(callbackParams) {
      const authKeys = ['access_token', 'token_type', 'expires_in', 'refresh_token', 'scope'];
      const paramKeys = Object.keys(callbackParams);
      let rs = '';
      if (paramKeys.includes('state')) paramKeys.splice(paramKeys.indexOf('state'), 1); // optional param
      if (authKeys.length > paramKeys.length) rs = 'Some callback params missing';
      if (authKeys.length < paramKeys.length) rs = 'Some callback params are redundant';
      const shouldAllMappin = paramKeys.find(pk => authKeys.includes(pk));
      if (!shouldAllMappin) rs = 'Some callback params is wrong';
      return rs;
    },
    async exchangeOauthToken() {
      try {
        const verifyRs = await auth.exchangeOauthToken({
          access_token: this.accessToken,
          refresh_token: this.refreshToken,
        });

        if (verifyRs.err) throw verifyRs.err;

        return verifyRs.data;
      } catch (error) {
        throw error;
      }
    },
  },
};
</script>

<style scoped lang="scss">
$login-border-color: #aaaaaa;
$login-border-gap: 20px;

.Login{
  width: 30vw;
  min-height: 40vh;
  min-width: 275px;
  margin: 0px auto;
  box-sizing: border-box;
  padding: $login-border-gap;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: #fff;
  box-shadow:
    0 2px 2px 0 rgba(0,0,0,0.14),
    0 3px 1px -2px rgba(0,0,0,0.12),
    0 1px 5px 0 rgba(0,0,0,0.2);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  .title{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    flex: 1 1;
    margin-bottom: 40px;;
  }
  .content{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex: 3 3;
    .loginBtn{
      width: 320px;
      height: 60px;
      font-size: 26px;
      color: #fff;
    }
  }
}


</style>

