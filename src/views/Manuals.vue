<template>
    <v-container fluid fill-height class="white">
        <v-layout wrap justify-space-around>

            <v-flex md12 sm12 class="text-left mt-md-5">
                <h2>使用に際して</h2>
            </v-flex>

            <template v-for="card in cards">

                <v-flex md3 sm6 xs12 :key="card.icon" class="ml-md-2 mr-md-2 mb-4 mb-0-md">
                    <v-card hover color="blue lighten-5" @click="card.open = true">

                        <v-avatar size="128px">
                            <v-icon size="96px" :color="card.color">{{ card.icon }}</v-icon>
                        </v-avatar>
                        <div class="text-center card-title pb-4" v-text="card.title"></div>

                    </v-card>
                </v-flex>

                <v-dialog :key="card.title" v-model="card.open" class="white">
                    <v-card>
                        <v-card-actions>
                            <v-btn icon @click="card.open = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-actions>

                        <v-card-title>{{ card.title }}</v-card-title>

                        <v-container v-if="card.type === 'pdf'">
                            <v-layout justify-center wrap>
                                <v-flex md10 class="pdfviewer-wrapper">
                                    <PDFViewer path="/lib" :url="card.link" class="pdfviewer" />
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-container v-else-if="card.type === 'markdown'">
                            <v-layout justify-center wrap>
                                <v-flex md7 sm12 class="order-md-2 bt-md-2">
                                    <v-card class="item ml-md-1 mt-md-2 mb-2 mb-md-0">
                                        <v-list two-line align="left" rounded>
                                            <template v-for="(item, index) in Items[card.link]">
                                                <template>
                                                    <v-divider :key="index"></v-divider>
                                                    <v-list-item :key="item.title" @click="open_item(item)">
                                                        <v-list-item-content>
                                                            <v-list-item-title v-html="item.title"></v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </template>
                                            </template>
                                        </v-list>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-dialog>

            </template>

            <v-dialog v-model="item_dialog">
                <v-card>
                    <v-card-actions>
                        <v-btn icon @click="item_dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-card-title>
                        {{ show_item.title }}
                    </v-card-title>

                    <v-card-text class="text-left mt-md-6" v-html="show_item.content" />

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="item_dialog = false">閉じる</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-flex md12 class="order-last">
                Copyright {{ new Date().getFullYear() }} - {{ new Date().getFullYear() + 1 }} 多目的ホール総務部 All Rights Reserved.
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
/* eslint camelcase: "off" */
import PDFViewer from '@/components/PDFViewer';
import marked from 'marked';

export default {
    name: 'Manuals',
    components: { PDFViewer },
    data () {
        return {
            Items:  { Guideline: [], FAQ: [] },
            show_item: {},
            item_dialog: null,
            cards : [
                {
                    title: '利用の手引き',
                    icon: 'mdi-hand-right',
                    color: 'grey',
                    type: 'markdown',
                    link: 'Guideline',
                    open: false
                },
                {
                    title: '地震避難マニュアル',
                    icon: 'mdi-exit-run',
                    color: 'green darken-2',
                    type: 'pdf',
                    link: 'https://official-site-static-files.s3-ap-northeast-1.amazonaws.com/pdf/Manuals/earthquake.pdf',
                    open: false
                },
                {
                    title: '火災避難マニュアル',
                    icon: 'mdi-fire',
                    color: 'red',
                    type: 'pdf',
                    link: 'https://official-site-static-files.s3-ap-northeast-1.amazonaws.com/pdf/Manuals/fire.pdf',
                    open: false
                },
                {
                    title: 'FAQ(よくある質問)',
                    icon: 'mdi-comment-question-outline',
                    color: 'blue',
                    type: 'markdown',
                    link: 'FAQ',
                    open: false
                },
                {
                    title: '各種ガイドライン',
                    icon: 'mdi-alert',
                    color: 'yellow darken-2',
                    type: 'markdown',
                    link: 'Guideline',
                    open: false
                },
                {
                    title: '規則',
                    icon: 'mdi-cancel',
                    color: 'red darken-3',
                    type: 'markdown',
                    link: 'Regulation',
                    open: false
                }
            ],
            fetch_from_kibela (folder) {
                this.axios.get(process.env.VUE_APP_KIBELA_API + folder)
                    .then(response => {
                        console.log(response)
                        for (const edge of response.data) {
                            this.Items[folder].push({
                                title: edge.node.title,
                                active: false,
                                content: marked(edge.node.content)
                            });
                        }
                    });
            }
        }
    },
    methods: {
        open_item (item) {
            this.show_item = item;
            this.item_dialog = true;
        }
    },
    mounted () {
        this.fetch_from_kibela('Guideline')
        this.fetch_from_kibela('FAQ')
        this.fetch_from_kibela('Regulation')
    }
}

</script>

<style scoped>

.card-title {
    font-size: 18pt;
}

.pdfviewer-wrapper {
    height: 75vh;
}
@media (max-height: 960px) {
    .pdfviewer-wrapper {
        height: 100vh;
    }
}
.pdfviewer {
    width: 100%;
    height: 100%;
}
.item {
    overflow-y: scroll;
    /* max-height: 45vh; */
}
</style>
