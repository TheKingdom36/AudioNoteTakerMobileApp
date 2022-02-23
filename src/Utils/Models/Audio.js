import ApiClient from '../APIClient';
import Tag from './Tag';
class Audio {
  constructor(value) {}

  /**
   * Constructs a <code>Pet</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Pet} obj Optional instance to populate.
   * @return {module:model/Pet} The populated <code>Pet</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Audio();

      if (data.hasOwnProperty('id')) {
        obj.id = ApiClient.convertToType(data.id, 'String');
      }
      if (data.hasOwnProperty('describtion')) {
        obj.name = ApiClient.convertToType(data.describtion, 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj.name = ApiClient.convertToType(data.name, 'String');
      }
      if (data.hasOwnProperty('tags')) {
        obj.tags = ApiClient.convertToType(data.tags, [Tag]);
      }
      if (data.hasOwnProperty('createdAt')) {
        obj.createdAt = ApiClient.convertToType(data.createdAt, 'String');
      }
      if (data.hasOwnProperty('size')) {
        obj.size = ApiClient.convertToType(data.size, 'Number');
      }
      if (data.hasOwnProperty('length')) {
        obj.length = ApiClient.convertToType(data.length, 'Number');
      }
    }

    return obj;
  }
}
/**
 * @member {Number} id
 */
Audio.prototype.id = undefined;

/**
 * @member {String} name
 */
Audio.prototype.name = undefined;

/**
 * @member {Array.<String>} tags
 */
Audio.prototype.tags = undefined;

/**
 * @member {String} createdAt
 */
Audio.prototype.ceatedAt = undefined;

/**
 * Size of file in mb
 * @member {Number} size
 */
Audio.prototype.size = undefined;

/**
 * length of audio file in seconds
 * @member {Number} length
 */
Audio.prototype.length = undefined;

/**
 *
 * @member {String} fileType
 */
Audio.prototype.fileType = undefined;

/**
 *
 * @member {String} describtion
 */
Audio.prototype.describtion = undefined;
export default Audio;
