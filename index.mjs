import express from 'express';
import {
    fileURLToPath
} from 'url';
import {
    dirname
} from 'path';
import hbs from "hbs";
import path from 'path';
import bodyParser from "body-parser";
import {calculateDate} from 'calculating-date';

// const calculated = require("calculating-date");

// import db from "./connection/db.mjs";

// const express = require('express');


const __filename = fileURLToPath(
    import.meta.url);
// Result dari __filename = C:\Users\yadi\Documents\Javascript\NodeJs\index.mjs

const __dirname = dirname(__filename);
// Result dari __dirname = C:\Users\yadi\Documents\Javascript\NodeJs\

const app = express();


// Atur template engine
app.set('view engine', 'hbs');

//  Gunakan static folder
app.use('/public', express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: true
})
);

// Register partials to handlebars
hbs.registerPartials(path.join(__dirname, '/views/partials'));
// Result dari path.join(__dirname, '/views/partials') = C:\Users\yadi\Documents\Javascript\NodeJs\views\partials


// Register own helper to hbs
hbs.registerHelper('isTrue', function (con, title) {
    return con === title; 
});


const blogs = [{
    date: {
    day: '26 Day',
    month: '6 Month',
    year: '1 Year' },
    formInput: {
        inputName: 'sadasdasd',
        inputStartDate: '2022-03-31',
        inputEndDate: '2023-10-18',
        inputDescription: 'sadasdas',
        nodeJsTechnology: 'on',
        reactJsTechnology: 'on',
        nextJsTechnology: 'on',
        typeScriptTechnology: 'on',
        inputFile: 'Muehehehe.jpg'
    }
}]


app.get('/', function (req, res) {
    let query = 
    res.render('index', {
        title: "Home",
        blogs
    });
});


app.get('/contact', function (req, res) {
    res.render('contact', {
        title: "Contact"
    });
});

app.get('/project', function (req, res) {
    res.render('project', {
        title: "Project"
    });
});

app.post('/project', function (req, res){
    let startDate = req.body.inputStartDate;
    let endDate = req.body.inputEndDate;
    let calculated =  calculateDate(startDate, endDate)[0];
    const data = {
        date        : {
            day: calculated.dayDiff,
            month: calculated.monthDiff,
            year: calculated.yearDiff
        },
        formInput   : req.body
    }


    blogs.push(data);
    res.redirect('/');
});


app.get('/detail-project/:id', function (req, res) {
    const updatedId = req.params.id;
    let getData = [blogs[updatedId]];
    res.render('project-detail', {
        title: "Project Detail",
        getData
    })
});

app.get('/update/:id', function (req, res){
    const updatedId = req.params.id;
    const getData = blogs[updatedId];
    res.render('project-update', {getData,updatedId});
});
app.post('/update/:id', function (req, res){
    const updatedId = req.params.id;

    // UPDATING DATA
    [blogs[updatedId]].map(m => {
        m.formInput.inputName= req.body.inputName,
        m.formInput.inputStartDate= req.body.inputStartDate,
        m.formInput.inputEndDate= req.body.inputEndDate,
        m.formInput.inputDescription= req.body.inputDescription,
        m.formInput.nodeJsTechnology= req.body.nodeJsTechnology,
        m.formInput.reactJsTechnology= req.body.reactJsTechnology,
        m.formInput.nextJsTechnology= req.body.nextJsTechnology,
        m.formInput.typeScriptTechnology= req.body.typeScriptTechnology,
        m.formInput.inputFile= req.body.inputFile
    });
    res.redirect('/');
});
app.get('/delete/:id', function (req, res){
    const deletedId = req.params.id;
    blogs.splice(deletedId, 1);
    res.redirect('/#myproject');
});

const port = 5000;
app.listen(port, function () {
    console.log(`Server running on port : ${port}`);
});

