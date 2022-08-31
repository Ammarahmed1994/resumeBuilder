/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import { BASE_URL } from 'src/config/app.config';

const API_URL = `${BASE_URL}`;


export class AuthService {

  static async userLogin(data: any): Promise<any> {
    try {
      const response = await axios({
        method: `POST`,
        url: `${API_URL}/login`,
        data: { ...data },
        headers: {
          'Content-Type': `application/json`,
        }
      });

      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {

      throw new Error(
        ` ${err.response.data.message}`
      );
    }
  }

  static async userSignup(data: any): Promise<any> {
    try {
      const response = await axios({
        method: `POST`,
        url: `${API_URL}/signup`,
        data: { ...data },
        headers: {
          'Content-Type': `application/json`,
        }
      });

      return response.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(
        ` ${err.response.data.message}`
      );
    }
  }
}
