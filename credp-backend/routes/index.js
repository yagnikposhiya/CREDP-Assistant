const express = require('express');
const StudentAttandance = require('../models/student-attendance');
const Student = require('../models/students');
const VolunteerAttendance = require('../models/volunteer-attendance');
const User = require('../models/users');
const sequelize = require('../config/db');

const router = express.Router();

Student.hasMany(StudentAttandance, { foreignKey: 'student_id' });
StudentAttandance.belongsTo(Student, { foreignKey: 'student_id' });

User.hasMany(VolunteerAttendance, { foreignKey: 'user_id' });
VolunteerAttendance.belongsTo(User, { foreignKey: 'user_id' });

//fetch student present , absent and total count in each std for given date
router.get('/student-attendance/:date', async (req, res) => {
    
    try {
        const { date } = req.params;
        const studentAttendance = await sequelize.query('SELECT std, COUNT(*) AS total, SUM(present) AS present, SUM(!present) AS absent FROM `student-attendance` WHERE date = :date GROUP BY std', {
            replacements: { date },
            type: sequelize.QueryTypes.SELECT,
        });
        const response = studentAttendance.map((item) => {
            return {
                std: item.std,
                total: item.total,
                present: +item.present,
                absent: +item.absent,
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
                present: item.present?1:0,
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


module.exports = router;
