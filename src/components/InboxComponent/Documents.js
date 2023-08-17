import React, {useState, useEffect, useRef} from 'react';
import DocumentPicker from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob';
import {DocUploadtobucket} from './Uploastobucket';
export const DocumentPick = async sendmesgfunc => {
  try {
    const results = await DocumentPicker.pickSingle({
      type: DocumentPicker.types.allFiles,
    });
    console.log('hello', results);

    extension = '.' + results.name.substr(results.name.lastIndexOf('.') + 1);
    Type = results.name.substr(results.name.lastIndexOf('.') + 1);

    let path = results.uri;
    let filetype = results.type;
    let time = '0';
    let name = results.name;
    console.log(extension, name, 'kkkkkkkwwwww');
    DocUploadtobucket(path, extension, name, filetype, sendmesgfunc);

    // for (const res of results) {
    //   console.log(res);
    //   //array = { ...res };
    //   console.log('jkbhjbhjbhjbhjb======>>>>>', res);
    //   // setshowpdf(res[0]);
    // }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
};

export const fileView = fileUrl => {
  let s3path = fileUrl;
  console.log(fileUrl, 'fileurllll');
  let ext = fileUrl.split(/[#?]/)[0].split('.').pop().trim();
  return new Promise((resolve, reject) => {
    RNFetchBlob.config({
      fileCache: true,
      appendExt: ext,
    })
      .fetch('Get', s3path)
      .then(res => {
        console.log('The file saved to ', res.path());
        const downloadFile =
          Platform.OS === 'android' ? 'file://' + res.path() : '' + res.path();
        console.log(downloadFile, 'kkkkk');
        FileViewer.open(downloadFile, {
          showOpenWithDialog: true,
          showAppsSuggestions: false,
          displayName: 'kkkkkkkk',
          options: false,

          onDismiss: () => {
            RNFetchBlob.fs.unlink(res.path());
            // setLoader(false);
          },
        });
        resolve(true);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};
