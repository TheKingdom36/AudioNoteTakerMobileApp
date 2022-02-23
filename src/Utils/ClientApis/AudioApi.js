import ApiClient from '../APIClient';
import Audio from '../Models/Audio';
import store from '../../Slices/store';
import {Platform} from 'react-native';
import {getAuthenication} from './ClientAuthenication';

class AudioApi {
  getRecordings({tags = [], title = '', startDate = '', endDate = ''} = {}) {
    let pathParams = {};
    let queryParams = {};

    if (title !== '') {
      queryParams.name = title;
    }

    if (tags.length !== 0) {
      queryParams.tags = tags.join();
    }

    if (typeof startDate === String && startDate !== '') {
      queryParams.startDate = startDate;
    }

    if (typeof endDate === String && endDate !== '') {
      queryParams.endDate = endDate;
    }

    console.log('queryParams', queryParams);

    let headerParams = {};
    let formParams = {};

    let postBody = null;
    let contentTypes = [];
    let accepts = ['application/xml', 'application/json'];
    let returnType = [Audio];

    let auth = getAuthenication();

    return ApiClient.instance.callApi(
      '/recordings',
      'GET',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      auth,
      contentTypes,
      accepts,
      returnType,
      null,
    );
  }

  getRecording(id) {
    // eslint-disable-next-line prettier/prettier
    let pathParams = {id: id};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let postBody = null;
    let contentTypes = [];
    let accepts = [];
    let returnType = 'Blob';
    let auth = getAuthenication();

    return ApiClient.instance.callApi(
      '/recordings/{id}',
      'GET',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      auth,
      contentTypes,
      accepts,
      returnType,
      null,
    );
  }

  deleteRecording(id) {
    // eslint-disable-next-line prettier/prettier
    let pathParams = {id: id};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let postBody = null;
    let contentTypes = [];
    let accepts = [];
    let returnType = null;

    let auth = getAuthenication();

    return ApiClient.instance.callApi(
      '/recordings/{id}',
      'DELETE',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      auth,
      contentTypes,
      accepts,
      returnType,
      null,
    );
  }

  createRecording(filePath, file_name, tags) {
    // eslint-disable-next-line prettier/prettier
    console.log(filePath);
    const data = new FormData();
    const recordFileType = Platform.select({
      ios: 'm4a',
      android: 'mp4',
    });
    const uri =
      Platform.OS === 'android' ? filePath : filePath.replace('file://', '');
    console.log('recordFileType', uri);
    data.append('file', {
      uri,
      type: 'sound/mp4',
      name: 'sound.mp4',
    });

    data.append('file_name', file_name);
    data.append('tags', 'work');

    var requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: 'Basic ZGFuQGdtYWlsLmNvbTpwYXNzd29yZA==',
      },
      body: data,
      redirect: 'follow',
    };

    fetch('http:\\\\localhost:9999/recordings/', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
}
/**
 * The default API client implementation.
 * @type {module:AudioApi}
 */
AudioApi.instance = new AudioApi();
export default AudioApi;
