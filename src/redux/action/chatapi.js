import axios from 'axios';
import * as type from '../type';
import {URL} from '../../components/Path';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const messageList = onSuccess => {
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'get',
      url: URL.baseURL + 'message_list?',
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };
    axios(config)
      .then(function (response) {
        dispatch(messagelistfunc(response.data));
        onSuccess();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const mutechat = params => {
  console.log(params, 'mutechatparams');
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'post',
      url: URL.baseURL + 'mute_chat?' + params,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(response => {
        console.log(response.data, 'muteresponse');
        dispatch(mutechatfunc(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};
export const unmutechat = params => {
  console.log(params, 'params');
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'delete',
      url: URL.baseURL + 'unmute_chat?' + params,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(response => {
        console.log(response.data, 'unmuteresponse');
        dispatch(unmutechatfunc(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const deleteChat = params => {
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'delete',
      url: URL.baseURL + 'delete_chat?' + params,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'deletechat');
        dispatch(deletechatfunc(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const pinchat = params => {
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'post',
      url: URL.baseURL + 'pin_chat?' + params,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'pinchatresponse');
        dispatch(pinchatfunc(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
export const unpinchat = params => {
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'delete',
      url: URL.baseURL + 'unpin_chat?' + params,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(unpinchatfunc(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const markreadmessage = params => {
  console.log(params, 'markunreadparams');

  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'put',
      url: URL.baseURL + 'mark_as_read?' + params,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'markreadresponse');
        dispatch(markreadfunc(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const markunreadmessage = params => {
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'put',
      url: URL.baseURL + 'mark_as_unread?' + params,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'markunreadmessage');
        dispatch(markunreadfunc(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const chatsearch = (params, onSearch) => {
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'get',
      url: URL.baseURL + 'chatlist_search?' + params,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'chatsearchresponse');
        dispatch(chatsearchfunc(response.data));
        onSearch(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const recentChat = (params, success3) => {
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'get',
      url: URL.baseURL + 'recent_chat?' + params,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'recentchatresponse');
        dispatch(recentchatfunc(response.data));
        success3(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const sendmessage = (params, onSuccess) => {
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'post',
      url: URL.baseURL + 'send_message?',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + access_token,
      },
      data: params,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'sendmesgresponse');
        onSuccess(response.data);
        dispatch(sendmessagefunc(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const searchInbox = (params, onSuccess) => {
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'get',
      url: URL.baseURL + 'inbox_search?' + params,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'inboxsearch');
        onSuccess(response.data);
        dispatch(searchinboxfunc(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const reportchat = params => {
  console.log(params, 'kkiiki');
  console.log(params);
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'post',
      url: URL.baseURL + 'report_chat?',
      headers: {
        Authorization: 'Bearer ' + access_token,

        'Content-Type': 'application/json',
      },
      data: params,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'reportchat');
        dispatch(reportchatfunc(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const ChatMedia = params => {
  console.log(params, 'chatmediaparams');
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'get',
      url: URL.baseURL + 'chat_media?' + params,
      headers: {
        Authorization: 'Bearer ' + access_token,
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'chatmediasuccess');
        let st = response.data;
        if (st.status == true) {
          dispatch(chatmediafun(response.data));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const filterbyunread = onSuccess5 => {
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'get',
      url: URL.baseURL + 'filter_by_unread?',
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data), 'filterissue');
        onSuccess5(response.data);
        dispatch(filterunreadfunc(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const blockuser = params => {
  // console.log(params, 'pppppp');
  return async dispatch => {
    let access_token = await AsyncStorage.getItem('@access_token');

    var config = {
      method: 'post',
      url: URL.baseURL + 'block_user?' + params,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        dispatch(userblockfunc(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
const messagelistfunc = data => {
  return {
    type: type.messagelistsuccess,
    payload: data,
  };
};

const mutechatfunc = data => {
  return {
    type: type.mutechatsuccess,
    payload: data,
  };
};

const unmutechatfunc = data => {
  return {
    type: type.unmutechatsuccess,
    payload: data,
  };
};

const deletechatfunc = data => {
  return {
    type: type.deletechatsuccess,
    payload: data,
  };
};

const pinchatfunc = data => {
  return {
    type: type.pinchatsuccess,
    payloaad: data,
  };
};

const unpinchatfunc = data => {
  return {
    type: type.unpinchatsuccess,
    payload: data,
  };
};

const markreadfunc = data => {
  return {
    type: type.markreadsuccess,
    payload: data,
  };
};

const markunreadfunc = data => {
  return {
    type: type.markunreadsuccess,
    payload: data,
  };
};

const chatsearchfunc = data => {
  return {
    type: type.chatsearchsuccess,
    payload: data,
  };
};

const recentchatfunc = data => {
  return {
    type: type.recentchatsuccess,
    payload: data,
  };
};

const sendmessagefunc = data => {
  return {
    type: type.sendmessagesuccess,
    payload: data,
  };
};

const searchinboxfunc = data => {
  return {
    type: type.inboxsearchsuccess,
    payload: data,
  };
};

const reportchatfunc = data => {
  return {
    type: type.reportchatsuccess,
    payload: data,
  };
};

const chatmediafun = data => {
  return {
    type: type.chatmediasuccess,
    payload: data,
  };
};

const filterunreadfunc = data => {
  return {
    type: type.filterunreadsuccess,
    payload: data,
  };
};

const userblockfunc = data => {
  return {
    type: type.blockusersuccess,
    payload: data,
  };
};
