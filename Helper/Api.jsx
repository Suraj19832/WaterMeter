import {
  sendAuthorizeGetRequest,
  sendAuthorizePostFormData,
  sendGetRequest,
  sendPostFormData,
} from "./Helper";

// const baseURL = "https://ehostingguru.com/stage/water-meter/api/public"; //for devs
const baseURL = "https://test.ehostingguru.com/water-meter/api/public"; //for testing
// const baseURL = "https://uat.ehostingguru.com/water-meter/api/public"; //for uat/
// const baseURL = "https://db08-2405-201-8015-610b-bc88-fb6f-1fd-96b1.ngrok-free.app"  

const appApi = {
  login: function (data) {
    const url = `${baseURL}/api/login`;
    return sendPostFormData(url, data);
  },
  verifyEmail: function (data) {
    const url = `${baseURL}/api/otp/forget-password`;
    return sendPostFormData(url, data);
  },
  VerifyOTP: function (data) {
    const url = `${baseURL}/api/otp/verify/forget-password`;
    return sendGetRequest(url, data);
  },
  ForgotPassword: function (data) {
    const url = `${baseURL}/api/forget-password`;
    return sendPostFormData(url, data);
  },
  changePassword: function (data) {
    const url = `${baseURL}/api/change-password`;
    return sendAuthorizePostFormData(url, data);
  },
  editProfile: function (data) {
    const url = `${baseURL}/api/profile`;
    return sendAuthorizePostFormData(url, data);
  },
  meternote: function (data) {
    const url = `${baseURL}/api/update/meter/note`;
    return sendAuthorizePostFormData(url, data);
  },
  meterimage: function (data) {
    const url = `${baseURL}/api/update/meter/image`;
    return sendAuthorizePostFormData(url, data);
  },
  profile: function (data) {
    const url = `${baseURL}/api/profile`;
    return sendAuthorizeGetRequest(url);
  },
  logout: function (data) {
    const url = `${baseURL}/api/logout`;
    return sendAuthorizeGetRequest(url);
  },
  dashboard: function (data) {
    const url = `${baseURL}/api/dashboard`;
    return sendAuthorizeGetRequest(url, data);
  },
  metersection: function (data) {
    const url = `${baseURL}/api/meter-list`;
    return sendAuthorizeGetRequest(url, data);
  },
  saveLocationApi: function (data) {
    const url = `${baseURL}/api/current-location`;
    return sendAuthorizePostFormData(url, data);
  },
  meterScanner: function (data) {
    const url = `${baseURL}/api/detectOcr`;
    return sendAuthorizePostFormData(url, data);
  },
  submitReading: function (data) {
    const url = `${baseURL}/api/ocrFinal`;
    return sendAuthorizePostFormData(url, data);
  },
  completedImage: function (data) {
    const url = `${baseURL}/api/reading/completed`;
    return sendAuthorizeGetRequest(url, data);
  },
  summaryCompletion: function (data) {
    const url = `${baseURL}/api/summary/completion`;
    return sendAuthorizeGetRequest(url, data);
  },
};
export default appApi;
