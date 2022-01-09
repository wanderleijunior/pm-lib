import { Interceptor } from '@zeedhi/core';
import { AddRequestSuccess } from './AddRequestSuccess';
import { AddResponseFail } from './AddResponseFail';

Interceptor.addRequestSuccess((config) => {
	AddRequestSuccess.addHeaders(config);
	AddRequestSuccess.createSessionTime(config);
	return config;
});

Interceptor.addResponseFail((error) => {
	if (error.response && error.response?.data && error.response?.data.errorCode) {
		const { errorCode } = error.response?.data;
		if (errorCode === 101 || errorCode === 100) {
			AddResponseFail.libInvalidToken(errorCode);
		} else if (errorCode === 102) {
			AddResponseFail.libInvalidTokenSupportOperator();
		} else if (errorCode === 20) {
			AddResponseFail.libConcurrentAccess();
		}
	}
	return Promise.reject(error);
});
