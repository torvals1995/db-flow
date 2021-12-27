import { message } from 'antd';
export default function useRef(response) {
  // console.log('response: ', response);
  const {
    showError = true,
    allResponse,
    successToast,
    successMsg,
    failData,
  } = response.config;
  const { status, data } = response;
  if (status !== 200) {
    message.error('请求失败，code：${code}');
    return ;
  } 
  if(data.code !== 0){
    message.error(data.msg || '请求失败');
    return ;
  }
  message.success(successMsg || data.msg || '请求成功');
  // console.log('data: ', data);
  return data;
}


// console.log('response: ', response);
// const {
//   showError = true,
//   allResponse,
//   successToast,
//   successMsg,
//   failData,
// } = response.config as AxiosConfig;
// const { status, data } = response;
// if (status !== 200) {
//   message.error('请求失败，code：${code}');
// }
// if (status !== 200 && !failData) {
//   throw response.data;
// }

// if (successToast) {
//   message.success(successMsg || '请求成功');
// }
// return data;

// 之后支持：在node中设置相应的字段
// const { code = -1, data = '', msg = '接口返回内容不正确' } = response.data || {};

// // 接口出现失败，且统一弹提示
// let _msg = msg;
// if (typeof msg === 'object') {
//   _msg = JSON.stringify(msg);
// }
// if (code !== 0 && code !== 200 && showError) {
//   message.error('请求失败，code：${code}');
//   // duration: Math.ceil(_msg.length / 10) * 1000, // 每 10 个字增加 1s 提示。
// }
// if (code !== 0 && code !== 200 && !failData) {
//   throw response.data;
// }
// if (successToast) {
//   message.success(successMsg || msg || '请求成功');
// }
// // 走到这，说明 code === 0 或者 code === 200
// // 如果需要全部的相应体
// if (allResponse) {
//   return response.data;
// }

// return data;