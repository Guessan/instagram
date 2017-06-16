var config = require('./config');

var User = mongoose.model('User', new mongoose.Schema({
  instagramId: { type: String, index: true },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  username: String,
  fullName: String,
  picture: String,
  accessToken: String
}));

mongoose.connect(config.db);


angular.module('Instagram', ['ngRoute', 'ngMessages', 'satellizer'])
  .config(function($routeProvider, $authProvider) {

    $routeProvider
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
  })
  .when('/signup', {
    templateUrl: 'views/signup.html',
    controller: 'SignupCtrl'
  })
  .when('/photo/:id', {
    templateUrl: 'views/detail.html',
    controller: 'DetailCtrl'
  })
  .otherwise('/');

  $authProvider.loginUrl = 'http://localhost:3000/auth/login';
  $authProvider.signupUrl = 'http://localhost:3000/auth/signup';
  $authProvider.oauth2({
    name: 'instagram-clone',
    url: 'http://localhost:3000/auth/instagram',
    redirectUri: 'http://localhost:8000',
    clientId: '1e9b1c1e726a469ba0080c7d55b5e04a',
    requiredUrlParams: ['scope'],
    scope: ['likes'],
    scopeDelimiter: '+',
    authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
    });
  });