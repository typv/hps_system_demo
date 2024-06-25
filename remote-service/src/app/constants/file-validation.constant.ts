export const fileValidationConstant = {
  IMAGE: {
    MAX_SIZE_MB: 10,
    ALLOW_TYPE_MIME: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/xml'],
    MAX_ARTIS_IMAGE: 5,
    MAX_BACKGROUND_IMAGE: 5,
  },
  VIDEO: {
    MAX_SIZE_MB: +process?.env?.VIDEO_MAX_SIZE_MB || 2048,
    ALLOW_TYPE_MIME: ['video/mp4', 'video/mov', 'video/wmv', 'video/avi', 'video/mkv', 'video/avchd'],
  },
  FILE: {
    MAX_SIZE_MB: 100,
    ALLOW_TYPE_MIME: [
      'audio/mp3',
      'audio/wav',
      'audio/mpeg',
      'audio/ogg',
      'audio/flac',
      'audio/aac',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', // pptx
      'application/x-cfb' // ppt
    ],
  },
  MANUAL_ASSIGN_SEAT: {
    MAX_SIZE_MB: 5,
    ALLOW_TYPE_MIME: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  },
};

