import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/wrappers/wrappers.js';

import '../../ui/pages/stock/stock.js';
import '../../ui/pages/products/products.js';
import '../../ui/pages/product/product.js';
import '../../ui/pages/sales/sales.js';
import '../../ui/pages/sale/sale.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/stock', {
    name: 'stock',
    action() {
        BlazeLayout.render('App_body', { main: 'stock_page' });
    },
});

FlowRouter.route('/sale', {
    name: 'sale',
    action() {
        BlazeLayout.render('App_body', { main: 'sale_page' });
    },
});

FlowRouter.route('/sales', {
    name: 'sales',
    action() {
        BlazeLayout.render('App_body', { main: 'sales_page' });
    },
});

FlowRouter.route('/product', {
    name: 'product',
    action() {
        BlazeLayout.render('App_body', { main: 'product_page' });
    },
});

FlowRouter.route('/products', {
    name: 'products',
    action() {
        BlazeLayout.render('App_body', { main: 'products_page' });
    },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
