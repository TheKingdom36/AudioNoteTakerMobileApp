import ApiClient from '../APIClient';
import Token from '../Models/Token';
class TokenApi {
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  fetchToken(username, password) {
    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};
    let postBody = null;
    let contentTypes = [];
    let accepts = ['application/xml', 'application/json'];
    let returnType = Token;
    let auth = {
      type: 'basic',
      username: username,
      password: password,
    };

    return ApiClient.instance.callApi(
      '/token',
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
 * @type {module:TokenApi}
 */
TokenApi.instance = new TokenApi();
export default TokenApi;
