import { registerAs } from '@nestjs/config';

export default registerAs('google', () => ({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleMapURL: process.env.GOOGLE_MAP_API_URL || 'https://maps.googleapis.com/maps/api/',
  googleMapAPIKey: process.env.GOOGLE_MAP_API_KEY,
  drive: {
    scopes: process.env.GOOGLE_DRIVE_SCOPES,
    clientEmail: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
    privateKey: process.env.GOOGLE_DRIVE_PRIVATE_KEY,
    permissionRole: process.env.GOOGLE_DRIVE_PERMISSION_ROLE,
    permissionType: process.env.GOOGLE_DRIVE_PERMISSION_TYPE,
  }
}));