
var table = document.getElementById('transactionTable');
var myButton = document.getElementById('myButton');


document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://jsonplaceholder.typicode.com";
  const transactionTable = document.getElementById("transactionTable");
  const searchInput = document.getElementById("searchInput");
  const chartContainer = document.getElementById("chartContainer");
  const transactionChart = document.getElementById("transactionChart").getContext('2d');

  let customers = [];
  let transactions = [];
  let chart;

  // Fetch customers and transactions
  const fetchData = async () => {
      try {
          const [customersResponse, transactionsResponse] = await Promise.all([
              fetch(`${apiUrl}/users`),
              fetch(`${apiUrl}/posts`)
          ]);

          customers = await customersResponse.json();
          transactions = await transactionsResponse.json();

          renderTable(transactions);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };

  // Render table
  const renderTable = (data) => {
      transactionTable.innerHTML = data.map(transaction => {
          const customer = customers.find(cust => cust.id === transaction.userId);
          return `
              <tr>
                  <td>${customer ? customer.name : 'Unknown'}</td>
                  <td>${Math.floor(Math.random() * 10000)}</td>
                  <td><button onclick="showChart(${transaction.userId})">View</button></td>
              </tr>
          `;
      }).join('');
  };

  // Filter table
  searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      const filteredTransactions = transactions.filter(transaction => {
          const customer = customers.find(cust => cust.id === transaction.userId);
          return (
              (customer && customer.name.toLowerCase().includes(value)) ||
              transaction.body.toLowerCase().includes(value)
          );
      });
      renderTable(filteredTransactions);
  });

  // Show chart
  window.showChart = (userId) => {
      const customerTransactions = transactions.filter(transaction => transaction.userId === userId);
      const labels = customerTransactions.map((_, index) => `Day ${index + 1}`);
      const data = customerTransactions.map(transaction => Math.floor(Math.random() * 1000));

      if (chart) {
          chart.destroy();
      }

      chart = new Chart(transactionChart, {
          type: 'line',
          data: {
              labels: labels,
              datasets: [{
                  label: 'Transactions',
                  data: data,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                  fill: false
              }]
          },
          options: {
              scales: {
                  x: {
                      beginAtZero: true
                  },
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });

      chartContainer.style.display = 'block';
      window.scrollTo(0, chartContainer.offsetTop);
  };

  fetchData();
});


function showChart() {
    var ctx = document.getElementById('transactionChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    if(display == 1){
      table.style.display = 'block';
      display = 0;

    }
    else{
      table.style.display = 'none';
      display = 1;
    }
}


document.querySelector('button').onclick = showChart;




