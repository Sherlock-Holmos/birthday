document.addEventListener("DOMContentLoaded", function () {
    const music = document.getElementById("bg-music");
    const toggleButton = document.getElementById("music-toggle-btn");

    toggleButton.addEventListener("click", function () {
        if (music.paused) {
            music.play();
        } else {
            music.pause();
        }
    });
});
