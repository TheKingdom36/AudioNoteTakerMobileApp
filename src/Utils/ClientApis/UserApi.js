import ApiClient from '../APIClient';
import User from '../Models/User';
import {getAuthenication} from './ClientAuthenication';

class UserApi {
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  getUser() {
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let postBody = null;
    let contentTypes = [];
    let accepts = ['application/xml', 'application/json'];
    let returnType = User;
    let auth = getAuthenication();

    return ApiClient.instance.callApi(
      '/user',
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
 * @type {module:UserApi}
 */
UserApi.instance = new UserApi();
export default UserApi;
