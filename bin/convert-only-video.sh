ffmpeg -i "$1_video.mp4" -c:v libx265 -vbr 3 -crf 28 "$1.mp4"
ffmpeg -i "$1.mp4" -crf 28 "$1.webm"
