<template>
  <div class="SignUp">
    <div class="title">
      <h1 class="qText-primary">QuWan Cloud</h1>
      <h2>SignUp</h2>
    </div>
    <form class="form" autocomplete="on" @submit.prevent.stop="submit">
      <div class="inputContainer">
        <div class="account">
          <qMailInput :valid="valid.email" placeholder="Email*" @onInput="onMailInput"/>
        </div>
        <div class="password">
          <qPwInput :valid="valid.pwd" placeholder="Password*" @onInput="onPwdInput"/>
        </div>
        <div class="password">
          <qPwInput :valid="valid.repwd" placeholder="Repeat Password*" @onInput="onRePwdInput"/>
        </div>
      </div>
      <div class="btnLayout">
        <qButton name="Login" @click.native="goLogin"/>
        <qButton type="submit" class="qButton-primary" name="Submit" />
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { isObject } from 'lodash';
import qMailInput from 'components/Input/qMailInput.vue';
import qPwInput from 'components/Input/qPwInput.vue';
import qButton from 'components/Button/qButton.vue';
import validation from 'common/validation';
import auth from 'services/auth';

export default {
  name: 'SignUp',
  components: {
    qMailInput,
    qPwInput,
    qButton,
  },
  data() {
    return {
      email: '',
      pwd: '',
      repwd: '',
      valid: {
        email: true,
        pwd: true,
        repwd: true,
      },
    };
  },
  methods: {
    ...mapActions('SysMsg', [
      'setSysMsg',
    ]),
    onMailInput(data) {
      this.email = data;
    },
    onPwdInput(data) {
      this.pwd = data;
    },
    onRePwdInput(data) {
      this.repwd = data;
    },
    validation() {
      let invalid = false;

      // this.valid.email = validation.email(this.email);
      this.valid.email = true;
      this.valid.pwd = validation.password(this.pwd) && this.pwd === this.repwd;
      this.valid.repwd = validation.password(this.repwd) && this.pwd === this.repwd;

      invalid = Object.keys(this.valid)
        .find(key => !this.valid[key]);

      return invalid;
    },
    async submit() {
      const invalid = this.validation();
      if (invalid) return;

      try {
        const postData = {
          email: this.email,
          password: this.pwd,
        };

        const data = await auth.signup(postData);
        if (isObject(data)) {
          this.setSysMsg({ type: 'success', msg: 'Sigup successfule!' });
          this.$router.push('login');
        } else {
          this.setSysMsg({ type: 'danger', msg: 'Sigup failed!' });
        }
      } catch (err) {
        this.setSysMsg({ type: 'danger', msg: err });
      }
    },
    goLogin() {
      this.$router.push('login');
    },
  },
};
</script>

<style lang='scss' scoped>
$login-border-color: #aaaaaa;
$login-border-gap: 20px;

.SignUp{
  width: 30vw;
  min-height: 300px;
  min-width: 275px;
  height: 60vh;
  margin: 0px auto;
  box-sizing: border-box;
  padding: $login-border-gap;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow:
    0 2px 2px 0 rgba(0,0,0,0.14),
    0 3px 1px -2px rgba(0,0,0,0.12),
    0 1px 5px 0 rgba(0,0,0,0.2);
  .title{
    text-align: center;
    flex: 1 1;
  }
  .form{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 2 2;
  }
  .inputContainer{
    height: 100%;
    padding-bottom: 30px;
    .account{
      margin-bottom: 30px;
    }
  }
  .btnLayout{
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}
</style>
