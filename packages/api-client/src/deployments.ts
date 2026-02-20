import api from '../../../src/lib/axios';

export const deploymentsApi = {
    deploy: async (repoUrl: string) => {
        const { data } = await api.post('/deploy', { repoUrl });
        return data;
    }
};
