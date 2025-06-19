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

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success('Logged out successfully');
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error('Error logging out');
        }
    },

    updateProfile: async(data)=>{
        set({isUpdatingProfile: true});
        try{
            const res = await axiosInstance.put('/auth/update-profile', data);
            set({authUser: res.data});
            toast.success("Profile Updated Succesfully");
        }
        catch(errror){
            console.log("error in updatinf the profile:", error);
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile: false});
        }
    },

    


}))