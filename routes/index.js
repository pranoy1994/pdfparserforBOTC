var express = require('express');
var router = express.Router();
let fs = require('fs'),
PDFParser = require("pdf2json");

var validator = require('validator');


var jsonXlsx = require('icg-json-to-xlsx');
var path     = require('path');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/show-the-json", (req, res) => {



let pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
  //fs.writeFile("./pdf2json/test/F1040EZ.json", JSON.stringify(pdfData));
  //var theData = JSON.stringify(pdfData);

  //var theJsonData = JSON.parse(theData);
  var tournament = [];
  pdfData.formImage.Pages.forEach((thePageObject, index) => {
    var tournamentName;
    if( index > 0) {

      
      var theTournamentName = "";
      var number = "";
      var theSchoolName = "";
      var teamName = "";
      var GPA = "";
      var SAT = "";
      var ACT = "";
      var cell = "";
      var contact = "";
      var DOB = "";
      var email = "";

      var theObj = {};

      var theTournamentArray = [];
      
      thePageObject.Texts.forEach(( theText ) => {

        if (theText.x == 2 && theText.y == 2.038) {

          if (isNaN(decodeURIComponent(theText.R[0].T))) {
            theTournamentName = decodeURIComponent(theText.R[0].T);
          }

        }


        if (theText.x == 2) {
          
          if (!isNaN(decodeURIComponent(theText.R[0].T))) {
            number = decodeURIComponent(theText.R[0].T);
          }
                    
          }


        

        if(theText.x == 3.563 ) {
          var texta = decodeURIComponent(theText.R[0].T);

            if(texta.includes('@') && texta.includes('.')) {
              email =texta;
              theObj.email = email;

              theTournamentArray.push(theObj);
              
                          theTournamentName = "";
                          number = "";
                          theSchoolName = "";
                          teamName = "";
                          GPA = "";
                          SAT = "";
                          ACT = "";
                          cell = "";
                          contact = "";
                          DOB = "";
                          email = "";


            }
            


           

          
        }


        if(theText.x == 3.563) {
          var textb = decodeURIComponent(theText.R[0].T);

          if(!validator.isEmail(textb)) {
            teamName = textb;
          }
            
          
        }

        if(theText.x == 23.875) {
          var text2 = decodeURIComponent(theText.R[0].T);
          if(text2 != "GPA") {
            theSchoolName = decodeURIComponent(theText.R[0].T);
          }


        }

        if(theText.x == 25.125) {
          var text = parseInt(decodeURIComponent(theText.R[0].T));
          if(text != NaN) {
            GPA = decodeURIComponent(theText.R[0].T);
          }
        }

        if(theText.x == 27.625) {
          SAT = decodeURIComponent(theText.R[0].T);
        }

        if(theText.x == 30.125) {
          ACT = decodeURIComponent(theText.R[0].T);
        }

        if(theText.x == 13.563) {
          cell = decodeURIComponent(theText.R[0].T);
        }

        if(theText.x == 19.5) {
          contact = decodeURIComponent(theText.R[0].T);
        }

        if(theText.x == 32.313) {
          DOB = decodeURIComponent(theText.R[0].T);
        }



        theObj = {
          theTournamentName,
          number,
          teamName,
          email,
          cell,
          contact,
          theSchoolName,
          GPA,
          SAT,
          ACT,
          DOB


        }
        

      });

      tournament.push(theTournamentArray);



    }


  })




  //writeToExcel(tournament)
  res.send(pdfData);


});


pdfParser.loadPDF("./files/2017_T3_Fall_Face_Off.pdf");
})


router.get("/show-the-json-two", (req, res) => {
  
  
  
  let pdfParser = new PDFParser();
  
  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
  pdfParser.on("pdfParser_dataReady", pdfData => {
    //fs.writeFile("./pdf2json/test/F1040EZ.json", JSON.stringify(pdfData));
    //var theData = JSON.stringify(pdfData);
  
    //var theJsonData = JSON.parse(theData);
    var tournament = [];
    pdfData.formImage.Pages.forEach((thePageObject, index) => {
      var tournamentName;
      if( index > 0) {
  
        
        var theTournamentName = "";
        var number = "";
        var theSchoolName = "";
        var teamName = "";
        var GPA = "";
        var SAT = "";
        var ACT = "";
        var cell = "";
        var contact = "";
        var DOB = "";
        var email = "";
  
        var theObj = {};
  
        var theTournamentArray = [];
        
        thePageObject.Texts.forEach(( theText ) => {
  
          if (theText.x == 2 && theText.y == 2.038) {
  
            if (isNaN(decodeURIComponent(theText.R[0].T))) {
              theTournamentName = decodeURIComponent(theText.R[0].T);
            }
  
          }
  
  
          if (theText.x == 2) {
            
            if (!isNaN(decodeURIComponent(theText.R[0].T))) {
              number = decodeURIComponent(theText.R[0].T);
            }
                      
            }
  
  
          
  
          if(theText.x == 3.563 ) {
            var texta = decodeURIComponent(theText.R[0].T);
  
              if(texta.includes('@') && texta.includes('.')) {
                email =texta;
                theObj.email = email;
  
                
  
  
              }
              
  
  
             
  
            
          }
  
  
          if(theText.x == 3.563) {
            var textb = decodeURIComponent(theText.R[0].T);
  
            if(!validator.isEmail(textb)) {
              teamName = textb;
            }
              
            
          }
  
          if(theText.x == 23.875) {
            var text2 = decodeURIComponent(theText.R[0].T);
            if(text2 != "GPA") {
              theSchoolName = decodeURIComponent(theText.R[0].T);
            }
  
  
          }
  
          if(theText.x == 25.125) {
            var text = parseInt(decodeURIComponent(theText.R[0].T));
            if(text != NaN) {
              GPA = decodeURIComponent(theText.R[0].T);
            }
          }
  
          if(theText.x == 27.625) {
            SAT = decodeURIComponent(theText.R[0].T);
          }
  
          if(theText.x == 30.125) {
            ACT = decodeURIComponent(theText.R[0].T);
          }
  
          if(theText.x == 13.563) {
            cell = decodeURIComponent(theText.R[0].T);
          }
  
          if(theText.x == 19.5) {
            contact = decodeURIComponent(theText.R[0].T);
          }
  
          if(theText.x == 32.313) {
            DOB = decodeURIComponent(theText.R[0].T);

            theObj.DOB = DOB;
            theTournamentArray.push(theObj);
            
                        theTournamentName = "";
                        number = "";
                        theSchoolName = "";
                        teamName = "";
                        GPA = "";
                        SAT = "";
                        ACT = "";
                        cell = "";
                        contact = "";
                        DOB = "";
                        email = "";
          }
  
  
  
          theObj = {
            theTournamentName,
            number,
            teamName,
            email,
            cell,
            contact,
            theSchoolName,
            GPA,
            SAT,
            ACT,
            DOB
  
  
          }
          
  
        });
  
        tournament.push(theTournamentArray);
  
  
  
      }
  
  
    })
  
  
  
  
    //writeToExcel(tournament)
    res.send(tournament);
  
  
  });
  
  
  pdfParser.loadPDF("./files/2017_T3_Fall_Face_Off.pdf");
  })
  


var jsonexport = require('jsonexport');
function writeToExcel(tournamentObject) {

  var theFinalObj = [];

  tournamentObject.forEach((pageArray) => {
    pageArray.forEach((teamObj) => {
      theFinalObj.push(teamObj);
    })
  })


  // var filename = path.join('./output', "output.xlsx");

  // var outputFile = jsonXlsx.writeFile(filename, JSON.stringify(theFinalObj));
  
  // console.log(outputFile);


  jsonexport(theFinalObj, function(err, csv){
    if(err) return console.log(err);
    //console.log(csv);

    fs.writeFile(__dirname + "/output.csv", csv, (err) => {
      console.log(err);
    });
});

}

module.exports = router;
