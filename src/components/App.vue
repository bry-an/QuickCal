<template>
<div>
  <div id='header'>
    <div>
      <h1>QuickCal</h1>
    </div>
    <div>
    <current-month></current-month>
    </div>
    </div>
      <div id='subtitle'>
      <h2>Quick Clean Cal</h2>
      </div>
<div id='day-bar'>
  <div>Sun</div>
  <div>Mon</div>
  <div>Tue</div>
  <div>Wed</div>
  <div>Thu</div>
  <div>Fri</div>
  <div>Sat</div>
</div>
<div id='calendar'>
  <div v-for='week in weeks' class='calendar-week'>
  <calendar-day v-for='day in week' :day='day'></calendar-day>
  </div>
    </div>
    <event-form></event-form>
    </div>
</template>

<script>
import CalendarDay from "./CalendarDay.vue";
import CurrentMonth from "./CurrentMonth.vue";
import EventForm from "./EventForm.vue";
export default {
  computed: {
    month() {
      return this.$store.state.currentMonth;
    },
    year() {
      return this.$store.state.currentYear;
    },
    days() {
      //generating all days in current month
      let days = [];
      let currentDay = this.$moment(`${this.year}-${this.month}-1`, "YYYY-M-D");

      do {
        days.push(currentDay);
        currentDay = this.$moment(currentDay).add(1, "days");
      } while (currentDay.month() + 1 === this.month);

      //add previous days to start
      currentDay = this.$moment(days[0]);
      const SUNDAY = 0;
      const MONDAY = 1;
      const SATURDAY = 6;

      if (currentDay.day() !== SUNDAY) {
        do {
          currentDay = this.$moment(currentDay).subtract(1, "days");
          days.unshift(currentDay);
        } while (currentDay.day() !== SUNDAY);
      }

      //add following days to end
      currentDay = this.$moment(days[days.length - 1]);

      if (currentDay.day() !== SATURDAY) {
        do {
          currentDay = this.$moment(currentDay).add(1, "days");
          days.push(currentDay);
        } while (currentDay.day() !== SATURDAY);
      }

      return days;
    },
    weeks() {
      let weeks = [];
      let week = [];

      for (let day of this.days) {
        week.push(day);
        if (week.length === 7) {
          //there are enough in the array
          weeks.push(week);
          week = [];
        }
      }
      return weeks;
    }
  },
  components: {
    CalendarDay,
    CurrentMonth,
    EventForm
  }
};
</script>
