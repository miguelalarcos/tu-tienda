import { Security } from 'meteor/ongoworks:security';
import { Product } from '/imports/api/product/product.js';

Security.defineMethod('ownsDocument', {
    fetch: [],
    allow(type, field, userId, doc) {//check doc is not undefined
        if(!doc) return false;
        if (!field) field = 'userId';
        return userId === doc[field];
    }
});

Product.permit(['update', 'remove']).ownsDocument('ownerId');