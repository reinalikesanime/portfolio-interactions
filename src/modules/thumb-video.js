// Thumbnail video on hover (approved 2026-11-14, second thumbnail).
//
// The video sits still on its first frame. Mouse/trackpad: hovering the image
// (or keyboard focus on the tile) plays it from the start, looping; leaving
// pauses it and returns to the first frame. Touch devices: plays while the
// thumbnail is on screen, pauses and resets when it scrolls away. Reduced
// motion on touch: stays on the first frame.
//
// The video only starts downloading when the thumbnail is near the viewport.
//
// Webflow markup (data-module can sit on any element inside the tile's media box):
//   div.project-tile-media
//     div[data-module="thumb-video"]
//       ... video[data-thumb-video] (muted, playsinline, loop, preload="none")

export default {
  lazy: true, // loader starts this module only when it's near the viewport
  init(el, { mm }) {
    const video = el.matches('video') ? el : el.querySelector('video[data-thumb-video], video');
    if (!video) return;
    const media = el.closest('.project-tile-media') || el;
    const tile = media.closest('.project-tile') || media;

    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.preload = 'auto'; // near the viewport now: fetch so hover starts instantly

    const play = () => {
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    };
    const play0 = () => {
      try { video.currentTime = 0; } catch (e) {}
      play();
    };
    const stop = () => {
      video.pause();
      try { video.currentTime = 0; } catch (e) {}
    };

    mm.add((ctx) => {
      if (ctx.conditions.canHover) {
        media.addEventListener('mouseenter', play0);
        media.addEventListener('mouseleave', stop);
        tile.addEventListener('focusin', play0);
        tile.addEventListener('focusout', stop);
        return () => {
          media.removeEventListener('mouseenter', play0);
          media.removeEventListener('mouseleave', stop);
          tile.removeEventListener('focusin', play0);
          tile.removeEventListener('focusout', stop);
          stop();
        };
      }
      if (ctx.conditions.reduceMotion) return undefined;
      // Touch: play while at least half the thumbnail is on screen.
      const io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? play() : stop()),
        { threshold: 0.5 }
      );
      io.observe(media);
      return () => {
        io.disconnect();
        stop();
      };
    });
  },
};
