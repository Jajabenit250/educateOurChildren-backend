import db from '../database/models';
import Queries from './Queries';
import response from '../helpers/response';



class UserServices {

  static async CreateUser(NewUser) {
    return Queries.create(db.user, NewUser);
  }

  static async findUserByEmail(email) {
    try {
      const user = await db.user.findOne({ where: { email } });
      if (!user) return null;
      return user;
    } catch (error) {
      return undefined;
    }
  }

  static async findInUserManager(managerId) {
    const managerData = await Queries.findInUserManager(db.user, managerId);

    if (!managerData) return false;
    return true;
  }

  static async findOrCreateUser(user) {
    try {
      return await db.user.findOrCreate({
        where: { email: user.email },
        defaults: user
      });
    } catch (error) {
      return null;
    }
  }


  static async activeUser(email, updateUser) {

    try {
      const userToUpdate = await db.user.findOne({
        where: { email }
      });
      if (userToUpdate && userToUpdate.isVerified) {
        return {
          status: 409,
          message: 'user already activated'
        };
      }
      if (userToUpdate) {
        await db.user.update(
          updateUser,
          { where: { email }, returning: true, plain: true }
        );

        return {
          status: 200,
          message: 'user account successfuly activated'
        };
      }
      return {
        status: 404,
        message: 'User not found'
      };
    } catch (error) {
      return {
        status: 400,
        message: error
      };
    }
  }

  static async resetPassword(req, res, email, data) {
    const userToUpdate = await this.findUserByEmail(email);
    if (userToUpdate !== null && !userToUpdate.isVerified) {
      response.errorMessage(res, 'Account is not verified', 401);
    } else if (userToUpdate !== null) {
      await db.user.update(data,
        { where: { email }, returning: true, plain: true });
      response.successMessage(res, 'Password has successfuly changed', 200, req.user.token);
    }
  }

  static async updateUser(email, userInfo) {
    const userToUpdate = await this.findUserByEmail(email);
    if (!userToUpdate) {
      return {
        status: 404,
        message: 'User not found'
      };
    }
    const updatedUser = await userToUpdate.update(userInfo);
    return updatedUser;
  }

  static async getUsers(limit, offset) {
    try {
      const searchUsers = await db.user.findAndCountAll({
        attributes: ['firstName', 'lastName', 'email', 'role', 'createdAt', 'updatedAt'], order: [['createdAt', 'DESC']], limit, offset
      });
      if (!searchUsers) return null;
      return searchUsers;
    } catch (error) {
      return undefined;
    }
  }
  
  static async updateUserById(id, userInfo) {
    const userToUpdate = await db.user.findByPk(id);
    if (!userToUpdate) {
      return {
        status: 404,
        message: 'User not found'
      };
    }
    const updatedUser = await userToUpdate.update(userInfo);
    return updatedUser;
  }

  static async findUser(where) {
    try {
      const user = await db.user.findOne({ where });
      if (!user) return null;
      return user;
    } catch (error) {
      return undefined;
    }
  }
}
export default UserServices;
