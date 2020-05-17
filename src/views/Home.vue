<template>
    <v-container fluid fill-height>
        <v-layout text-md-center wrap justify-center align-start>

            <v-flex md11 class="order-md-0 align-end justify-end">
                <v-img src="@/assets/lights.jpg" min-height="30vh" max-height="45vh"></v-img>
            </v-flex>

            <v-flex md7 class="order-md-2 bt-md-2">
                <v-card class="info ml-md-1 mt-md-2 mb-2 mb-md-0">
                    <v-list two-line align="left" rounded>
                        <template v-for="(item, index) in items">
                            <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>
                            <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>
                            <v-list-item v-else :key="item.date">
                                <v-list-item-content>
                                    <v-list-item-title v-html="item.date"></v-list-item-title>
                                    <v-list-item-subtitle v-html="item.title"></v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-card>
            </v-flex>

            <v-flex md4 class="order-md-1 bt-md-2">
                <v-card class="calendar mr-md-1 mt-md-2 pl-md-2 pr-md-2 pt-md-2 pb-8">
                    <Calendar />
                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
// @ is an alias to /src
import Calendar from '@/components/Calendar';

export default {
    name: 'Home',
    components: {
        Calendar
    },
    data () {
        return {}
    },
    computed: {
        items () {
            return [
                { header: '2020' },
                { date: '05/01', link: '#', title: '緊急事態宣言の発令に伴う閉館期間の延長について(再延長)', active: false },
                { divider: true, inset: true },
                { date: '04/10', link: '#', title: '緊急事態宣言の発令に伴う閉館期間の延長について', active: false },
                { divider: true, inset: true },
                { date: '03/27', link: '#', title: '駒場キャンパスの「ステージ・オレンジ」への移行に係る閉館期間の延長について', active: false },
                { divider: true, inset: true },
                { date: '03/03', link: '#', title: '新型コロナウイルスの感染拡大に伴う多目的ホールの使用中止について', active: false },
                { divider: true, inset: true },
                { date: '03/02', link: '#', title: '新型コロナウイルスの感染拡大に伴う多目的ホールの使用中止について', active: false },
                { divider: true, inset: true },
                { date: '03/01', link: '#', title: '新型コロナウイルスの感染拡大に伴う多目的ホールの使用中止について', active: false },
                { divider: true, inset: true },
                { date: '02/29', link: '#', title: '新型コロナウイルスの感染拡大に伴う多目的ホールの使用中止について', active: false },
                { divider: true, inset: true },
                { date: '02/25', link: '#', title: '新型コロナウイルスの感染拡大に伴う多目的ホールの使用中止について', active: false },
                { divider: true, inset: true },
                { date: '02/23', link: '#', title: '新型コロナウイルスの感染拡大に伴う多目的ホールの使用中止について', active: false }
            ]
        }
    }
}
</script>

<style scoped>
@import '~@fullcalendar/core/main.css';

.calendar {
    background-color: white;
    max-height: 45vh;
}
@media ( max-width: 960px ) {
    .calendar {
        overflow: scroll;
        max-height: 60vh;
    }
}
.info {
    overflow-y: scroll;
    max-height: 45vh;
}

/*スクロールバー全体*/
::-webkit-scrollbar {
    width: 7px;
    background-color: white;
}

/*スクロールバーの軌道*/
::-webkit-scrollbar-track {
    border-radius: 5px;
}

/*スクロールバーの動く部分*/
::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 5px;
    box-shadow:0 0 0 1px rgba(255, 255, 255, 1.0);
}

</style>
