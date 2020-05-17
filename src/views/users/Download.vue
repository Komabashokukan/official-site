<template>
    <v-card>
        <v-card-title>ダウンロード</v-card-title>
        <v-card-subtitle>各種ファイルのダウンロードはこちらから行えます</v-card-subtitle>

        <v-container fluid fill-height>
            <v-layout wrap justify-center>

                <v-card>
                    <v-list two-line subheader class="text-left">
                        <template v-for="(item, index) in items">
                            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                            <v-divider v-else-if="item.divider" :key="index"></v-divider>
                            <v-tooltip right v-else :key="item.name">
                                <template v-slot:activator="{ on }">
                                    <v-list-item class="file-tile" v-on="on" @click="func()">
                                        <v-list-item-avatar>
                                            <v-icon :color="item.color">{{ item.icon }}</v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                                <span>{{ item.description }}</span>
                            </v-tooltip>
                        </template>
                    </v-list>
                </v-card>

            </v-layout>
        </v-container>

    </v-card>
</template>

<script>
export default {
    name: 'Download',
    computed: {
        items () {
            return [
                { header: '提出用書類' },
                { name: '継続使用計画書.pdf', link: '#', icon: 'mdi-pdf-box', color: 'red', description: '使用の1週間までに提出する使用の詳細を記載する書類です。' },
                { name: '舞台図.pdf', link: '#', icon: 'mdi-pdf-box', color: 'red', description: '舞台備品の配置を図示するためのテンプレートです。' },
                { name: '照明バトン図.pdf', link: '#', icon: 'mdi-pdf-box', color: 'red', description: '照明備品(灯体)の配置を図示するためのテンプレートです。' },
                { divider: true },
                { header: 'Excelデータ配布' },
                { name: '緊急連絡先一覧.xlsx', link: '#', icon: 'mdi-microsoft-excel', color: 'green darken-2', description: '使用に際して記入し、責任者が保管してください。' },
                { name: '使用計画書.xlsx', link: '#', icon: 'mdi-microsoft-excel', color: 'green darken-2', description: '使用計画書のExcel板データです。' },
                { divider: true },
                { header: 'その他' },
                { name: '照明回路図.pdf', link: '#', icon: 'mdi-pdf-box', color: 'red', description: '照明の回路図です。電力計算に活用して下さい。' }
            ]
        }
    },
    methods: {
        func () {
        }
    }
}
</script>

<style scoped>
.file-tile {
    padding-left: 60px;
    padding-right: 180px;
}

@media ( max-width: 960px ) {
    .file-tile {
        padding-left: 10px;
        padding-right: 10px;
    }
}

</style>
