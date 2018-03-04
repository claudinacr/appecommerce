const express = require('express');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');
let bodyParser = require('body-parser');
var datag;

paypal.configure({
  'mode': 'sandbox', // sandbox or live
  'client_id': 'AV2xxcY9HZsUzWdDciHJAjxh10-NtzY51_96Sd6dIoa1QoPWAyuv0UTxe4x1A3Pp4uKaEccNV6GQQq_R',
  'client_secret': 'EIiAP4JrJVAyFdmzCo_Hucw-gnB9FZb2eDsLeqryxrNzTCtPTPRZ6IgHD1naPRXrdp9xh3jCJhcHeXjE'
});
  
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
  
app.get('/', (req, res) => res.render('index'));
  
app.post('/pay', (req, res) => {
  datag = req.body.total;
  console.log(datag);

      
  const create_payment_json = {
    'intent': 'sale',
    'payer': {
      'payment_method': 'paypal'
    },
    'redirect_urls': {
      'return_url': 'http://localhost:3000/success',
      'cancel_url': 'http://localhost:3000/cancel'
    },
    'transactions': [{
      'item_list': {
        'items': [{
          'name': 'Red Sox Hat',
          'sku': '001',
          'price': datag,
          'currency': 'USD',
          'quantity': 1
        }]
      },
      'amount': {
        'currency': 'USD',
        'total': datag,
      },
      'description': 'Hat for the best team ever'
    }]
  };
  //   create_payment_json.transactions.amount.total = datag;
  paypal.payment.create(create_payment_json, function(error, payment) {
    console.log(create_payment_json.transactions);
    if (error) {
      throw error;
    } else {
      for (let i = 0;i < payment.links.length;i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});
  
app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  console.log('o', datag);
  
  const execute_payment_json = {
    'payer_id': payerId,
    'transactions': [{
      'amount': {
        'currency': 'USD',
        'total': datag,
      }
    }]
  };
  
  paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {
    console.log(error);
      
    if (error) {
      //   console.log(error.response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));
      res.send('Success');
    }
  });
});
  
app.get('/cancel', (req, res) => res.send('Cancelled'));
  
app.listen(3000, () => console.log('Server Started'));
