import checkEmailpassword from '../middlewares/users';
import UserServices from '../services/users';
import EncryptPassword from '../helpers/Encryptor';
import response from '../helpers/response';
import mailer from '../helpers/send.email';
import GenerateToken from '../helpers/token';
import Paginate from '../helpers/paginate';


class UserController {

  static async signup(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
      } = req.body;
      const password = EncryptPassword(req.body.password);
      const token = GenerateToken({ email, firstName, isVerified: false });
      const NewUser = {
        firstName,
        lastName,
        email,
        password,
        isVerified: false,
        token
      };
      UserServices.CreateUser(NewUser);

      const data = {
        token,
      };
      const emailView = mailer.activateAccountView(token, firstName);
      mailer.sendEmail(email, 'Verification link', emailView);


      response.successMessage(
        res,
        'user created successfully visit email to verify account',
        201,
        data
      );
    } catch (e) {
      return response.errorMessage(
        res,
        e.message,
        500,
      );
    }
  }

  static async signIn(req, res) {
    await checkEmailpassword(req, res);
  }

  static async updatedUser(req, res) {
    const activate = {
      isVerified: true
    };
    const updateUser = await UserServices.activeUser(req.user.email, activate);

    if (updateUser.status === 200) {
      return response.successMessage(res, updateUser.message, updateUser.status, 'isVerified:True');
    }

    return response.errorMessage(res, updateUser.message, updateUser.status);
  }


  static resetPassword(req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return response.errorMessage(res, 'Password does not match!', 400);
    }

    const data = {
      password: EncryptPassword(req.body.password)
    };
    UserServices.resetPassword(req, res, req.user.email, data);
  }

  static async sendResetPasswordLink(req, res) {
    const result = await UserServices.findUserByEmail(req.body.email);
    if (result !== null) {
      const token = GenerateToken({ email: req.body.email, isVerified: result.isVerified, id: result.id });
      const emailView = mailer.resetPasswordView(token, result.firstName);
      mailer.sendEmail(req.body.email, 'Reset Password', emailView);
      return response.successMessage(res, 'Email sent please check you email to reset your password', 200, token);
    }
    return response.errorMessage(res, 'user not found!', 404);
  }


  static async logout(req, res) {
    await UserServices.updateUser(req.user.email, { token: null });
    return response.successMessage(res, 'User is successfully logged out.', 200);
  }

  static async getUsers(req, res) {
    const { page } = req.query;
    const limit = 10;
    const offset = Paginate(page, limit);
    const users = await UserServices.getUsers(limit, offset);
    if (users.count > offset) {
      return response.successMessage(
        res,
        'Users',
        200,
        users
      );
    }
    return response.errorMessage(
      res,
      'No User Found',
      404
    );
  }
}


export default UserController;
