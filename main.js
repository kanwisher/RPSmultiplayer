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


  const db = firebase.database();
  const rootRef = db.ref();
  const playersRef = rootRef.child("/players");
  // const game = rootRef.child("/game");

  let playerCount = 0;
  let hasPlayerOne = false;
  let localPlayerRef;
  let localPlayerNum;



  playersRef.on("value", snap => {
    playerCount = snap.numChildren();
    hasPlayerOne = snap.child("1").exists();
    hasPlayerTwo = snap.child("2").exists();

    if (playerCount < 2 && !localPlayerNum) { //game not full and local player unassigned
      if (!hasPlayerOne) {
        createPlayer(1);
      } else {
        createPlayer(2); //player one already exists, create local as player 2
      } 
    } else {
      playGame();
    }
  });

  function playGame() {
    if (localPlayerNum) { // local computer is playing
      
    } else {
      alert("Please wait for spot to become available");
    }
  }



  function createPlayer(num) {
    localPlayerRef = playersRef.child(num);
    localPlayerNum = num; // keep reference number of local player, use as flag for local player existing
    localPlayerRef.onDisconnect().remove(); // if local closes browser, delete player
    const nickName = prompt(`What's your nickname player ${num}?`)
    const localPlayerInfo = {
      name: nickName,
      pick: null,
      wins: 0,
      losses: 0,
      ties: 0
    };
    localPlayerRef.set(localPlayerInfo)
  }





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