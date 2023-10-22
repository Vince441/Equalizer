
const canvas = document.getElementById("canvas1");
const file = document.getElementById("upload");
canvas.width = innerWidth;
canvas.height = 700;
const ctx = canvas.getContext("2d");
let audioSource;
let analyser;
let audioContext;
let audioPlaying = false; // Ajout de la variable pour suivre l'état de la lecture



window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    // Mettre à jour les dimensions du canvas
    canvas.width = window.innerWidth;
    canvas.height = 700;
  } else {
    // Utiliser les dimensions d'origine
    canvas.width = innerWidth;
    canvas.height = 700;
  }
});

// Appelez également ce code lors du chargement initial de la page pour définir les dimensions correctes en fonction de la largeur de la fenêtre.
if (window.innerWidth > 800) {
  canvas.width = window.innerWidth;
  canvas.height = 700;
} else {
  canvas.width = innerWidth;
  canvas.height = 700;
}





// Liste des fichiers audio que vous souhaitez utiliser
const musicList = [
  "music/A New Error.wav",
  "music/Christoffer Moe Ditlevsen - As History Unfolds (Royalty Free Music).wav",
  "music/Jai Cuzco - Belong (Original Mix).wav",
  "music/Christian Löffler & Ensemble (Live at Volksbühne, Berlin).mp3",
  "music/Christian Löffler - Lys (feat. Menke).mp3",
  "music/Christian Löffler - Swim.mp3",
  "music/Seagulls (Jai Cuzco Remix).mp3",
  "music/Jai Cuzco - Winter.mp3",
  "music/Jai Cuzco - Undone.mp3"
];

let currentMusicIndex = 0;

// Créez un élément audio dynamiquement
const audio = new Audio(musicList[currentMusicIndex]);

// Liste des titres correspondant à la liste de fichiers audio
const musicTitles = [
  "____ Moderat - A New Error ____",
  "____ Christoffer Moe Ditlevsen - As History Unfolds ____",
  "____ Jai Cuzco - Belong ____",
  "____ Christian Löffler & Ensemble (Live at Volksbühne, Berlin) ____",
  "____ Christian Löffler - Lys (feat. Menke) ____",
  "____ Christian Löffler - Swim ____",
  "____ Jai Cuzco - Seagulls ____",
  "____ Jai Cuzco - Winter ____",
  "____ Jai Cuzco - Undone ____"
];

function seekAudio(seekValue) {
  if (audioContext) {
    const duration = audio.duration;
    const seekTime = (seekValue / 100) * duration;
    audio.currentTime = seekTime;
  }
}

// Ajoutez un gestionnaire d'événements pour les boutons "suivant" et "précédent"
const changeMusicButton = document.getElementById("changeMusic");
const changeMusicButton2 = document.getElementById("changeMusic2");
changeMusicButton.addEventListener("click", () => changeMusic("prev"));
changeMusicButton2.addEventListener("click", () => changeMusic("next"));

// Fonction pour changer de musique
function changeMusic(direction) {
  if (direction === "next") {
    currentMusicIndex = (currentMusicIndex + 1) % musicList.length;
  } else if (direction === "prev") {
    currentMusicIndex =
      (currentMusicIndex - 1 + musicList.length) % musicList.length;
  }
  audio.src = musicList[currentMusicIndex];

  // Mise à jour du titre de la musique affiché
  document.getElementById("musicTitle").textContent =
    musicTitles[currentMusicIndex];

  if (audioPlaying) {
    audio.play(); // Si la musique était en cours de lecture, redémarrez-la
  }
}

// Afficher le titre de la première musique lors du chargement de la page
document.getElementById("musicTitle").textContent =
  musicTitles[currentMusicIndex];

// Gestionnaire d'événements pour le bouton "Lancer la musique" (lecture/pause)
const playMusicButton = document.getElementById("playMusic");
playMusicButton.addEventListener("click", () => {
  if (!audioContext) {
    setupAudio();
    animate();
  }

  if (audioPlaying) {
    audio.pause();
    playMusicButton.setAttribute("change-btn", "paused"); // Mettez à jour l'état du bouton
  } else {
    audio.play();
    playMusicButton.setAttribute("change-btn", "playing"); // Mettez à jour l'état du bouton
  }
  audioPlaying = !audioPlaying; // Inversez l'état de la lecture
});

playMusicButton.addEventListener("click", () => { //Changement du boutton play/pause 
  if (playMusicButton.getAttribute("change-btn") === "playing") {
    playMusicButton.innerHTML = '<img src="images/pause.png">';
  } else {
    playMusicButton.innerHTML = '<img src="images/play.png">';
  }
});

audio.addEventListener("ended", () => {
  changeMusic("next"); // Passer à la musique suivante
  if (audioPlaying) {
    audio.play(); // Lire automatiquement la nouvelle musique
  }
});



function setupAudio() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  audioSource = audioContext.createMediaElementSource(audio);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 2048;
}





function animate() {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const barWidth = canvas.width / bufferLength;
  const borderWidth = 7;
  const totalBarWidth = barWidth + borderWidth;
  let barHeight;
  let x = 0;

  // Mettre à jour la position de la barre de lecture
  const seekBar = document.getElementById("seekBar");
  if (audioContext && audio.duration) {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const seekValue = (currentTime / duration) * 100;
    seekBar.value = seekValue;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  analyser.getByteFrequencyData(dataArray);

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    const gradient = ctx.createLinearGradient(
      x,
      canvas.height,
      x,
      canvas.height - barHeight
    );
    gradient.addColorStop(0, "#F5AA50");
    gradient.addColorStop(1, "#C25A3F");
    ctx.fillStyle = gradient;
    ctx.fillRect(
      x + barWidth,
      canvas.height - barHeight,
      borderWidth,
      barHeight
    );
    x += totalBarWidth;
  }

  requestAnimationFrame(animate);
}

file.addEventListener('change', function (){
const files = this.files
audio.src = URL.createObjectURL(files[0])
audio.load();
audio.play();

})



// const container = document.getElementById("container");
// const canvas = document.getElementById("canvas1");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// const ctx = canvas.getContext("2d");
// let audioSource;
// let analyser;

// container.addEventListener("click", function () {
// const audio1 = document.getElementById("audio1")
// audio1.src = "music/A New Error.wav"
//   const audioContext = new AudioContext() ;
//   audio1.play();
//   audioSource = audioContext.createMediaElementSource(audio1);
//   analyser = audioContext.createAnalyser();
//   audioSource.connect(analyser);
//   analyser.connect(audioContext.destination);
//   analyser.fftSize = 512;
//   const bufferLength = analyser.frequencyBinCount;
//   const dataArray = new Uint8Array(bufferLength);

  // const barWidth = canvas.width / bufferLength;
  // let barHeight;
  // let x;

//   function animate() {
//     x= 0;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     analyser.getByteFrequencyData(dataArray);
//     for (let i = 0; i < bufferLength; i++) {
//       barHeight = dataArray[i];
//       ctx.fillStyle = "white";
//       ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
//       x += barWidth;
//     }
//     requestAnimationFrame(animate);
//   }
//   animate();
// });
