import axios from 'axios';
import qs from 'qs';

axios.defaults.withCredentials = true;

const apiPath = {
	dev: 'http://192.168.30.190:8012',
	pro: 'http://192.168.30.190:8012'
};

function POST(url, params, form) {
	let apiUrl = '';
	if (process.env.NODE_ENV === 'development') {
		apiUrl = `${apiPath.dev}${url}`;
	}
	if (process.env.NODE_ENV === 'production') {
		apiUrl = `${apiPath.pro}${url}`;
	}
	if (!form) {
		params = {
			data: JSON.stringify(params)
		};
	}
  return axios({
    method: 'post',
    url: apiUrl,
    data: qs.stringify(params)
  }).then((res) => {
    if (res && res.data) {
      if (res.data.msg === '未登录') {
        window.location.href = window.location.origin + '/ddlogin';
        return false;
      }
      return res.data;
    }
  }).catch((error) => {
    console.error(error);
  });
}

function YZM(url, params) {
	let apiUrl = '';
	if (process.env.NODE_ENV === 'development') {
		apiUrl = `${apiPath.dev}${url}`;
	}
	if (process.env.NODE_ENV === 'production') {
		apiUrl = `${apiPath.pro}${url}`;
	}
  return axios({
    method: 'get',
    url: apiUrl,
    params: params,
    responseType: 'arraybuffer'
  }).then(response => {
    return 'data:image/png;base64,' + btoa(
      new Uint8Array(response.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
  }).catch((error) => {
    console.error(error);
  });
}


export {
	POST,
	YZM
};
