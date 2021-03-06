import * as storage from "../service/BarStorageService.js";
import axios from 'axios';
const api_url = "https://tungstun-bar-api.herokuapp.com/api";

const api = axios.create({
  baseURL: "https://tungstun-bar-api.herokuapp.com/api"
});

api.defaults.headers.common["token_type"] = "bearer";
api.defaults.headers.common["Accept"] = "application/json";
api.defaults.headers.common["Content-Type"] = "application/json"; 

api.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log("INTERCEPT STATUS: " + JSON.stringify(error.message))
    let refreshToken = await storage.getRefreshToken()
    let accessToken = await storage.getAccessToken()
    if (refreshToken && error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      return api.post("/authenticate/refresh", { "refreshToken": refreshToken, "accessToken": accessToken }, {"access_token": accessToken})
      .then(async (res) => {
        if (res.status === 200) {
          await storage.storeAccessToken(res.headers.access_token);
          console.log("Access token refreshed! : " + res.headers.access_token);
          let headers = originalRequest.headers;
          headers.access_token = res.headers.access_token;
          originalRequest.headers = headers;
          return api(originalRequest);
        }
      })
    }
    return Promise.reject(error);
  });

async function getRequest(url) {
  const accessToken = await storage.getAccessToken();
  console.log("Doing a getRequest on URL: " + url);

  return api.get(url, {headers: {"access_token": accessToken}})
  .then((response) => {
    return response.data;
  })
  .catch((e) => {
    throw  e
  });
  // return fetch(api_url + url, {

  //   method: "GET",
  //   headers: {
  //     "token_type": "bearer",
  //     "access_token": accessToken,
  //     "Accept": "application/json",
  //     "Content-Type": "application/json",
  //   },
  // }).then((response) => {
  //   if (response.ok) return response;
  //   if(response.status === 403) {
  //     console.log("Access token expired, asking for a new one;")
  //     // refreshTokens();
  //     throw "Could not make request";
  //   }
    
  // }).catch((e) => {throw e});
}

// async function refreshTokens() {
//   const accessToken = await storage.getAccessToken();
//   const refreshToken = await storage.getRefreshToken();

//     await fetch(api_url + "/authenticate/refresh", {
//     method: "POST",
//     headers: {
//       "Accept": "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       "accessToken": accessToken,
//       "refreshToken": refreshToken,
//     })
//   }).then((response) => {
//     if(response.ok) {
//       console.log("Got new tokens, storing them now!")
//       storage.storeaccessToken(response.headers.get("access_token"))
      
//     }
//   }).catch((e) => {
//   console.error(e)
//   });
// }


export async function login(email, password) {
  console.log("logging in...")
  let data = { "userIdentification": email, "password": password };
  let tokens = null;
  tokens = await fetch(api_url + "/authenticate", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Credentials ok: Storing now")
        return {
          "accessToken": response.headers.get("access_token"), 
          "refreshToken": response.headers.get("refresh_token")
        }
      }
    }).catch((error) => {
      throw error;
    })

    console.log(tokens)
    await storage.storeAccessToken(tokens.accessToken);
    await storage.storeRefreshToken(tokens.refreshToken);
}

export async function logout() {
  await storage.removeAccessToken()
  await storage.removeRefreshToken()
  console.log('Logged out.')
}

export function addDrink(customer, drink) {
  console.log("Adding drink: " + drink.name + " to " + customer.name);
}

export async function getDrinksByCategory(category) {
  return await getRequest("/bars/1/products?categoryId=" + category.id)
}

export function createCustomer(name, phone) {
  console.log("Creating customer: " + name + phone);
  return 200;
}

export async function getBars() {
 return await getRequest("/bars");
}

export async function getCurrentSession() {
  return await getRequest("/bars/1/sessions/active")
}

export async function getCategories() {
  return await getRequest("/bars/1/categories");
}

export function getSessionById(sessionId) {
  return {
    id: sessionId,
    name: "Een vorige sessie",
    customers: [
      {
        id: 1,
        name: "Jort",
        currentBill: {
          total: 21.5,
        },
      },
      {
        id: 3,
        name: "Jona",
        currentBill: {
          total: 26.5,
        },
      },
      {
        id: 5,
        name: "Fee",
        currentBill: {
          total: 7.49,
        },
      },
      {
        id: 6,
        name: "Dante",
        currentBill: {
          total: 2.1,
        },
      },
      {
        id: 7,
        name: "Sep",
        currentBill: {
          total: 2.1,
        },
      },
    ],
  };
}

export function getCustomerById(id) {
  return {
    name: "customer " + id,
    id: id,
  };
}

export function getBillBySessionIdAndCustomerId(sessionId, customerId) {
  return {
    customerId: customerId,
    sessionId: sessionId,
    totalPrice: 31.88,
    orders: [
      {
        id: 1,
        timestamp: "2021-02-10T21:29:45.846+00:00",
        totalPrice: 5.0,
        product: {
          id: 1,
          name: "Heiniken vaasje",
          price: 1.25,
        },
        amount: 4,
      },
      {
        id: 2,
        timestamp: "2021-02-10T22:21:45.846+00:00",
        totalPrice: 2.0,
        product: {
          id: 1,
          name: "Hertog Jan Flesje",
          price: 1.0,
        },
        amount: 2,
      },
      {
        id: 3,
        timestamp: "2021-02-10T19:18:45.846+00:00",
        totalPrice: 2.5,
        product: {
          id: 1,
          name: "Heiniken vaasje",
          price: 1.25,
        },
        amount: 2,
      },
    ],
  };
}

export function getAllSessions() {
  return [
    {
      id: 2,
      name: "Avond met Sep",
      timestamp: "2020-12-21T21:29:45.846+00:00",
    },
    {
      id: 1,
      name: "Eerste kerstdag",
      timestamp: "2020-12-25T21:29:45.846+00:00",
    },

    {
      id: 3,
      name: "Avond met Feestcommisie",
      timestamp: "2020-11-12T21:29:45.846+00:00",
    },
    {
      id: 4,
      name: "Avond met Sep",
      timestamp: "2020-10-26T21:29:45.846+00:00",
    },
  ];
}

export function lockSession(sessionId) {
  console.log("locked session " + sessionId);
}
