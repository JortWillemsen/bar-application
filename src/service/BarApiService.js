import { Alert } from "react-native";

const api_url = "https://tungstun-bar-api.herokuapp.com/api";
let token;

function throwError(message) {
  Alert.alert(
    "Error",
    message,
    [
      {
        text: "Yes",
        style: "cancel",
      },
    ],
    { cancelable: false },
  );
}

export function login(email, password) {
  let data = { "username": email, "password": password };
  fetch(api_url + "/login", {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) return response.headers;
      else throw "d gebruikersnaam/wachtwoord";
    })
    .then((headers) => {
      token = headers.get("authorization");
      console.log(token);
    })
    .catch((error) => {
      throwError();
    });
}

export function addDrink(customer, drink) {
  console.log("Adding drink: " + drink.name + " to " + customer.name);
}

export function getDrinksByCategory(category) {
  return {
    title: "Beers",
    drinks: [
      { id: 1, name: "Heiniken vaasje", price: 1.25 },
      { id: 2, name: "Heiniken fluitje", price: 1.0 },
      { id: 3, name: "la Chouffe", price: 2.5 },
      { id: 4, name: "Hertog Jan flesje", price: 1.2 },
    ],
  };
}

export function createCustomer(name, phone) {
  console.log("Creating customer: " + name + phone);
  return 200;
}

export function getCurrentSession() {
  console.log("Getting the current session...")

  fetch(api_url + "/bars/" + 2 + "/sessions/" + 6, {
    method: "GET",
    headers: {
      "authorization": token,
      Accept: 'application/json',
      "Content-Type": "application/json",
    }
  })
    .then((response) => {
      console.log("Session status: " + response.status)
      if (response.ok) return response.json();
      else throw "d gebruikersnaam/wachtwoord";
    })
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      throwError();
    });

  return {
    id: 1,
    name: "Oudjaarsavond",
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
