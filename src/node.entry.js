import VueCalendar from './entry';

//server bundler's requirement is that you just export a function that returns the VueCalendar()

export default function(context) {
    return VueCalendar(context.events);
}