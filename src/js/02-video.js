import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(e => {
    localStorage.setItem(
        'videoplayer-current-time', e.seconds
    )
}, 1000
));

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'))
    .catch(function (error) {
        switch (error.name) {
            case "RangeError":
              // the time was less than 0 or greater than the video’s duration
              break;
      
            default:
              // some other error occurred
              break;
          }
        // console.error(error)
    });