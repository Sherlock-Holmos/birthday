    // 返回上一页
    function goBack() {
        window.history.back();
      }
      // 初始化背景音乐
      const audio = document.getElementById('background-audio');
      const togglePlayBtn = document.getElementById('toggle-play-btn');
  
      // 切换播放/暂停状态
      togglePlayBtn.onclick = function () {
        if (audio.paused) {
          audio.play();
          togglePlayBtn.textContent = '⏸️'; // 改为暂停图标
        } else {
          audio.pause();
          togglePlayBtn.textContent = '▶️'; // 改为播放图标
        }
      };
  
      function onEnvelopeClick() {
        window.location.href = 'skystar.html';
      }