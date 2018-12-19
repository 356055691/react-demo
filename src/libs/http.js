import qs from 'qs';

const apiPath = {
	dev: 'http://192.168.30.190:8012',
	pro: 'http://192.168.30.190:8012'
};

function POST(url, params, form) {
	return new Promise((resolve, reject) => {
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
		fetch(apiUrl, {
			method: 'POST',
			body: qs.stringify(params),
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept':'application/json,text/plain,*/*'
			},
		}).then(res => {
			return res.json();
		}).then(json => {
			resolve(json);
		}).catch(err => {
			console.log(err);
		});
	});
}

export {
  POST
};
