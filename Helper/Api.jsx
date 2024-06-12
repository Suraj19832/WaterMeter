import { sendPostFormData } from "./Helper";
const baseURL = "https://ehostingguru.com/stage/water-meter/api/public";
const appApi = {
  login: function(data) {
    const url = `${baseURL}/api/login`;
    return sendPostFormData(url, data);
  },
};
export default appApi;
