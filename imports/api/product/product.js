import { Mongo } from 'meteor/mongo';

export const Product = new Mongo.Collection('products');

export const ProductSchema = {
    _id: {type: 'string'},
    owner: {type: 'string'},
    name: {type: 'string', required: true},
    code: {type: 'string', required: true},
    description: {type: 'string'},
    price: {type: 'float', required: true},
    stock: {type: 'integer', required: true},
    lastUpdated: {type: 'date'},
    deleted: {type: 'boolean'}
};

export const AddStockSchema = {
    quantity: {type: 'integer', required: true},
    code: {type: 'string', required: true}
};

export const ProductSearchSchema = {
    'code$eq': {type: 'string'},
    'name$regex': {type: 'string'},
    'stock$lte': {type: 'integer'}
};