import Vue from 'vue';
import cookieManager from 'services/cookieManager';

export function isNumber(n) {
  return !Number.isNaN(parseFloat(n)) && Number.isFinite(n);
}

export function authorization() {
  return !!cookieManager.getValue('quwan_token');
}

export function authUrl(path, query = {}) {
  let url = path;
  let queryData = '';

  if (Object.keys(query).length) {
    queryData = Object.keys(query)
      .reduce((rs, key) => {
        const q = `${key}=${query[key]}`;
        rs.push(q);
        return rs;
      }, [])
      .join('&');

    url += `?${queryData}`;
  }

  return url;
}

export function objToFormData(obj) {
  return Object.keys(obj)
    .map((keyName) => {
      if (Array.isArray(obj[keyName])) {
        return obj[keyName]
          .map(d => `${encodeURIComponent(`${keyName}[]`)}=${encodeURIComponent(d)}`)
          .join('&');
      } return `${encodeURIComponent(keyName)}=${encodeURIComponent(obj[keyName])}`;
    })
    .join('&');
}

export function JSNode(src, onready) {
  /*
  ` 動態產生<script type="javasctipy"></script>於<head
  */
  const node = document.createElement('script');
  try {
    node.setAttribute('type', 'text/javascript');
  } catch (e) {
    node.type = 'text/javascript';
  }
  node.onload = function () {
    if (onready && typeof onready === 'function') {
      onready();
    }
  };
  document.getElementsByTagName('head')[0].appendChild(node);
  node.src = src;
  this.remove = function () {
    if (!node.parentNode) return;
    node.parentNode.removeChild(node);
  };
}

export function createCmpInstance(cmp, params = null) {
  const ComponentClass = Vue.extend(cmp);
  const instance = new ComponentClass(params).$mount();
  // Setting the Slot
  // if(params && params.slots) instance.$slots.default = [params.slots]
  return instance;
}
