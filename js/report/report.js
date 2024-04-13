async function fetchIngredientReport() {
  const response = await fetch("http://127.0.0.1:5000/report/ingredient", {
    method: "GET",
  });
  drawBarChart(await response.json());
}

async function fetchMonthReport() {
  const response = await fetch("http://127.0.0.1:5000/report/month", {
    method: "GET",
  });
  drawLineChart(await response.json());
}

async function fetchClientReport() {
  const response = await fetch("http://127.0.0.1:5000/report/client", {
    method: "GET",
  });
  drawClientBarChart(await response.json());
}

let orderForm = $("#order-form");
orderForm.submit((event) => {
  fetchIngredientReport();
  fetchMonthReport();
  fetchClientReport();

  event.preventDefault();
  event.currentTarget.reset();
});

function orderDataByNumber(data){
  var items = Object.keys(data).map(function(key) {
    return [key, data[key]];
  });

  items.sort(function(first, second) {
    return second[1] - first[1];
  })

  return items.slice(0, 15);
}

function orderDatabyMonth(data){
  const ordered_dates = {};
  Object.keys(data).sort(function(a, b) {
    return moment(a, 'MMMM YYYY').toDate() - moment(b, 'MMMM YYYY').toDate();
  }).forEach(function(key){
    ordered_dates[key] = data[key];
  });

  return ordered_dates;
}

let ingredientBarChart;
let monthLineChart;
let clientBarChart;

function drawBarChart(data) {
  data = orderDataByNumber(data);
  data = Object.fromEntries(data);
  if (ingredientBarChart) {
    ingredientBarChart.destroy();
  }
  ingredientBarChart = new Chart(document.getElementById("ingredient-bar-chart"), {
    type: "bar",
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          label: '# of times requested',
          data: Object.values(data),
        },
      ],
    },
    plugins: [ChartDataLabels],
    options: {
      plugins: {
        datalabels: {
          anchor: "center",
        },
      },
      indexAxis: 'y',
    },
  });
}

function drawLineChart(data){
  data = orderDatabyMonth(data);
  if (monthLineChart) {
    monthLineChart.destroy();
  }
  monthLineChart = new Chart(document.getElementById("month-line-chart"), {
    type: "line",
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          label: 'Revenue (in USD)',
          data: Object.values(data),
        },
      ],
    },
    plugins: [ChartDataLabels],
    options: {
      plugins: {
        datalabels: {
          anchor: "center",
        },
      },
    },
  });
}

function drawClientBarChart(data){
  data = orderDataByNumber(data);
  data = Object.fromEntries(data);
  if (clientBarChart) {
    clientBarChart.destroy();
  }
  clientBarChart = new Chart(document.getElementById("client-bar-chart"), {
    type: "bar",
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          label: 'Revenue (in USD)',
          data: Object.values(data),
        },
      ],
    },
    plugins: [ChartDataLabels],
    options: {
      plugins: {
        datalabels: {
          anchor: "center",
        },
      },
      indexAxis: 'y',
    },
  });
}
