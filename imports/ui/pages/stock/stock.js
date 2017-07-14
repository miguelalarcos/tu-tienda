import './stock.html';
import '../../components/product/product.js';
import { Session } from 'meteor/session';
import { qConnect } from 'meteor/miguelalarcos:quick-search-form';

Template.stock_page.onCreated(function(){
    Session.set('stock.sort', {modifiedAt: -1, createdAt: -1});
    this.autorun(function(){
        qConnect('_product', 'product', (v)=>{ return {code: v.code} })
        //const v = Session.get('_product');
        //if(v)Session.set('product', {code: v.code});
    });
});

Template.stock_page.helpers({
    initial(){
        return {quantity: 1};
    },
    callback(){
        return (doc, input, dirty) => {
            Meteor.call('stock.add', doc, (err, result)=>{
                if(err){
                    console.log(err);
                }else {
                    //done();
                    $('#stock-enter').focus();
                    if (result && result.status === 'failed') {
                        const path = FlowRouter.path("product", {}, {code: result.data, redirect: 'stock'});
                        FlowRouter.go(path);
                    }
                }
            });
        }
    },
    listCallback(){
        return (doc)=>{
            const path = FlowRouter.path("product", {}, {_id: doc._id, redirect: 'stock'});
            FlowRouter.go(path);
        }
    }
});
