var FeelingEntry = require('../../app/models/feelingEntry.js');

module.exports = function(app){
  app.post('/feeling',createUpdateFeeling);


  function createUpdateFeeling(req,res){
    var feelingEntry = req.body;
    if(feelingEntry._id){
      console.log('******** feeling entry exists ********');
      FeelingEntry.findOne(feelingEntry._id,function(err,fe){
        if(err){
          res.status(500);
          res.send({error:err});
        }

        //console.log('******* f before : ',fe);
        fe = feelingEntry;
        //console.log('******* f after ', fe);

        FeelingEntry(fe).update({upsert:true},function(err,fdEn){
          if(err){
            res.status(500);
            res.send({error:err});
          }
        });
        res.send({feeling:fe});
      })
    }else{
      var newFeelingEntry = new FeelingEntry(feelingEntry);
      newFeelingEntry.save(function(err){
        if(err){
          console.log("****   Error creating feeling entry *** : " + err);
          res.status(500);
          res.send({error:err});
        }else{
          res.send({feeling:newFeelingEntry});
        }
      })
    }
  }
};