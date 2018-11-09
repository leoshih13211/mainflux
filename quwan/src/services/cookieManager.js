
export default {
  getCookie() {
    const arr = document.cookie.split(';');
    const c = {};
    for (let i = 0; i < arr.length; i++) {
      const obj = document.cookie.split(';')[i].replace(/^\s/, '').split('=');
      if (!obj) break;
      c[obj[0]] = obj[1] || '';
    }
    return c;
  },
  setCookie(k, v, x) {
    let random = (x === undefined) ? 60 * 60 * 24 * 7 : x;
    random = parseInt(random, 10);
    if (Number.isNaN(random)) return false;
    random *= 1000;
    let t = new Date();
    t.setTime(t.getTime() + random);
    t = t.toGMTString();
    document.cookie = `${k}=${escape(v)};expires=Thu, ${t};path=/;`;
    return true;
  },
  hasKey(k) {
    const obj = this.getCookie();
    return (k in obj);
  },
  getKeys() {
    const obj = this.getCookie();
    const arr = Object.keys(obj);
    return arr;
  },
  getValue(k) {
    const obj = this.getCookie() || '';
    return unescape(obj[k] || '');
  },
  deleteCookie(k) {
    if (!this.hasKey(k)) return false;
    document.cookie = `${k}=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/;`;
    return true;
  },
  deleteAllCookies() {
    const keys = this.getKeys();
    console.log(keys);
    keys.forEach(key => this.deleteCookie(key));
  },
};

