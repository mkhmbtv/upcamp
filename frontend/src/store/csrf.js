import Cookies from 'js-cookie';

export const csrfFetch = async (url, options = {}) => {
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (options.method !== 'GET') {
    options.headers['Content-Type'] = 
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
  }

  const res = await window.fetch(url, options);
  if (res.status >= 400) throw res;
  return res;
};

// Call this to get XSRF-TOKEN, only in development
export const restoreCSRF = () => {
  return csrfFetch('/api/csrf/restore');
};