/**
 * Created by shashwat on 9/4/16.
 */

var fann = require('fann');
var request = require("request");
var stdio = require('stdio');
var plotly = require('plotly')("shashwatsinha", "d2akh23ldh");
var finalValue = 0;
var url = "https://www.quandl.com/api/v3/datasets/WIKI/FB.json?api_key=_ky5GP6zccsBiAUA-TqT"
var counter = 0;

stdio.question('Which Company', function (err, company) {
    var url = "https://www.quandl.com/api/v3/datasets/WIKI/" + company + ".json?api_key=_ky5GP6zccsBiAUA-TqT"
    stdio.question('What do you want to do? 1. Predict Future Price. 2. Plot the graph in a chart 3. Get the current stock value in real time.',function(err,choice){
        if(choice==1) {
            stdio.question('Open', function (err, open) {
                stdio.question('High', function (err, high) {
                    stdio.question('Low', function (err, low) {
                        PredictPrices(url, open, high, low);
                    });
                });
            });
        }

        else if(choice==2)
        {
            PredictPrices(url, -1, -1, -1);
        }

        else {
            GetCurrentPrice(company);
        }
    });
});


//var say = require('say');

//say.speak('Hello!');
function GetCurrentPrice(company) {
    var url = "https://www.google.com/finance/info?q=WIKI:"+company;
    var max = 0, min = 0;
    min = 1000;
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var sBody = body.toString();
            //Chop of the first two characters in the response as there is a '//' which makes it an invalid json
            sBody = sBody.substring(3);
            var resp = JSON.parse(sBody);
            console.log("The current stock Price is:"+resp[0].l);
        }
    });
}
var tempArr = new Array();
var dateArr = new Array();



function PredictPrices(url,open,high,low)
{
    var max = 0,min = 0;
    min = 1000;
    var dataN = new Array();
    var globalData = new Array();
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            //console.log(body) // Print the json response

            for (var key in body.dataset.data) {
                var value = body.dataset.data[key];
                var ArrayTemp = new Array();
                for (var j = 0; j < value.length; j++) {
                    if (value[j] > max && j < 4) {
                        max = value[j];
                    }
                    if (value[j] < min && j < 4)
                        min = value[j];

                }
            }


            for (var key in body.dataset.data) {
                var value = body.dataset.data[key];
                var ArrayTemp = new Array();
                for (var j = 0; j < value.length; j++) {

                    if(j==0) {
                        dateArr.push(value[j]);
                    }

                    if (j == 1) {
                        var k = (value[j] - min) / (max - min);
                        ArrayTemp.push(k);
                    }

                    if (j == 2) {
                        var k = (value[j] - min) / (max - min);
                        ArrayTemp.push(k);
                    }
                    if (j == 3) {
                        var k = (value[j] - min) / (max - min);
                        ArrayTemp.push(k);
                    }
                    if (j == 4) {
                        dataN.push(ArrayTemp);
                        ArrayTemp = new Array();
                        var temp = new Array();
                        tempArr.push(value[j]);
                        var k = (value[j] - min) / (max - min);
                        temp.push(k);
                        dataN.push(temp);
                        globalData.push(dataN);
                        dataN = new Array();
                    }
                }
            }
            if(high>0) {
                finalValue = getClosingPrice(globalData, max, min, open, high, low);
                console.log("\nclosing value of the day predicted to be:" + finalValue);
            }
            if(high<0)
                PlotGraph();
        }
    });
}

function getClosingPrice(dataN,max,min,open,high,low) {
    var net = new fann.standard(3,3,1);
    net.train(dataN, {error: 0.00001});
    var val = net.run([open,high,low]);
    var k = (val[0] * (max - min)) + min;
    return k;
}

function PlotGraph()
{


    var data = [
        {
            x: dateArr,
            y: tempArr,
            type: "scatter"
        }
    ];
    var graphOptions = {filename: "date-axes", fileopt: "overwrite"};
    plotly.plot(data, graphOptions, function (err, msg) {
        console.log(msg);
    });
}