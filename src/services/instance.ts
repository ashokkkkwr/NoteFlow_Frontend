import axios, { AxiosInstance } from "axios";
import encryptDecrypt from "@functions/encryptDecrypt";
const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: import.meta.env.TIME_OUT,
});

const token = encryptDecrypt.decrypt(localStorage.getItem('accessTokenInternProject') as string) || encryptDecrypt.decrypt(sessionStorage.getItem('accessTokenInternProject') as string)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
axiosInstance.interceptors.request.use(async (config: any) => {

    config.headers.Authorization = `Bearer ${token}`
    return config
})
export default axiosInstance