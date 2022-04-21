# leofilmapi

This is the repository for leo films backend and admin interface

## Video Embeds

Each video has a unique id that can be gotten from the link (https://vimeo.com/699587768) with id **_699587768_**. Hence the video id is saved in as the video link which is passed in the 

```tsx
// sample video ids, video1: 699555317, video2: 699587768
// the embed code is similar is shown below where we require just the video id
// the video width and height will be customized as needed
const videoID = movie.movieLink
<iframe
  src="https://player.vimeo.com/video/${videoID}"
  width="640"
  height="343"
  frameborder="0"
  allow="autoplay; fullscreen; picture-in-picture"
  allowfullscreen
></iframe>
```
