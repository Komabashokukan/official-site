<template>
    <v-container fluid fill-height class="black">
        <v-row justify="center">
            <v-col md="10">
                <v-card>
                    <v-system-bar color="blue lighten-4"></v-system-bar>
                    <v-toolbar flat>
                        <v-toolbar-title>継続使用申請書</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-banner>
                        <v-list>
                            <v-list-item class="text-left">
                                使用する２期前定例会1週間前までに回答すること。最初に回答するメールアドレスに回答のコピーが送信される。
                            </v-list-item>
                            <v-list-item class="text-left">
                                提出後、訂正のある場合は多目的ホール総務部(komabashokukan%gmail.com)まで連絡すること。(%を@に変えてください)
                            </v-list-item>
                        </v-list>
                    </v-banner>
                </v-card>

                <v-card class="mt-3">
                    <v-card-title>基本情報</v-card-title>
                    <v-card-text class="text-left ml-5">公演などは外に公開する名称や企画名。練習・リハはその旨がわかるようにする。</v-card-text>
                    <v-container>
                        <v-row justify="center">
                            <!--<v-col md="5">
                                <v-text-field v-model="group_name" label="利用団体名"></v-text-field>
                                <v-text-field v-model="responsible" label="使用責任者"></v-text-field>
                                <v-text-field v-model="phone_number" label="メールアドレス"></v-text-field>
                                <v-text-field v-model="phone_number" label="連絡先メールアドレス(代表者がなるべく使用するもの)"></v-text-field>
                            </v-col>-->
                            <v-col md="6">
                                <v-text-field v-model="phone_number" label="催事・公演名"></v-text-field>
                            </v-col>
                            <v-col md="4">
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
                            </v-col>
                        </v-row>
                    </v-container>

                </v-card>

                <v-card class="mt-3">
                        <v-card-title>部門責任者</v-card-title>
                            <v-card-text class="text-left ml-5">※部門責任者の氏名を記入。問題が発生した際、責任者に責任を問い、責任者にその能力がない場合代理責任者の責任を問う。</v-card-text>
                            <v-card-text class="text-left ml-5">※「なし」の場合は代理責任者に責任者経験者を立てること。困難な場合、必ず多目的ホール総務部まで連絡。</v-card-text>
                        <v-container>
                        </v-container>
                    <v-divider></v-divider>
                </v-card>
                <v-card v-for="section in sections" :key="section.name">
                    <v-container>
                        <v-card-title class="ml-4 subtitle-1 text--secondary">【{{section.name}}】</v-card-title>
                        <v-row  justify="center">
                            <v-col md="5">
                                <v-text-field v-model="section.responsible" :label="section.name+'部門責任者'"></v-text-field>
                            </v-col>
                            <v-col md="5">
                                <v-text-field v-model="section.proxy" :label="section.name+'部門代理責任者'"></v-text-field>
                            </v-col>
                            <v-col md="5">
                                <v-radio-group row v-model="section.exp" :mandatory="true">
                                    <span>責任者経験:</span>
                                    <v-radio class="ml-3" label="経験なし"></v-radio>
                                    <v-radio label="経験あり"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-divider></v-divider>
                </v-card>

                <v-card class="mt-3">
                        <v-card-title>使用備品</v-card-title>
                        <v-card-text class="text-lef ml-5t">使用する備品にチェックをつけてください。</v-card-text>
                    <v-container>
                    </v-container>
                    <v-divider></v-divider>
                </v-card>
                <v-card>
                    <v-container>
                        <v-card-title class="ml-4 subtitle-1 text--secondary">【使用設備1】</v-card-title>
                        <v-row justify="center">
                                <v-col v-for="equipment in equipments_1" :key="equipment.name" md="4" >
                                    <v-checkbox
                                        :label="equipment.name"
                                        class="d-inline-flex"
                                        >
                                    </v-checkbox>
                                </v-col>
                        </v-row>
                    </v-container>
                <v-divider></v-divider>
                </v-card>
                <v-card>
                    <v-container>
                        <v-card-title class="ml-4 subtitle-1 text--secondary">【使用設備2】</v-card-title>
                        <v-row justify="center">
                                <v-col v-for="equipment in equipments_2" :key="equipment.name" md="4" >
                                    <v-checkbox
                                        :label="equipment.name"
                                        class="d-inline-flex"
                                        >
                                    </v-checkbox>
                                </v-col>
                        </v-row>
                    </v-container>
                <v-divider></v-divider>
                </v-card>

                <v-card class="mt-3">
                    <v-card-title>参加予定人数</v-card-title>
                    <v-container>
                        <v-row justify="center">
                            <v-col class="ma-5" md="3" v-for="member in members" :key="member.type">
                                <v-text-field v-model="member.number" :label="member.type"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>

                <v-card class="mt-3">
                    <v-card-title>公演日・公演回数・予定観客数</v-card-title>
                    <v-container>
                        <v-row justify="center">
                            <v-col  md="4">
                                <v-menu
                                    ref="perfo_menu"
                                    v-model="perfo_menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="perfo_dates"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        v-model="perfo_dates"
                                        multiple
                                        label="公演予定日"
                                        prepend-icon="event"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="perfo_dates" multiple no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="perfo_menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="$refs.perfo_menu.save(perfo_dates)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col md="3">
                                <v-text-field v-model="perfo_cont" label="公演回数"></v-text-field>
                            </v-col>
                            <v-col md="3">
                                <v-text-field v-model="audience" label="予定観客数(1公演あたり)"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>

                <v-card class="mt-3">
                    <v-card-title>時間外利用</v-card-title>
                    <v-card-text class="text-left ml-5">時間外利用はあるか。ある場合は<a href="/form/overtime_use" target="_blank" class="blue--text">時間外使用申請</a>を別途提出。</v-card-text>
                    <v-container>
                        <v-row justify="center">
                        <v-radio-group row v-model="overtime_use" :mandatory="true">
                            <v-radio class="ml-5 mr-5" label="なし"></v-radio>
                            <v-radio class="ml-5 mr-5" label="あり"></v-radio>
                        </v-radio-group>
                        </v-row>
                    </v-container>
                </v-card>

                <v-container>
                    <v-layout wrap justify-end>
                        <v-btn class="mt-2" x-large>SUBMIT</v-btn>
                    </v-layout>
                </v-container>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import moment from 'moment';
export default {
    name: 'ReservationRequest',
    data () {
        return {
            group_name: '',
            responsible: '',
            phone_number: '',
            perfo_count: '',
            menu: false,
            perfo_menu: false,
            overtime_use:false,
            dates: [],
            perfo_dates:[],
            schedules: [
                {
                    date: '2019-01-02',
                    number: 0,
                    reason: '',
                    equip: [],
                    range: [0, 23]
                }
            ],
            sections:[
                { name:'舞台', responsible:'', proxy:'', exp:false },
                { name:'照明', responsible:'', proxy:'', sexp:false },
                { name:'音響', responsible:'', proxy:'', exp:false }
            ],
            equipments_1:[
                { name:'楽屋　　　　', use:false },
                { name:'椅子　　　　　　　', use:false },
                { name:'クッション（黒）', use:false },
                { name:'長机　　　　', use:false },
                { name:'蛇腹カーテン　　　', use:false },
                { name:'使用しない　　　', use:false } // インデントはcheckboxの位置合わせ
            ],
            equipments_2:[
                { name:'2Fギャラリー', use:false },
                { name:'3Fキャットウォーク', use:false },
                { name:'調光室　　　　　', use:false },
                { name:'屋内倉庫　　', use:false },
                { name:'舞台用備品　　　　', use:false },
                { name:'音響用備品　　　', use:false },
                { name:'照明用備品　', use:false },
                { name:'映像用備品　　　　', use:false },
                { name:'使用しない　　　', use:false } // インデントはcheckboxの位置合わせ
            ],
            members:[
                { type:'本学生', number:'' },
                { type:'他大生', number:'' },
                { type:'一般(社会人など)', number:'' }
            ]
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
