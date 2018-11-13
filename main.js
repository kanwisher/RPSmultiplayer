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
//
  let playerCount = 0;
  let hasPlayerOne = false;
  let localPlayerRef;
  let opponentRef;
  let gameInProgress = false;
  let localPlayerNum;

  joinButton.addEventListener("click", joinGame);


  function joinGame() { // handles player assignment and creation
    const localPlayerInfo = {
      name: nickName.value.trim() || "I'm an idiot",
      pick: null,
      wins: 0,
      losses: 0,
      ties: 0
    };

    playersRef.on("value", snap => {
      playerCount = snap.numChildren();
      hasPlayerOne = snap.child("1").exists();
      // hasPlayerTwo = snap.child("2").exists();

      if (playerCount < 2 && !localPlayerNum) { //game not full and local player unassigned
        if (!hasPlayerOne) {
          createPlayer(1);
        } else {
          createPlayer(2); //player one already exists, create local as player 2
        }
      } 
    });
    
    function createPlayer(num) {
      alert(`Welcome player ${num}`);
      localPlayerRef = playersRef.child(num);
      opponentRef = playersRef.child(num === 1 ? 2 : 1);
      localPlayerNum = num; // keep reference number of local player, use as flag for local player existing
      localPlayerRef.onDisconnect().remove(); // if local closes browser, delete player  
      localPlayerRef.set(localPlayerInfo);
      playGame();
    }

    function playGame() {
      playersRef.on("value", snap => { // show hide game controls
        debugger;
        if (playerCount === 2 && !gameInProgress) { // new opponent is joining or an opponent is already here
          gameInProgress = true;
          // show controls for current player
          // add opponent name
          // show picking message for opponent

        } else if (playerCount === 1) { // opponent has left the game
          gameInProgress = false;
          // reset client RPS selection
          // hide controls for current player
          // show waiting for player 2 for opponent
          // clear opponent name
        } else if (gameInProgress) {
          // object array is snap.val();
          // if opponent has picked but we have not, show picked banner for opponent
          // if both have picked then choose winner, update wins and losses, reset picks and start routine over ('show picking for opponent);
        }
      });





      //player is only in charge of own data
      //

      // opponentRef.child("pick").on("value", snap => {
      //   console.log(snap.val());
      // });

      // opponentRef.child("pick").on("value", snap => {
      //   console.log(snap.val());
      // });

      // opponentRef.child("pick").on("value", snap => {
      //   console.log(snap.val());
      // });
    }

    // function checkWin() {
    //   if(localPlayersRef.child("pick").exists() && opponentRef.child("pick").exists()) {
    //     console.log(localPlayersRef.child("pick").val());
    //   }
    // }
  }
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