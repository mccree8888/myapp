
var Machines = require('../mongo/machine');

var bodyParser = require("body-parser");


module.exports = function(app)
{
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());

  app.get('/', function(req, res){
   res.render('index');
  })

  app.get('/alarmUpdate', function(req, res){
    var dt = new Date();
    var da = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate();

    Machines.find(function(err, machines){
        if(err) {
          return res.status(500).send({error: 'database failure'});
        }
        res.render('alarmUpdate',{ today: da , machines : machines});
    });
  });

  app.get('/machineList', function(req, res){
    Machines.find(function(err, machines){
        if(err) {
          return res.status(500).send({error: 'database failure'});
        }
        res.render('machineList',{ machines : machines});
    });
  });

  app.post('/api/machineinsert', function(req, res){
    var mac = new Machines();
    mac.name = req.body[0].name;
    mac.position = req.body[0].position;
    mac.status = "STOP";

    mac.recipe.cnt = 0;

    mac.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });
  });

  app.get('/api/machines', function(req,res){
    Machines.find(function(err, machines){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(machines);
    })
  });

  app.post('/api/insertAlarm',function(req,res){
      console.log(req.body);
    });
}
