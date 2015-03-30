// test/string.js
var expect = require('chai').expect;

describe.skip('Math', function () {
    describe('#max', function () {
        xit('random', function () {
            var countCircle  = 0;
            var pointsCount = 100;
            for(j=1;j<=10;j++){
                var cnt = j*10000000;
                countCircle = 0;
                for(var i=1;i<cnt;i++){
                    var x = Math.random(1);
                    var y = Math.random(1);
                    //console.log((x-0.5)*(x-0.5) + (y-0.5)*(y-0.5));
                    if(((x-0.5)*(x-0.5) + (y-0.5)*(y-0.5)) < .25){
                        countCircle++;
                    }

                }
                console.log(cnt + ' - ' +  countCircle*4/cnt)
            }

        });
    });
});
