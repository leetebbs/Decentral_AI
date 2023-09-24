const express = require('express');
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();


//parser for body data
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use('/openai', require('./routes/openaiRoutes'));

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/generateimage', (req, res) => {
    const { prompt, size } = req.body;
    const imageSize =
      size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";
    try {
      const response = await openai.images.generate({
        prompt,
        n: 1,
        size: imageSize,
      });
  
      const imageUrl = response.data[0].url;
  
      res.status(200).json({
        success: true,
        data: imageUrl,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: "Image could not be generated",
      });
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
})



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})  