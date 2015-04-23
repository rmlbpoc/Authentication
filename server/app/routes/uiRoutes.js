module.exports = function(app){

  //Handle templates from angular ui-router
  app.get('/partials/:filename', function(req,res){
    var filename = req.params.filename;
    if(!filename) return;  // might want to change this
    res.render("partials/" + filename );
  });
  app.get('/partials/:dir/:filename', function(req,res){
    var filename = req.params.filename;
    var dir = req.params.dir;
    if(!filename) return;  // might want to change this
    res.render("partials/" + dir + '/' + filename );
  });
  app.get('/partials/:dir1/:dir2/:filename', function(req,res){
    var filename = req.params.filename;
    var dir1 = req.params.dir1;
    var dir2 = req.params.dir2;
    console.log(req.params);
    if(!filename) return;  // might want to change this
    res.render("partials/" + dir1 + '/' + dir2 + '/' + filename );
  });


  app.get('/layoutNew',function(req,res){
    res.render('layoutNew.jade');
  });
  app.get('/layoutVis',function(req,res){
    res.render('layoutVis.jade');
  });
  //========================================
  //HOME PAGE (with login links ============
  //========================================
  app.get('/',function(req,res){
    if(req.isAuthenticated()){
      console.log('user is authenticated');
      res.render('indexSubs.jade',{
        user:req.user // get the user out of session and pass to template
      })
    }else{
      console.log('calling home');
      console.log('ENV = ' + app.get('env'));
      var msg = req.flash('message') ; //.length>0?req.flash('message'):"test message";
      console.log(msg);
      res.render('index_.jade', { mesg: msg});
    }

  });

};

//module.exports = router;