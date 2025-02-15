(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    const domElements = {
      player: document.getElementById("youtube-player"),
      input: document.getElementById("youtube-id"),
      toggleInputButton: document.getElementById("toggle-input-visibility"),
      toggleVisibilityButton: document.getElementById("toggle-visibility"),
      togglePlaybackButton: document.getElementById("toggle-playback"),
      volumeSlider: document.getElementById("volume-slider"),
      loopButton: document.getElementById("toggle-loop"),
      hideIcon: document.getElementById("hide-icon"),
      showIcon: document.getElementById("show-icon"),
      hideInputIcon: document.getElementById("hide-input-icon"),
      showInputIcon: document.getElementById("show-input-icon"),
      enableLoopIcon: document.getElementById("enable-loop-icon"),
      disableLoopIcon: document.getElementById("disable-loop-icon"),
      playIcon: document.getElementById("play-icon"),
      pauseIcon: document.getElementById("pause-icon")
    };
    const storageKeys = {
      localStorageKey: "youtubePlayerID",
      inputHiddenKey: "inputHiddenState",
      iframeHiddenKey: "iframeHiddenState",
      loopStateKey: "loopState",
      youtubeAudioTimeKey: "youtubeAudioTime"
    };
    const defaultVideoID = "6xpBoLetha0";
    let timeUpdateInterval;
    let isPlaying = false;
    const postMessageToPlayer = (command, args = []) => {
      const iframeWindow = domElements.player.contentWindow;
      if (iframeWindow) {
        iframeWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: command,
            args
          }),
          "*"
          // 명시적 origin 설정
        );
      } else {
        console.error("Iframe window not available!");
      }
    };
    window.addEventListener("message", (event) => {
      console.log("Message event received:", event);
      console.log("Event origin:", event.origin);
      console.log("Event data:", event.data);
    });
    const initializePlayer = () => {
      const savedID = localStorage.getItem(storageKeys.localStorageKey) || defaultVideoID;
      const savedTime = parseFloat(localStorage.getItem(storageKeys.youtubeAudioTimeKey)) || 0;
      const player = new YT.Player(domElements.player.id, {
        videoId: savedID,
        playerVars: {
          autoplay: 1,
          loop: 1,
          enablejsapi: 1,
          playlist: savedID,
          start: savedTime
        },
        events: {
          onReady: () => {
            console.log("YouTube player is ready.");
            timeUpdateInterval = setInterval(() => postMessageToPlayer("getCurrentTime"), 1e3);
          }
        }
      });
      domElements.input.value = savedID;
    };
    const updateVideo = (videoID) => {
      domElements.player.src = `https://www.youtube.com/embed/${videoID}?playlist=${videoID}&autoplay=1&loop=1&enablejsapi=1`;
      localStorage.setItem(storageKeys.localStorageKey, videoID);
      localStorage.setItem(storageKeys.youtubeAudioTimeKey, 0);
    };
    const initializeVisibility = () => {
      const inputHidden = JSON.parse(localStorage.getItem(storageKeys.inputHiddenKey) || "false");
      const iframeHidden = JSON.parse(localStorage.getItem(storageKeys.iframeHiddenKey) || "false");
      domElements.input.classList.toggle("hidden", inputHidden);
      domElements.hideInputIcon.classList.toggle("hidden", inputHidden);
      domElements.showInputIcon.classList.toggle("hidden", !inputHidden);
      domElements.player.classList.toggle("hidden", iframeHidden);
      domElements.hideIcon.classList.toggle("hidden", iframeHidden);
      domElements.showIcon.classList.toggle("hidden", !iframeHidden);
    };
    const initializeLoopState = () => {
      const isLooping = JSON.parse(localStorage.getItem(storageKeys.loopStateKey) || "true");
      updateLoopState(isLooping);
    };
    const updateLoopState = (isLooping) => {
      postMessageToPlayer("setLoop", [isLooping]);
      domElements.enableLoopIcon.classList.toggle("hidden", isLooping);
      domElements.disableLoopIcon.classList.toggle("hidden", !isLooping);
      localStorage.setItem(storageKeys.loopStateKey, JSON.stringify(isLooping));
    };
    const togglePlayback = () => {
      if (isPlaying) {
        postMessageToPlayer("pauseVideo");
      } else {
        postMessageToPlayer("playVideo");
      }
      isPlaying = !isPlaying;
      domElements.playIcon.classList.toggle("hidden", isPlaying);
      domElements.pauseIcon.classList.toggle("hidden", !isPlaying);
    };
    const handleInputKeydown = (event) => {
      if (event.key === "Enter") {
        const videoID = domElements.input.value.trim();
        if (videoID) {
          updateVideo(videoID);
        }
      }
    };
    const toggleInputVisibility = () => {
      const isHidden = domElements.input.classList.toggle("hidden");
      localStorage.setItem(storageKeys.inputHiddenKey, JSON.stringify(isHidden));
      domElements.hideInputIcon.classList.toggle("hidden", isHidden);
      domElements.showInputIcon.classList.toggle("hidden", !isHidden);
    };
    const toggleIframeVisibility = () => {
      const isHidden = domElements.player.classList.toggle("hidden");
      localStorage.setItem(storageKeys.iframeHiddenKey, JSON.stringify(isHidden));
      domElements.hideIcon.classList.toggle("hidden", isHidden);
      domElements.showIcon.classList.toggle("hidden", !isHidden);
    };
    const toggleLoop = () => {
      const isLooping = JSON.parse(localStorage.getItem(storageKeys.loopStateKey) || "true");
      updateLoopState(!isLooping);
    };
    const handleVolumeChange = (event) => {
      const volume = event.target.value;
      postMessageToPlayer("setVolume", [volume]);
    };
    domElements.input.addEventListener("keydown", handleInputKeydown);
    domElements.toggleInputButton.addEventListener("click", toggleInputVisibility);
    domElements.toggleVisibilityButton.addEventListener("click", toggleIframeVisibility);
    domElements.togglePlaybackButton.addEventListener("click", togglePlayback);
    domElements.volumeSlider.addEventListener("input", handleVolumeChange);
    domElements.loopButton.addEventListener("click", toggleLoop);
    const loadYouTubeAPI = () => {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    };
    loadYouTubeAPI();
    initializeVisibility();
    initializeLoopState();
  });
})();
