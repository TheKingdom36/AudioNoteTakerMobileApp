import ApiClient from '../APIClient';
import Token from '../models/Token';
import User from '../models/User';

export default class UserApi {
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  logInUser(username, password) {
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let postBody = null;
    let authNames = ['basic'];
    let contentTypes = [];
    let accepts = ['application/xml', 'application/json'];
    let returnType = User;

    ApiClient.instance.addAuth({
      basic: {
        type: 'basic',
        username: 'Sanson3@gmail.com',
        password: 'hcgEynqjHczk',
      },
    });

    return ApiClient.instance.callApi(
      '/login',
      'POST',
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      null,
    );
  }
}
