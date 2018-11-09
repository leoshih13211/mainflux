// import errorMsg from './errorMsg';
import { authUrl, objToFormData } from 'common/utilities';
import SYSTEM from 'common/system';
import cookieManager from 'services/cookieManager';
import { fetchSetup, parseResult, sendRes } from './common';
import apiPath from './apiPath';

export default {
  /**
   * Login API
   *
   * @class login
   * @param {Object} data - Payload Data. Includes email and password
   * @param {String} data.email - user email
   * @param {string} data.password - user password
   * @returns  Login Result: JWT token or error msg
   */
  login() {
    try {
      const url = authUrl(SYSTEM.AUTH.AUTH_URI + apiPath.auth, {
        response_type: 'token',
        client_id: SYSTEM.AUTH.APP_ID,
        redirect_uri: SYSTEM.AUTH.REDIRECT_URL,
      });
      window.location.href = url;
    } catch (err) {
      console.error(err);
      const msg = err.msg || 'Login Failed.';
      throw msg;
    }
  },
  async exchangeOauthToken({ access_token, refresh_token }) {
    try {
      const url = authUrl(apiPath.getApiToken);
      const setupCfg = fetchSetup(url, { access_token, refresh_token });
      const rs = await fetch(setupCfg);
      const json = await parseResult(rs);
      if (json.error) throw sendRes(json.error_description);
      else return sendRes(null, json);
    } catch (err) {
      console.error(err);
      const msg = err.msg || 'Get API Token Failed.';
      throw msg;
    }
  },
  async logout() {
    try {
      const url = authUrl(apiPath.signout);
      const formData = objToFormData({
        access_token: cookieManager.getValue('access_token'),
      });
      const setupCfg = fetchSetup(url, formData);
      const rs = await fetch(setupCfg);
      const json = parseResult(rs);

      if (Object.keys(json).length) {
        throw sendRes(json.error_description);
      }
    } catch (err) {
      console.error(err);
      const msg = err.msg || 'Logout Failed.';
      throw msg;
    }
  },
};

