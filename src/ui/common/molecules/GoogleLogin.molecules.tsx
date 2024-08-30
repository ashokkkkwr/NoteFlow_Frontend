import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axiosInstance from 'services/instance';
import { useNavigate } from 'react-router-dom';
interface CustomCredentialResponse {
 credential?: string;
 // Add other properties if needed
}
const GoogleAuth = () => {
 const navigate = useNavigate();
 const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
 const handleSuccess = async (credentialResponse: CustomCredentialResponse) => {
 const googleId = credentialResponse.credential;
 console.log(googleId, 'aaa');
 try {
 if (typeof googleId !== 'string' || googleId.trim() === '') {
 console.log('InvalgoogleId token', googleId);
 return;
 }
 const response = await axiosInstance.post('/auth/google', { googleId });
 console.log("🚀 ~ handleSuccess ~ response:", response)
 
 navigate('/');
 const { accessToken } = response.data.data.tokens;
 sessionStorage.setItem('accessToken', accessToken);

 console.log(response);
 } catch (error) {
 console.log('🚀 ~ handleSuccess ~ error:', error);
 }
 };
 return (
 <GoogleOAuthProvider clientId={clientId} >
 <div className="w-">
 <GoogleLogin
 onSuccess={handleSuccess}
 onError={() => {
 console.log('Login Failed');
 }}
 />
 </div>
 </GoogleOAuthProvider>
 );
};

export default GoogleAuth;