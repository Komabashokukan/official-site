<template>
    <v-container class='black' fluid fill-height>
        <v-layout wrap justify-center>
        <v-flex xs12>
            <v-card class="mt-3">
                <v-system-bar color="orange lighten-2"></v-system-bar>
                    <v-card-title>退出時点検表</v-card-title>
                    <v-card-subtitle align=left class="Section_title">（照明部門）</v-card-subtitle>
                <v-tabs show-arrows v-model='tab' class='mt-2'>
                    <v-tab v-for='division in divisions' :key='division'>{{ division.name }}
                        <v-icon v-show="division.done" right small class="light-green lighten-3">done</v-icon>
                    </v-tab>
                </v-tabs>
            </v-card>
        </v-flex>
        <v-flex xs12 class='mt-3'>
            <v-card>
                <v-list flat>
                    <v-list-item v-for="equipment in equipments[tab]" :key="equipment.name" class="mt-1">
                        <v-container fluid>
                            <v-layout wrap>
                                <v-flex xs6 md4 class='pt-4'>
                                    <p class="font-weight-bold text-left">
                                        {{ equipment.name }}({{ equipment.prev }})
                                    </p>
                                </v-flex>
                                <v-flex xs6 md4>
                                    <v-text-field
                                        v-model.number="equipment.quant"
                                        label="個数"
                                        required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-checkbox
                                        v-model="equipment.used"
                                        label="使用していない"
                                        required
                                        right
                                        @change="(equipment.used === true) ? equipment.quant=equipment.prev : equipment.quant=''"
                                    ></v-checkbox>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-flex>
        <v-flex>
            <v-btn fixed right dark bottom small color="orange lighten-2" x-large v-on:click="submit">SUBMIT</v-btn>
        </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data () {
        return {
            divisions:[
                { name: '灯体', done:false },
                { name: '3Gコード', done:false },
                { name: '3G付属品', done:false },
                { name: '2G(調光室)', done:false },
                { name: '1Gコード', done:false },
                { name: '1G付属品', done:false }
            ],
            equipments:[
                [{ name:'KFQ', quant:'', prev:20, used:false },
                    { name:'500FQ', quant:'', prev:11, used:false }],
                [{ name:'C-C10m', quant:'', prev:10, used:false }],
                [{ name:'ハンガー', quant:'', prev:12, used:false }],
                [{ name:'ゼラケース8inch', quant:'', prev:66, used:false }],
                [{ name:'A-C5m', quant:'', prev:10, used:false }],
                [{ name:'スタンド', quant:'', prev:10, used:false }]
            ], /* ここはapiからcreatedでaxios.getで引いてくる */
            tab:0
        }
    },
    methods:{
    }
}
</script>
