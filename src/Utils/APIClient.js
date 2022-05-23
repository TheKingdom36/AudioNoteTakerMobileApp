import querystring from 'querystring';
import base64 from 'base-64';

/**
 * @module ApiClient
 * @version 1.0.0
 */

/**
 * Manages low level client-server communications, parameter marshalling, etc. There should not be any need for an
 * application to use this class directly - the *Api and model classes provide the public API for the service. The
 * contents of this file should be regarded as internal but are documented for completeness.
 * @alias module:ApiClient
 * @class
 */
class ApiClient {
  /**
   * The base URL against which to resolve every API call's (relative) path.
   * Overrides the default value set in spec file if present
   * @param {String} basePath
   */
  constructor(basePath = 'http://localhost:9999') {
    /**
     * The base URL against which to resolve every API call's (relative) path.
     * @type {String}
     * @default http://localhost:9999
     */
    this.basePath = basePath.replace(/\/+$/, '');

    /**
     * The default HTTP headers to be included for all API calls.
     * @type {Array.<String>}
     * @default {}
     */
    this.defaultHeaders = {
      'User-Agent': 'AudioNoteTakerApp/1.0.0/Javascript',
    };

    /**
     * Set request agent
     */
    this.requestAgent = 'fetch';

    /**
     * The default HTTP timeout for all API calls.
     * @type {Number}
     * @default 60000
     */
    this.timeout = 60000;

    /**
     * If set to false an additional timestamp parameter is added to all API GET calls to
     * prevent browser caching
     * @type {Boolean}
     * @default true
     */
    this.cache = true;
  }

  /**
   * Returns a string representation for an actual parameter.
   * @param param The actual parameter.
   * @returns {String} The string representation of <code>param</code>.
   */
  paramToString(param) {
    if (param == undefined || param == null) {
      return '';
    }
    if (param instanceof Date) {
      return param.toJSON();
    }
    if (ApiClient.canBeJsonified(param)) {
      return JSON.stringify(param);
    }

    return param.toString();
  }

  /**
   * Returns a boolean indicating if the parameter could be JSON.stringified
   * @param param The actual parameter
   * @returns {Boolean} Flag indicating if <code>param</code> can be JSON.stringified
   */
  static canBeJsonified(str) {
    if (typeof str !== 'string' && typeof str !== 'object') {
      return false;
    }
    try {
      const type = str.toString();
      return type === '[object Object]' || type === '[object Array]';
    } catch (err) {
      return false;
    }
  }

  /**
   * Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
   * NOTE: query parameters are not handled here.
   * @param {String} path The path to append to the base URL.
   * @param {Object} pathParams The parameter values to append.
   * @param {String} apiBasePath Base path defined in the path, operation level to override the default one
   * @returns {String} The encoded path with parameter values substituted.
   */
  buildUrl(path, pathParams, queryParams, apiBasePath) {
    if (!path.match(/^\//)) {
      path = '/' + path;
    }

    var url = this.basePath + path;

    // use API (operation, path) base path if defined
    if (apiBasePath !== null && apiBasePath !== undefined) {
      url = apiBasePath + path;
    }

    url = url.replace(/\{([\w-\.]+)\}/g, (fullMatch, key) => {
      var value;
      if (pathParams.hasOwnProperty(key)) {
        value = this.paramToString(pathParams[key]);
      } else {
        value = fullMatch;
      }

      return encodeURIComponent(value);
    });

    var urlSearchParams = new URLSearchParams(queryParams);

    url = url + '?' + urlSearchParams.toString();

    return url;
  }

  /**
   * Checks whether the given content type represents JSON.<br>
   * JSON content type examples:<br>
   * <ul>
   * <li>application/json</li>
   * <li>application/json; charset=UTF8</li>
   * <li>APPLICATION/JSON</li>
   * </ul>
   * @param {String} contentType The MIME content type to check.
   * @returns {Boolean} <code>true</code> if <code>contentType</code> represents JSON, otherwise <code>false</code>.
   */
  isJsonMime(contentType) {
    return Boolean(
      contentType != null && contentType.match(/^application\/json(;.*)?$/i),
    );
  }

  /**
   * Chooses a content type from the given array, with JSON preferred; i.e. return JSON if included, otherwise return the first.
   * @param {Array.<String>} contentTypes
   * @returns {String} The chosen content type, preferring JSON.
   */
  jsonPreferredMime(contentTypes) {
    for (var i = 0; i < contentTypes.length; i++) {
      if (this.isJsonMime(contentTypes[i])) {
        return contentTypes[i];
      }
    }

    return contentTypes[0];
  }

  /**
   * Normalizes parameter values:
   * <ul>
   * <li>remove nils</li>
   * <li>keep files and arrays</li>
   * <li>format to string with `paramToString` for other cases</li>
   * </ul>
   * @param {Object.<String, Object>} params The parameters as object properties.
   * @returns {Object.<String, Object>} normalized parameters.
   */
  normalizeParams(params) {
    var newParams = {};
    for (var key in params) {
      if (
        params.hasOwnProperty(key) &&
        params[key] != undefined &&
        params[key] != null
      ) {
        var value = params[key];
        if (value === 'file' || Array.isArray(value)) {
          newParams[key] = value;
        } else {
          newParams[key] = this.paramToString(value);
        }
      }
    }

    return newParams;
  }

  /**
   * Builds a string representation of an array-type actual parameter, according to the given collection format.
   * @param {Array} param An array parameter.
   * @param {module:ApiClient.CollectionFormatEnum} collectionFormat The array element separator strategy.
   * @returns {String|Array} A string representation of the supplied collection, using the specified delimiter. Returns
   * <code>param</code> as is if <code>collectionFormat</code> is <code>multi</code>.
   */
  buildCollectionParam(param, collectionFormat) {
    if (param == null) {
      return null;
    }
    switch (collectionFormat) {
      case 'csv':
        return param.map(this.paramToString, this).join(',');
      case 'ssv':
        return param.map(this.paramToString, this).join(' ');
      case 'tsv':
        return param.map(this.paramToString, this).join('\t');
      case 'pipes':
        return param.map(this.paramToString, this).join('|');
      case 'multi':
        //return the array directly as SuperAgent will handle it as expected
        return param.map(this.paramToString, this);
      case 'passthrough':
        return param;
      default:
        throw new Error('Unknown collection format: ' + collectionFormat);
    }
  }

  /**
   * Applies authentication headers to the request.
   * @param {Object} request The request object created by a <code>superagent()</code> call.
   * @param {Array.<String>} authNames An array of authentication method names.
   */
  applyAuthToRequest(options, auth) {
    switch (auth.type) {
      case 'basic':
        if (auth.username || auth.password) {
          const buf = auth.username + ':' + auth.password;

          options.headers.append(
            'Authorization',
            'Basic ' + base64.encode(buf),
          );
        }
        break;
      case 'bearer':
        if (auth.accessToken) {
          var localVarBearerToken =
            typeof auth.accessToken === 'function'
              ? auth.accessToken()
              : auth.accessToken;
          options.headers.append(
            'Authorization',
            'Bearer ' + localVarBearerToken,
          );
        }

        break;
      case 'apiKey':
        if (auth.apiKey) {
          var data = {};
          if (auth.apiKeyPrefix) {
            data[auth.name] = auth.apiKeyPrefix + ' ' + auth.apiKey;
          } else {
            data[auth.name] = auth.apiKey;
          }

          if (auth.in === 'header') {
            options.headers.append('apikey', data[auth.name]);
          } else {
            //   request.query(data);
          }
        }

        break;
      case 'oauth2':
        if (auth.accessToken) {
          options.headers.append('Authorization', 'Bearer' + auth.accessToken);
        }

        break;
      default:
        throw new Error('Unknown authentication type: ' + auth.type);
    }
  }

  /**
   * Deserializes an HTTP response body into a value of the specified type.
   * @param {Object} response A SuperAgent response object.
   * @param {(String|Array.<String>|Object.<String, Object>|Function)} returnType The type to return. Pass a string for simple types
   * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
   * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
   * all properties on <code>data<code> will be converted to this type.
   * @returns A value of the specified type.
   */
  deserialize(response, returnType) {
    if (response == null || returnType == null || response.status == 204) {
      return null;
    }

    // Rely on SuperAgent for parsing response body.
    // See http://visionmedia.github.io/superagent/#parsing-response-bodies
    var data = response;

    if (
      data == null ||
      (typeof data === 'object' &&
        typeof data.length === 'undefined' &&
        !Object.keys(data).length)
    ) {
      // SuperAgent does not always produce a body; use the unparsed response as a fallback
      data = response.text;
    }

    return ApiClient.convertToType(data, returnType);
  }

  /**
   *
   * @param {String} url
   * @param {Object} options
   * @returns a promise
   */
  sendRequest(url, options, returnType) {
    //Do timeout https://dmitripavlutin.com/timeout-fetch-request/

    return fetch(url, options).then(response => {
      if (!response.ok) {
        return response
          .json()
          .catch(() => {
            // Couldn't parse the JSON
            throw new Error(response.status);
          })
          .then(({message}) => {
            // Got valid JSON with error response, use it
            throw new Error(message || response.status);
          });
      }
      // Successful response, parse the JSON and return the data
      //console.log('deser', response.json());

      //return this.deserialize(response, returnType);

      if (returnType == 'Blob') {
        return response.blob().then(blob => this.deserialize(blob, returnType));
      } else {
        return response.json().then(json => this.deserialize(json, returnType));
      }
    });
  }

  /**
   * Invokes the REST service using the supplied settings and parameters.
   * @param {String} path The base URL to invoke.
   * @param {String} httpMethod The HTTP method to use.
   * @param {Object.<String, String>} pathParams A map of path parameters and their values.
   * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
   * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
   * @param {Object.<String, Object>} formParams A map of form parameters and their values.
   * @param {Object} bodyParam The value to pass as the request body.
   * @param {Array.<String>} authNames An array of authentication type names.
   * @param {Array.<String>} contentTypes An array of request MIME types.
   * @param {Array.<String>} accepts An array of acceptable response MIME types.
   * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
   * constructor for a complex type.
   * @param {String} apiBasePath base path defined in the operation/path level to override the default one
   * @returns {Promise} A {@link https://www.promisejs.org/|Promise} object.
   */
  callApi(
    path,
    httpMethod,
    pathParams,
    queryParams,
    headerParams,
    formParams,
    bodyParam,
    auth,
    contentTypes,
    accepts,
    returnType,
    apiBasePath,
  ) {
    const myHeaders = new Headers();
    var url = this.buildUrl(path, pathParams, queryParams, apiBasePath);

    var options = {
      method: httpMethod,
      headers: myHeaders,
    };

    // apply authentications
    console.log('Apply auth');
    this.applyAuthToRequest(options, auth);
    // set query parameters
    if (httpMethod.toUpperCase() === 'GET' && this.cache === false) {
      queryParams._ = new Date().getTime();
      options.body = this.normalizeParams(queryParams);
    }

    // set header parameters

    /*
    this.normalizeParams(headerParams).forEach(pair =>
      options.headers.append(this.normalizeParams(headerParams))
    );
*/
    //options.headers.append(this.normalizeParams(headerParams));

    var contentType = this.jsonPreferredMime(contentTypes);

    options.headers.append('contentType', contentType);

    var response = null;

    if (contentType === 'application/x-www-form-urlencoded') {
      options.body = querystring.stringify(this.normalizeParams(formParams));
    } else if (contentType === 'multipart/form-data') {
      var _formParams = this.normalizeParams(formParams);
      var formData = new FormData();

      for (var key in _formParams) {
        if (_formParams.hasOwnProperty(key)) {
          let _formParamsValue = _formParams[key];
          if (key === 'file') {
            // file field
            formData.append(key, _formParamsValue);
          } else if (
            Array.isArray(_formParamsValue) &&
            _formParamsValue.length &&
            _formParamsValue[0] === 'file'
          ) {
            // multiple files
            _formParamsValue.forEach(file => formData.append(key, file));
          } else {
            formData.append(key, _formParamsValue);
          }
        }
      }

      options.body = formData;
    } else if (bodyParam !== null && bodyParam !== undefined) {
      if (!options.headers.has['Content-Type']) {
        options.headers.append('Content-Type', 'application/json');
      }
    }

    var accept = this.jsonPreferredMime(accepts);
    if (accept) {
      options.headers.append('accept', accept);
    }

    if (returnType === 'Blob') {
      options.headers.append('responseType', 'blob');
    } else if (returnType === 'String') {
      options.headers.append('responseType', 'string');
    }

    return this.sendRequest(url, options, returnType);
  }

  /**
   * Parses an ISO-8601 string representation or epoch representation of a date value.
   * @param {String} str The date value as a string.
   * @returns {Date} The parsed date object.
   */
  static parseDate(str) {
    if (isNaN(str)) {
      return new Date(str.replace(/(\d)(T)(\d)/i, '$1 $3'));
    }
    return new Date(+str);
  }

  /**
   * Converts a value to the specified type.
   * @param {(String|Object)} data The data to convert, as a string or object.
   * @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
   * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
   * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
   * all properties on <code>data<code> will be converted to this type.
   * @returns An instance of the specified type or null or undefined if data is null or undefined.
   */
  static convertToType(data, type) {
    if (data === null || data === undefined) {
      return data;
    }

    switch (type) {
      case 'Boolean':
        return Boolean(data);
      case 'Integer':
        return parseInt(data, 10);
      case 'Number':
        return parseFloat(data);
      case 'String':
        return String(data);
      case 'Date':
        return ApiClient.parseDate(String(data));
      case 'Blob':
        return data;
      default:
        if (type === Object) {
          // generic object, return directly
          return data;
        } else if (typeof type.constructFromObject === 'function') {
          // for model type like User and enum class
          return type.constructFromObject(data);
        } else if (Array.isArray(type)) {
          // for array type like: ['String']
          var itemType = type[0];

          return data.map(item => {
            return ApiClient.convertToType(item, itemType);
          });
        } else if (typeof type === 'object') {
          // for plain object type like: {'String': 'Integer'}
          var keyType, valueType;
          for (var k in type) {
            if (type.hasOwnProperty(k)) {
              keyType = k;
              valueType = type[k];
              break;
            }
          }

          var result = {};
          for (var k in data) {
            if (data.hasOwnProperty(k)) {
              var key = ApiClient.convertToType(k, keyType);
              var value = ApiClient.convertToType(data[k], valueType);
              result[key] = value;
            }
          }

          return result;
        } else {
          // for unknown type, return the data directly
          return data;
        }
    }
  }

  /**
   * Gets an array of host settings
   * @returns An array of host settings
   */
  hostSettings() {
    return [
      {
        url: 'http://petstore.swagger.io/v2',
        description: 'No description provided',
      },
    ];
  }

  getBasePathFromSettings(index, variables = {}) {
    var servers = this.hostSettings();

    // check array index out of bound
    if (index < 0 || index >= servers.length) {
      throw new Error(
        'Invalid index ' +
          index +
          ' when selecting the host settings. Must be less than ' +
          servers.length,
      );
    }

    var server = servers[index];
    var url = server.url;

    // go through variable and assign a value
    for (var variable_name in server.variables) {
      if (variable_name in variables) {
        let variable = server.variables[variable_name];
        if (
          !('enum_values' in variable) ||
          variable.enum_values.includes(variables[variable_name])
        ) {
          url = url.replace(
            '{' + variable_name + '}',
            variables[variable_name],
          );
        } else {
          throw new Error(
            'The variable `' +
              variable_name +
              '` in the host URL has invalid value ' +
              variables[variable_name] +
              '. Must be ' +
              server.variables[variable_name].enum_values +
              '.',
          );
        }
      } else {
        // use default value
        url = url.replace(
          '{' + variable_name + '}',
          server.variables[variable_name].default_value,
        );
      }
    }
    return url;
  }

  /**
   * Constructs a new map or array model from REST data.
   * @param data {Object|Array} The REST data.
   * @param obj {Object|Array} The target object or array.
   */
  static constructFromObject(data, obj, itemType) {
    if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        if (data.hasOwnProperty(i)) {
          obj[i] = ApiClient.convertToType(data[i], itemType);
        }
      }
    } else {
      for (var k in data) {
        if (data.hasOwnProperty(k)) {
          obj[k] = ApiClient.convertToType(data[k], itemType);
        }
      }
    }
  }
}

/**
 * Enumeration of collection format separator strategies.
 * @enum {String}
 * @readonly
 */
ApiClient.CollectionFormatEnum = {
  /**
   * Comma-separated values. Value: <code>csv</code>
   * @const
   */
  CSV: ',',

  /**
   * Space-separated values. Value: <code>ssv</code>
   * @const
   */
  SSV: ' ',

  /**
   * Tab-separated values. Value: <code>tsv</code>
   * @const
   */
  TSV: '\t',

  /**
   * Pipe(|)-separated values. Value: <code>pipes</code>
   * @const
   */
  PIPES: '|',

  /**
   * Native array. Value: <code>multi</code>
   * @const
   */
  MULTI: 'multi',
};

/**
 * The default API client implementation.
 * @type {module:ApiClient}
 */
ApiClient.instance = new ApiClient();
export default ApiClient;
