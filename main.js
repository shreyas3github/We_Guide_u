const express = require('express');
const path = require('path');

const app = express();

// Middleware to parse form data (if using POST method)
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// Page 1: Render the first page
app.get('/', (req, res) => {
  res.render('page1'); // Render page1.ejs
});

// Page 2: Handle submission from page1 and render page2
app.post('/page2', (req, res) => {
  console.log(req.body); // Log form data for debugging
  res.render('page2'); // Render page2.ejs
});

// Route to render Page 3 (form)
app.get('/page3', (req, res) => {
    res.render('page3'); // Render the form page
  });
  
  // Route to handle form submission
  app.post('/submit-form', (req, res) => {
    const { name, email, phone } = req.body;
  
    // Process the submitted form data (e.g., save to database)
    console.log(`Name: ${name}, Email: ${email}, Phone: ${phone}`);
  
    // Send a success response or redirect
    res.send(`<h1>Thank you for submitting, ${name}!</h1>`);
  });

// Page 4: Handle submission from page3 and render page4
app.get('/page4', (req, res) => {
    res.render('page4'); // Render page4.ejs
  });

  

// Start the server
const PORT = 3000; // You can change the port if needed
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
