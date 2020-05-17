<template>
    <FullCalendar defaultView="dayGridMonth" :plugins="calendarPlugins" />
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';

export default {
    name: 'Home',
    components: {
        FullCalendar
    },
    computed: {
        calendarPlugins () {
            return [dayGridPlugin]
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

