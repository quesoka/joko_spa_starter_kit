var Backbone          = require('backbone');
var Marionette        = require("marionette");
var SessionModel      = require('./models/SessionModel');
var HeaderItemView    = require('./views/header/HeaderItemView');
var LoginItemView     = require('./views/login/LoginItemView');
var HomeLayoutView    = require('./views/HomeLayoutView');
var ErrorHandler      = require('./errorhandler');


var App = Backbone.Marionette.Application.extend({
  header: '#header-region',
  main: "#main-region",
  dialog: "#dialog-region",
  showHeader: function () {
      if (!App.headerItemView) {
          App.headerItemView = new HeaderItemView();
          App.header.render(App.headerItemView);
      }
  },
  showHomePage: function() {
      App.homeLayoutView = new HomeLayoutView();
      App.main.render(App.homeLayoutView);
  },
  showLoginPage = function () {
      App.loginItemView = new LoginItemView();
      App.main.render(App.loginItemView);
  },
  showMainContent = function () {
      if (window.App.session.get('logged_in') === true) {
          App.showHeader();
          App.showHomePage();
          if (Backbone.history.fragment === '' || Backbone.history.fragment === 'login') {
              Backbone.history.navigate('home', {trigger: true});
          }
      } else {
          App.showLoginPage();
          Backbone.history.navigate('login');
      }
  },
  navigate = function (route, options) {
      options || (options = {});
      Backbone.history.navigate(route, options);
  },
  getCurrentRoute = function () {
      return Backbone.history.fragment;
  },
  onStart: function () {

      $('#loading-mask').hide();

      ErrorHandler.setupErrorHandling();



      console.log('Application started');
    }
});

var myApp = new App();
myApp.start();
