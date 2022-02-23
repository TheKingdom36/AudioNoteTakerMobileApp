import ApiClient from '../APIClient';
/**
 * The Tag model module.
 * @module model/Tag
 * @version 1.0.0
 */
class Tag {
  /**
   * Constructs a new <code>Tag</code>.
   * A tag for an AudioRecording
   * @alias module:model/Tag
   */
  constructor() {
    Tag.initialize(this);
  }

  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */
  static initialize(obj) {}

  /**
   * Constructs a <code>Tag</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Tag} obj Optional instance to populate.
   * @return {module:model/Tag} The populated <code>Tag</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Tag();
      if (data.hasOwnProperty('name')) {
        obj.name = ApiClient.convertToType(data.name, 'String');
      }
    }
    return obj;
  }
}

/**
 * @member {String} name
 */
Tag.prototype.name = undefined;

export default Tag;
