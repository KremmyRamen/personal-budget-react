import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import * as d3 from 'd3'; 

let myChart = null; // Declare a variable to hold the chart instance
let d3Chart = null; // Declare a variable to hold the D3.js chart instance

function HomePage() {
    const [chartData, setChartData] = useState(null);
    const [d3Data, setD3Data] = useState(null);

    useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
        try {
            const chartResponse = await axios.get('http://localhost:3001/data');
            const d3Response = await axios.get('http://localhost:3001/d3-data');
            
            setChartData(chartResponse.data);
            setD3Data(d3Response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (chartData) {
            renderChart(chartData);
        }
    }, [chartData]);
    
    useEffect(() => {
        if (d3Data) {
            renderD3Chart(d3Data);
        }
    }, [d3Data]);


    const renderChart = (data) => {
        if (myChart) {
            myChart.destroy(); // Destroy the previous chart instance if it exists
        }

        const ctx = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: data.datasets[0].label,
                    data: data.datasets[0].data,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
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
    };

    const renderD3Chart = (data) => {
        if (d3Chart) {
            d3Chart.selectAll('*').remove();
        }

        // Example D3.js code to render a simple bar chart
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 400 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
    
        const svg = d3.select('#d3Chart')
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
        const x = d3.scaleBand()
          .range([0, width])
          .padding(0.1)
          .domain(data.map((d) => d.label));
    
        const y = d3.scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(data, (d) => d.value)]);
    
        svg.append('g')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(x));
    
        svg.append('g')
          .call(d3.axisLeft(y));
    
        svg.selectAll('.bar')
          .data(data)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => x(d.label))
          .attr('width', x.bandwidth())
          .attr('y', (d) => y(d.value))
          .attr('height', (d) => height - y(d.value));

        d3Chart = svg; // Assign the D3.js chart instance to the variable
    };

    
      return (
        <main className="center" id="main">
            <div className="page-area">
                <article>
                    <h1>Stay on track</h1>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </article>
                <article>
                    <h1>Alerts</h1>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </article>
                <article>
                    <h1>Results</h1>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they expend without guilt or fear... 
                        because they know it is all good and accounted for.
                    </p>
                </article>
                <article>
                    <h1>Free</h1>
                    <p>
                        This app is free!!! And you are the only one holding your data!
                    </p>
                </article>
                <article>
                    <h1>Chart</h1>
                    <p>
                        <canvas id="myChart" width="400" height="400"></canvas>
                    </p>
                    <div id="d3Chart"></div> {/* Container for D3.js chart */}
                </article>
            </div>
        </main>
    );
}

export default HomePage;
