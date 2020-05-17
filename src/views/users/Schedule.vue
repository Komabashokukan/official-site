<template>
    <v-card class="pl-md-10 pr-md-10">
        <v-card-title>スケジュール</v-card-title>
        <v-card-subtitle>駒場小空間の予約スケジュールをご確認いただけます</v-card-subtitle>

        <Calendar />
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

</style>
