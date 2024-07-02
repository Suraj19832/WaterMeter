import {
  sendAuthorizeGetRequest,
  sendAuthorizePostFormData,
  sendGetRequest,
  sendPostFormData,
} from "./Helper";
const baseURL = "https://ehostingguru.com/stage/water-meter/api/public";
// const baseURL = "https://test.ehostingguru.com/water-meter/api/public/";

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
  changePassword: function(data) {
    const url = `${baseURL}/api/change-password`;
    return sendAuthorizePostFormData(url, data);
  },
  editProfile: function(data) {
    const url = `${baseURL}/api/profile`;
    return sendAuthorizePostFormData(url, data);
  },
  meternote: function(data) {
    const url = `${baseURL}/api/update/meter/note`;
    return sendAuthorizePostFormData(url, data);
  },
  meterimage: function(data) {
    const url = `${baseURL}/api/update/meter/image`;
    return sendAuthorizePostFormData(url, data);
  },
  profile: function(data) {
    const url = `${baseURL}/api/profile`;
    return sendAuthorizeGetRequest(url);
  },
  logout: function(data) {
    const url = `${baseURL}/api/logout`;
    return sendAuthorizeGetRequest(url);
  },
  dashboard: function(data) {
    const url = `${baseURL}/api/dashboard`;
    return sendAuthorizeGetRequest(url, data);
  },
  metersection: function(data) {
    const url = `${baseURL}/api/meter-list`;
    return sendAuthorizeGetRequest(url, data);
  },
  saveLocationApi: function(data) {
    const url = `${baseURL}/api/current-location`;
    return sendAuthorizePostFormData(url, data);
  },
  meterScanner: function(data) {
    const url = `${baseURL}/api/detectOcr`;
    return sendAuthorizePostFormData(url, data);
  },
  submitReading: function(data) {
    const url = `${baseURL}/api/ocrFinal`;
    return sendAuthorizePostFormData(url, data);
  },
};
export default appApi;
