/**
 * A ErrorMsg module
 * @version 1.0
 * @author Leo
 * @module ErrorMsg
 * @exports ErrorMsg
 */

const DEFAULT_MSG = {
  400: 'Bad request found. You probably send invalid/incorrect data.',
  403: 'You have no authority to access resourece',
  404: 'Server connection failed. Please check your network connection.',
  500: 'Internal Server Error. Please wait a monent and try again',
};

/**
 * Return the default error message.
 *
 * @method getErrorMsg
 * @param {Object} Response - Fetch API Response, and destructed to { status, statusText }
 * @param {Number} Response.status - HTTP Status Code
 * @param {String} Response.statusText - HTTP Status Description
 * @returns {String} Default Error Message
 */
function getErrorMsg({ status, statusText }) {
  const code = String(status);

  if (status < 400 || status > 500) return '';
  if (DEFAULT_MSG[code]) return `${DEFAULT_MSG[code]}`;
  console.error(`API response error occured. Status code: ${status} (${statusText})`);
  return 'Server response failed';
}

export default {
  /**
   * Return login error message
   * @class login
   * @param {Object} Response - Fetch API Response, and destructed to { status, statusText }
   * @param {Number} Response.status - HTTP Status Code
   * @param {String} Response.statusText - HTTP Status Description
   * @returns {String} Custom Error Message
   */
  login: ({ status, statusText }) => {
    let msg = getErrorMsg({ status, statusText });
    if (/400|403/.test(status)) msg = 'Wrong password or email';
    return msg;
  },
  signup: ({ status, statusText }) => {
    let msg = getErrorMsg({ status, statusText });
    if (/409/.test(status)) msg = 'Already existing email address';
    return msg;
  },
};

