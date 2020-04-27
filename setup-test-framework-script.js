const chai = require('chai');
const chaiExclude = require('chai-exclude');
const mongoose = require('./models/mongoose');
const supertest = require('supertest');
const app = require('./app');
const api = supertest(app);

chai.use(chaiExclude);

global.chaiExpect = chai.expect;

global.mongoose = mongoose;
global.api = api;