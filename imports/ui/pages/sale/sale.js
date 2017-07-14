import './sale.html';
import '/imports/ui/components/sale/sale.js';
import { qConnect } from 'meteor/miguelalarcos:quick-search-form';

Template.stock_page.onCreated(function(){
    this.autorun(function(){
        qConnect('sale', 'line', (v)=>{ return {saleId: v._id} })
        //const v = Session.get('sale');
        //if(v)Session.set('line', {saleId: v._id});
    });
});

Template.sale_page.helpers({
    initial(){
        return {quantity: 1};
    }//,
    //map(){
    //    return ()=>qConnect('sale', 'line', (v)=>{ return {saleId: v._id} })
    //}
});
