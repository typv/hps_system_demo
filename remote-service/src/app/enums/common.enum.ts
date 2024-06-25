export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum Roles {
  ADMIN = 'ADMIN',
  HOTEL = 'HOTEL',
  CUSTOMER = 'CUSTOMER',
}

export enum UserConfirmationType {
  FORGOT_PASSWORD = 'forgot_password',
  VERIFY_SIGNUP = 'verify_signup',
  CODE_2FA = 'code_2fa',
}

export enum UserTitle {
  MR = 'MR',
  MS = 'MS',
  Mrs = 'MRS',
}

export enum SignUpDocumentType {
  PASSPORT = 'PASSPORT',
  CHINESE_ID = 'CHINESE_ID',
  NATIONAL_ID = 'NATIONAL_ID',
}

export enum UserLoginProvider {
  INTERNAL = 1,
  FACEBOOK = 2,
  GOOGLE = 3,
  WECHAT = 4,
}

export enum StatusUser {
  NO_VERIFIED_EMAIL = 'no_verified',
  VERIFIED_EMAIL = 'verified',
  DE_ACTIVE = 'de_active',
}

export enum StatusReferral {
  NO_VERIFIED = 'no_verified',
  VERIFIED = 'verified',
}

export enum AmenityType {
  PROPERTY = 1,
  ROOM = 2,
}

export enum RoomSizeType {
  SQUARE_METERS = 1,
  SQUARE_FEETS = 2,
}

export enum RoomStatus {
  DEACTIVE = 0,
  ACTIVE = 1,
}

export enum BookingStatus {
  Confirmed,
  Completed,
  Cancelled,
  NoShow,
  Deleted,
}

export enum TransactionStatus {
  Success,
  False,
  Processing,
}

export enum ReasonBookingCancellation {
  Personal_reasons,
  Found_a_different_accommodation_option,
  Change_of_dates_or_destination,
  Duplicate_booking,
  Change_in_the_number_or_needs_of_travelers,
  Did_not_like_cancellation_policy,
  Property_asked_to_cancel,
  None_of_the_above,
}

export enum ReviewStatus {
  CANNOT_REVIEW = 0,
  REVIEWING = 1,
  REVIEWED = 2,
  DELETED = 3,
}

export enum KybStatus {
  REVIEWING = 1,
  VERIFIED = 2,
  REJECTED = 3,
  INCOMPLETE = 4,
}

export enum ManagerPropertyType {
  OWNER = 1,
  PROPERTY_MANAGER = 2,
  MANAGEMENT_COMPANY = 3,
}

export enum OwnerPropertyType {
  INDIVIDUAL_BUSINESS = 1,
  REPRESENT_BUSINESS = 2,
}

export enum AnalysisType {
  ACCESS_HOME_PAGE = 'access_home_page',
  REFERRAL_CLICK = 'referral_click',
}
export enum Platform {
  TELEGRAM = 1,
  MESSENGER = 2,
  ZALO = 3,
  WHATSAPP = 4,
  GMAIL = 5,
}

export enum Currency {
  USD = 'USD',
  VND = 'VND'
}