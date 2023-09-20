const express = require('express');
const StudentAttandance = require('../models/student-attendance');
const Student = require('../models/students');
const VolunteerAttendance = require('../models/volunteer-attendance');
const User = require('../models/users');
const sequelize = require('../config/db');
const attendanceRoute = require('./attendance.route');
const authRoute = require('./auth.route');


const router = express.Router();

Student.hasMany(StudentAttandance, { foreignKey: 'student_id' });
StudentAttandance.belongsTo(Student, { foreignKey: 'student_id' });

User.hasMany(VolunteerAttendance, { foreignKey: 'user_id' });
VolunteerAttendance.belongsTo(User, { foreignKey: 'user_id' });

//set json parser to parse request body
router.use(express.json({ limit: '30mb', extended: true }));
router.use(express.urlencoded({ limit: '30mb', extended: true }));
router.use('/auth',authRoute);

router.use('/attendance',attendanceRoute);
//fetch student present , absent and total count in each std for given date
router.get('/student-attendance/:date', async (req, res) => {
    
    try {
        const { date } = req.params;
        //check if date exist in student-attendance table
        const dateExist = await StudentAttandance.findOne({
            where: {
                date,
            },
        });
        if (!dateExist) {
            return res.json([]);
        }
        //take total count of students in each std from students table , and count of present students from student-attendance table std wise
        const totalStudentCountStdWise = await sequelize.query('select std,count(*) as total from students group by std', {
            type: sequelize.QueryTypes.SELECT,
        });
        const presentStudentCountStdWise = await sequelize.query('select std,count(*) as present from `student-attendance` where date=:date group by std', {
            replacements: { date },
            type: sequelize.QueryTypes.SELECT,
        });
        //create an object having std , present , absent and total values for each std
        const response = totalStudentCountStdWise.map((item) => {
            const present = presentStudentCountStdWise.find((presentItem) => presentItem.std === item.std);
            const presentCount = present ? present.present : 0;
            return {
                std: item.std,
                present: presentCount,
                absent: item.total - presentCount,
                total: item.total,
            };
        }
        );
        res.json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
    
    
    
});
router.get('/student-attendance/:std/:date', async (req, res) => {
    try{

        const { std, date } = req.params;
        
        const studentAttendance = await StudentAttandance.findAll({
            where: {
            std,
            date,
            },
            include: {
                model: Student,
                attributes: ['name'],
            },
        });
        const response = studentAttendance.map((item) => {
            return {
                name: item.student.name,
                student_id: item.student_id,
            };
        }
        );
        res.json(response);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }

});

//get volunteer attendance for given date
//response: [{student_id, in_time, out_time, present , name, std,department,institute}]
router.get('/volunteer-attendance/:date', async (req, res) => {
    try{

        const { date } = req.params;
        const volunteerAttendance = await sequelize.query('select u.name as student_name , d.name as department,i.name as institute, u.student_id, in_time,out_time,std,present from `volunteer-attendance` inner join users u on u.id=user_id inner join departments d on d.id = u.department_id inner join institutes i on i.id=d.institute_id where date=:date', {
            replacements: { date },
            type: sequelize.QueryTypes.SELECT,
        });
        res.json(volunteerAttendance);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }


});

router.get('/volunteer-tasks/:date', async (req, res) => {
    try{

        const { date } = req.params;
        const volunteerTasks = await sequelize.query('select u.name as student_name,std,task from `volunteer-attendance` inner join users u on u.id=user_id where date=:date and present = 1', {
            replacements: { date },
            type: sequelize.QueryTypes.SELECT,
        });
        res.json(volunteerTasks);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }


});


//get all student attendance for given date with student name , std , student_id , present 

router.get('/student-attendance-all/:date', async (req, res) => {
    try{
            const { date } = req.params;
            const studentAttendance = await StudentAttandance.findAll({
                where: {
                date,
                },
                include: {
                    model: Student,
                    attributes: ['name'],
                },
            });
            const response = studentAttendance.map((item) => {
                return {
                    name: item.student.name,
                    student_id: item.student_id,
                    std: item.std,
                };
            }
            );
            res.json(response);
                
        }

    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
