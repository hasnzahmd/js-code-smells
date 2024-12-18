import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
    codeSmells: {},
    error: '',
    loading: false,
    
    detectCodeSmells: async (directory) => {
        set({ error: '' });
        set({ loading: true });
        set({ codeSmells: {} });
        try {
            const response = await axios.post('http://localhost:5050/detect-code-smells', { path: directory.trim() });
            if (response.status === 200) {
                set({ codeSmells: response.data });
            }
        } catch (err) {
            set({ error: err.response?.data?.error || 'An error occurred' });
        }
        set({ loading: false });
    },
}));

export default useStore;