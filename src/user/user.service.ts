import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  async createUser(userData: any) {
    try {
        
    } catch (error) {
      Logger.error('Error in creating user', error);
      return {
        success: false,
        code: 500,
        message: 'Error in creating user',
      };
    }
  }
}
