# yt-dlp shortcuts for youtube + music

Tiny webextension that adds buttons that automagically copies a yt-dlp command for the video you are watching right now:

`youtube.com`

![screenshot](screenshot.png)

`music.youtube.com`

![screenshot 2](screenshot2.png)

## example result

```bash
yt-dlp "https://music.youtube.com/watch?v=lYBUbBu4W08" -f bestaudio --extract-audio --audio-format mp3 --embed-thumbnail --add-metadata -o "%(artist)s - %(title)s.%(ext)s"
```

## Installation

1. Clone the repo
1. Follow the instructions on [how to load an unpacked extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) in your browser

preferably also install `yt-dlp` and `ffmpeg` on your system, so you can actually use the command that is copied to your clipboard.