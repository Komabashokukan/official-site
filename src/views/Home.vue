<template>
    <div class="home h-100">
        <div class="container-md justify-content-center home-container">
            <div class="row">
                <Carousel />
            </div>

            <div class="row content">
                <FullCalendar class="col-sm order-sm-2" defaultView="dayGridMonth" :plugins="calendarPlugins" />
                <Info class="col-sm order-sm-1 mt-4 mt-sm-0" />
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'

import Info from '@/components/Info'
import Carousel from '@/components/Carousel'

export default {
    name: 'Home',
    components: {
        Info, Carousel, FullCalendar
    },
    data () {
        return {
            calendarPlugins: [dayGridPlugin]
        }
    }
}
</script>

<style scoped>
@import '~@fullcalendar/core/main.css';

.home-container{
    background-color: #eeeeee;
}
.content {
    margin-top: 10px;
    padding-bottom: 5vh;
}

</style>
