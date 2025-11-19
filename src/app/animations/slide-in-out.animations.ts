import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const slideInOutAnimation = trigger('slideInOut', [
  state(
    'void',
    style({
      transform: 'translateX(-100%)',
      opacity: 0,
    })
  ),
  state(
    '*',
    style({
      transform: 'translateX(0)',
      opacity: 1,
    })
  ),
  transition('void => *', [animate('300ms ease-in')]),
  transition('* => void', [animate('300ms ease-out')]),
]);
