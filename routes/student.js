const express = require('express')
const router = express.Router()
const studentModel = require('../models/student.model')

router.get('/', async(req, res) => {
    try {
        const students = await studentModel.find()
        res.render('students/list', {students: students})
    } catch(e) {
        console.log(e.message)
        res.redirect('/')
    }
})

router.post('/add', async(req, res) => {
    try {
        const student = new studentModel({
            email: req.body.email,
            name: req.body.name,
            old: req.body.old
        })
        await student.save()
        res.redirect('/student/')
    } catch(e) {
        console.log(e.message)
        res.redirect('/')
    }
    res.render('students/add')
})

router.get('/add', (req, res) => {
    res.render('students/add')
})

router.delete('/delete/:id', async(req, res) => {
    try {
        await studentModel.findByIdAndDelete(req.params.id)
        res.redirect('/student')
    }
    catch(e) {
        console.log(e.message)
        res.redirect('/')
    }
})

router.get('/edit/:id', async(req, res) => {
    try {
        const student = await studentModel.findById(req.params.id)
        res.render('students/edit', {student, student})
    }
    catch(e) {
        console.log(e)
        res.redirect('/')
    }
})

router.put('/edit/:id', async(req, res) => {
    try {
        const student = await studentModel.findById(req.params.id)
        student.email = req.body.email
        student.name = req.body.name
        student.old = req.body.old
        await student.save()
        res.redirect('/student')
    }
    catch(e) {
        console.log(e)
        res.redirect('/')
    }
})

module.exports = router