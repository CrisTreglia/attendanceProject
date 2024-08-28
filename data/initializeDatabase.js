const  fs = require('fs');
const mongoose = require('mongoose');
const Student = require('../models/studentRecord');

//load student data from JSON file
async function loadStudentData(){
    return new Promise((resolve, reject) => {
        fs.readFile('students.json', 'utf-8', (err, data) => {
            resolve(JSON.parse(data));
        });
    });
}


//Initialize the Database
async function initializeDatabase(){
    try {
        const students = await loadStudentData();

        for(const student in students){
            const existingStudent = await Student.findOne({email: student.email});

            if(!existingStudent){
                await Student.create(student);
                console.log(`Student with email ${student.email} has been inserted`);
            } else {
                console.log(`Student with email ${student.email} already exists`);
            }
        }
    } catch (error) {
        
    }
}


module.exports = initializeDatabase;