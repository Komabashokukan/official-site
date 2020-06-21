<template>
    <v-container class='black' fluid fill-height>
        <v-layout wrap>
        <v-flex xs12>
            <v-card class="mt-3">
                <v-system-bar color="orange lighten-2"></v-system-bar>
                    <v-card-title>照明機材一覧</v-card-title>
                <v-tabs show-arrows v-model='tab' class='mt-2'>
                    <v-tab v-for='division in divisions' :key='division'>{{ division.name }}</v-tab>
                </v-tabs>
            </v-card>
        </v-flex>
        <v-flex xs12 class='mt-1'>
            <v-card>
                <v-list flat>
                    <v-list-item v-for="equipment in equipments[tab]" :key="equipment.name" class="mb-1">
                        <v-list-item-content class="font-weight-bold text-left">
                            {{ equipment.name }}
                        </v-list-item-content>
                        <v-list-item-content>
                            {{ equipment.prev }}
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    name: 'Equipment_Light',
    data () {
        return {
            divisions:[
                { name: '灯体' },
                { name: '3Gコード' },
                { name: '3G付属品' },
                { name: '2G(調光室)' },
                { name: '1Gコード' },
                { name: '1G付属品' }
            ],
            equipments:[
                [{ name:'KFQ', prev:20 },
                    { name:'500FQ', prev:11 }],
                [{ name:'C-C10m', prev:10 }],
                [{ name:'ハンガー', prev:12 }],
                [{ name:'ゼラケース8inch', prev:66 }],
                [{ name:'A-C5m', prev:10 }],
                [{ name:'スタンド', prev:10 }]
            ], /* ここはapiからcreatedでaxios.getで引いてくる */
            tab:0
        }
    }
}
</script>
