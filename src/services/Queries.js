import { Op } from 'sequelize';
import db from '../database/models';
/**
 * class for responses
 */
class Queries {
  /**
 * creating user query
 * @param {string} table users table in database.
 * @param {string} data the data to be inputed in database.
 * @returns {array} data the data to be returned.
 */
  static async create(table, data) {
    try {
      const datas = await table.create(data);
      return datas;
    } catch (error) {
      return error;
    }
  }

  /**
    * searching a trip
    * @param {string} table table users table in database.
    * @param {integer} userId requestUserId user id in database.
    * @returns {array} data the data to be returned.
    */
  static async findAllRecord(table, userId) {
    const data = await table.findAll({ where: userId });
    return data;
  }

  static async findOneRecord(table, value) {
    const data = await table.findOne({ where: value });
    if (data) {
      return data;
    }
    return false;
  }

  static async findRecordById(table, userId, limit, offset) {
    try {
      const bookUser = await table.findAndCountAll({
        where: { userId }, order: [['createdAt', 'DESC']], limit, offset
      });
      return bookUser;
    } catch (error) {
      return error;
    }
  }

  static async findOrCreate(table, data, condition) {
    try {
      const datas = await table.findOrCreate({
        where: condition,
        defaults: data
      });
      return datas[0];
    } catch (error) {
      return error;
    }
  }
}
export default Queries;
