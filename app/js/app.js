var Backbone          = require('backbone');
var Marionette        = require("marionette");
var SessionModel      = require('./models/SessionModel');
var HeaderItemView    = require('./views/header/HeaderItemView');
var LoginItemView     = require('./views/login/LoginItemView');
var HomeLayoutView    = require('./views/HomeLayoutView');
var ErrorHandler      = require('./errorhandler');

var App = Backbone.Marionette.Application.extend({
  region: "#main-region",
  showHeader: function() {
      this.headerItemView = new HeaderItemView();
      var main = this.getRegion();
      main.show(this.headerItemView);
  },
  showHomePage: function() {
      this.homeLayoutView = new HomeLayoutView();
      var main = this.getRegion();
      main.show(this.homeLayoutView,this.headerItemView);
  },
  showLoginPage: function () {
      this.loginItemView = new LoginItemView();
      var main = this.getRegion();
      main.show(this.loginItemView);
  },
  showMainContent: function () {
      if (window.App.session.get('logged_in') === true) {
          this.showHeader();
          // this.showHomePage();
          if (Backbone.history.fragment === '' || Backbone.history.fragment === 'login') {
              Backbone.history.navigate('home', {trigger: true});
          }
      } else {
          this.showLoginPage();
          Backbone.history.navigate('login');
      }
  },
  navigate: function (route, options) {
      options || (options = {});
      Backbone.history.navigate(route, options);
  },
  getCurrentRoute: function () {
      return Backbone.history.fragment;
  },
  onStart: function () {

      $('#loading-mask').hide();

      ErrorHandler.setupErrorHandling();

      this.showMainContent();

      console.log('Application started');
    }
});

var myApp = new App();
myApp.session = new SessionModel();
window.App = myApp;
myApp.start();
module.exports = myApp;
