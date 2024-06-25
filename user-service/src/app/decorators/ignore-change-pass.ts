import { SetMetadata } from '@nestjs/common';

export const IGNORE_CHANGE_PASS = 'ignore_change_tmp_password';
export const IgnoreChangePass = () => SetMetadata(IGNORE_CHANGE_PASS, true);
