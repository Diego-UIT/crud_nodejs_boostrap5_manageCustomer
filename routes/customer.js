const express = require('express')
const router = express.Router()
const customerModel = require('../models/customer.model')

router.get('/', async(req, res) => {
    try {
        const customers = await customerModel.find()
        res.render('customers/list', {customers: customers})
    } catch(e) {
        console.log(e.message)
        res.redirect('/')
    }
})

router.post('/add', async(req, res) => {
    try {
        const cus = new customerModel({
            name: req.body.name,
            old: req.body.old
        })
        await cus.save()
        res.redirect('/customer/')
    } catch(e) {
        console.log(e.message)
        res.redirect('/')
    }
    res.render('customers/add')
})

router.get('/add', (req, res) => {
    res.render('customers/add')
})

router.delete('/delete/:id', async(req, res) => {
    try {
        await customerModel.findByIdAndDelete(req.params.id)
        res.redirect('/customer')
    }
    catch(e) {
        console.log(e.message)
        res.redirect('/')
    }
})

router.get('/edit/:id', async(req, res) => {
    try {
        const customer = await customerModel.findById(req.params.id)
        res.render('customers/edit', {customer, customer})
    }
    catch(e) {
        console.log(e)
        res.redirect('/')
    }
})

router.put('/edit/:id', async(req, res) => {
    try {
        const customer = await customerModel.findById(req.params.id)
        customer.name = req.body.name
        customer.old = req.body.old
        await customer.save()
        res.redirect('/customer')
    }
    catch(e) {
        console.log(e)
        res.redirect('/')
    }
})


module.exports = router