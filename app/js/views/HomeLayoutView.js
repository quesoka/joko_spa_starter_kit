var Marionette     = require('marionette');
var Templates      = require('joko-templates');

var HomeLayoutView = Marionette.View.extend({
    template: Templates.homeLayoutView
});

module.exports = HomeLayoutView;
