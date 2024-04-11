import { faker } from "https://esm.sh/@faker-js/faker";

function populateOrder(order) {
  fetch("http://127.0.0.1:5000/order/", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
}

function populateSize(size) {
  fetch("http://127.0.0.1:5000/size/", {
    method: "POST",
    body: JSON.stringify(size),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
}
function populateIngredient(ingredient) {
  fetch("http://127.0.0.1:5000/ingredient/", {
    method: "POST",
    body: JSON.stringify(ingredient),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
}
function populateBeverage(beverage) {
  fetch("http://127.0.0.1:5000/beverage/", {
    method: "POST",
    body: JSON.stringify(beverage),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
}

let orderForm = $("#order-form");
orderForm.submit((event) => {
  for (let i = 0; i < 5; i++) {
    let size = generateData();
    populateSize(size);
  }
  for (let i = 0; i < 10; i++) {
    let ingredient = generateData();
    populateIngredient(ingredient);
    let beverage = generateData();
    populateBeverage(beverage);
  }
  for (let i = 0; i < 100; i++) {
    let customer = generateCustomer();
    for (let j = 0; j < Math.floor(Math.random() * 5) + 1; j++){
        let order = generateOrdersData(customer);
        populateOrder(order);
    }
  }

  event.preventDefault();
});

function generateData() {
  return {
    name: faker.word.sample(),
    price: faker.number.int({ min: 1, max: 10 }),
  };
}

function generateCustomer(){
    let client_data = {
        client_name: faker.person.fullName(),
        client_dni: (faker.number.int({ min: 1000000000, max: 1999999999 })).toString(),
        client_address: faker.location.streetAddress(),
        client_phone: faker.phone.number(),
        date: (faker.date.between({
          from: "2024-01-01T00:00:00.000Z",
          to: "2025-01-01T00:00:00.000Z",
        })).toJSON(),
    };
    return client_data;    
}

function generateOrdersData(client_data) {
  let size_id = (Math.floor(Math.random() * 7) + 1).toString();
  let ingredients = [];
  let beverages = [];
  for (let i = 0; i < Math.floor(Math.random() * 13) + 1; i++) {
    if(!ingredients.includes(i.toString))
        ingredients.push((Math.floor(Math.random() * 13) + 1).toString());
  }
  for (let i = 0; i < Math.floor(Math.random() * 14) + 1; i++) {
    if(!beverages.includes(i.toString))
        beverages.push((Math.floor(Math.random() * 14) + 1).toString());
  }

  return {
    client_name: client_data.client_name,
    client_dni: client_data.client_dni,
    client_address: client_data.client_address,
    client_phone: client_data.client_phone,
    date: client_data.date,
    size_id: size_id,
    ingredients,
    beverages,
  };
}

function showNotification() {
  let orderAlert = $("#order-alert");
  orderAlert.toggle();
  setTimeout(() => orderAlert.toggle(), 5000);
}

function fetchIngredients() {
  fetch("http://127.0.0.1:5000/ingredient/")
    .then((response) => response.json())
    .then((ingredients) => {
      let rows = ingredients.map((element) =>
        createIngredientTemplate(element)
      );
      let table = $("#ingredients tbody");
      table.append(rows);
    });
}

function fetchBeverages() {
  fetch("http://127.0.0.1:5000/beverage/")
    .then((response) => response.json())
    .then((beverages) => {
      let rows = beverages.map((element) => createBeverageTemplate(element));
      let table = $("#beverages tbody");
      table.append(rows);
    });
}

function fetchOrderSizes() {
  fetch("http://127.0.0.1:5000/size/")
    .then((response) => response.json())
    .then((sizes) => {
      let rows = sizes.map((element) => createSizeTemplate(element));
      let table = $("#sizes tbody");
      table.append(rows);
    });
}

function fetchOrders() {
  fetch("http://127.0.0.1:5000/order/")
    .then((response) => response.json())
    .then((orders) => {
      let rows = orders.map((element) => createOrderTemplate(element));
      let table = $("#orders tbody");
      table.append(rows);
    });
}

function createOrderTemplate(order) {
  let template = $("#order-item-template")[0].innerHTML;
  return Mustache.render(template, order);
}

function createIngredientTemplate(ingredient) {
  let template = $("#ingredients-template")[0].innerHTML;
  return Mustache.render(template, ingredient);
}

function createBeverageTemplate(beverage) {
  let template = $("#beverages-template")[0].innerHTML;
  return Mustache.render(template, beverage);
}

function createSizeTemplate(size) {
  let template = $("#sizes-template")[0].innerHTML;
  return Mustache.render(template, size);
}

function loadInformation() {
  fetchIngredients();
  fetchBeverages();
  fetchOrderSizes();
  fetchOrders();
}

window.onload = loadInformation;
