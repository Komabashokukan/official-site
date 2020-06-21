<template>
    <v-container fluid fill-height>
        <v-layout text-md-center wrap justify-center align-start>

            <v-flex md11 class="order-md-0 align-end justify-end">
                <v-img src="@/assets/lights.jpg" min-height="35vh" max-height="45vh"></v-img>
            </v-flex>

            <v-flex md7 sm12 class="order-md-2 bt-md-2">
                <v-card class="info ml-md-1 mt-md-2 mb-2 mb-md-0" style="background-color: white !important;">
                    <v-list two-line align="left" rounded>
                        <template v-for="(item, index) in items">
                            <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>
                            <template v-else>
                                <v-divider :key="index"></v-divider>
                                <v-list-item :key="item.date" @click="open_info(item)">
                                    <v-list-item-content>
                                        <v-list-item-title v-html="item.date"></v-list-item-title>
                                        <v-list-item-subtitle v-html="item.title"></v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </template>
                    </v-list>
                </v-card>
            </v-flex>

            <v-flex md4 sm12 class="order-md-1 bt-md-2">
                <v-card class="calendar mr-md-1 mt-md-2 pl-md-2 pr-md-2 pb-8">
                    <MiniCalendar class="mx-1" style="height: 38vh;" />
                </v-card>
            </v-flex>

            <v-flex md11 class="order-md-last mt-2">
                <v-card class="grey lighten-1">
                    <v-card-text class="text--white">
                        Copyright {{ new Date().getFullYear() }} - {{ new Date().getFullYear() + 1 }} 多目的ホール総務部 All Rights Reserved.
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-dialog v-model="info_dialog">
                <v-card>
                    <v-card-actions>
                        <v-btn icon @click="info_dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-card-title>
                        <v-chip class="mr-sm-2">{{ info.date }}</v-chip>
                        {{ info.title }}
                    </v-card-title>

                    <v-card-text class="text-left mt-md-6" v-html="info.content" />

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="info_dialog = false">閉じる</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </v-layout>
    </v-container>
</template>

<script>
/* eslint camelcase: "off" */
// @ is an alias to /src
import MiniCalendar from '@/components/MiniCalendar';
import marked from 'marked';

export default {
    name: 'Home',
    components: {
        MiniCalendar
    },
    data () {
        return {
            info_dialog: null,
            info: {},
            items:  [
            ]
        }
    },
    methods: {
        open_info (info) {
            this.info = info;
            this.info_dialog = true;
        }
    },
    mounted () {
        this.axios.get(process.env.VUE_APP_KIBELA_API + 'Info')
            .then(response => {
                let year = 3000;
                for (const edge of response.data) {
                    const title_parse = edge.node.title.match(/(?<year>\d\d\d\d)-(?<date>\d\d-\d\d)\s*(?<title>.*)/);
                    if (title_parse === null) {
                        continue;
                    }
                    if (Number(title_parse.groups.year) < year) {
                        this.items.push({
                            header: title_parse.groups.year
                        });
                        year = Number(title_parse.year);
                    }
                    this.items.push({
                        date: title_parse.groups.date,
                        title: title_parse.groups.title,
                        active: false,
                        content: marked(edge.node.content)
                    });
                }
            });
    }
}
</script>

<style scoped>
.calendar {
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: white;
    max-height: 45vh;
    height: 45vh;
}
@media ( max-width: 960px ) {
    .calendar {
        overflow: scroll;
        max-height: 60vh;
    }
}
.info {
    overflow-y: scroll;
    min-height: 45vh;
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
