// Registry of modules, keyed by the value used in data-module="...".
// Modules with a `selector` also attach to matching elements automatically.

import projectStack from './project-stack.js';
import navTheme from './nav-theme.js';
import thumbFade from './thumb-fade.js';
import thumbVideo from './thumb-video.js';
import heroIntro from './hero-intro.js';
import arrowGrow from './arrow-grow.js';

export const modules = {
  'project-stack': projectStack,
  'nav-theme': navTheme,
  'thumb-fade': thumbFade,
  'thumb-video': thumbVideo,
  'hero-intro': heroIntro,
  'arrow-grow': arrowGrow,
};
