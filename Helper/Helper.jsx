import AsyncStorage from "@react-native-async-storage/async-storage";
import * as mime from "react-native-mime-types";
import { setAuthToken } from "../redux/slices/Authslice";
import { useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import store from "../redux/reduxstore";
export function prepareFormDataFromObject(obj) {
  let formdata = new FormData();
  for (let key in obj) {
    formdata.append(key, obj[key]);
  }
  console.log(formdata, "<============formdata");
  return formdata;
}

export function prepareURLenCodedFromObject(obj) {
  let formdata = new URLSearchParams();
  for (let key in obj) {
    formdata.append(key, obj[key]);
  }

  return formdata;
}

export function prepareJsonBody(data) {
  return JSON.stringify(data);
}

export async function sendPostRequest(url, obj) {
  let response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: prepareJsonBody(obj),
  });

  let data = await response.json();

  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }

  return data;
}

// export async function sendGetRequest(url, params = {}) {
//   if (Object.keys(params).length != 0) {
//     let queryString = new URLSearchParams(params);
//     url += "?" + queryString.toString();
//   }

//   let response = await fetch(url, {
//     method: "GET",
//     cache: "no-cache",
//     headers: {
//       "Accept-Language": "en",
//     },
//   });

//   let data = await response.json();

//   if (!response.ok) {
//     throw new ValidationError(data.message, data.errors);
//   }

//   return data;
// }

export async function sendGetRequest(url, params = {}) {
  try {
    const response = await axios.get(url, {
      params: params,
      headers: {
        "Accept-Language": "en",
      },
      cache: "no-cache",
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      if (error.response.status === 401) {
        console.log("Unauthorized: 401");
        // DoLogout();
        // Handle 401 error here, e.g., remove token, redirect to login, etc.
        throw new Error("Unauthorized: 401");
      }

      throw new ValidationError(
        error.response.data.message,
        error.response.data.errors
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      throw new Error(error.message);
    }
  }
}

export async function sendAuthorizeGetRequest(url, params = []) {
  let token = await AsyncStorage.getItem("token");

  const config = {
    method: "get",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: params,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        console.log("Unauthorized: 401");
        AsyncStorage.removeItem("token")
        store.dispatch(setAuthToken(null));
        throw new Error("Unauthorized: 401");
      }

      throw new ValidationError(
        error.response.data.message,
        error.response.data.errors
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      throw new Error(error.message);
    }
  }
}
// export async function sendAuthorizeGetRequest(url, params = []) {
//   let token = await AsyncStorage.getItem("token");
//   // console.log(token, "in helpper function");
// console.log("khkhkhkhkhkhkjh",url)
//   if (Object.keys(params).length != 0) {
//     let queryString = new URLSearchParams(params);
//     url += "?" + queryString.toString();
//   }
//   let response = await fetch(url, {
//     method: "GET",
//     cache: "no-cache",
//     headers: {
//       Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Vob3N0aW5nZ3VydS5jb20vc3RhZ2Uvd2F0ZXItbWV0ZXIvYXBpL3B1YmxpYy9hcGkvbG9naW4iLCJpYXQiOjE3MjE5MDQ4MzgsImV4cCI6MTcyMTkwNjYzOCwibmJmIjoxNzIxOTA0ODM4LCJqdGkiOiJsZDlIVkJNR3REREpzSkhjIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.kzqrmcsjw2wTVAbylnpl_JYmYVV5sqweDYS4EvfmhY0"}`,
//     },
//   });
//   console.log(response.status,">>>>>>>>>>>>>??from daasbaord????????????????")

//   let data = await response.json();
//   if (!response.ok) {
//     throw new ValidationError(data.message, data.errors);

//   }
//   console.log(data,">>>>>>>>>>>>>??????????????????")
//   return data;
// }

export async function sendAuthorizePostRequest(url, obj) {
  let token = AsyncStorage.getItem("token");

  let response = await fetch(url, {
    method: "POST",
    body: prepareJsonBody(obj),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let data = await response.json();

  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }

  return data;
}
export async function sendAuthorizePatchRequest(url, obj) {
  let token = localStorage.getItem("token");

  let response = await fetch(url, {
    method: "PATCH",
    body: prepareJsonBody(obj),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let data = await response.json();

  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }

  return data;
}

export async function sendPostFormData(url, obj) {
  try {
    const formData = prepareFormDataFromObject(obj);

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      if (error.response.status === 401) {
        console.log("Unauthorized: 401");
        // Handle 401 error here, e.g., remove token, redirect to login, etc.
        throw new Error("Unauthorized: 401");
      }

      throw new ValidationError(
        error.response.data.message,
        error.response.data.errors
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      throw new Error(error.message);
    }
  }
}

// export async function sendPostFormData(url, obj) {
//   // console.log(url, data);
//   let response = await fetch(url, {
//     method: "POST",
//     cache: "no-cache",
//     body: prepareFormDataFromObject(obj),
//   });
//   // console.log(response, "<============response");
//   let data = await response.json();

//   // if (!response.ok) {
//   //   throw new ValidationError(data.message, data.errors);
//   // }

//   return data;
// }

export async function sendPostURLencoded(url, obj) {
  // console.log("calledS");
  let response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    body: prepareURLenCodedFromObject(obj),
  });

  let data = await response.json();

  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }

  return data;
}

export async function sendAuthPostURLencoded(url, obj) {
  let token = localStorage.getItem("token");
  // console.log("calledS");
  let response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    body: prepareURLenCodedFromObject(obj),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let data = await response.json();

  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }

  return data;
}

export async function sendPatchURLencoded(url, obj) {
  let response = await fetch(url, {
    method: "PATCH",
    cache: "no-cache",
    body: prepareURLenCodedFromObject(obj),
  });

  let data = await response.json();

  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }

  return data;
}
export async function sendPatchURLencodedAuthorize(url, obj) {
  let token = localStorage.getItem("token");
  let response = await fetch(url, {
    method: "PATCH",
    cache: "no-cache",
    body: prepareFormDataFromObject(obj),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let data = await response.json();

  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }

  return data;
}

export async function sendDeleteURLencoded(url, obj) {
  let response = await fetch(url, {
    method: "DELETE",
    cache: "no-cache",
    body: prepareURLenCodedFromObject(obj),
  });

  let data = await response.json();

  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }

  return data;
}

export async function sendAuthorizePostFormData(url, obj) {
  console.log(url, obj);
  try {
    let token = await AsyncStorage.getItem("token");
    console.log(token, "<=====================");

    if (!token) {
      throw new Error("No token found");
    }

    const formData = prepareFormDataFromObject(obj);

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      if (error.response.status === 401) {
        console.log("Unauthorized: 401");
        // Handle 401 error here, e.g., remove token, redirect to login, etc.
        throw new Error("Unauthorized: 401");
      }

      throw new ValidationError(
        error.response.data.message,
        error.response.data.errors
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      throw new Error(error.message);
    }
  }
}

// export async function sendAuthorizePostFormData(url, obj) {
//   console.log(url, obj);
//   try {
//     let token = await AsyncStorage.getItem("token");
//     console.log(token, "<=====================");

//     if (!token) {
//       throw new Error("No token found");
//     }

//     let response = await fetch(url, {
//       method: "POST",
//       body: prepareFormDataFromObject(obj), // Converting the object to JSON string
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     let data = await response.json();

//     // if (!response.ok) {
//     //   throw new ValidationError(data.message, data.errors);
//     // }

//     return data;
//   } catch (error) {
//     console.error("Error in sendAuthorizePostFormData:", error);
//     throw error;
//   }
// }

export async function sendAuthorizePatchFormData(url, obj) {
  let token = localStorage.getItem("token");

  let response = await fetch(url, {
    method: "PATCH",
    body: prepareFormDataFromObject(obj),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let data = await response.json();

  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }

  return data;
}
export async function sendAuthorizePatchUrlencoded(url, obj) {
  let token = localStorage.getItem("token");

  let response = await fetch(url, {
    method: "PATCH",
    body: prepareURLenCodedFromObject(obj),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let data = await response.json();

  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }

  return data;
}
export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export class ValidationError extends Error {
  constructor(message, errors = {}) {
    super(message);
    this.name = "ValidationError";
    this.errors = errors;
  }
}
export const getFileData = (obj = {}) => {
  let uri = obj?.assets ? obj?.assets[0]?.uri : obj?.uri;

  let arr = uri.split("/");
  let fileName = arr[arr.length - 1];

  return {
    uri: uri,
    name: fileName,
    type: mime.lookup(fileName),
  };
};
export async function DoLogout() {
  console.log("do logout console");
  // const toast = useToast();
  // toast.show("Token Expire", { type: "sucess" });
  const dispatch = useDispatch();
  await AsyncStorage.removeItem("token");
  dispatch(setAuthToken(null));
}
// export function prepareFormDataFromObject(obj) {
//   let formdata = new FormData();
//   for (let key in obj) {
//       formdata.append(key, obj[key]);
//   }

//   return formdata;
// }
