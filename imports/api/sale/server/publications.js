import { Meteor } from 'meteor/meteor';
import { Sale } from '/imports/api/sale/sale.js';
import moment from 'moment';

Meteor.publish('sales_today', function(q){
    const today = moment().startOf('day').toDate();
    const tomorrow = moment().startOf('day').add(1, 'day').toDate();
    return Sale.find({date: {$gte: today, $lt: tomorrow}});//owner
});

Meteor.publish('sale._id', function(_id){
   console.log(_id);
   return Sale.find({_id});
});