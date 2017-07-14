import { Meteor } from 'meteor/meteor';
import { Sale, SaleSchema, LineSchema } from '/imports/api/sale/sale.js';
import { Product } from '/imports/api/product/product.js';
import { isValid, save } from 'meteor/miguelalarcos:quick-search-form';

Meteor.methods({
    'sale.new'(doc){
        //doc.owner = Meteor.userId();
        doc.date = new Date();
        doc.lines = [];
        if(isValid(doc, SaleSchema)){
            return Sale.insert(doc);
        }
    },
    'line.add'(doc){
        const storedDoc = Product.findOne({code: doc.code}); //, owner: Meteor.userId()});
        if(storedDoc){ // && storedDoc.quantity > 0) {
            doc.name = storedDoc.name;
            doc.price = storedDoc.price;
            if(isValid(doc, LineSchema)){
                Product.update(storedDoc._id, {$set:{lastUpdated: new Date()}, $inc: {stock: -doc.quantity}});
                const saleId = doc.saleId;
                delete doc.saleId;
                const ret = Sale.update({_id: saleId, 'lines.code': doc.code}, {$inc: {'lines.$.quantity': doc.quantity}});
                if(ret === 0){
                    Sale.update(saleId, {$push: {lines: doc}});
                }
            }
        }
        else{
            return {status: 'failed', code: doc.code};
        }
    },
    'line.remove'(doc){
        const storedDoc = Product.findOne({code: doc.code}); //, owner: Meteor.userId()});
        if(storedDoc) {
            //doc.name = storedDoc.name;
            //doc.price = storedDoc.price;
            if(isValid(doc, LineSchema)){
                Product.update(storedDoc._id, {$set:{lastUpdated: new Date()}, $inc: {stock: doc.quantity}});
                const saleId = doc.saleId;
                delete doc.saleId;
                Sale.update(saleId, {$pull: {lines: doc}});
            }
        }
        else{
            return {status: 'failed', code: doc.code};
        }
    }
});