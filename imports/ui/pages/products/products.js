import './products.html';
import '../../components/product/product.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';

Template.products_page.helpers({
    np_callback(){
        return function() {
            const path = FlowRouter.path("product", {}, {redirect: 'products'});
            FlowRouter.go(path);
        }
    },
    pl_callback(){
        return function() {
            const path = FlowRouter.path("product", {}, {redirect: 'products'});
            FlowRouter.go(path);
        }
    }
});
