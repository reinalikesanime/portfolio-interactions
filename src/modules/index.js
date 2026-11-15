// Registry of modules, keyed by the value used in data-module="...".

import projectStack from './project-stack.js';
import navTheme from './nav-theme.js';
import thumbFade from './thumb-fade.js';
import thumbVideo from './thumb-video.js';

export const modules = {
  'project-stack': projectStack,
  'nav-theme': navTheme,
  'thumb-fade': thumbFade,
  'thumb-video': thumbVideo,
};
