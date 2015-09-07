Router.route('/', function () {
  console.log("index html");
  this.layout('mainlayout');
  this.render('navbar', {to: 'navbar'});
  this.render('home', {to: 'content'});
});

Router.route('/test');
