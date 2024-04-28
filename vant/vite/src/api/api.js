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


// api.js
export const login = async (code) => {
    try {
        const response = await apiClient.post('/login', {
            code: code
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};


// api.js
export const myresume = async () => {
    try {
        const response = await apiClient.post('/profiles/my', {
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};


// api.js
export const saveresume = async (profile) => {
    try {
        const response = await apiClient.post('/profiles/save', profile);
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};


// api.js
export const sendresume = async (application) => {
    try {
        const response = await apiClient.post('/application/add', application);
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};



// api.js
export const createJob = async (application) => {
    try {
        const response = await apiClient.post('/jobs/updateJob', application);
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};


// api.js
export const MyJob = async (application) => {
    try {
        const response = await apiClient.post('/jobs/myJob', application);
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

// api.js
export const deleteJob = async (id) => {
    try {
        const response = await apiClient.post('/jobs/deleteJob/'+id);
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};