const express = require('express')
const route = express.Router()
const bcrypt = require('bcryptjs')

const db = require('../models')
const Users = db.Users


