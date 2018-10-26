<template>
<div id='event-form' :class='{ active: active }' :style="{ top: top, left: left }">
<h4>Add an event</h4>
<p>{{ date.format('dddd, MMM. Do') }}</p>
<div class='text'>
    <input type='text' v-focus v-model='description' placeholder="Breakfast at Paco's" @keyup.enter='create'/>
    </div>
    <div class='buttons'>
        <button @click='create'>Create</button>
<button id='close-button' @click='close'>&#10006;</button>
</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      description: ""
    };
  },
  methods: {
    close() {
      this.$store.commit("eventFormActive", false);
    },
    create() {
      if (this.description.length > 0) {
        this.$store.dispatch("addEvent", this.description).then(_ => {
          //since this function returns a promise...
          //clear desc and clear form only when promise resolves:
          this.description = "";
          this.$store.commit("eventFormActive", false);
        });
      }
    }
  },
  computed: {
    date() {
      return this.$store.state.eventFormDate;
    },

    active() {
      return this.$store.state.eventFormActive;
    },
    top() {
      return `${this.$store.state.eventFormPosY}px`;
    },
    left() {
      return `${this.$store.state.eventFormPosX}px`;
    }
  },
  directives: {
    focus: {
      update(el) {
        el.focus();
      }
    }
  }
};
</script>