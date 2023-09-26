const express = require('express');
const sequelize = require('../config/db');
const router = express.Router();
const ejs = require('ejs');
router.get('/', (req, res) => {
    res.render('index');
});
router.get('/student', (req, res) => {
    // Render students.ejs
    res.render('student');
});
router.get('/student/:std', async (req, res) => {
    const std = req.params.std;
    //if attendance is already taken for today, redirect to show attendance
    const currentDate = new Date().toISOString().slice(0, 10);
    const sql = "SELECT * FROM `student-attendance` WHERE std = ? AND date = ?";    
    await sequelize.query(sql, { replacements: [std, currentDate], type: sequelize.QueryTypes.SELECT })
    .then(async (results) => {
        if (results.length > 0) {
            res.redirect(`/attendance/show?std=${std}&date=${currentDate}`);
        } else {
            //else render attendance.ejs

    const sql = `SELECT * FROM students WHERE std = ?`;
    await sequelize.query(sql, { replacements: [std], type: sequelize.QueryTypes.SELECT })
        .then((results) => {
            res.render('attendance', { students: results, std});
        }
        )
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Internal Server Error');
    });
});


router.post('/submit', async (req, res) => {
    
    const std = req.body.std;
    const currentDate = new Date().toISOString().slice(0, 10);
    const sql = "SELECT * FROM `student-attendance` WHERE std = ? AND date = ?";    
    await sequelize.query(sql, { replacements: [std, currentDate], type: sequelize.QueryTypes.SELECT })
    .then(async (results) => {
        if (results.length > 0) {
            res.redirect(`/attendance/show?std=${std}&date=${currentDate}`);
        } else {

    const attendanceData = req.body;

    // Remove std and _csrf fields from attendanceData
    delete attendanceData.std;
    delete attendanceData._csrf;

   

    for (const studentId in attendanceData) {
        const attendanceValue = attendanceData[studentId];
        if(attendanceValue === '1'){
        const sql = "INSERT INTO `student-attendance` (student_id,std,date) VALUES (?,?,?)";
        await sequelize.query(sql, { replacements: [studentId, std, currentDate], type: sequelize.QueryTypes.INSERT })
            .then((results) => {
              //  console.log(results);
            }
            )
            .catch((err) => {
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            );
        }
    }

    res.redirect(`/attendance/show?std=${std}&date=${currentDate}`);
        }
    })
});

router.get('/show', async (req, res) => {
    const currentDate = req.query.date 
    const std = req.query.std;

    const sql = " SELECT students.name, students.std FROM students JOIN `student-attendance` attendance ON students.id = attendance.student_id WHERE attendance.date = ? and students.std = ?";
    
    await sequelize.query(sql, { replacements: [currentDate, std], type: sequelize.QueryTypes.SELECT })
    .then(async (results) => {
// console.log(results)

        results = results.map((result) => {
            return {
                name: result.name,
                std: result.std,
            };
        });
        //give present and absent count and total count and append to results
        let presentCount = 0;
        let absentCount = 0;
        //fire a query to get total count 
        const sql = "SELECT COUNT(*) AS totalcount FROM students WHERE std = ?";
        await sequelize.query(sql, { replacements: [std], type: sequelize.QueryTypes.SELECT })
            .then((results) => {
                totalCount = results[0].totalcount;
            }
            )
            .catch((err) => {
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            );
            presentCount = results.length;
            absentCount = totalCount - presentCount;

        const counts = {
            presentcount : presentCount,
            absentcount:absentCount,
            totalcount:totalCount
        };

        res.render('showAttendance', { attendance: results , count:counts});
    });
});

router.get('/volunteer', async (req, res) => {

    //if attendance is already taken for today, redirect to show attendance
    const currentDate = new Date().toISOString().slice(0, 10);
    const sql = "SELECT * FROM `volunteer-attendance` WHERE date = ?";
    await sequelize.query(sql, { replacements: [currentDate], type: sequelize.QueryTypes.SELECT })
        .then(async (results) => {
            if (results.length > 0) {
                res.redirect(`/attendance/vshow?date=${currentDate}`);
            } else {
                //else render volunteer.ejs

    // Render volunteer.ejs
    const sql = `SELECT * FROM users WHERE student_id IS NOT NULL`;
    await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT })
        .then((results) => {
            res.render('volunteerattendance', { volunteers: results });
        }
        )
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        );
            }
        })

});

router.post('/vsubmit', async (req, res) => {

    const currentDate = new Date().toISOString().slice(0, 10);
    const sql = "SELECT * FROM `volunteer-attendance` WHERE date = ?";
    await sequelize.query(sql, { replacements: [currentDate], type: sequelize.QueryTypes.SELECT })
        .then(async (results) => {
            if (results.length > 0) {
                res.redirect(`/attendance/vshow?date=${currentDate}`);
            }
            else{

            
    const requestData = req.body;
    delete requestData._csrf;
     
  const volunteerData = [];
  
  // Iterate through the keys in requestData
  for (const key in requestData) {
    if (requestData.hasOwnProperty(key)) {
      // Split the key to extract volunteer ID and field name
      const [volunteerId, fieldName] = key.split('-');
      
      // Find or create a volunteer object based on the volunteer ID
      let volunteer = volunteerData.find(v => v.volunteer_id === parseInt(volunteerId));
      if (!volunteer) {
        volunteer = {
          volunteer_id: parseInt(volunteerId),
          present: 0,
          in_time: '',
          out_time: '',
          taught_std: 0,
          subject:'',
          chapter_no:0,
          topic:'',
        };
        volunteerData.push(volunteer);
      }
  
      // Update the volunteer object with the field value
      if (fieldName === 'present') {
        volunteer.present = parseInt(requestData[key]);
      } else if (fieldName === 'in_time') {
        volunteer.in_time = requestData[key]? requestData[key] : '';
      } else if (fieldName === 'out_time') {
        volunteer.out_time = requestData[key]? requestData[key] : '';
      } else if (fieldName === 'taught_std') {
        volunteer.taught_std = parseInt(requestData[key])? parseInt(requestData[key]) : 0;
      }
      else if(fieldName === 'subject'){
        volunteer.subject = requestData[key]?requestData[key] : '';
      }
      else if(fieldName === 'chapter_no'){
        volunteer.chapter_no = parseInt(requestData[key])? parseInt(requestData[key]) : 0;
      }
      else if(fieldName === 'topic'){
        volunteer.topic = requestData[key]?requestData[key] : '';
      }
    }
  }

    for (const volunteer of volunteerData) {
        const sql = "INSERT INTO `volunteer-attendance` (user_id,date, present, in_time, out_time, std,subject,chapter_no,topic) VALUES (?,?,?,?,?,?,?,?,?)";
        await sequelize.query(sql, { replacements: [volunteer.volunteer_id, currentDate, volunteer.present, volunteer.in_time, volunteer.out_time, volunteer.taught_std,volunteer.subject,volunteer.chapter_no,volunteer.topic], type: sequelize.QueryTypes.INSERT })
            .then((results) => {
            }
            )
            .catch((err) => {
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            );
    }

    res.redirect(`/attendance/vshow?date=${currentDate}`);
  
}
})
   
});

router.get('/vshow', async (req, res) => {
    const currentDate = req.query.date;
    const sql = "SELECT u.name , in_time,out_time,std,subject,chapter_no,topic,present FROM `volunteer-attendance` INNER JOIN users u ON u.id=user_id  WHERE date=?";
    await sequelize.query(sql, { replacements: [currentDate], type: sequelize.QueryTypes.SELECT })
        .then((results) => {
            res.render('volunteershowAttendance', { attendance: results });
        }
        )
        .catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        );
});



module.exports = router;
