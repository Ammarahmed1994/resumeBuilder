/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BASE_URL } from 'src/config/app.config';

const API_URL = `${BASE_URL}`;


export class UserEducationService {

    static async addEducation(data: any): Promise<any> {
        try {
            const response = await axios({
                method: `POST`,
                url: `${API_URL}/addEducation`,
                data: { ...data },
                headers: {
                    'Content-Type': `application/json`,
                }
            });

            return response.data.data.userEducation;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {

            throw new Error(
                ` ${err.response.data.message}`
            );
        }
    }

    static async updateEducation(data: any): Promise<any> {
        try {
            const response = await axios({
                method: `PUT`,
                url: `${API_URL}/updateEducation`,
                data: { ...data },
                headers: {
                    'Content-Type': `application/json`,
                }
            });

            return response.data.data.userEducation;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            throw new Error(
                ` ${err.response.data.message}`
            );
        }
    }

    static async getUserEducation(id: string): Promise<any> {
        try {
            const response = await axios({
                method: `GET`,
                url: `${API_URL}/getUserEducation?userId=${id}`,
                headers: {
                    'Content-Type': `application/json`,
                }
            });

            return response.data.data.userEducation;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {

            throw new Error(
                ` ${err.response.data.message}`
            );
        }
    }
}
