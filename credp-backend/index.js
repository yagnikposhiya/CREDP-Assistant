const app = require('./server');
const {sequelize} = require('./config/db');
require('./routes/index');




const PORT = process.env.PORT || 6000;

app.listen(PORT, async () => {
    console.log(`Server running on port: ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
