import { animate, state, style, transition, trigger } from "@angular/animations";

export const bubbleAnimation = trigger('bubble', [
    state('void' , style({
       transform: 'scale(0)',
    })),
    state('*' , style({
       transform: 'scale(1)'
    })),
    transition('void <=> *' , [animate('200ms ease-out')]),
])