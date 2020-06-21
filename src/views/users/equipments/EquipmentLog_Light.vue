<template>
    <v-container>
        <v-card>
            <v-system-bar color="orange lighten-2"></v-system-bar>
            <v-card-title>機材管理表</v-card-title>
        </v-card>
        <v-card v-for="log in logs" :key="log.time" class='mt-1'>
            <v-container fluid>
                <v-layout wrap>
                    <v-flex xs3 md2>
                        <v-icon v-if="log.check" large color="green">check_circle</v-icon>
                        <v-btn v-if="log.check === false" text dark small color="orange lighten-2">
                            <v-icon>notification_important</v-icon>
                            check
                        </v-btn>
                    </v-flex>
                    <v-flex xs9 md5><v-card-title class="text-left">{{ log.time }}</v-card-title></v-flex>
                    <v-flex xs12 md5>
                        <v-card-text class="text-left">{{ log.group }} {{ log.user }}</v-card-text>
                    </v-flex>
                </v-layout>
                <v-card-actions>
                    <v-layout>
                        <v-flex xs8 md10></v-flex>
                        <v-flex xs2 md1 class='pt-5'>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn text dark x-small color="blue" v-bind="attrs" v-on="on">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                </template>
                                <span>内容を修正する</span>
                            </v-tooltip>
                        </v-flex>
                        <v-flex xs2 md1 class='pt-5'>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn text dark x-small color="blue" v-bind="attrs" v-on="on">
                                        <v-icon>pageview</v-icon>
                                    </v-btn>
                                </template>
                                <span>機材管理表を確認する</span>
                            </v-tooltip>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
            </v-container>
        </v-card>
    </v-container>
</template>
<script>
export default {
    name: 'EquipmentLog_Light',
    data () {
        return {
            header:[
                'Time', 'Group', 'User', 'Check', 'Command'
            ],
            logs:[
                { time: '6/21 21:00', group: '劇団綺畸', user: '西倉寛太', check: true },
                { time: '6/21 22:00', group: '劇団綺畸', user: '西倉寛太', check: false } /* axios.get */
            ]
        }
    }
}
</script>
