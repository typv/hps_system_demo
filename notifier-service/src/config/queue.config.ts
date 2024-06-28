export default () => ({
  queue_name: {
    send_mail: 'send_email_queue',
    expired_event: 'expired_event_queue',
  },
  job_name: {
    verify_signup: 'verify_signup',
    welcome_mail: 'welcome',
    reset_pw: 'reset-password',
    register_hotel: 'register-hotel',
    invite_user: 'invite_user',
    login_2fa: 'login_2fa',
    turn_on_2fa: 'turn_on_2fa',
  },
});
