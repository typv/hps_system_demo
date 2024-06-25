import 'dotenv/config';
import { OrderBy } from '../enums/common.enum';

export const constants = {
  DATE_FORMAT: 'YYYY-MM-DD',
  DATE_FORMAT_V2: 'DD MMM YYYY',
  DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  TIME_FORMAT: 'HH:mm:ss',
  HOUR_FORMAT: 'h:mm A',
  PAGINATION: {
    PAGE_DEFAULT: 1,
    LIMIT_DEFAULT: 10,
    SORT_BY_DEFAULT: 'id',
    ORDER_BY_DEFAULT: OrderBy.DESC,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 64,
  },
  LIMIT_FILE: {
    SIZE: 500 * 1024 * 1024,
    TYPE: /\.(docx|doc|odt|rdt|rtf|epub|pptx|ppt|txt|odp|xlsx|csv|tsv|ods|xlsm|xlsb|xltx|png|jpg|pdf|jpeg|webp|svg|gif|avif|apng)$/,
  },
  WEBSOCKET: {
    EVENT: {
      GET_PROJECT_APPROVE_STATUS: 'project_approve_status',
      NEW_PROJECT_PERCENT: 'new_project_percent',
      CHANGE_PASSWORD: 'change_password',
      LOG_OUT: 'log_out',
      NOTIFICATION: 'notification',
      UPDATE_SYSTEM_ROLE: 'update_system_role',
      DELETED_USER: 'deleted_user',
    },
    ROOM_NAME: {
      TENANT_PREFIX: 'tenant_room_',
      USER_PREFIX: 'user_room',
    },
    ADMIN_CLIENT: 0,
  },
  REQUEST_AUTH_USER_ID: 'authUserId',
  APP_ENVIRONMENT: {
    LOCAL: 'local',
    DEVELOPMENT: 'dev',
    STAGING: 'staging',
    PRODUCTION: 'prod',
  },
  INJECT_TOKEN: {
    AUTH_USER: 'AUTH_USER',
  },
  CONFIRMATION_CODE: {
    LENGTH: 20,
    EXPIRE_NUMBER: 15,
    EXPIRE_UNIT: 'minutes',
  },
  VERIFY_SIGNUP_CODE: {
    LENGTH: 8,
    EXPIRE_NUMBER: 24,
    EXPIRE_UNIT: 'hours',
  },
  VERIFY_2FA_CODE: {
    LENGTH: 6,
    CHARACTERS: '0123456789',
    EXPIRE_NUMBER: 10,
    EXPIRE_UNIT: 'minutes',
  },
  MASTER_DATA: {
    KEY: 'master-data',
    TTL: 10*60*1000, // 10 minutes
  },
  SEARCH_PROPERTY: {
    DESTINATIONS_LIMIT: 5,
    PROPERTIES_LIMIT: 5,
  },
  ROUNDED_NUMBER: 2,
  LOG: {
    ACCESS_HOME_PAGE_DURATION: 1,
  }
};

export const SEARCHED_HISTORIES_LIMIT = 3;
