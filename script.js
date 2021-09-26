// store track information in an array of objects
const tracks = [
    {
        src: 'audio/DancingInTheMoonlight.m4a',
        title: 'Dancing In The Moonlight',
        artist: 'Top Loader',
        albumArt: 'imgs/toploader.jpg',
        duration: 225.079
    },
    {
        src: 'audio/IWantYouBack.m4a',
        title: 'I Want You Back',
        artist: 'Jackson 5',
        albumArt: 'imgs/jackson5.jpg',
        duration: 179.184
    },
    {
        src: 'audio/IChooseYou.m4a',
        title: 'I Choose You',
        artist: 'Sara Bareiles',
        albumArt: 'imgs/saraBareilles.jpg',
        duration: 218.263
    },
    {
        src: 'audio/TheOne.m4a',
        title: 'The One',
        artist: 'Kodaline',
        albumArt: 'imgs/kodaline.jpg',
        duration: 232.01
    },
    {
        src: 'audio/bornAgain.mp3',
        title: 'Born Again',
        artist: 'Josh Garrels',
        albumArt: 'imgs/joshgarrels.jpg',
        duration: 271.961
    }
]

// length of the playlist
const numTracks = tracks.length;

// calculates total playlist duration (in mins)
const playingTime = `${ Math.ceil(countDuration(tracks) / 60)} mins`;

// calculates total playlist duration (in seconds)
function countDuration(arr) {
    let total = 0;
    for(let i = 0; i < arr.length; i++){
        total += arr[i].duration;
    }
    return total;
}

// set variables for DOM Elemenets
const audio =  document.querySelector('audio');
const play = document.querySelector('.play');
const skipPrev = document.querySelector('.rwd');
const skipFwd = document.querySelector('.fwd');
const heart = document.querySelector('.fa-heart');

const playIcon = `<i class="fas fa-play"></i>`;
const pauseIcon = `<i class="fas fa-pause"></i>`;

const trackList = document.querySelectorAll('.tracks');
const playListDuration = document.querySelector('.playlist-duration');
const albumArt = document.querySelector('.album-art');
const songTitles = document.querySelectorAll('.title');

const volumeDisplay = document.querySelector('.volume-display');
const volBar = document.querySelector('.volume-bar');

// renders playingTime on the page
playListDuration.innerText = playingTime;

// initialise current track no 
let trackIdx = -1;

// initialise volume variable
let vol = audio.volume;
let volHeight = 100;

// function to set border radius for the vol display
volBorderRadius();

// vol display bar should have no border radius at 100% height
function volBorderRadius(){
    if (vol == 1){
        volumeDisplay.style.borderRadius = `8px`;
    } else {
        volumeDisplay.style.borderRadius = `0 0 8px 8px`;
    }
}

// logic to handle volume
function volLogic(){
    // volBar.style.visibility = 'visible';

    // sets range of vol to be always from between 0 and 1
    if (vol > 1){
        vol = 1;
    } else if (vol < 0){
        vol = 0;
    }

    audio.volume = vol;

    // increment vol bar height based on vol
    volHeight = vol * 100 ;
    volBorderRadius();
    volumeDisplay.style.height = `${volHeight}%`;

    // volBar.classList.add('fadeout');
    // setTimeout(function(){
    //     volBar.classList.remove('fadeout');
    //     volBar.style.visibility = 'hidden';
    // }, 2500);
}

// listen for volume keys 
document.addEventListener('keydown', function(event){
    adjustVol(event);
});

// logic to adjust volume based on 'u' and 'd' keys
function adjustVol(event){
    // console.log(event);
    if (event.keyCode == 85){
        vol += 0.1;
        volLogic();
    } else if (event.keyCode == 68){
        vol -= 0.1;
        volLogic();
    }
}

// like button
heart.addEventListener('click', function() {
    this.classList.toggle('like');
})

// add event listener to play / pause btn
play.addEventListener('click', playPause);

// play button logic
function playPause(){
    // for first click of play btn
    if (trackIdx == -1 && audio.paused){
        trackIdx += 1;
        changeTrack();
        play.innerHTML = pauseIcon;
    }
    else if (audio.paused){
        audio.play();
        play.innerHTML = pauseIcon;
    } else {
        audio.pause();
        play.innerHTML = playIcon;
    }
}

// logic for changing tracks
function changeTrack(){
    audio.src = tracks[trackIdx].src;

    // change album art based on selected song
    albumArt.innerHTML = `<img src="${tracks[trackIdx].albumArt}"" alt="${tracks[trackIdx].artist}">`
    albumArt.style.display = 'block';

    audio.play();
    play.innerHTML = pauseIcon;

    // change now playing track title to green
    highlightTrack(trackIdx);
}

// add event listener for for skip forward track btn
skipFwd.addEventListener('click', function(){
    skipTrack(1);
});

// add event listener for skip backward track btn
skipPrev.addEventListener('click', function(){
    skipTrack(-1);
});

// logic to highlight playing track 
function highlightTrack(trackno){
    songTitles.forEach(function(title){
        title.classList.remove('like');
    })
    songTitles[trackno].classList.add('like');
}

// logic to keep track of trackIdx
function skipTrack(num){
    console.log(trackIdx + num > numTracks -1);
    // increment / decrement track index
    trackIdx += num;
    // keep trackIdx always between 0 and 4
    if (trackIdx > numTracks -1){
        trackIdx = 0;
    } else if (trackIdx < 0){
        trackIdx = numTracks - 1;
    }
    // run logic to change track
    changeTrack();
}

// add click event listeners for each playlist item
for (let i = 0; i < trackList.length; i++){
    trackList[i].addEventListener('click', function(){
        // update track index
        trackIdx = i;
        // run logic to change track
        changeTrack();
    })
}


