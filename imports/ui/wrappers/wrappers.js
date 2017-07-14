import './wrappers.html';
import { Roles } from 'meteor/alanning:roles';

Template.onlyIfLoggedIn.helpers({
    authInProcess: function() {
        return Meteor.loggingIn();
    },
    canShow: function() {
        return !!Meteor.user();
    }
});

Template.onlyIfAdmin.helpers({
    authInProcess: function() {
        return Meteor.loggingIn() || !Roles.subscription.ready();
    },
    canShow: function() {
        return !!Meteor.user() && Roles.userIsInRole(Meteor.userId(), 'admin');
    }
});