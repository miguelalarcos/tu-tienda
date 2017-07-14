import './product.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { qList, qForm, integer, float } from 'meteor/miguelalarcos:quick-search-form';
import { Product, ProductSchema, ProductSearchSchema, AddStockSchema } from '/imports/api/product/product.js';
import { Session } from 'meteor/session';

qForm(Template.product_search, {schema: ProductSearchSchema});
qForm(Template.product_form, {subs: 'product._id', collection: Product, schema: ProductSchema, integer, float});
qList(Template.product_list, {subs: 'products', schema: ProductSchema, collection: Product});

qForm(Template.add_stock, {schema: AddStockSchema, integer});

Template.add_stock.onRendered(function(){
    $('#stock-enter').focus();
});

qList(Template.list_stock_today, {subs: 'stock_today', schema: {}, collection: Product});