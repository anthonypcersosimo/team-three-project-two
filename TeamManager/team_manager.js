// dependency for inquirer npm package
var inquirer = require("inquirer");

// constructor function for creating new player objects
function Player(name, position, offense, defense) {
  this.name = name;
  this.position = position;
  this.offense = offense;
  this.defense = defense;
// Method which increases either the player's offense or defense property based upon a coinflip.
  this.goodGame = function() {
    if(Math.floor(Math.random() * 2) === 0) {
      this.offense++;
      console.log(this.name + "'s offense has gone up!\n----------");
    } else {
        this.defense++;
        console.log(this.name + "'s defense has gone up!\n----------");
       }
    };

  // Method which decreases either the player's offense or defense property based upon a coinflip.
  this.badGame = function() {
    if (Math.floor(Math.random() * 2) === 0) {
     this.offense--;
     console.log(this.name + "'s offense has gone down!\n----------");
    }
    else {
     this.defense--;
     console.log(this.name + "'s defense has gone down!\n----------");
    }
   };

//Method which prints all of the player's properties to the screen
  this.printStats = function() {
    console.log("Name: " + this.name + "\nPosition: " + this.position + "\nOffense: " + this.offense + "\nDefense: " + this.defense);
  };
}

var starters = [];
var subs = [];
var team = [];

var createPlayer = function() {
  if(starters.length + subs.length < 5) {
    console.log("\nNew Player!\n");
    inquirer.prompt([
      {
        name: "name",
        message: "Player's Name: "
      },{ 
        name: "position",
        message: "Player's position: ",
      },{
        name: "offense",
        message: "Player's offensive skill (1 - 10, 10 being the highest)",
        validate: function(value) {
          if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10) {
            return true;
          }
            return false;
          }
        }, {
        name: "defense",
        message: "Player's defensive skill (1 - 10, 10 being the highest)",
        validate: function(value) {
          if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10) {
            return true;
          }
            return false;
          }
        }
      ]).then(function(answers) {
      
      var player = new Player(answers.name, answers.position, parseInt(answers.offense), parseInt(answers.defense));

      if (starters.length < 3) {
        starters.push(player);
        team.push(player);
        console.log(player.name + " added to starters");
      } else {
        subs.push(player);
        team.push(player);
        console.log(player.name + " added to subs");
      }
      createPlayer();
    });

  } else {
    for (var i = 0; i < team.length; i++) {
      team[i].printStats();
    }
    playgame()
  }
};

createPlayer();

var teamScore = 0;
var count = 0;
var playBoo = false;

function playgame() {
    if (count < 5) {


        var offenseNum = Math.floor(Math.random() * Math.floor(20))
        var defenseNum = Math.floor(Math.random() * Math.floor(20))
        var teamOffense = 0;
        var teamDefense = 0;
        var currentStarters = [];
        //var currentStarters = ["no"];
        //var currentSubs = ["no"];
        var currentSubs = [];

        for (i = 0; i < starters.length; i++) {
            teamOffense += starters[i].offense
            teamDefense += starters[i].defense
            currentStarters.push(starters[i].name)
        }
        for (i = 0; i < subs.length; i++) {

            currentSubs.push(subs[i].name)
        }

        if (offenseNum > teamDefense) {
            teamScore--
            console.log("Current score: " +teamScore)
        }

        if (defenseNum < teamOffense) {
            teamScore++
            console.log( "Current score: "+ teamScore)
        }

        inquirer.prompt([
            {
                type: "list",
                message: "Add a sub?",
                choices: currentSubs,
                name: "currentSubs"


            }

           
        ]).then(function (answers) {
            if(answers.currentSubs !== "no"){
                var playerToBeSubbedIn = subs.indexOf(answers.currentSubs)
                inquirer.prompt([
                    {
                        type: "list",
                        message: "who to use?",
                        choices: currentStarters,
                        name: "currentStarters",

                        
                    }
                ]).then(function (secondAnswers) {
                    console.log("HEY THIS IS BEFORE THE SPLICE SUBS" + subs)
                    console.log("HEY THIS IS BEFORE THE SPLICE STAT]ERS" + starters)

                    console.log("PLAYER TO REMOVE INDEX: " + playerToBeSubbedIn)
                    console.log("PLAYER TO REMOVE INDEX: " + subs[playerToBeSubbedIn])

                    console.log("sub INDEX: " + playerToRemove)
                    console.log("sub INDEX: " + starters[playerToRemove])

                    var playerToRemove = starters.indexOf(secondAnswers.currentStarters)
                    var  tempSubs = subs.splice(playerToBeSubbedIn, 0, starters[playerToRemove] )
                    var tempStarters = starters.splice(playerToRemove, 0, subs[playerToBeSubbedIn])
                    subs = tempSubs
                    starters = tempStarters
                    
                    console.log("HEY THIS IS after THE SPLICE SUBS" + subs)
                    console.log("HEY THIS IS after THE SPLICE STAT]ERS" + starters)

                    if(teamScore > 0){
                        console.log("You won!")
                        for(i=0; i < starters.length; i ++){
                            starters[i].goodGame()
                            starters[i].printStats()
                           
                        }
                    }
                    else if(teamScore < 0){
                        console.log("You lost! ")
                        for(i=0; i < starters.length; i ++){
                            starters[i].badGame()
                            starters[i].printStats()
                        }
                    }
                    count++
                    playgame()
                })

            }
            
            
            
        })
        
}


}