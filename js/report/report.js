async function fetchIngredientReport() {
  const response = await fetch("http://127.0.0.1:5000/report/ingredient", {
    method: "GET",
  });
  drawPieChart(await response.json());
}

var responsea = {};

let orderForm = $("#order-form");
orderForm.submit((event) => {
  fetchIngredientReport();

  event.preventDefault();
  event.currentTarget.reset();
});

let chart;

function drawPieChart(data) {
  if (chart) {
    chart.destroy();
  }
  chart = new Chart(document.getElementById("pie-chart"), {
    type: "pie",
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          data: Object.values(data),
        },
      ],
    },
    plugins: [ChartDataLabels],
    options: {
      plugins: {
        datalabels: {
          anchor: "center",
          labels: {
            name: {
              formatter: function (value, ctx) {
                return ctx.active
                  ? ctx.chart.data.labels[ctx.datalabels]
                  : ctx.chart.data.labels[ctx.dataIndex];
              },
            },
          },
        },
      },
    },
  });
}
