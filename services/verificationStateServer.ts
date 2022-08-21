import axios from 'axios'

export const requestVerificationState = async () => {

    const options = {
        method: 'GET',
        url: `http://localhost:8000/api/verification-codes`,
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
            data: null
        }
    }
}