const container = document.getElementById("container");
const canvas = document.getElementById("canvas1");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let audioSource;
let analyser;

container.addEventListener("click", function () {
  const audio1 = document.getElementById("audio1")
  audio1.src = "music/A New Error.wav"
  const audioContext = new AudioContext();
  audio1.play();
  audioSource = audioContext.createMediaElementSource(audio1);
  analyser = audioContext.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioContext.destination);
  analyser.fftSize = 8192;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const barWidth = canvas.width / bufferLength;
  const borderWidth = 5; 
  const totalBarWidth = barWidth + borderWidth; 
  let barHeight;
  let x;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
    //   ctx.fillStyle = "#F5AA50";
    //   ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    //   ctx.fillStyle = "black"; 
    const gradient = ctx.createLinearGradient(x, canvas.height, x, canvas.height - barHeight);
      gradient.addColorStop(0, "#F5AA50"); 
      gradient.addColorStop(1, "#C25A3F"); 
      ctx.fillStyle = gradient;
      ctx.fillRect(x + barWidth, canvas.height - barHeight, borderWidth, barHeight);
      x += totalBarWidth; 
    }
    requestAnimationFrame(animate);
  }
  animate();
});




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

//   const barWidth = canvas.width / bufferLength;
//   let barHeight;
//   let x;

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