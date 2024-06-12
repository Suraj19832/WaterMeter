
import { sendGetRequest, sendPostFormData } from "./Helper";
const baseURL = "https://ehostingguru.com/stage/water-meter/api/public";


const appApi = {
  login: function(data) {
    const url = `${baseURL}/api/login`;
    return sendPostFormData(url, data);
  },
  verifyEmail: function(data) {
    
    const url = `${baseURL}/api/otp/forget-password`;
  
    return sendPostFormData(url, data);
  },
  VerifyOTP: function(data) {
    
    const url = `${baseURL}/api/otp/verify/forget-password`;
  
    return sendGetRequest(url, data);
  },
  ForgotPassword: function(data) {
    
    const url = `${baseURL}/api/forget-password`;
  
    return sendPostFormData(url, data);
  },
};
export default appApi;
