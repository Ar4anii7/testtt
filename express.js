const express = require('express');  
const path = require('path');  
const mongoose = require('mongoose');  

const app = express();  

// Middleware برای پردازش داده‌های JSON و URL-encoded  
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));  

// مسیر اصلی  
app.get('/', (req, res) => {  
    res.sendFile(path.join(__dirname, 'user.html'));  
});  

// اتصال به MongoDB  
mongoose.connect('mongodb://localhost/project', { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 20000 })
    .then(() => console.log('Connected to MongoDB'))  
    .catch(err => console.error('Could not connect to MongoDB...', err));  

// تعریف و مدل کاربر  
const User = mongoose.model('User', new mongoose.Schema({  
    name: String,  
    password: String  ,
    email: String,  
    
}));  

// مسیر برای افزودن کاربر  
app.post('/users', async (req, res) => {  
    try {  
        const user = new User(req.body);  
        await user.save();  
        res.status(201).send('User created successfully');  
    } catch (err) {  
        res.status(400).send('Error creating user: ' + err.message);  
    }  
});  

app.post('/user', async (req, res) => {  
    const { name, email, password } = req.body;  

    // اعتبارسنجی اطلاعات وارد شده  
    if (!name) {  
        return res.status(400).send('Name is required');  
    }  
    if (!email) {  
        return res.status(400).send('Email is required');  
    }  
    if (!password) {  
        return res.status(400).send('Password is required');  
    }  

    try {  
        const user = new User({  
            name: name,  
            email: email,  
            password: password  
        });  
        await user.save();  
        res.status(201).send('User created successfully');  
    } catch (err) {  
        res.status(400).send('Error creating user: ' + err.message);  
    }  
});

// راه‌اندازی سرور  
const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {  
    console.log(`Server is running on port ${PORT}`);  
});
  
