import { registerAs } from '@nestjs/config';

export default registerAs('facebook', () => ({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  redirectUrl: process.env.FACEBOOK_REDIRECT_URL,
  baseAPIUrl: process.env.FACEBOOK_BASE_API_URL,
}));
