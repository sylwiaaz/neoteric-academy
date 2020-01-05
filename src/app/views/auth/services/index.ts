import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth-interceptor';

export const AuthServices = [
  AuthService,
  AuthInterceptor
];

export {
  AuthService,
  AuthInterceptor
};
