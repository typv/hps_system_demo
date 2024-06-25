import { registerAs } from '@nestjs/config';

export default registerAs('sendgrid', () => ({
  globalSender: process.env.SENDGRID_GLOBAL_SENDER,
  globalSenderName: process.env.SENDGRID_GLOBAL_SENDER_NAME,
  sandboxMode: process.env.SENDGRID_SANDBOX_MODE === 'true',
  verifySignup: {
    templateId: process.env.SENDGRID_VERIFY_SIGNUP_TEMPLATE_ID,
  },
  resetPassword: {
    sender: process.env.SENDGRID_GLOBAL_SENDER,
    templateId: process.env.SENDGRID_RESET_PASSWORD_TEMPLATE_ID,
  },
  welcome: {
    sender: process.env.SENDGRID_GLOBAL_SENDER,
    templateId: process.env.SENDGRID_WELCOME_TEMPLATE_ID,
  },
  registerHotel: {
    sender: process.env.SENDGRID_GLOBAL_SENDER,
    templateId: process.env.SENDGRID_REGISTER_HOTEL_TEMPLATE_ID,
  },
  inviteUser: {
    templateId: process.env.SENDGRID_INVITE_USER_TEMPLATE_ID,
  },
  verify2FA: {
    templateId: process.env.SENDGRID_2FA_VERIFY_TEMPLATE_ID,
  },
  turnOn2FA: {
    templateId: process.env.SENDGRID_2FA_TURN_ON_TEMPLATE_ID,
  },
  successBooking: {
    templateId: process.env.SENDGRID_SUCCESS_BOOKING_TEMPLATE_ID,
  },
  cancelledBooking: {
    templateId: process.env.SENDGRID_CANCELLED_BOOKING_TEMPLATE_ID,
  },
  subscription: {
    templateId: process.env.SENDGRID_SUBSCRIPTION_TEMPLATE_ID,
  },
  reward: {
    templateId: process.env.SENDGRID_REWARD_TEMPLATE_ID,
  },
}));
