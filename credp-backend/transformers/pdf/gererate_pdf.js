const path = require('path');
const ejs = require('ejs');

const generatePdf = async (orderData, res) => {
  ejs.renderFile(
    path.join(__dirname, '../', '../helper/invoices/order_invoice.ejs'),
    {
      orderData,
    },
    async (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // create pdf using html-pdf package and send it in response
        const options = {
          format: 'A4',
          height: '1286px',
          width: '909px',
          margin: {
            top: '0.5in',
            right: '0.5in',
            bottom: '0.5in',
            left: '0.5in',
          },
        };

        pdf.create(data, options).toBuffer((error, buffer) => {
          if (error) {
            console.error(error);
          } else {
            res.setHeader('Content-type', 'application/pdf');
            res.setHeader(
              'Content-Disposition',
              'inline; filename="invoice.pdf"',
            );
            res.status(200).send(buffer);
          }
        });
      }
    },
  );
};

module.exports = { generatePdf };
