import './sales.html';
import  '/imports/ui/components/sale/sale.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';

Template.sales_page.helpers({
    callback(){
        return (doc, input, dirty, done) => {
            Meteor.call('sale.new', doc, (err, _id)=>{
                if(err){
                    console.log(err);
                }
                else{
                    Session.set(input, {_id})
                }
                done();
                const path = FlowRouter.path("sale", {}, {_id});
                FlowRouter.go(path);
            });
        }
    }
});
