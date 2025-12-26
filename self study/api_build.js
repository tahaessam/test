//! crud : create read update delete 
// npm init -y : Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser


import express from 'express';
// const express = require("express")

import bodyParser from 'body-parser';
const app =express();
const port =5000;
app.use(bodyParser.json());
app.listen(port,()=>console.log(`server is running on port ${port}`))
