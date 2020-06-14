<template>
    <v-container fluid fill-height class="black">
        <v-layout wrap justify-center>
            <v-flex>
                <v-form
                    ref="form"
                    v-model="valid"
                    :lazy-validation="lazy"
                >
                <v-card class="mt-3">
                    <v-system-bar color="blue lighten-4"></v-system-bar>
                    <v-card-title>退出時点検表</v-card-title>
                    <v-card-subtitle align=left class="Section_title">（使用一般&舞台部門）</v-card-subtitle>
                    <v-banner>
                        <v-list>
                            <v-list-item v-for="item in items_ExitCheck" :key="item" class="text-left">
                                <v-list-item-content>
                                    <v-flex>{{ item }}</v-flex>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-banner>
                </v-card>

                <v-card class="mt-3">
                    <v-card-title>基本情報</v-card-title>
                    <v-container>
                        <v-layout wrap justify-space-around>
                            <v-flex md5>
                                <v-text-field v-model="group_name" :rules="Rules" label="利用団体名" required></v-text-field>
                                <v-text-field v-model="responsible" :rules="Rules" label="使用責任者"></v-text-field>
                                <v-text-field v-model="phone_number" :rules="Rules" label="携帯電話番号"></v-text-field>
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
                                                label=" 使用終了日"
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
                                <v-text-field :rules="Rules" label="使用終了時刻"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>

                </v-card>
                <v-card class="mt-3">
                    <v-card-title>一般設備</v-card-title>
                    <v-card-subtitle align=left>
                        以下の項目を確認してください
                    </v-card-subtitle>
                    <v-container>
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left><!-- フォントサイズの変更がよくわからなかったのでcard-title2クラスを作った -->
                                共用部分
                            </v-card-title>
                            <v-card-subtitle class="px-1" align=left>玄関・ロビー・楽屋前廊下・階段室</v-card-subtitle>
                            <v-container fluid>
                                <v-checkbox
                                    v-for="box in public_area"
                                    :key="box.value"
                                    :rules="Rules"
                                    :label="box.text"
                                >
                                </v-checkbox>
                            </v-container>
                        </v-container>
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                トイレ
                            </v-card-title>
                            <v-card-subtitle class="px-1" align=left>男子・女子・身障者・楽屋前</v-card-subtitle>
                            <v-container fluid>
                                <v-checkbox
                                    v-for="box in toilet"
                                    :key="box.value"
                                    :rules="Rules"
                                    :label="box.text"
                                >
                                </v-checkbox>
                            </v-container>
                        </v-container>
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                楽屋
                            </v-card-title>
                            <v-container fluid>
                                <v-radio-group v-model="Dressingroom_Use" :mandatory="true">
                                    <v-radio :label="'使用しなかった'"></v-radio>
                                    <v-radio :label="'使用した'"></v-radio>
                                </v-radio-group>
                            </v-container>
                            <v-container fluid v-if="Dressingroom_Use">
                                <v-checkbox
                                    v-for="box in dressing_room"
                                    :rules="Rules"
                                    :key="box"
                                    :label="box.text"
                                >
                                </v-checkbox>
                            </v-container>
                        </v-container>
                        <v-container v-for="item in equipments" :key=item>
                            <v-card-title class="px-1 card-title2" align=left>
                                {{ item.title }}
                            </v-card-title>
                            <v-container fluid>
                                <v-radio-group :mandatory="true">
                                    <v-radio :label="'使用しなかった'"></v-radio>
                                    <v-radio :label="item.text"></v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                    </v-container>
                </v-card>
                <v-card class="mt-3">
                    <v-card-title>ホール内部</v-card-title>
                    <v-card-subtitle align=left>
                        以下の項目を確認してください
                    </v-card-subtitle>
                    <v-container>
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                1G
                            </v-card-title>
                            <v-container fluid>
                                <v-checkbox
                                    v-for="box in G1"
                                    :key="box.value"
                                    :rules="Rules"
                                    :label="box.text"
                                >
                                </v-checkbox>
                            </v-container>
                        </v-container>
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                2G
                            </v-card-title>
                            <v-container fluid>
                                <v-checkbox
                                    v-for="box in G2"
                                    :key="box.value"
                                    :rules="Rules"
                                    :label="box.text"
                                >
                                </v-checkbox>
                            </v-container>
                        </v-container>
                    </v-container>
                </v-card>
                <v-card class="mt-3">
                    <v-card-title>舞台部品</v-card-title>
                    <v-card-subtitle align=left>
                        以下の項目を確認してください
                    </v-card-subtitle>
                    <v-container>
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                平台・箱馬を使用しましたか
                            </v-card-title>
                            <v-container fluid>
                                <v-radio-group v-model="Hiradai_Hakouma_Use" :mandatory="true">
                                    <v-radio :label="`いいえ`"></v-radio>
                                    <v-radio :label="`はい`"></v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                    </v-container>
                    <v-container v-if="Hiradai_Hakouma_Use">
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                平台・箱馬
                            </v-card-title>
                            <v-container fluid>
                                <v-checkbox
                                    v-for="box in Hiradai_Hakouma"
                                    :key="box.value"
                                    :rules="Rules"
                                    :label="box.text"
                                >
                                </v-checkbox>
                            </v-container>
                        </v-container>
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                今回のホール使用期間中に破損した平台・箱馬はありましたか
                            </v-card-title>
                            <v-container fluid>
                                <v-radio-group v-model="Hiradai_Hakouma_Damage" :mandatory="true">
                                    <v-radio :label="'いいえ'"></v-radio>
                                    <v-radio :label="'はい'"></v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                        <v-container v-if="Hiradai_Hakouma_Damage">
                            <v-card-title class="px-1 card-title2" align=left>
                                破損の物数、破損したときの状況、破損後の現在の状況
                            </v-card-title>
                            <v-card-subtitle class="px-1" align=left>
                                破損があった場合のみ、具体的に記入してください。
                            </v-card-subtitle>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                        </v-container>
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                以下に、平台・箱馬の現数を数えて記入してください。
                            </v-card-title>
                            <v-card-subtitle class="px-1" align=left>
                                破損があるものもそれを含めた数を記入してください。名称、形状は別紙参照。
                            </v-card-subtitle>
                            <v-list-item-content>
                                <v-flex md11 v-for="type in Hiradai_Hakouma_Type" :key=type>
                                    <v-card-title class="px-1 card-title2" align=left>{{ type.text }}</v-card-title>
                                    <v-container>
                                        <v-text-field :rules="Rules" label="個数" type="number" suffix="個"></v-text-field>
                                    </v-container>
                                </v-flex>
                            </v-list-item-content>
                        </v-container>
                    </v-container>
                </v-card>
                <v-card class="mt-3">
                    <v-card-title>幕</v-card-title>
                    <v-card-subtitle align=left>
                        以下の項目を確認してください
                    </v-card-subtitle>
                    <v-container>
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                劇倉にある雑黒幕
                            </v-card-title>
                            <v-container fluid>
                                <v-radio-group v-model="Black_Curtain_Use" :mandatory="true">
                                    <v-radio :label="'使用しなかった'"></v-radio>
                                    <v-radio :label="'使用した'"></v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                        <v-container v-if="Black_Curtain_Use">
                            <v-container fluid>
                                <v-checkbox
                                    v-for="box in Black_Curtain"
                                    :rules="Rules"
                                    :key="box"
                                    :label="box.text"
                                >
                                </v-checkbox>
                            </v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                破損した雑黒幕はありましたか
                            </v-card-title>
                            <v-container fluid>
                                <v-radio-group v-model="Black_Curtain_Damage" :mandatory="true">
                                    <v-radio :label="'なかった'"></v-radio>
                                    <v-radio :label="'あった'"></v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                        <v-container v-if="Black_Curtain_Damage">
                            <v-card-title class="px-1 card-title2" align=left>
                                破損の物数、破損したときの状況、破損後の現在の状況
                            </v-card-title>
                            <v-card-subtitle class="px-1" align=left>
                                破損があった場合のみ、具体的に記入してください。
                            </v-card-subtitle>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                        </v-container>
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                １階倉庫にあるホール暗幕を使用しましたか（ホリゾント幕含む）
                            </v-card-title>
                            <v-container fluid>
                                <v-radio-group v-model="Hall_Curtain_Use" :mandatory="true">
                                    <v-radio :label="'いいえ'"></v-radio>
                                    <v-radio :label="'はい'"></v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                    </v-container>
                </v-card>
                <v-card class="mt-3" v-if="Hall_Curtain_Use">
                    <v-card-title>ホール幕</v-card-title>
                    <v-card-subtitle align=left>
                        以下の項目を確認してください
                    </v-card-subtitle>
                    <v-container>
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                ホール暗幕は今回合わせて何枚使用しましたか
                            </v-card-title>
                            <v-text-field :rules="Rules" label="枚数" suffix="枚" type="number"></v-text-field>
                        </v-container>
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                使用した幕の番号をすべて選択してください
                            </v-card-title>
                            <v-container v-for="item in Hall_Curtain" :key=item algn=left>
                                <v-list-item>{{ item.text }}</v-list-item>
                                <v-btn-toggle multiple left>
                                    <v-flex>
                                        <v-btn
                                            v-for="number of item.value"
                                            :key=number
                                            class="mr-2 mt-2 btn-size"
                                        >
                                        {{ number }}
                                        </v-btn>
                                    </v-flex>
                                </v-btn-toggle>
                            </v-container>
                        </v-container>
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                ホリゾント幕を使用しましたか
                            </v-card-title>
                            <v-container fluid>
                                <v-radio-group :mandatory="true">
                                    <v-radio :label="'いいえ'"></v-radio>
                                    <v-radio :label="'はい'"></v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                ホール幕
                            </v-card-title>
                            <v-container fluid >
                                <v-checkbox
                                    v-for="item in Hall_Curtain_Check"
                                    :key=item
                                    :rules="Rules"
                                    :label="item.text"
                                >
                                </v-checkbox>
                            </v-container>
                        </v-container>
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                破損した幕はありましたか
                            </v-card-title>
                            <v-card-subtitle align=left>
                                故意・過失は問いません
                            </v-card-subtitle>
                            <v-container fluid>
                                <v-radio-group v-model="Hall_Curtain_Damage" :mandatory="true">
                                    <v-radio :label="'いいえ'"></v-radio>
                                    <v-radio :label="'はい'"></v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                        <v-container v-if="Hall_Curtain_Damage">
                            <v-card-title class="px-1 card-title2" align=left>
                                破損した幕番号、破損したときの状況、破損後の現在の状況
                            </v-card-title>
                            <v-card-subtitle class="px-1" align=left>
                                あったと答えた場合のみ、具体的に記入してください。<br>
                                例）1800幕・26番、吊り時に誤って一階の鉄パイプに引っ掛けてしまい、現在中央に大穴が開いている状態。
                            </v-card-subtitle>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                        </v-container>
                    </v-container>
                </v-card>
                <v-card class="mt-3">
                    <v-card-title>プロジェクター</v-card-title>
                    <v-card-subtitle align=left>以下の項目を確認してください</v-card-subtitle>
                    <v-container>
                        <v-container>
                            <v-card-title class="px-1 card-title2" align=left>
                                今回プロジェクターを使用しましたか
                            </v-card-title>
                            <v-container fluid>
                                <v-radio-group v-model="Projector_Use" :mandatory="true">
                                    <v-radio :label="`いいえ`"></v-radio>
                                    <v-radio :label="`はい`"></v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                        <v-container v-if="Projector_Use">
                            <v-card-title class="px-1 card-title2" align=left>
                                プロジェクターおよびコード類
                            </v-card-title>
                            <v-card-subtitle class="px-1" align=left>
                                使用した場合のみ選択してください
                            </v-card-subtitle>
                            <v-container fluid>
                                <v-radio-group v-model="Projector_Damage" :mandatory="true">
                                    <v-radio :label="'異常はなかった'"></v-radio>
                                    <v-radio :label="'異常があった'"></v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                        <v-container v-if="Projector_Damage">
                             <v-card-title class="px-1 card-title2" align=left>
                                具体的な異常の状態を記入してください
                            </v-card-title>
                            <v-card-subtitle align=left>
                                異常があったと答えた場合のみ、具体的に記入してください。
                            </v-card-subtitle>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                        </v-container>
                    </v-container>
                </v-card>
                </v-form>

            </v-flex>

            <v-container>
                <v-btn fixed right dark bottom class="mt-2 blue lighten-2" x-large v-on:click="submit">SUBMIT</v-btn>
            </v-container>

        </v-layout>

    </v-container>
</template>

<script>
import moment from 'moment';
export default {
    name: 'ExitCheck_Sound',
    data () {
        return {
            valid: true,
            items_ExitCheck: [
                '多目的ホールの使用後、この点検フォームに記入してください。',
                '項目に漏れがある場合や記入に虚偽が認められる場合は、利用停止を含めた処分の対象になりますのでご注意ください。',
                'なお、このチェックシートは提出した後は変更できませんので、提出前に必ずミスがないか確認してください。'
            ],
            public_area: [
                { text: 'ホールの玄関前の清掃は終わった（ゴミ拾い）' },
                { text: 'ロビーの清掃は終わった（床の雑巾がけ、エントランスマットをはたく）' },
                { text: '楽屋前廊下の清掃は終わった（床の雑巾がけ）' },
                { text: '階段室の清掃は終わった（床の雑巾がけ、三階まで）' },
                { text: '掃除用具入れの中はきちんと整理して掃除用具が置かれている' }
            ],
            toilet: [
                { text: '清掃（床の雑巾がけ、洗面台の掃除なども含む）は終わった' },
                { text: 'トイレの紙は切れていなかった' },
                { text: '個室内のごみ箱にごみはなかった' },
                { text: '水回りで詰まった個所はなかった' }
            ],
            dressing_room: [
                { text: '楽屋１（雑巾がけ、洗面台の掃除、冷蔵庫内の掃除）は終わった' },
                { text: '楽屋２（雑巾がけ、洗面台の掃除、冷蔵庫内の掃除）は終わった' }
            ],
            equipments: [
                { title: 'パイプ椅子', text: 'パイプ椅子はすべて所定のラックにずれがないように重ねておいた' },
                { title: '長机', text: '長机はすべて楽屋２の所定の位置に重ねておいた' },
                { title: '蛇腹カーテン', text: '蛇腹カーテンはすべてたたんで楽屋２に収納した' }
            ],
            G1: [
                { text: '清掃（床の雑巾がけ）は終わった' },
                { text: 'ホールの壁はホールに入った時の状態である' },
                { text: '水銀灯に異常はなかった' },
                { text: 'ギャラリー下の照明に異常はなかった' }
            ],
            G2: [
                { text: '清掃（床の雑巾がけ）は終わった' },
                { text: 'ギャラリー下灯（2G）・蛍光灯（３G）に異常はなかった' },
                { text: '使用しなかった' }
            ],
            Hiradai_Hakouma: [
                { text: '平台は種類別に丁寧に重ねて、原状復帰ができている' },
                { text: '箱馬は種類別に丁寧に重ねて、原状復帰ができている' },
                { text: '平台や箱馬に何か接着する場合、劇場指定の養生テープを使った' },
                { text: '平台や箱馬に釘や養生テープが残っていないか確認した' }
            ],
            Hiradai_Hakouma_Type: [
                { text: '三次平台' },
                { text: '二次平台' },
                { text: '基礎平台' },
                { text: '新々コン' },
                { text: '新コン' },
                { text: '旧コン' },
                { text: '3×3平台' },
                { text: '2×6平台' },
                { text: '1×6平台' },
                { text: 'つかみ' },
                { text: '四次箱馬' },
                { text: '三次箱馬' },
                { text: '二次箱馬' },
                { text: '一次箱馬' }
            ],
            Black_Curtain: [
                { text: '雑黒幕は丁寧にたたんで、原状復帰ができている' },
                { text: '雑黒幕を接着する場合、劇場指定の養生テープを使った' }
            ],
            Hall_Curtain: [
                { text: '1800幕', value: 42 },
                { text: '2700幕', value: 9 },
                { text: '3600幕', value: 15 }
            ],
            Hall_Curtain_Check: [
                { text: '「幕利用報告シート」への記入は済んでいますか（記入済みの場合はチェック）' },
                { text: '幕をたたむとき、一回でもたたんだことがある人と一緒にたたみましたか（たたんだことがある人がいた場合はチェック）' }
            ],
            Dressingroom_Use: false,
            Hiradai_Hakouma_Use: false,
            Hiradai_Hakouma_Damage: false,
            Black_Curtain_Use: false,
            Black_Curtain_Damage: false,
            Hall_Curtain_Use: false,
            Hall_Curtain_Damage: false,
            Projector_Use: false,
            Projector_Damage: false,
            success: false,
            group_name: '',
            Rules: [
                v => !!v || '必須項目です'
            ],
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
        },
        submit () {
            if (this.$refs.form.validate()) {
                // すべてのバリデーションが通過したときのみ
                // if文の中に入る
                this.success = true;
            } else {
                this.success = false;
            }
        }
    }
}
</script>

<style scoped>

.card-title2{
    font-size: 16px;
}
.btn-size{
    width: 20px;
    height: 20px;
}
.Section_title{
    opacity: 1;
    font-size: 20px;
}
</style>
