import axios from 'axios';
import * as type from '../type';
import {URL} from '../../components/Path';

// emailsignup
export const emailsignup = (params, onSuccess) => {
  return async dispatch => {
    console.log(params, 'emailsignupparams');

    var config = {
      method: 'post',
      url: URL.baseURL + 'signup',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    };

    axios(config)
      .then(response => {
        console.log(response.data, 'responseemailverification');
        dispatch(emails(response.data));
        onSuccess(response.data);
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };
};

//email otp

export const signupemailotp = (params, onSuccess) => {
  return dispatch => {
    console.log(params);
    var config = {
      method: 'post',
      url: URL.baseURL + 'otp_verification?',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'otpresponse');
        dispatch(otpsignup(response.data));
        onSuccess(response.data);
      })
      .catch(function (error) {
        console.log(error, 'otperror');
      });
  };
};

//email resend otp

export const resendemailotp = (params, onSuccess1) => {
  console.log(params, 'params');
  return dispatch => {
    var config = {
      method: 'post',
      url: URL.baseURL + 'resend_email_otp',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'resendotpresponse');
        dispatch(otpresend(response.data));
        onSuccess1(response.data);
      })
      .catch(function (error) {
        console.log(error, 'error');
      });
  };
};

// login email

export const loginemail = (params, success) => {
  console.log(params, 'loginemail');
  return dispatch => {
    var config = {
      method: 'post',
      url: URL.baseURL + 'login_with_email',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    };
    axios(config)
      .then(response => {
        console.log(JSON.stringify(response.data), 'loginemailresponse');
        dispatch(emaillogin(response.data));
        success(response.data);
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };
};

// whatsapplogin

export const whatsapplogin = (params, success) => {
  console.log(params);
  return dispatch => {
    var config = {
      method: 'post',
      url: URL.baseURL + 'loginwithwhatsapp',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'loginwhatsapp');
        dispatch(loginwhatsapp(response.data));
        success(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
// whatsapp signup
export const whatsappsignup = (params, success) => {
  console.log(params, 'whatsappsignapp');
  return dispatch => {
    var config = {
      method: 'post',
      url: URL.baseURL + 'signupwithwhatsapp',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'signupwithwhatsapp');
        success(response.data);
        dispatch(signupwhatsapp(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// resend whatsapp otp

export const resendwhatsappotp = (params, success) => {
  console.log(params, 'resendparams');
  return dispatch => {
    var config = {
      method: 'post',
      url: URL.baseURL + 'resendwhatsappotp',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(resendwhatsapp(response.data));
        success(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// whatsappsignupotp verification

export const whatsappsignupverify = (params, success) => {
  console.log(params, 'otpwhatsappsignupverifyparam');
  return dispatch => {
    var config = {
      method: 'post',
      url: URL.baseURL + 'whatsap_otp_verification',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'whatsappverify');
        dispatch(verifywhatsapp(response.data));
        success(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const googlesignup = (params, onsuccess) => {
  console.log(params, 'pppppp');
  return dispatch => {
    var config = {
      method: 'post',
      url: URL.baseURL + 'googlesignup?',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'goooglesignuppp');
        dispatch(signupgoogle(response.data));
        onsuccess(response.data);
      })
      .catch(function (error) {
        console.log('7979', error);
      });
  };
};

export const googlesign = (params, onsuccess) => {
  console.log(params);
  return dispatch => {
    var config = {
      method: 'post',
      url: URL.baseURL + 'loginwithgoogle?',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'goooglesignuppp');
        dispatch(signgoogle(response.data));
        onsuccess(response.data);
      })
      .catch(function (error) {
        console.log('7979', error);
      });
  };
};
//dispatch functions

const emails = data => {
  return {
    type: type.emailsignup,
    payload: data,
  };
};
const otpsignup = data => {
  return {
    type: type.otpsignupsuccess,
    payload: data,
  };
};
const otpresend = data => {
  return {
    type: type.resendotpsuccess,
    payload: data,
  };
};

const emaillogin = data => {
  return {
    type: type.loginemailsuccess,
    payload: data,
  };
};
const loginwhatsapp = data => {
  return {
    type: type.whatsapploginsuccess,
    payload: data,
  };
};
const signupwhatsapp = data => {
  return {
    type: type.whatsappsignupsuccess,
    payload: data,
  };
};

const resendwhatsapp = data => {
  return {
    type: type.resendwhatsappotpsuccess,
    payload: data,
  };
};

const verifywhatsapp = data => {
  return {
    type: type.whatsappsignupscuccess,
    payload: data,
  };
};

const signupgoogle = data => {
  return {
    type: type.googlesignupsuccess,
    payload: data,
  };
};

const signgoogle = data => {
  return {
    type: type.googlesignsuccess,
    payload: data,
  };
};
