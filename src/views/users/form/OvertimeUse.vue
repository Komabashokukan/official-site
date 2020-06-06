<template>
    <v-container fluid fill-height class="black">
        <v-layout wrap justify-center>
            <v-flex md10>
                <v-card>
                    <v-system-bar color="blue lighten-4"></v-system-bar>
                    <v-toolbar flat>
                        <v-toolbar-title>時間外使用申請フォーム</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-banner>
                        <v-list>
                            <v-list-item class="text-left">
                                基本使用時間である9:00~21:00を外れて活動する場合は提出してください。
                            </v-list-item>
                            <v-list-item class="text-left">
                                各日、21:00 ~ 33:00のうち該当する時間を記入して下さい。
                            </v-list-item>
                            <v-list-item class="text-left">
                                使用開始の1週間前までに回答すること。
                            </v-list-item>
                        </v-list>
                    </v-banner>
                </v-card>

                <v-card class="mt-3">
                    <v-card-title>基本情報</v-card-title>
                    <v-container>
                        <v-layout wrap justify-space-around>
                            <v-flex md5>
                                <v-text-field v-model="group_name" label="利用団体名"></v-text-field>
                                <v-text-field v-model="responsible" label="使用責任者"></v-text-field>
                                <v-text-field v-model="phone_number" label="携帯電話番号"></v-text-field>
                            </v-flex>

                            <v-flex md5>
                                <v-menu
                                        ref="menu"
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        :return-value.sync="dates"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                                v-model="dates"
                                                label="利用日程(開始日〜終了日)"
                                                prepend-icon="event"
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="dates" no-title scrollable range @change="update_schedule">
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-flex>

                        </v-layout>
                    </v-container>

                </v-card>

                <v-card class="mt-3" v-for="(schedule, index) in schedules" :key="schedule.date">
                    <v-card-title>{{ schedule.date }} ({{ index+1 }}日目)</v-card-title>
                    <v-container>
                        <v-layout wrap justify-space-around>

                            <v-flex md12 class="pl-md-12">
                                <v-checkbox v-model="schedule.use" color="blue lighten-1" label="夜間使用をする"></v-checkbox>
                            </v-flex>

                            <template v-if="schedule.use">
                                <v-flex md4>
                                    <v-text-field v-model="schedule.number" label="使用人数" type="number" suffix="人"></v-text-field>
                                </v-flex>

                                <v-flex md6>
                                    <v-combobox
                                            v-model="schedule.equip"
                                            :items="equip_list"
                                            label="使用設備"
                                            multiple
                                            chips
                                    ></v-combobox>
                                </v-flex>

                                <v-flex md6 class="mt-md-4">
                                    <v-range-slider
                                            v-model="schedule.range"
                                            label="使用時間"
                                            track-color="grey"
                                            track-fill-color="grey darken-2"
                                            color="blue lighten-1"
                                            min="0" max="12"
                                            step="1"
                                            ticks="always"
                                            tick-size="1"
                                    >
                                        <template v-slot:append>
                                            <span v-text="time_ticks[schedule.range[0]]"></span>
                                            〜
                                            <span v-text="time_ticks[schedule.range[1]]"></span>
                                        </template>
                                    </v-range-slider>

                                </v-flex>

                                <v-flex md4 class="hidden-md-and-down">
                                </v-flex>

                                <v-flex md11>
                                    <v-text-field v-model="schedule.reason" label="使用目的"></v-text-field>
                                </v-flex>
                            </template>

                        </v-layout>
                    </v-container>
                </v-card>

                <v-container>
                    <v-layout wrap justify-end>
                        <v-btn class="mt-2" x-large>SUBMIT</v-btn>
                    </v-layout>
                </v-container>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import moment from 'moment';
export default {
    name: 'OvertimeUse',
    data () {
        return {
            group_name: '',
            responsible: '',
            phone_number: '',
            menu: false,
            dates: [],
            schedules: [
                {
                    date: '2019-01-02',
                    number: 0,
                    reason: '',
                    equip: [],
                    range: [0, 23]
                }
            ]
        }
    },
    computed: {
        dateRangeText () {
            return this.dates.join(' ~ ');
        },
        equip_list () {
            return ['舞台', '照明', '音響']
        },
        time_ticks () {
            return Array.from(Array(13).keys(), x => (x + 21) + ':00'); // 21:00 ~ 31:00
        }
    },
    methods: {
        update_schedule () {
            if (this.dates.length === 1) {
                this.schedules = [
                    {
                        date: this.dates[0],
                        number: 0,
                        reason: '',
                        equip: [],
                        range: [0, 24]
                    }
                ]
                return;
            }
            const start = moment(this.dates[0]);
            const end = moment(this.dates[1]);
            this.schedules = [];
            for (let date = start; date <= end; date = date.add(1, 'day')) {
                this.schedules.push({
                    date: date.format('yyyy-MM-DD'),
                    number: 0,
                    reason: '',
                    equip: [],
                    range: [0, 24]
                });
            }
        }
    }
}
</script>

<style scoped>

</style>
