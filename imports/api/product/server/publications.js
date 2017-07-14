import { Meteor } from 'meteor/meteor';
import { Product } from '/imports/api/product/product.js';
import moment from 'moment';

Meteor.publish('stock_today', function(q){
    const today = moment().startOf('day').toDate();
    const tomorrow = moment().startOf('day').add(1, 'day').toDate();

    return Product.find({$or: [{createdAt: {$gte: today, $lt: tomorrow}}, {updatedAt: {$gte: today, $lt: tomorrow}}]});
});

Meteor.publish('product._id', function(_id){
   return Product.find({_id});
});