<template>
    <v-card class="pl-md-10 pr-md-10">
        <v-card-title>スケジュール</v-card-title>
        <v-card-subtitle>駒場小空間の予約スケジュールをご確認いただけます</v-card-subtitle>

        <v-card-text>
            <Calendar class="mb-4 mb-md-8 calendar" />
        </v-card-text>
    </v-card>
</template>

<script>
import Calendar from '@/components/Calendar';
export default {
    name: 'Schedule',
    components: { Calendar }
}
</script>

<style scoped>

@media( min-height: 960px ) {
    .calendar {
        height: 65vh;
    }
}

</style>
