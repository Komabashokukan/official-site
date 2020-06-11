<template>
    <v-container fluid fill-height class="black">
        <v-layout wrap justify-center>
            <v-flex md10>
                <v-form
                    ref="form"
                    v-model="valid"
                    :lazy-validation="lazy"
                >
                <v-card>
                    <v-system-bar color="blue lighten-4"></v-system-bar>
                    <v-toolbar flat>
                        <v-toolbar-title>退出チェック時点検表（使用全般&舞台部門）</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-banner>
                        <v-list>
                            <v-list-item class="text-left">
                                多目的ホールの使用後、この点検フォームに記入してください。
                            </v-list-item>
                            <v-list-item class="text-left">
                                項目に漏れがある場合や記入に虚偽が認められる場合は、利用停止を含めた処分の対象になりますのでご注意ください。
                            </v-list-item>
                            <v-list-item class="text-left">
                                なお、このチェックシートは提出した後は変更できませんので、提出前に必ずミスがないか確認してください。
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
                        <v-list-item-title align=left>
                            共用部分（玄関・ロビー・楽屋前廊下・階段室）
                        </v-list-item-title>
                        <v-container fluid>
                            <v-checkbox
                                v-model="checkbox1"
                                :rules="Rules"
                                :label="`ホールの玄関前の清掃は終わった（ゴミ拾い）`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox2"
                                :rules="Rules"
                                :label="`ロビーの清掃は終わった（床の雑巾がけ、エントランスマットをはたく）`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox3"
                                :rules="Rules"
                                :label="`楽屋前廊下の清掃は終わった（床の雑巾がけ）`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox4"
                                :rules="Rules"
                                :label="`階段室の清掃は終わった（床の雑巾がけ、三階まで）`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox5"
                                :rules="Rules"
                                :label="`掃除用具入れの中はきちんと整理して掃除用具が置かれている`"
                            >
                            </v-checkbox>
                        </v-container>
                    </v-container>
                    <v-container>
                        <v-list-item-title align=left>
                            トイレ（男子・女子・身障者・楽屋前）
                        </v-list-item-title>
                        <v-container fluid>
                            <v-checkbox
                                v-model="checkbox6"
                                :rules="Rules"
                                :label="`清掃（床の雑巾がけ、洗面台の掃除なども含む）は終わった`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox7"
                                :rules="Rules"
                                :label="`トイレの紙は切れていなかった`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox8"
                                :rules="Rules"
                                :label="`個室内のごみ箱にごみはなかった`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox9"
                                :rules="Rules"
                                :label="`水回りで詰まった個所はなかった`"
                            >
                            </v-checkbox>
                        </v-container>
                    </v-container>
                    <v-container>
                        <v-list-item-title align=left>
                            楽屋
                        </v-list-item-title>
                        <v-container fluid>
                            <v-checkbox
                                v-model="checkbox10"
                                :label="`楽屋１（雑巾がけ、洗面台の掃除、冷蔵庫内の掃除）は終わった`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox11"
                                :label="`楽屋２（雑巾がけ、洗面台の掃除、冷蔵庫内の掃除）は終わった`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox12"
                                :label="`使用しなかった`"
                            >
                            </v-checkbox>
                        </v-container>
                    </v-container>
                    <v-container>
                        <v-list-item-title align=left>
                            パイプ椅子
                        </v-list-item-title>
                        <v-container fluid>
                            <v-radio-group v-model="radios1" :mandatory="false">
                                <v-radio
                                    :label="`パイプ椅子は全て所定のラックにずれがないように重ねてのせた`"
                                >
                                </v-radio>
                                <v-radio
                                    :label="`使用しなかった`"
                                >
                                </v-radio>
                            </v-radio-group>
                        </v-container>
                    </v-container>
                    <v-container>
                        <v-list-item-title align=left>
                            長机
                        </v-list-item-title>
                        <v-container fluid>
                            <v-radio-group v-model="radios2" :mandatory="false">
                                <v-radio
                                    :label="`長机はすべて楽屋2の所定の位置に重ねて置いた。`"
                                >
                                </v-radio>
                                <v-radio
                                    :label="`使用しなかった`"
                                >
                                </v-radio>
                            </v-radio-group>
                        </v-container>
                    </v-container>
                    <v-container>
                        <v-list-item-title align=left>
                            蛇腹カーテン
                        </v-list-item-title>
                        <v-container fluid>
                            <v-radio-group v-model="radios3" :mandatory="false">
                                <v-radio
                                    :label="`蛇腹カーテンは全てたたんで楽屋２に収納した`"
                                >
                                </v-radio>
                                <v-radio
                                    :label="`使用しなかった`"
                                >
                                </v-radio>
                            </v-radio-group>
                        </v-container>
                    </v-container>
                </v-card>
                <v-card class="mt-3">
                    <v-card-title>ホール内部</v-card-title>
                    <v-card-subtitle align=left>
                        以下の項目を確認してください
                    </v-card-subtitle>
                    <v-container>
                        <v-list-item-title align=left>
                            1G
                        </v-list-item-title>
                        <v-container fluid>
                            <v-checkbox
                                v-model="checkbox13"
                                :rules="Rules"
                                :label="`床の雑巾がけは終わった`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox14"
                                :rules="Rules"
                                :label="`ホールの壁はホールに入った時の状態である`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox15"
                                :rules="Rules"
                                :label="`水銀灯に異常はなかった`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox16"
                                :rules="Rules"
                                :label="`ギャラリー下の照明に異常はなかった`"
                            >
                            </v-checkbox>
                        </v-container>
                    </v-container>
                    <v-container>
                        <v-list-item-title align=left>
                            2G
                        </v-list-item-title>
                        <v-container fluid>
                            <v-checkbox
                                v-model="checkbox17"
                                :rules="Rules"
                                :label="`清掃（床の雑巾がけ）は終わった`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox18"
                                :rules="Rules"
                                :label="`ギャラリー下灯（２Ｇ）・蛍光灯（３Ｇ）に異常はなかった`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox19"
                                :rules="Rules"
                                :label="`使用しなかった`"
                            >
                            </v-checkbox>
                        </v-container>
                    </v-container>
                </v-card>
                <v-card class="mt-3">
                    <v-card-title>舞台部品</v-card-title>
                    <v-card-subtitle align=left>
                        以下の項目を確認してください
                    </v-card-subtitle>
                    <v-container>
                        <v-list-item-title align=left>
                            今回、平台・箱馬を使用しましたか
                        </v-list-item-title>
                         <v-container fluid>
                            <v-radio-group v-model="radios4" :mandatory="false">
                                <v-radio
                                    :label="`はい`"
                                >
                                </v-radio>
                                <v-radio
                                    :label="`いいえ`"
                                >
                                </v-radio>
                            </v-radio-group>
                        </v-container>
                    </v-container>
                </v-card>
                <v-card class="mt-3">
                    <v-card-title>平台・箱馬</v-card-title>
                    <v-card-subtitle align=left>
                        以下の項目を確認してください
                    </v-card-subtitle>
                    <v-container>
                        <v-list-item-title align=left>
                            平台・箱馬
                        </v-list-item-title>
                        <v-container fluid>
                            <v-checkbox
                                v-model="checkbox20"
                                :rules="Rules"
                                :label="`平台は種類別に丁寧に重ねて、原状復帰ができている`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox21"
                                :rules="Rules"
                                :label="`箱馬は種類別に丁寧に重ねて、原状復帰ができている`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox22"
                                :rules="Rules"
                                :label="`平台や箱馬に何か接着する場合、劇場指定の養生テープを使った`"
                            >
                            </v-checkbox>
                            <v-checkbox
                                v-model="checkbox23"
                                :rules="Rules"
                                :label="`平台や箱馬に釘や養生テープが残っていないか確認した`"
                            >
                            </v-checkbox>
                        </v-container>
                        <v-container>
                            <v-list-item-title align=left>
                                今回のホール使用期間中に破損した平台・箱馬はありましたか
                            </v-list-item-title>
                            <v-container fluid>
                                <v-radio-group v-model="radios5" :mandatory="false">
                                    <v-radio
                                        :label="`あった`"
                                    >
                                    </v-radio>
                                    <v-radio
                                        :label="`なかった`"
                                    >
                                    </v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                        <v-container>
                            <v-list-item-title align=left>
                                破損の物数、破損したときの状況、破損後の現在の状況
                            </v-list-item-title>
                            <v-list-item-subtitle align=left>
                                破損があった場合のみ、具体的に記入してください。
                            </v-list-item-subtitle>
                            <v-text-field label="記入欄"></v-text-field>
                        </v-container>
                        <v-container>
                            <v-list-item-title align=left>
                                以下に、平台・箱馬の現数を数えて記入してください。
                            </v-list-item-title>
                            <v-list-item-subtitle align=left>
                                破損があるものもそれを含めた数を記入してください。名称、形状は別紙参照。
                            </v-list-item-subtitle>
                            <v-list-item-content>三次平台</v-list-item-content>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                            <v-list-item-content>二次平台</v-list-item-content>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                            <v-list-item-content>基礎平台</v-list-item-content>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                            <v-list-item-content>新々コン</v-list-item-content>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                            <v-list-item-content>新コン</v-list-item-content>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                            <v-list-item-content>旧コン</v-list-item-content>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                            <v-list-item-content>3×3平台</v-list-item-content>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                            <v-list-item-content>2×6平台</v-list-item-content>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                            <v-list-item-content>1×6平台</v-list-item-content>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                            <v-list-item-content>つかみ</v-list-item-content>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                            <v-list-item-content>四次箱馬</v-list-item-content>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                            <v-list-item-content>三次箱馬</v-list-item-content>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                            <v-list-item-content>二次箱馬</v-list-item-content>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                            <v-list-item-content>一次箱馬</v-list-item-content>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
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
                            <v-list-item-title align=left>
                                劇倉にある雑黒幕
                            </v-list-item-title>
                            <v-container fluid>
                                <v-checkbox
                                    v-model="checkbox24"
                                    :label="`雑黒幕は丁寧にたたんで、原状復帰ができている`"
                                >
                                </v-checkbox>
                                <v-checkbox
                                    v-model="checkbox25"
                                    :label="`雑黒幕を接着する場合、劇場指定の養生テープを使った`"
                                >
                                </v-checkbox>
                                <v-checkbox
                                    v-model="checkbox26"
                                    :label="`使用しなかった`"
                                >
                                </v-checkbox>
                            </v-container>
                        </v-container>
                        <v-container>
                            <v-list-item-title align=left>
                                １階倉庫にあるホール暗幕を使用しましたか（ホリゾント幕含む）
                            </v-list-item-title>
                            <v-container fluid>
                                <v-radio-group v-model="radios6" :mandatory="false">
                                    <v-radio
                                        :label="`はい`"
                                    >
                                    </v-radio>
                                    <v-radio
                                        :label="`いいえ`"
                                    >
                                    </v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                        <v-container>
                            <v-list-item-title align=left>
                                破損した雑黒幕はありましたか
                            </v-list-item-title>
                            <v-container fluid>
                                <v-radio-group v-model="radios7" :mandatory="false">
                                    <v-radio
                                        :label="`あった`"
                                    >
                                    </v-radio>
                                    <v-radio
                                        :label="`なかった`"
                                    >
                                    </v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                        <v-container>
                            <v-list-item-title align=left>
                                破損の物数、破損したときの状況、破損後の現在の状況
                            </v-list-item-title>
                            <v-list-item-subtitle align=left>
                                破損があった場合のみ、具体的に記入してください。
                            </v-list-item-subtitle>
                            <v-text-field label="記入欄"></v-text-field>
                        </v-container>
                        <v-container>
                            <v-list-item-title align=left>
                                １階倉庫にあるホール暗幕を使用しましたか（ホリゾント幕含む）
                            </v-list-item-title>
                            <v-container fluid>
                                <v-radio-group v-model="radios8" :mandatory="false">
                                    <v-radio
                                        :label="`はい`"
                                    >
                                    </v-radio>
                                    <v-radio
                                        :label="`いいえ`"
                                    >
                                    </v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                    </v-container>
                </v-card>
                <v-card class="mt-3">
                    <v-card-title>ホール幕</v-card-title>
                    <v-card-subtitle align=left>
                        以下の項目を確認してください
                    </v-card-subtitle>
                    <v-container>
                        <v-container>
                            <v-list-item-title align=left>
                                ホール暗幕は今回合わせて何枚使用しましたか
                            </v-list-item-title>
                            <v-text-field :rules="Rules" label="記入欄"></v-text-field>
                        </v-container>
                        <v-container>
                            <v-list-item-title align=left>
                                使用した幕の番号をすべて記入してください
                            </v-list-item-title>
                            <v-list-item-subtitle align=left>
                                例）18, 23, 30
                            </v-list-item-subtitle>
                            <v-list-item-content>1800幕</v-list-item-content>
                            <v-text-field label="記入欄"></v-text-field>
                            <v-list-item-content>2700幕</v-list-item-content>
                            <v-text-field label="記入欄"></v-text-field>
                            <v-list-item-content>3600幕</v-list-item-content>
                            <v-text-field label="記入欄"></v-text-field>
                        </v-container>
                        <v-container>
                            <v-list-item-title align=left>
                                ホリゾント幕を使用しましたか
                            </v-list-item-title>
                            <v-container fluid>
                                <v-radio-group v-model="radios9" :mandatory="false">
                                    <v-radio
                                        :label="`はい`"
                                    >
                                    </v-radio>
                                    <v-radio
                                        :label="`いいえ`"
                                    >
                                    </v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                        <v-container>
                            <v-list-item-title align=left>
                                ホール幕
                            </v-list-item-title>
                            <v-container fluid>
                                <v-checkbox
                                    v-model="checkbox27"
                                    :rules="Rules"
                                    :label="`「幕利用報告シート」への記入は済んでいますか（記入済みの場合はチェック）`"
                                >
                                </v-checkbox>
                                <v-checkbox
                                    v-model="checkbox28"
                                    :rules="Rules"
                                    :label="`幕をたたむとき、一回でもたたんだことがある人と一緒にたたみましたか（たたんだことがある人がいた場合はチェック）`"
                                >
                                </v-checkbox>
                            </v-container>
                        </v-container>
                        <v-container>
                            <v-list-item-title align=left>
                                破損した幕はありましたか
                            </v-list-item-title>
                            <v-list-item-subtitle align=left>
                                故意・過失は問いません
                            </v-list-item-subtitle>
                            <v-container fluid>
                                <v-radio-group v-model="radios10" :mandatory="false">
                                    <v-radio
                                        :label="`はい`"
                                    >
                                    </v-radio>
                                    <v-radio
                                        :label="`いいえ`"
                                    >
                                    </v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                        <v-container>
                            <v-list-item-title align=left>
                                破損した幕番号、破損したときの状況、破損後の現在の状況
                            </v-list-item-title>
                            <v-list-item-subtitle align=left>
                                あったと答えた場合のみ、具体的に記入してください。<br>
                                例）1800幕・26番、吊り時に誤って一階の鉄パイプに引っ掛けてしまい、現在中央に大穴が開いている状態。
                            </v-list-item-subtitle>
                            <v-text-field label="記入欄"></v-text-field>
                        </v-container>
                    </v-container>
                </v-card>
                <v-card class="mt-3">
                    <v-card-title>プロジェクター</v-card-title>
                    <v-card-subtitle align=left>以下の項目を確認してください</v-card-subtitle>
                    <v-container>
                        <v-container>
                            <v-list-item-title align=left>
                                今回プロジェクターを使用しましたか
                            </v-list-item-title>
                            <v-container fluid>
                                <v-radio-group v-model="radios11" :mandatory="false">
                                    <v-radio
                                        :label="`はい`"
                                    >
                                    </v-radio>
                                    <v-radio
                                        :label="`いいえ`"
                                    >
                                    </v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                        <v-container>
                            <v-list-item-title align=left>
                                プロジェクターおよびコード類
                            </v-list-item-title>
                            <v-list-item-subtitle align=left>
                                使用した場合のみ選択してください
                            </v-list-item-subtitle>
                            <v-container fluid>
                                <v-radio-group v-model="radios12" :mandatory="false">
                                    <v-radio
                                        :label="`異常があった`"
                                    >
                                    </v-radio>
                                    <v-radio
                                        :label="`異常はなかった`"
                                    >
                                    </v-radio>
                                </v-radio-group>
                            </v-container>
                        </v-container>
                        <v-container>
                             <v-list-item-title align=left>
                                具体的な異常の状態を記入してください
                            </v-list-item-title>
                            <v-list-item-subtitle align=left>
                                異常があったと答えた場合のみ、具体的に記入してください。
                            </v-list-item-subtitle>
                            <v-text-field label="記入欄"></v-text-field>
                        </v-container>
                    </v-container>
                </v-card>
                </v-form>

                <v-container>
                    <v-layout wrap justify-end>
                        <v-card-actions>
                            <v-btn class="mt-2" x-large v-on:click="submit">SUBMIT</v-btn>
                        </v-card-actions>
                    </v-layout>
                </v-container>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import moment from 'moment';
export default {
    name: 'ExitCheck',
    data () {
        return {
            valid: true,
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
            checkbox5: false,
            checkbox6: false,
            checkbox7: false,
            checkbox8: false,
            checkbox9: false,
            checkbox10: false,
            checkbox11: false,
            checkbox12: false,
            checkbox13: false,
            checkbox14: false,
            checkbox15: false,
            checkbox16: false,
            checkbox17: false,
            checkbox18: false,
            checkbox19: false,
            checkbox20: false,
            checkbox21: false,
            checkbox22: false,
            checkbox23: false,
            checkbox24: false,
            checkbox25: false,
            checkbox26: false,
            checkbox27: false,
            checkbox28: false,
            radios1: false,
            radios2: false,
            radios3: false,
            radios4: false,
            radios5: false,
            radios6: false,
            radios7: false,
            radios8: false,
            radios9: false,
            radios10: false,
            radios11: false,
            radios12: false,
            lazy: false,
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

</style>
