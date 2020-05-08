import nodemailer from 'nodemailer';

const dotenv = require('dotenv');

dotenv.config();

/**
 * Class for dealing with email activities
 */
class mailer {
  /**
   * signup a user and saving user data in the database
   * @param {Object} token a token from contains user details
   * @param {Object} userName a userName of the user registered
   * @returns {Object} An email template contains message of the user
   */
  static activateAccountView(token, userName) {
    const view = ``;
    return view;
  }

  /**
   * this is a reset password review
   * @param {Object} token a user token
   * @param {Object} userName a userName of the user registered
   * @returns {Object} An email template contains message of the user
   */
  static resetPasswordView(token, userName) {
    const view = ``;
    return view;
  }

  /**
 * This function helps to send email
 * @param {string} to this is a receiver email
 * @param {string} subject this is the subject of email to be send
 * @param {string} views this is html tages  that make body of email
 * @returns {null} return nothing
 */
  static async sendEmail(to, subject, views) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    /**
   * This is an object which include email data (mail option)
   */
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to,
      subject,
      html: views
    };

    await transporter.sendMail(mailOptions);
  }
}

export default mailer;
