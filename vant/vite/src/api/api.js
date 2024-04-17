import { apiClient } from '../utils/request'

// api.js
export const getJobs = async (filters, page, limit) => {
    try {
        const response = await apiClient.get('/jobs/filter', {
            params: { ...filters, page, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

// api.js
export const getJobDetail = async (id) => {
    try {
        const response = await apiClient.get('/jobs/'+id, {

        });
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};
