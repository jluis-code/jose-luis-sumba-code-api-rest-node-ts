import axios from 'axios'
import dotenv from 'dotenv';
dotenv.config();

export const requestVerificationState = async () => {

    const options = {
        method: 'GET',
        timeout: 1000,
        url: `http://localhost:${process.env.PORT}/api/verification-codes`,
    };

    try {
        const response = await axios.request(options);
        let { status, data } = response;
        return {
            success: true,
            status,
            data
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            status: 0,
            data: []
        }
    }
}