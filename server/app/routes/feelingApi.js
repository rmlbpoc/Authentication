var FeelingEntry = require('../../app/models/feelingEntry.js');

module.exports = function(app){
  app.post('/feeling',createUpdateFeeling);


  function createUpdateFeeling(req,res){
    var feelingEntry = req.body;
    if(feelingEntry._id){
      console.log('******** feeling entry exists ********');
      FeelingEntry.findOne(feelingEntry._id,function(err,fe){
        if(err){
          throw err;
        }

        //console.log('******* f before : ',f);
        fe = feelingEntry;
        //console.log('******* f after ', f);

        FeelingEntry(fe).update({upsert:true},function(err,fdEn){
          if(err){
            throw err;
          }

        });
        res.send({feeling:fe});
      })
    }else{
      var newFeelingEntry = new FeelingEntry(feelingEntry);
      newFeelingEntry.save(function(err){
        if(err){
          console.log("****   Error saving feeling entry *** : " + err)
        }else{
          res.send({feeling:newFeelingEntry});
        }
      })
    }
  }
};