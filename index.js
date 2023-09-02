const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an Express application
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)

// Connect to MongoDB (replace 'your-database-uri' with your MongoDB connection URI)
mongoose.connect("mongodb+srv://jagdtri2003:zsL5bsh1uWIqu6Hx@cluster0.tcqpxnn.mongodb.net/Fotogram?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Define routes
app.use('/api', require('./routes/api')); // Example user routes

app.get('/',(req,res)=>{
    res.send("Hello World");
})



// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
