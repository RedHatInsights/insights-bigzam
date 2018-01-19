#!/bin/env/node
const express = require('express');
const http = require('http');
const path = require('path');
// const request = require('request');
const fs = require('fs');
const pugToHtml = require('./pugToHtml');

const config = require('./config');
const app = express();
const templateDir = path.join(config.appRoot, 'templates');
const publicDir = path.join(config.appRoot, 'public');
const scriptsDir = path.join(config.appRoot, 'scripts');

// app config
app.set('port', config.port);
app.use(express.static(publicDir));
app.use('/scripts', express.static(scriptsDir));

app.get('/reports/', (req, res) => {
    // request
    // .get('http://' + process.env.BIGZAM_API + '/reports/')
    // .pipe(res);
    fs.readFile(path.join(__dirname, 'test-reports.json'), (err, data) => {
        if (err) {
            res.status(500).send();
        }
        res.status(200).send(data);
    });
});

app.get('/reports/:id', (req, res) => {
    // request
    // .get('http://' + process.env.BIGZAM_API + '/reports/' + req.params.id)
    // .pipe(res);
    fs.readFile(path.join(__dirname, 'test-report.json'), (err, data) => {
        if (err) {
            res.status(500).send();
        }
        res.status(200).send(data.toString());
    });
});

app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: publicDir});
});

// initialize~
pugToHtml(templateDir, publicDir);
http.createServer(app).listen(app.get('port'), function () {
    console.log('Big Zam listening on port %d...', app.get('port'));
});

process.on('SIGINT', function() {
    process.exit();
});

