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
  const joinButton= document.getElementById("joinButton");
  const nickName = document.getElementById("nickName");
  const playerArea= document.querySelectorAll(".player-area");
  const choicesArea = document.querySelectorAll(".player-area__choices");
  const joinArea = document.getElementById("join-area");
  const arena = document.querySelector(".arena");
  const playerOneArea = document.getElementById("player-one-area");
  const playerTwoArea = document.getElementById("player-two-area");
  const domRef = [playerOneArea, playerTwoArea];
//
  let playerCount = 0;
  let hasPlayerOne = false;
  let heroRef;
  let heroDom;
  let opponentRef;
  let opponentDom;
  let gameInProgress = false;

  joinButton.addEventListener("click", joinGame);


  function joinGame() { // handles player assignment and creation
    const heroInfo = {
      name: nickName.value.trim() || "Loser",
      pick: null,
      wins: 0,
      losses: 0,
      ties: 0
    };

    joinArea.classList.add("hidden");
    arena.classList.remove("hidden");

    playersRef.on("value", snap => {
      playerCount = snap.numChildren();
      hasPlayerOne = snap.child("1").exists();
      // hasPlayerTwo = snap.child("2").exists();

      if (playerCount < 2 && !heroRef) { //game not full and local player unassigned
        if (!hasPlayerOne) {
          createPlayer(1);
        } else {
          createPlayer(2); //player one already exists, create local as player 2
        }
      } 
    });
    
    function createPlayer(num) {
      // alert(`Welcome player ${num}`);
      let opponentNum = num === 1 ? 2 : 1;
      heroRef = playersRef.child(num);
      heroDom = domRef[num - 1];
      opponentRef = playersRef.child(opponentNum);
      opponentDom = domRef[opponentNum - 1];
      heroRef.onDisconnect().remove(); // if local closes browser, delete player      
      heroRef.set(heroInfo);
      updatePlayerInfo();
      playGame();
    }

    function updatePlayerInfo() {
      heroDom.querySelector(".player-area__message").textContent = "";
      heroDom.querySelector(".player-area__name").textContent = heroInfo.name;
    }

    function playGame() {
      playersRef.on("value", snap => { // show hide game controls based on entering and leaving
        if (playerCount === 2 && !gameInProgress) { // new opponent is joining or an opponent is already here
          gameInProgress = true;
          heroDom.querySelector(".player-area__choices").classList.remove("hidden");
          // show controls for current player
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