import './stock.html';
import '../../components/product/product.js';
import { Session } from 'meteor/session';
import { qConnect } from 'meteor/miguelalarcos:quick-search-form';

Template.stock_page.onCreated(function(){
    this.autorun(function(){
        qConnect('code', 'product', (v)=>{ return {code: v.code} })
    });
});
Template.stock_page.onCreated(function(){
    Session.set('stock.sort', {createdAt: -1, modifiedAt: -1});
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
        return ({action, doc})=>{
            switch(action){
                case 'edit':
                    const path = FlowRouter.path("product", {}, {_id: doc._id, redirect: 'stock'});
                    FlowRouter.go(path);
                    break;
                case 'remove':
                    Meteor.call('product.remove', doc._id);
                    break;
            }
            //const path = FlowRouter.path("product", {}, {_id: doc._id, redirect: 'stock'});
            //FlowRouter.go(path);
        }
    }
});
