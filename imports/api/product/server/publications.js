import { Meteor } from 'meteor/meteor';
import { Product, ProductSearchSchema } from '/imports/api/product/product.js';
import moment from 'moment';
import { isValid, queryJSON2Mongo } from 'meteor/miguelalarcos:quick-search-form';

Meteor.publish('stock_today', function(q){
    const today = moment().startOf('day').toDate();
    const tomorrow = moment().startOf('day').add(1, 'day').toDate();
    return Product.find({});
    //return Product.find({$or: [{createdAt: {$gte: today, $lt: tomorrow}}, {updatedAt: {$gte: today, $lt: tomorrow}}]});
});

Meteor.publish('product._id', function(_id){
   return Product.find({_id});
});

Meteor.publish('products', function(query){
    if(!isValid(query, ProductSearchSchema)){
        this.error(Meteor.Error("productsPublishError", 'query is not valid.'));
    }
    query = queryJSON2Mongo(query, ProductSearchSchema);
    return Product.find(query);
});