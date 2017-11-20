import qs from 'qs';

const API_URL = 'https://api.url/prefix';

function getApiPath(halfPath) {
  if (typeof halfPath === 'string') {
    return halfPath;
  }

  const querystring = qs.stringify(halfPath.query, { encode: false });
  return `${halfPath.path}?${querystring}`;
}

function getApiUrl(halfPath): string {
  const path = getApiPath(halfPath);
  return `${API_URL}${path}`;
}

class ApiController {
  // eslint-disable-next-line class-methods-use-this
  decorateRequestOptions = async (options) => {
    const token = null;

    return {
      ...options,
      headers: {
        ...(options.headers || {}),
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };
  }

  /* eslint-disable no-console */
  apiFetch = async (path, options) => {
    if (window.__DEV__) {
      console.group(`${options.method} ${getApiPath(path)}`);
      console.debug('start time', new Date());
      console.time('duration');
    }

    try {
      const reqOptions = await this.decorateRequestOptions(options);
      const result = await fetch(getApiUrl(path), reqOptions);

      if (result.status >= 400) {
        throw new Error(result.statusText);
      }

      if (window.__DEV__) {
        console.timeEnd('duration');
        console.debug('result', result);
        console.groupEnd();
      }

      return result;
    } catch (error) {
      if (window.__DEV__) {
        console.timeEnd('duration');
        console.debug('error', error.message);
        console.groupEnd();
      }

      throw new Error();
    }
  }
  /* eslint-enable no-console */

  get = (path) => {
    return this.apiFetch(path, {
      method: 'GET',
    });
  }

  post = (path, payload) => {
    return this.apiFetch(path, {
      method: 'POST',
      body: payload && JSON.stringify(payload),
    });
  }

  put = (path, payload) => {
    return this.apiFetch(path, {
      method: 'PUT',
      body: payload && JSON.stringify(payload),
    });
  }

  delete = (path) => {
    return this.apiFetch(path, {
      method: 'DELETE',
    });
  }
}

const api = new ApiController();

export default api;
