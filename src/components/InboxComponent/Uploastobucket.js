import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNS3} from 'react-native-aws3';

function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const Uploadtobucket = async (furi, type, sendmessage, duration) => {
  console.log('uploading file url=>   ', furi, type);
  let aws_bucket = await AsyncStorage.getItem('@aws_bucket');
  let aws_bucket_region = await AsyncStorage.getItem('@aws_bucket_region');
  let aws_bucket_accessKey = await AsyncStorage.getItem(
    '@aws_bucket_accessKey',
  );
  let aws_bucket_secretKey = await AsyncStorage.getItem(
    '@aws_bucket_secretKey',
  );
  let link = await AsyncStorage.getItem('@platform_tuity_link');
  let randomName = makeid(20);

  let fileFormat = '';
  let keyPrefix = '';
  let Type = '';
  let uploadname;
  if (type == 'image') {
    fileFormat = '.png';
    keyPrefix = 'chat/images/';

    Type = 'img';
    uploadname = link + 'chat/images/' + randomName + fileFormat;
  } else if (type == 'video') {
    fileFormat = '.mp4';
    keyPrefix = 'chat/videos/';
    Type = 'video';
    uploadname = link + 'chat/videos/' + randomName + fileFormat;
  } else if (type === 'audio') {
    fileFormat = '.aac'; // Change this to the appropriate audio format if needed
    keyPrefix = 'chat/audios/';
    Type = 'audio';
    uploadname = link + 'chat/audios/' + randomName + fileFormat;
  }

  let file = {
    uri: furi,
    name: randomName + fileFormat,
    type:
      Type === 'img'
        ? 'image/png'
        : Type === 'audio'
        ? 'audio/aac'
        : 'mp4/.webm', // Adjust MIME type for audio format if needed
  };

  const options = {
    keyPrefix: keyPrefix,
    bucket: aws_bucket,
    region: aws_bucket_region,
    accessKey: aws_bucket_accessKey,
    secretKey: aws_bucket_secretKey,
    successActionStatus: 201,
  };
  console.log(file, '---', keyPrefix);
  try {
    RNS3.put(file, options)
      .progress(e => console.log(e.percent))
      .then(response => {
        if (response.status !== 201)
          throw new Error('Failed to upload image to S3');
        else {
          console.log(response, 'PPPPPP123');
          sendmessage(Type, duration, uploadname);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export const DocUploadtobucket = async (
  furi,
  extension,
  name,
  filetype,
  sendmessage,
) => {
  // console.log('uploading file url=>   ', furi, sendmessage, docname);
  let aws_bucket = await AsyncStorage.getItem('@aws_bucket');
  let aws_bucket_region = await AsyncStorage.getItem('@aws_bucket_region');
  let aws_bucket_accessKey = await AsyncStorage.getItem(
    '@aws_bucket_accessKey',
  );
  let aws_bucket_secretKey = await AsyncStorage.getItem(
    '@aws_bucket_secretKey',
  );
  let link = await AsyncStorage.getItem('@platform_tuity_link');
  let randomName = makeid(20);

  let fileFormat = extension;

  console.log(fileFormat, name, 'uc99999');
  let uploadname = link + 'chat/documents/' + randomName + fileFormat;
  let file = {
    uri: furi,
    name: randomName + fileFormat,
    type: filetype,
  };

  const options = {
    keyPrefix: 'chat/documents/',
    bucket: aws_bucket,
    region: aws_bucket_region,
    accessKey: aws_bucket_accessKey,
    secretKey: aws_bucket_secretKey,
    successActionStatus: 201,
  };

  try {
    RNS3.put(file, options)
      .progress(e => console.log(e.percent))
      .then(response => {
        if (response.status !== 201)
          throw new Error('Failed to upload image to S3');
        else {
          console.log(response, 'PPPPPP123');
          sendmessage('pdf', 0, uploadname, name);
        }
      });
  } catch (error) {
    console.log(error);
  }
};
