import { Meteor } from 'meteor/meteor';
import { Product, ProductSchema, AddStockSchema } from '/imports/api/product/product.js';
import { isValid, save } from 'meteor/miguelalarcos:quick-search-form';

Meteor.methods({
    'stock.add'(doc){
        if(isValid(doc, AddStockSchema)) {
            const storedDoc = Product.findOne({code: doc.code});
            if (storedDoc) {
                Security.can(Meteor.userId()).update(storedDoc._id).for(Product).throw();
                Product.update(storedDoc._id, {$inc: {stock: doc.quantity}});
            }
            else {
                return {status: 'failed', data: doc.code};
            }
        }
    },
    'product.save'(doc){
        if(doc._id) {
            Security.can(Meteor.userId()).update(doc._id).for(Product).throw();
        }
        return save(doc, Product, ProductSchema);
    }
});