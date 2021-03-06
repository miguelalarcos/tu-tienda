import './product.html';
import { FlowRouter } from 'meteor/kadira:flow-router';
import '../../components/product/product.js';
import { Product } from '/imports/api/product/product.js';
import { Session } from 'meteor/session';
import { qConnect } from 'meteor/miguelalarcos:quick-search-form';

//Template.product_page.onCreated(function(){
    //this.autorun(function(){
    //    qConnect('code', 'product', (v)=>{ return {code: v.code} })
    //});
//});


Template.product_page.helpers({
    callback(){
        return (doc, input, dirty) => {
            Meteor.call('product.save', dirty, (err, _id)=>{
                if(err){
                    console.log(err);
                }else if(_id){
                    Session.set(input, {_id});
                }
                //done();
                const redirect = FlowRouter.getQueryParam("redirect");
                if(redirect){
                    FlowRouter.go('/'+redirect);
                }
            })
        }
    }
});
