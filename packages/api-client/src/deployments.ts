import api from '../../../src/lib/axios';

export const deploymentsApi = {
    deploy: async (repoUrl: string) => {
        const { data } = await api.post('/deploy', { repoUrl });
        return data;
    },
    list: async () => {
        const { data } = await api.get('/deploy');
        return data;
    }
};
