const Excel = require('exceljs');

const createOrdersExcel = async (orders, res) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  worksheet.columns = [
    { header: 'Order_id', key: 'order_id', width: 20 },
    { header: 'Amount', key: 'amount', width: 20 },
    { header: 'Shipping Cost', key: 'shipping_cost', width: 20 },
    { header: 'Tax', key: 'tax', width: 20 },
    { header: 'Total Amount', key: 'total_amount', width: 20 },
    { header: 'Order Date', key: 'ordered_on', width: 20 },
    { header: 'Delivered Date', key: 'delivered_on', width: 20 },
    { header: 'Instructions', key: 'instructions', width: 20 },
    { header: 'Product', key: 'product_name', width: 20 },
    { header: 'Trim', key: 'trim_name', width: 20 },
    { header: 'Order Status', key: 'orders_status', width: 20 },
    { header: 'Address 1', key: 'address_line_1', width: 20 },
    { header: 'Address 2', key: 'address_line_2', width: 20 },
    { header: 'landmark', key: 'landmark', width: 20 },
    { header: 'Pincode', key: 'pincode', width: 20 },
    { header: 'City', key: 'city', width: 20 },
    { header: 'State', key: 'state', width: 20 },
    { header: 'Patient Name', key: 'patient_name', width: 20 },
    { header: 'Patient Mobile', key: 'patient_mobile', width: 20 },
    { header: 'User Name', key: 'user_name', width: 20 },
    { header: 'User Email', key: 'user_email', width: 20 },
    { header: 'User Mobile', key: 'user_mobile', width: 20 },
    { header: 'Prefix', key: 'prefix', width: 20 },
    { header: 'Min', key: 'min', width: 20 },
    { header: 'Max', key: 'max', width: 20 },
    { header: 'Aligner', key: 'aligner', width: 20 },
    { header: 'Brand', key: 'brand', width: 20 },
    { header: 'Model', key: 'model', width: 20 },
  ];

  for (const order of orders) {
    if (order.order_details.length > 0) {
      worksheet.addRow({
        order_id: `#QC${order.order_id}`,
        amount: order.amount,
        shipping_cost: order.shipping_cost,
        tax: order.tax,
        total_amount: order.total_amount,
        ordered_on: order.ordered_on,
        delivered_on:
          order.delivered_on === null ? 'Not Delivered' : order.delivered_on,
        instructions: order.instructions,
        product_name: order.product_name,
        trim_name: order.trim_name,
        orders_status: order.orders_status,
        address_line_1: order.address_line_1,
        address_line_2: order.address_line_2,
        landmark: order.landmark,
        pincode: order.pincode,
        city: order.city,
        state: order.state,
        patient_name: order.patient_name,
        patient_mobile: order.patient_mobile,
        user_name: order.user_name,
        user_email: order.user_email,
        user_mobile: order.user_mobile,
        min: order.order_details[0].min,
        max: order.order_details[0].max,
        prefix: order.order_details[0].prefix,
        aligner: order.aligner_type_name,
        brand: order.brand_name,
        model: order.model_type_name,
      });

      if (order.order_details.length > 1) {
        for (let details = 1; details < order.order_details.length; details++) {
          worksheet.addRow({
            min: order.order_details[details].min,
            max: order.order_details[details].max,
            prefix: order.order_details[details].prefix,
            aligner: order.aligner_type_name,
            brand: order.brand_name,
            model: order.model_type_name,
          });
        }
      }
    }

    worksheet.addRow();
  }

  worksheet.getRow(1).font = { bold: true };

  sendWorkbook(workbook, res, 'orders.xlsx')
    .then(() => {
      console.info(`${new Date()} Orders Excel Download Successfully`);
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const sendWorkbook = async (workbook, response, fileName) => {
  response.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  );

  response.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

  await workbook.xlsx.write(response);
};

module.exports = { createOrdersExcel, sendWorkbook };
