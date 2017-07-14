import { Mongo } from 'meteor/mongo';

export const Sale = new Mongo.Collection('sales');

export const SaleSchema = {
    _id: {type: 'string'},
    owner: {type: 'string'},
    lines: {type: 'array'},
    date: {type: 'date'},
    deleted: {type: 'boolean'}
};

export const LineSchema = {
    saleId: {type: 'string'},
    name: {type: 'string'},
    code: {type: 'string', required: true},
    price: {type: 'float'},
    quantity: {type: 'integer', required: true}
};

export const SimpleLineSchema = {
    saleId: {type: 'string', required: true},
    code: {type: 'string', required: true},
    quantity: {type: 'integer', required: true}
};
