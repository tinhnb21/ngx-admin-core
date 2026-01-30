import { NbPasswordAuthStrategy } from '@nebular/auth';

export class CustomPasswordStrategy extends NbPasswordAuthStrategy {

  protected buildRequest(data: any) {
    return {
      userName: data.email,
      password: data.password,
    };
  }

}
