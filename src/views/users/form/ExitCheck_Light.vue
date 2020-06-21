<template>
    <v-container class='black' fluid fill-height>
        <v-layout wrap>
        <v-flex xs12>
            <v-card class="mt-3">
                <v-system-bar color="orange lighten-2"></v-system-bar>
                    <v-card-title>退出時点検表</v-card-title>
                    <v-card-subtitle align=left class="Section_title">（照明部門）</v-card-subtitle>
                <v-tabs show-arrows v-model='tab' class='mt-2'>
                    <v-tab v-for='division in divisions' :key='division'>{{ division.name }}
                        <v-icon v-show="division.done" right small color="light-green lighten-1">check_circle</v-icon>
                    </v-tab>
                </v-tabs>
            </v-card>
        </v-flex>
        <v-flex xs12 class='mt-1'>
            <v-card>
                <v-list flat>
                    <v-list-item v-for="equipment in equipments[tab]" :key="equipment.name" class="mb-1">
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
            <v-btn fixed right dark bottom small color="orange lighten-2" x-large @click="(empty === 0) ? showDialog = true : showConfirm = true">SUBMIT</v-btn>
        </v-flex>
        </v-layout>
        <v-dialog v-model="showDialog" persistent max-width="600px">
            <v-card class="white">
                <v-card-title class="headline">USER INFO</v-card-title>
                <v-card-text>
                    <v-select
                        :items="users"
                        label="団体名"
                        required
                    ></v-select>
                    <v-text-field
                        label="責任者氏名"
                        required
                    ></v-text-field>
                    <v-text-field
                        label="email"
                        required
                    ></v-text-field>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn color="orange lighten-2" text @click="showDialog = false">cancel</v-btn>
                            <v-btn color="orange lighten-2" text @click="showDialog = false">submit</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="showConfirm" persistent max-width="600px">
            <v-card>
                <v-card-title class="headline">WARNING</v-card-title>
                <v-card-text>
                    未記入の項目が{{ empty }}個あります
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="orange lighten-2" text @click="showConfirm = false">cancel</v-btn>
                        <v-btn color="orange lighten-2" text @click="showConfirm = false, showDialog = true">next</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
export default {
    name: 'ExitCheck_Light',
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
            users:[
                '劇団綺畸', 'Theatre Mercury', '劇工舎プリズム', 'ESS Drama Section'
            ], /* ここはapiからcreatedでaxios.getで引いてくる */
            tab:0,
            showDialog:false,
            showConfirm:false
        }
    },
    computed:{
        completed () {
            const completed = []
            for (let i = 0; i < this.equipments.length; i++) {
                let count = 0
                for (let p = 0; p < this.equipments[i].length; p++) {
                    if (this.equipments[i][p].quant === '') {
                        count += 1
                    }
                }
                completed.push(count)
            }
            return completed
        },
        empty () {
            let sum = 0
            for (let i = 0; i < this.completed.length; i++) {
                sum += this.completed[i]
            }
            return sum
        }
    },
    watch: {
        completed () {
            for (let i = 0; i < this.completed.length; i++) {
                if (this.completed[i] === 0) {
                    this.divisions[i].done = true
                } else {
                    this.divisions[i].done = false
                }
            }
        }
    }
}
</script>
