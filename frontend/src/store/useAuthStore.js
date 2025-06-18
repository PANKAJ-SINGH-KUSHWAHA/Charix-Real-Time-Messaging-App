import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';
export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,


    checkAuth: async () => {
        try{
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data});
        }catch(error){
            console.error('Error in check Auth:', error);
            set({ authUser: null });
        }
        finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async(data) => {
    set({ isSigningUp: true });
    try {
        console.log("Signing up with:", data); // 👈 Already done

        const res = await axiosInstance.post('/auth/signup', data);
        set({ authUser: res.data });
        toast.success('Account created successfully');
    } catch(error) {
        console.log(error.response); // 👈 ADD THIS
        toast.error('Error creating account: ' + (error.response?.data?.message || error.message));
    } finally {
        set({ isSigningUp: false });
    }
},

}))