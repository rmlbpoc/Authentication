var FeelingEntry = require('../../app/models/feelingEntry.js');

module.exports = function(app){
  app.post('/feeling',createUpdateFeeling);
  app.get('/feeling/:userId/:date/:timeOfDay',getFeelingEntry);
  app.get('/feelinghistory/:userId/:days',getFeelingHistory);


  //*************************************************//
  //********* REQUEST HANDLERS *********************//
  //*************************************************//

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
        res.send({fe:fe});
      })
    }else{
      var newFeelingEntry = new FeelingEntry(feelingEntry);
      newFeelingEntry.save(function(err){
        if(err){
          console.log("****   Error creating feeling entry *** : " + err);
          res.status(500);
          res.send({error:err});
        }else{
          res.send({fe:newFeelingEntry});
        }
      })
    }
  }

  function getFeelingEntry(req,res){
    //res.send('OK');
    var usrId = req.params['userId'];
    var entryDt = req.params['date'];
    var tod = req.params['timeOfDay'];
    console.log(req.params['userId']);
    console.log(req.params['date']);
    console.log(req.params['timeOfDay']);

    FeelingEntry.findOne({userId:usrId,feelingDate:entryDt,feelingTimeOfDay:tod},function(err,feelingEntry){
      if(err){
        res.status(500);
        res.send({error:err});
      }

      if(feelingEntry){
        res.send({fe:feelingEntry});
      }else{
        res.send({msg:'feelingEntry not found'});
      }
    })
  }

  function getFeelingHistory(req,res){
    //res.send('OK');
    var usrId = req.params['userId'];
    var numDays = req.params['days'];
    var dt = new Date();
    dt.setHours(0);
    dt.setMinutes(0);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    dt.setDate(dt.getDate()-numDays);

    console.log(req.params['userId']);
    console.log(req.params['days']);

    res.send("ok");
    //FeelingEntry.findOne({userId:usrId,feelingDate:{$lt:dt},feelingTimeOfDay:tod},function(err,feelingEntry){
    //  if(err){
    //    res.status(500);
    //    res.send({error:err});
    //  }
    //
    //  if(feelingEntry){
    //    res.send({fe:feelingEntry});
    //  }else{
    //    res.send({msg:'feelingEntry not found'});
    //  }
    //})
  }
};