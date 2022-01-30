import ApiClient from '../APIClient';
import Audio from '../Models/Audio';

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

    let auth = {
      type: 'basic',
      username: 'Sanson3@gmail.com',
      password: 'hcgEynqjHczk',
    };

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
    let pathParams = {id: '37'};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let postBody = null;
    let contentTypes = [];
    let accepts = [];
    let returnType = 'Blob';

    let auth = {
      type: 'basic',
      username: 'Sanson3@gmail.com',
      password: 'hcgEynqjHczk',
    };

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
}

/**
 * The default API client implementation.
 * @type {module:AudioApi}
 */
AudioApi.instance = new AudioApi();
export default AudioApi;
