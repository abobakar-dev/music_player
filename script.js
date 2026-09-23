const song = document.getElementById("song");
const progress = document.getElementById("progress");
const ctrlIcon = document.getElementById("ctrlIcon");

function updatePlayButton(isPlaying) {
  ctrlIcon.classList.remove("fa-play", "fa-pause");
  ctrlIcon.classList.add(isPlaying ? "fa-pause" : "fa-play");
}

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

song.onplay = function () {
  updatePlayButton(true);
};

song.onpause = function () {
  updatePlayButton(false);
};

function playPause() {
  if (song.paused) {
    song.play().catch(() => {
      // Ignore autoplay restrictions if the browser blocks playback.
    });
  } else {
    song.pause();
  }
}

song.addEventListener("timeupdate", function () {
  progress.value = song.currentTime;
});

progress.onchange = function () {
  song.currentTime = progress.value;
};

song.addEventListener("ended", function () {
  updatePlayButton(false);
  progress.value = 0;
});
