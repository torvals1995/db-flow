import axios from 'axios';
import useRes from './res';
const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.response.use(useRes);
const defaultAxiosConfig = {
  // 失败是否提示
  showError: true,
  // ？
  allResponse: false,
  // 成功是否提示
  successToast: false,
  // 成功提示信息
  successMsg: '',
};
export default {
  get(url, params = {}, config = defaultAxiosConfig) {
    const _params = {
      t: new Date().getTime(),
      // ...formatValue(params),
    };
    // as AxiosPromise 利用类型兼容性欺骗 TypeScript
    // const configParams: IHasPlatformData = objAddUacPlatform(_params);

    // config.params = configParams;

    // @ts-ignore
    return axiosInstance.get(url, config);
  },
  postJson(url, data = {}, config = defaultAxiosConfig) {
    data = filterPostJsonData(data);
    return axiosInstance.post(url, data, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      ...config,
    });
  },
  post(url, data = {}, config = defaultAxiosConfig) {
    return axiosInstance.post(url, data, config);
  },
  // post(url, data = {}, config = defaultAxiosConfig) {
  //   return axiosInstance.post(url, objectToFormData(data), config);
  // },
  put(url, data = {}, config = defaultAxiosConfig) {
    return axiosInstance.put(url, data, config);
  },
  delete(url, params = {}, config = defaultAxiosConfig) {
    // const _params = {
    //   t: new Date().getTime(),
    //   ...formatValue(params),
    // };

    // config.params = configParams;
    return axiosInstance.delete(url, config);
  },
};
function filterPostJsonData(data = {}) {
  const result = {};
  Object.entries(data).forEach(([key, value]) => {
    if (!data[key]) {
      result[key] = value;
    }
  });
  return result;
}

function objectToFormData(obj = {}) {
  const formData = new FormData();

  const param = formatValue(obj);

  Object.entries(param).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
}

function formatValue(obj = {}) {
  const result = {};
  Object.entries(obj).forEach(([key, value]) => {
    let val = value;
    if (!value) {
      return;
    }

    if (typeof value === 'object') {
      if (value instanceof File) {
        val = value;
      } else {
        val = JSON.stringify(value);
      }
    }
    result[key] = val;
  });
  return result;
}