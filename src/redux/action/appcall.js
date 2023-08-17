import axios from 'axios';
import * as type from '../type';
import {URL} from '../../components/Path';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const homeData = (params, onSuccess) => {
  console.log(params, 'hpmedataaaaparams');
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'get',
      url: URL.baseURL + 'homeData?' + params,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'homeData');
        dispatch(homeDatafunc(response.data));
        onSuccess(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
export const homeMainPageData = (params, onSuccess) => {
  console.log(params, 'hpmedataaaaparams');
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'get',
      url: URL.baseURL + 'homeData?' + params,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'homeData');
        dispatch(homeMainDatafunc(response.data));
        onSuccess(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const homeSearch = () => {
  console.log('kdkddkdkdkdk');
  return async dispatch => {
    console.log('kdkddkdkdkdk23');
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'get',
      url: URL.baseURL + 'homeSearch',
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data), 'kdkddkdkdkdk');
        dispatch(homesearchfunc(response.data));
      })
      .catch(function (error) {
        console.log(error, 'errrrrrrrrrr');
      });
  };
};

export const filterData = () => {
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'get',
      url: URL.baseURL + 'filterDropdown',
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'filterdropdownresponse');
        dispatch(filterdatafunc(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const searchsuggestion = params => {
  console.log(params, 'searchsuggestparams');
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'get',
      url: URL.baseURL + 'searchSuggestions?' + params,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'suggestionresponse');
        dispatch(searchsuggestfunc(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const likedislike = params => {
  console.log('paramslikedislike', params);
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'put',
      url: URL.baseURL + 'Product_likedislike?',
      headers: {
        Authorization: 'Bearer ' + access_token,

        'Content-Type': 'application/json',
      },
      data: params,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(likedislikefunc(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const UserEditProfile = (params, success) => {
  console.log(params, 'usereditparams');
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'put',
      url: URL.baseURL + 'update_user?',
      headers: {
        Authorization: 'Bearer ' + access_token,
        'Content-Type': 'application/json',
      },
      data: params,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'usereditresponse');
        success(response.data);
        dispatch(editprofilefunc(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const UserProfileData = (params, onSuccess) => {
  console.log(params, 'ooooo');
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'get',
      url: URL.baseURL + 'visitDealerProfile?' + params,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'userprofiledata');
        onSuccess();
        dispatch(userprofilefunc(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const categoryapi = () => {
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'get',
      url: URL.baseURL + 'category',
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'pasoe123');
        dispatch(categoryfunc(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
//...............dispatch functions

const homeDatafunc = data => {
  console.log(data, 'eeeeee');
  return {
    type: type.homedatasuccess,
    payload: data,
  };
};

const homesearchfunc = data => {
  return {
    type: type.homesearchsuccess,
    payload: data,
  };
};

const filterdatafunc = data => {
  return {
    type: type.filterdatasuccess,
    payload: data,
  };
};

const searchsuggestfunc = data => {
  return {
    type: type.searchsuggestsuccess,
    payload: data,
  };
};

const likedislikefunc = data => {
  return {
    type: type.likedislikesuccess,
    payload: data,
  };
};

const editprofilefunc = data => {
  return {
    type: type.editprofilesuccess,
    payload: data,
  };
};

const userprofilefunc = data => {
  return {
    type: type.userprofiledatasuccess,
    payload: data,
  };
};

const categoryfunc = data => {
  return {
    type: type.categorysuccess,
    payload: data,
  };
};
const homeMainDatafunc = data => {
  return {
    type: type.homemaindatasuccess,
    payload: data,
  };
};
