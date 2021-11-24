import Config from 'react-native-config';

export async function fetchRecordings({
  tags = [],
  title = '',
  startDate = '',
  endDate = '',
} = {}) {
  var myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'Basic U2Fuc29uM0BnbWFpbC5jb206aGNnRXlucWpIY3pr',
  );
  myHeaders.append('Content-Type', 'application/json');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  try {
    let response = await fetch(
      Config.BASE_SERVER_URL + '/recordings',
      requestOptions,
    );
    console.log(Config.BASE_SERVER_URL);
    let text = await response.json();

    console.log(text);
  } catch (e) {
    console.log('error', e);
  }
}

export async function createNewRecording({audioPath, audioParams}) {
  //TODO send request to server
  var myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'Basic U2Fuc29uM0BnbWFpbC5jb206aGNnRXlucWpIY3pr',
  );

  var formdata = new FormData();
  formdata.append('file', audioPath);
  formdata.append('file_name', audioParams.fileName);
  formdata.append('tags', audioParams.tags.join());

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  try {
    let response = await fetch(
      Config.BASE_SERVER_URL + '/recordings',
      requestOptions,
    );
    let text = await response.json();

    console.log(text);
  } catch (e) {
    console.log('error', e);
  }
}

export async function DeleteRecording({audioId}) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    'Basic U2Fuc29uM0BnbWFpbC5jb206aGNnRXlucWpIY3pr',
  );

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow',
  };

  let url = Config.BASE_SERVER_URL + '/recordings/' + audioId;

  try {
    let response = await fetch(url, requestOptions);
    let text = await response.json();

    console.log(text);
  } catch (e) {
    console.log('error', e);
  }
}
