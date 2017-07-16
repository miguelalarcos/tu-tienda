import './sale.html';
import { Sale, SimpleLineSchema } from '/imports/api/sale/sale.js';
import { Session } from 'meteor/session';
import { qList, qForm, integer } from 'meteor/miguelalarcos:quick-search-form';

qForm(Template.sale_form, {schema: {}});

const callback_line_form = (doc, input, dirty, done) => {
    Meteor.call('line.add', doc, (err, _id)=>{
        if(err){
            console.log(err);
        }
        done();
    });
};

qForm(Template.line_form, {schema: SimpleLineSchema, integer, callback: callback_line_form});

Template.line_form.onRendered(function(){
    $('#line-enter').focus();
});

Template.sales_today.onCreated(function() {
        this.subscribe('sales.today');
    }
);

qList(Template.sales_today, {subs: 'sales_today', schema: {}, collection: Sale});

const qArray = (template, collection, subs, array) => {

    template.onCreated(function () {
        this.autorun(function(){
            const _id = Session.get(this.data.input)._id;
            this.subscribe(subs, _id);
        });
    });

    template.events({
        'click .item'(evt, tmpl){
            callback(this);
        }
    });

    template.helpers({
        line(){
            let doc = Session.get(Template.instance().data.input);
            doc = collection.findOne(doc._id);
            return doc[array];
        }
    });
};

qArray(Template.lines, Sale, 'sale._id', 'lines');