<template>
    <v-container fluid fill-height class="white">
        <v-layout wrap justify-center>
            <v-flex md10>
                <v-card>
                    <v-tabs v-model="tab" background-color="grey lighten-2" color="grey" icons-and-text centered>
                        <v-tab v-for="item in items" :key="item.tab">
                            {{ item.tab }}<v-icon>{{ item.icon }}</v-icon>
                        </v-tab>
                    </v-tabs>

                    <v-tabs-slider></v-tabs-slider>

                    <v-tabs-items v-model="tab">
                        <v-tab-item v-for="item in items" :key="item.tab">
                            <Download v-if="item.content === 'Download'" />
                            <Schedule v-if="item.content === 'Schedule'" />
                            <Form v-if="item.content === 'Form'" />
                            <Equipments v-if="item.content === 'Equipments'" />
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-flex>

            <v-flex md12 class="order-last">
                Copyright {{ new Date().getFullYear() }} - {{ new Date().getFullYear() + 1 }} 多目的ホール総務部 All Rights Reserved.
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Download from '@/views/users/Download';
import Schedule from '@/views/users/Schedule';
import Form from '@/views/users/Form';
import Equipments from '@/views/users/Equipments';

export default {
    name: 'Users',
    components: { Download, Schedule, Form, Equipments },
    data () {
        return {
            tab: 0,
            items: [
                { tab: 'schedule', icon: 'mdi-calendar-check', content: 'Schedule' },
                { tab: 'download', icon: 'mdi-download', content: 'Download' },
                { tab: 'form', icon: 'mdi-file-document-edit', content: 'Form' },
                { tab: 'equipments', icon: 'mdi-widgets', content: 'Equipments' }
            ]
        }
    }
}

</script>

<style scoped>

</style>
