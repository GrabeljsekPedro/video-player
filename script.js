const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //

function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    } else {
        video.pause();
        showPlayIcon();
    }
}

// On Video End, show play button icon
video.addEventListener('ended', showPlayIcon);

// Progress Bar ------------------------------ //

// Calculate display format
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`
    return `${minutes}:${seconds}`;
}

// Update progress bar as video plays
function updateProgress() {
    progressBar.style.width = `${(video.currentTime/video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

// Click to seek within video
function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Volume Bar
function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    // Rounding volume up or down
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;
    // Change icon depending on volume
    volumeIcon.className = '';
    if (volume >= 0.7) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-high');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-low');
    } else if (volume === 0) {
        volumeIcon.classList.add('fa-solid', 'fa-volume-off');
    }
    lastVolume = volume; 
}

// Mute/Unmute
function toggleMute() {
    volumeIcon.className = '';
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fa-solid', 'fa-volume-xmark');
        volumeIcon.setAttribute('title', 'Unmute');
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        if (lastVolume >= 0.7) {
            volumeIcon.classList.add('fa-solid', 'fa-volume-high');
        } else if (lastVolume < 0.7 && lastVolume > 0) {
            volumeIcon.classList.add('fa-solid', 'fa-volume-low');
        } else if (lastVolume === 0) {
            volumeIcon.classList.add('fa-solid', 'fa-volume-off');
        }
    }
}

// Change Playback Speed -------------------- //

function changeSpeed() {
    video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);