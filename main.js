document.addEventListener("DOMContentLoaded", () => {
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyCIw7RZ8OzHrZOQUU6KuDkcRYChxeBmsac",
    authDomain: "rpsgame-50d85.firebaseapp.com",
    databaseURL: "https://rpsgame-50d85.firebaseio.com",
    projectId: "rpsgame-50d85",
    storageBucket: "rpsgame-50d85.appspot.com",
    messagingSenderId: "635289483910"
  };
  firebase.initializeApp(config);

// firebase
  const db = firebase.database();
  const rootRef = db.ref();
  const playersRef = rootRef.child("/players");

// DOM
  const joinButton= document.getElementById("join-button");
  const nickNameInput = document.getElementById("nickname-input");


  const joinArea = document.getElementById("join-area");
  const arena = document.querySelector(".arena");


  let gameInProgress = false;

  joinButton.addEventListener("click", joinGame);

  // Get/set a Player instance by id 
  const players = {}

  // Hold reference to id by player type
  let heroId;
  let enemyId;

  //client stats
  let wins;
  let losses;
  let ties;

  class Player {
    constructor(playerNum) {
      this.id = playerNum,
      this.localStats = { // maintains local 
        name: '',
        pick: null
      }
    }
  
    get domRoot() {
      let selector = this.id === 1 ? 'player-one-area' : 'player-two-area';
      return document.getElementById(selector);
    }

    ref() {
      return playersRef.child(`/${this.id}`);
    }

    updateFirebase() {
      const playerRef = this.ref();
      const stats = this.localStats;
      playerRef.set(stats);
    }
  }

  /**
   * joinGame will only be "kicked off" once for the local player, the change listener is helpful for a waiting player
   */
  function joinGame() {
    
    playersRef.on("value", snap => {
      playerCount = snap.numChildren();
      playerOneTaken = snap.child('1').exists();
      const gameNotFull = playerCount < 2;
      const noHeroExists = !heroId;

      if (gameNotFull && noHeroExists) {
        if (playerOneTaken) {
          heroId = 2;
          enemyId = 1;
        } else {
          heroId = 1;
          enemyId = 2;
        }
        createHero(heroId);
        watchEnemy(enemyId);
        showArena();
      } // add some sort of waiting logic here
    });

    function showArena() {
      joinArea.classList.add('hidden');
      arena.classList.remove('hidden');
    }

    function watchEnemy(playerNum) {
      playersRef.child(`/${playerNum}`).on('value', snap => {
        console.log('enemy:', snap.val());
      });
    }


    function createHero(heroId) {
      const nickname = nickNameInput.value.trim();
      const hero = new Player(heroId);
      hero.localStats.name = nickname;
      hero.ref().onDisconnect().remove(); // if local closes browser, delete player
      players[heroId] = hero;
      hero.updateFirebase();
      // updatePlayerInfo();
      // playGame();
    }

    function updatePlayerInfo(playerDom, message) {
      playerDom.querySelector(".player-area__message").textContent = message;
      playerDom.querySelector(".player-area__name").textContent = heroInfo.name;
    }

    function playGame() {
      playersRef.on("value", snap => { // show hide game controls based on entering and leaving
        if (playerCount === 2 && !gameInProgress) { // new opponent is joining or an opponent is already here
          gameInProgress = true;
          // show controls for current player
          heroDom.querySelector(".player-area__choices").classList.remove("hidden");

          // add opponent name
          // show picking message for opponent
        } else if (playerCount === 1) { // opponent has left the game
          gameInProgress = false;
          // reset client RPS selection
          // hide controls for current player
          // show waiting for player 2 for opponent
          // clear opponent name
        }
      });

      choicesArea.forEach( el => {
        el.addEventListener("click", e => {
          if (e.target.matches(".player-area__button")) {
            alert("clicked");
              // on click add local variable of user pick, see if opponent has picked, if they have, run game logic, otherwise set that variable in local db ref
          }
        });
      });     
      opponentRef.child("pick").on("value", snap => { // best listener?
        console.log(snap.val());
        // on opponent value change, if we've already picked the run game logic, if we have not picked then store opponent pick in local
      });

    }

  }

  function removeClassFromAll(list, className) {
    list.forEach(item => item.classList.remove(className));
  }



      // function checkWin() {
    //   if(localPlayersRef.child("pick").exists() && opponentRef.child("pick").exists()) {
    //     console.log(localPlayersRef.child("pick").val());
    //   }
    // }
  // readyTwo.addEventListener("click", (e) => {
  //   localPlayerRef.update({ status: "ready"})
  // });



  





  // function unlockDOM(num) {
  //   if (num === 1) {
  //     readyOne.removeAttribute("disabled");
  //   } else {
  //     readyTwo.removeAttribute("disabled");
  //   }
  // }





  //failed code
  // function playGame() {
  //   if (localPlayerNum) { // if current user is actually a player
  //     console.log("game on");
  //   } else {
  //     alert("game in progress, wait in line punk");
  //   }
  // }
  // const localPlayerInfo = {
  //   name: nickName,
  //   pick: null,
  //   wins: 0,
  //   losses: 0,
  //   ties: 0
  // };

 
  // playerOneRef.on("value", snap => {
  //   if (!snap.val() && !inGamePlayer) {
  //     playerOneRef.set(localPlayerInfo);
  //     inGamePlayer = playerOneRef
  //     handleDisconnect(playerOneRef); // set this once client player is known
  //     rootRef.on("value", snap => {
  //       if (snap.numChildren() === 2) {
  //         alert("game on!");
  //       }
  //     });
      
  //   }
  // });

  // playerTwoRef.on("value", snap => {
  //   if (!snap.val() && !inGamePlayer) {
  //     playerTwoRef.set(localPlayerInfo);
  //     inGamePlayer = playerTwoRef
  //     handleDisconnect(playerTwoRef);
  //     rootRef.once("value", snap => {
  //       if (snap.numChildren() === 2) {
  //         alert("game on!");
  //       }
  //     });
  //   }
  // });

  

  // function handleDisconnect(ref) { //once client disconnects, remove them if they were player one or two
  //   ref.onDisconnect().remove(); //whenb I close my browser, remove myself from list
  // }

});