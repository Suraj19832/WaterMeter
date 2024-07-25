import AsyncStorage from "@react-native-async-storage/async-storage";
import * as mime from "react-native-mime-types";
import { setAuthToken } from "../redux/slices/Authslice";
import { useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";
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

export async function sendGetRequest(url, params = {}) {
  // console.log({
  //   url: url,
  //   params: params,
  // });
  if (Object.keys(params).length != 0) {
    let queryString = new URLSearchParams(params);
    url += "?" + queryString.toString();
  }

  let response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Accept-Language": "en",
    },
  });

  let data = await response.json();

  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }

  return data;
}

export async function sendAuthorizeGetRequest(url, params = []) {
  let token = await AsyncStorage.getItem("token");
  // console.log(token, "in helpper function");

  if (Object.keys(params).length != 0) {
    let queryString = new URLSearchParams(params);
    url += "?" + queryString.toString();
  }
  let response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
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
  // console.log(url, data);
  let response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    body: prepareFormDataFromObject(obj),
  });
  // console.log(response, "<============response");
  let data = await response.json();

  // if (!response.ok) {
  //   throw new ValidationError(data.message, data.errors);
  // }

  return data;
}

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

    let response = await fetch(url, {
      method: "POST",
      body: prepareFormDataFromObject(obj), // Converting the object to JSON string
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    let data = await response.json();

    // if (!response.ok) {
    //   throw new ValidationError(data.message, data.errors);
    // }

    return data;
  } catch (error) {
    console.error("Error in sendAuthorizePostFormData:", error);
    throw error;
  }
}

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
  const toast = useToast();
  toast.show("Token Expire", { type: "sucess" });
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
