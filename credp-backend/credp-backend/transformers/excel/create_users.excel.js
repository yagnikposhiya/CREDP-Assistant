const Excel = require('exceljs');
const { sendWorkbook } = require('./create_orders.excel');

const createUsersExcel = async (users, res) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  worksheet.columns = [
    { header: 'Id', key: 'user_id', width: 20 },
    { header: 'User Name', key: 'user_name', width: 20 },
    { header: 'User Email', key: 'user_email', width: 20 },
    { header: 'User Mobile', key: 'user_mobile', width: 20 },
    { header: 'Payment Method', key: 'payment_method', width: 20 },
    { header: 'GST number', key: 'gst_number', width: 20 },
    { header: 'Brand Name', key: 'brand_name', width: 20 },
    { header: 'Brand Price', key: 'brand_price', width: 20 },
    { header: 'Model Name', key: 'model_name', width: 20 },
    { header: 'Model Price', key: 'model_price', width: 20 },
  ];

  for (const user of users) {
    if (user.brand_pricing !== null && user.model_pricing !== null) {
      worksheet.addRow({
        user_id: user.user_id,
        user_name: user.user_name,
        user_email: user.user_email,
        user_mobile: user.user_mobile,
        payment_method: user.payment_method,
        gst_number: user.gst_number,
        brand_name: user.brand_pricing[0].name,
        brand_price: user.brand_pricing[0].price,
        model_name: user.model_pricing[0].name,
        model_price: user.model_pricing[0].price,
      });

      if (user.brand_pricing.length > 1) {
        for (let brand = 1; brand < user.brand_pricing.length; brand++) {
          worksheet.addRow({
            brand_name: user.brand_pricing[brand].name,
            brand_price: user.brand_pricing[brand].price,
          });
        }
      }

      if (user.model_pricing.length > 1) {
        for (let model = 1; model < user.model_pricing.length; model++) {
          worksheet.addRow({
            model_name: user.model_pricing[model].name,
            model_price: user.model_pricing[model].price,
          });
        }
      }
    } else if (user.brand_pricing === null && user.model_pricing === null) {
      worksheet.addRow({
        user_id: user.user_id,
        user_name: user.user_name,
        user_email: user.user_email,
        user_mobile: user.user_mobile,
        payment_method: user.payment_method,
        gst_number: user.gst_number,
      });
    } else if (user.brand_pricing !== null) {
      worksheet.addRow({
        user_id: user.user_id,
        user_name: user.user_name,
        user_email: user.user_email,
        user_mobile: user.user_mobile,
        payment_method: user.payment_method,
        gst_number: user.gst_number,
        brand_name: user.brand_pricing[0].name,
        brand_price: user.brand_pricing[0].price,
      });

      if (user.brand_pricing.length > 1) {
        for (let brand = 1; brand < user.brand_pricing.length; brand++) {
          worksheet.addRow({
            brand_name: user.brand_pricing[brand].name,
            brand_price: user.brand_pricing[brand].price,
          });
        }
      }
    } else if (user.model_pricing !== null) {
      worksheet.addRow({
        user_id: user.user_id,
        user_name: user.user_name,
        user_email: user.user_email,
        user_mobile: user.user_mobile,
        payment_method: user.payment_method,
        gst_number: user.gst_number,
        model_name: user.model_pricing[0].name,
        model_price: user.model_pricing[0].price,
      });

      if (user.model_pricing.length > 1) {
        for (let model = 1; model < user.model_pricing.length; model++) {
          worksheet.addRow({
            model_name: user.model_pricing[model].name,
            model_price: user.model_pricing[model].price,
          });
        }
      }
    }

    worksheet.addRow();
  }

  worksheet.getRow(1).font = { bold: true };

  sendWorkbook(workbook, res, 'users.xlsx')
    .then(() => {
      console.info(`${new Date()} Users Excel Download Successfully`);
    })
    .catch((err) => {
      console.error(err.message);
    });
};

module.exports = { createUsersExcel };
