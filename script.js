// console.log('hey');
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

const numTracks = tracks.length;
const playingTime = `${ Math.ceil(countDuration(tracks) / 60)} mins`;

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

playListDuration.innerText = playingTime;

// initialise current track no 
let trackIdx = -1;

// like button
heart.addEventListener('click', function() {
    this.classList.toggle('like');
})

// add event listener to play / pause btn
play.addEventListener('click', playPause);

// play button logic
function playPause(){
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

function changeTrack(){
    audio.src = tracks[trackIdx].src;
    albumArt.innerHTML = `<img src="${tracks[trackIdx].albumArt}"" alt="${tracks[trackIdx].artist}">`
    albumArt.style.display = 'block';
    audio.play();
    play.innerHTML = pauseIcon;
    highlightTrack(trackIdx);
}


// logic for skip track btns
skipFwd.addEventListener('click', function(){
    skipTrack(1);
});

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

function skipTrack(num){
    console.log(trackIdx + num > numTracks -1);
    trackIdx += num;
    if (trackIdx > numTracks -1){
        trackIdx = 0;
    } else if (trackIdx < 0){
        trackIdx = numTracks - 1;
    }
    changeTrack();
}

// add click event listeners for each playlist item
for (let i = 0; i < trackList.length; i++){
    trackList[i].addEventListener('click', function(){
        // update track index
        trackIdx = i;
        changeTrack();
    })
}

