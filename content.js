(function () {
  const BTN_MP3_ID = 'yt-dlp-copy-btn';
  const BTN_VIDEO_ID = 'yt-dlp-video-btn';
  const ICON_FONT_ID = 'yt-dlp-icon-font';

  // Ensure Google Material Icons font is loaded
  function ensureIconFont() {
    if (document.getElementById(ICON_FONT_ID)) return;
    const link = document.createElement('link');
    link.id = ICON_FONT_ID;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    document.head.appendChild(link);
  }

  /**
   * Inserts our buttons if they aren’t present yet.
   * Runs once and also on each SPA navigation.
   */
  function insertButtons() {
    const isYTM = location.hostname.includes('music.youtube.com');
    const menuSelector = isYTM ? '.middle-controls-buttons' : '#top-level-buttons-computed';
    const menu = document.querySelector(menuSelector);
    if (!menu) return;

    // Always add MP3 button if not present
    if (!document.getElementById(BTN_MP3_ID)) {
      const btn = document.createElement('button');
      btn.id = BTN_MP3_ID;
      btn.className = 'yt-dlp-btn';
      btn.innerHTML = '<span class="material-icons" style="font-size:18px; margin-right:4px;">audiotrack</span>MP3';
      menu.appendChild(btn);
      btn.addEventListener('click', async () => {
        const url = location.href.split('&')[0];
        const cmd = `yt-dlp \"${url}\" -f bestaudio --extract-audio --audio-format mp3 --embed-thumbnail --add-metadata -o "%(artist)s - %(title)s.%(ext)s"`;
        try {
          await navigator.clipboard.writeText(cmd);
          btn.innerHTML = '<span class="material-icons" style="font-size:18px; margin-right:4px;">check</span>Copied';
          setTimeout(() => btn.innerHTML = '<span class="material-icons" style="font-size:18px; margin-right:4px;">audiotrack</span>MP3', 1200);
        } catch (err) {
          alert('Could not write to clipboard: ' + err);
        }
      });
    }

    // Add Video button only on regular YouTube
    if (!isYTM && !document.getElementById(BTN_VIDEO_ID)) {
      const btn = document.createElement('button');
      btn.id = BTN_VIDEO_ID;
      btn.className = 'yt-dlp-btn';
      btn.innerHTML = '<span class="material-icons" style="font-size:18px; margin-right:4px;">videocam</span>VIDEO';
      menu.appendChild(btn);
      btn.addEventListener('click', async () => {
        const url = location.href.split('&')[0];
        const cmd = `yt-dlp \"${url}\" -f bestvideo`;
        try {
          await navigator.clipboard.writeText(cmd);
          btn.innerHTML = '<span class="material-icons" style="font-size:18px; margin-right:4px;">check</span>Copied';
          setTimeout(() => btn.innerHTML = '<span class="material-icons" style="font-size:18px; margin-right:4px;">videocam</span>VIDEO', 1200);
        } catch (err) {
          alert('Could not write to clipboard: ' + err);
        }
      });
    }

    // Add shared styles for buttons
    addStyles();
  }

  // Shared button styles (applied once)
  let stylesAdded = false;
  function addStyles() {
    if (stylesAdded) return;
    stylesAdded = true;
    const style = document.createElement('style');
    style.textContent = `
      .yt-dlp-btn {
        margin-left: 8px;
        padding: 6px 12px;
        font-size: 14px;
        font-weight: 500;
        font-family: Roboto, Arial, sans-serif;
        height: 36px;
        cursor: pointer;
        background-color: #ffffff20;
        border-radius: 999px;
        color: #ffffff;
        border: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .yt-dlp-btn:hover {
        background-color: #ffffff30;
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize: wait for menu, then insert buttons
  function init() {
    ensureIconFont();
    const interval = setInterval(() => {
      const menuSelector = location.hostname.includes('music.youtube.com') ? '.middle-controls-buttons' : '#top-level-buttons-computed';
      if (document.querySelector(menuSelector)) {
        insertButtons();
        clearInterval(interval);
      }
    }, 500);

    // Handle YouTube's SPA navigation
    window.addEventListener('yt-navigate-finish', insertButtons);

    // Fallback MutationObserver
    const observer = new MutationObserver(insertButtons);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  init();
})();
