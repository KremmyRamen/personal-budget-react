const express = require('express');
const app = express();
const port = 3001; 

// Middleware to enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the GET, POST, PUT, DELETE methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Example route to serve chart data
app.get('/data', (req, res) => {
    // Example chart data
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
            label: 'Sales',
            data: [50, 70, 40, 60, 80],
        }]
    };

    res.json(chartData); // Send the chart data as JSON response
});


// Example route to serve D3JS data
app.get('/d3-data', (req, res) => {
    // Example D3JS data
    const d3Data = [
        { label: 'January', value: 50 },
        { label: 'February', value: 70 },
        { label: 'March', value: 40 },
        { label: 'April', value: 60 },
        { label: 'May', value: 80 },
    ];

    res.json(d3Data); // Send the D3JS data as JSON response
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});