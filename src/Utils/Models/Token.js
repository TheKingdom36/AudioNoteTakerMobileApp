import ApiClient from '../APIClient';

class Token {
  constructor(value) {
    this.value = value;
  }

  /**
   * Constructs a <code>Pet</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Pet} obj Optional instance to populate.
   * @return {module:model/Pet} The populated <code>Pet</code> instance.
   */
  static constructFromObject(data, obj) {
    // console.log('Output here', data, obj);
    if (data) {
      obj = obj || new Token();

      if (data.hasOwnProperty('token')) {
        obj.value = ApiClient.convertToType(data.token, 'String');
      }
    }

    return obj;
  }
}

export default Token;
