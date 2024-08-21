document.getElementById('play-btn').addEventListener('click', function() {
    var audio = document.getElementById('bg-music');
    if (audio.paused) {
        audio.play().then(function() {
            console.log('Audio playing');
        }).catch(function(error) {
            console.error('Error playing audio:', error);
        });
    }
});

document.getElementById('pause-btn').addEventListener('click', function() {
    var audio = document.getElementById('bg-music');
    if (!audio.paused) {
        audio.pause();
        console.log('Audio paused');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById('bg-music');
    audio.play().then(function() {
        console.log('Audio is playing automatically.');
    }).catch(function(error) {
        console.error('Error playing audio:', error);
    });
});