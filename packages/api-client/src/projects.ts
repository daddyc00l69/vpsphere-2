import api from '../../../src/lib/axios';

export const projectsApi = {
    list: async () => {
        const { data } = await api.get('/project/list');
        return data;
    },

    get: async (projectId: string) => {
        const { data } = await api.get(`/project/${projectId}`);
        return data;
    },

    start: async (projectId: string) => {
        const { data } = await api.post('/project/start', { projectId });
        return data;
    },

    stop: async (projectId: string) => {
        const { data } = await api.post('/project/stop', { projectId });
        return data;
    },

    delete: async (projectId: string) => {
        const { data } = await api.post('/project/delete', { projectId });
        return data;
    }
};
