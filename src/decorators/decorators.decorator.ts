import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../common/constants/security.constants';


export const isPublic = (...args: string[]) => SetMetadata(PUBLIC_KEY, true);
