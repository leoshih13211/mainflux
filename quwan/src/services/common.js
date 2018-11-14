/**
 * A Services module
 *
 * @version 1.0
 * @author Leo
 * @module Services
 * @exports Services
 */

import 'whatwg-fetch';
import cookieManager from './cookieManager';

/**
 * Fetch API Init Setup
 *
 * @method fetchSetup
 * @param {String} path - API Path
 * @param {Object} data - Payload Data
 * @param {Object} replace - Optional, rewrite setup setting
 * @returns {Object} Fetch Initial Setting
 */
export function fetchSetup(path, data, replace) {
  const token = `Bearer ${cookieManager.getValue('quwan_token')}` || '';
  const API_URL_PREFIX = '/api';
  let fetchOption = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: token,
    }),
    mode: 'cors',
    cache: 'default',
    credentials: 'include', // request附帶cookie
  };

  fetchOption = Object.assign({}, fetchOption, replace);
  return new Request(API_URL_PREFIX + path, fetchOption);
}

/**
 * Parse the response data denpends on the content type in response header and return the result
 *
 * @method parseResult
 * @param {Object} response - Response Format Object. Fetch api response data
 * @returns {Text|Form|Blob|Object} Fetch Initial Setting
 */
export async function parseResult(response) { // 解析返回的结果
  const contentType = response.headers.get('Content-Type');
  let rs = null;
  if (contentType !== null) {
    if (contentType.indexOf('text') > -1) {
      rs = await response.text();
    }
    if (contentType.indexOf('form') > -1) {
      rs = await response.formData();
    }
    if (contentType.indexOf('video') > -1) {
      rs = await response.blob();
    }
    if (contentType.indexOf('json') > -1) {
      rs = await response.json();
    }
  } else {
    rs = await response.text();
  }

  return rs;
}

export function sendRes(err, data) {
  return { err, data };
}
