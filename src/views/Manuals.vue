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
                    </v-card>
                </v-dialog>

            </template>

        </v-layout>
    </v-container>
</template>

<script>
import PDFViewer from '@/components/PDFViewer';

export default {
    name: 'Manuals',
    components: { PDFViewer },
    data () {
        return {
            cards : [
                {
                    title: '利用の手引き',
                    icon: 'mdi-hand-right',
                    color: 'grey',
                    type: 'markdown',
                    link: '/static/pdf/earthquake.pdf',
                    open: false
                },
                {
                    title: '地震避難マニュアル',
                    icon: 'mdi-exit-run',
                    color: 'green darken-2',
                    type: 'pdf',
                    link: '/static/pdf/earthquake.pdf',
                    open: false
                },
                {
                    title: '火災避難マニュアル',
                    icon: 'mdi-fire',
                    color: 'red',
                    type: 'pdf',
                    link: '/static/pdf/fire.pdf',
                    open: false
                },
                {
                    title: 'FAQ(よくある質問)',
                    icon: 'mdi-comment-question-outline',
                    color: 'blue',
                    type: 'pdf',
                    link: '/static/pdf/fire.pdf',
                    open: false
                },
                {
                    title: '各種ガイドライン',
                    icon: 'mdi-alert',
                    color: 'yellow darken-2',
                    type: 'markdown',
                    link: '/static/pdf/fire.pdf',
                    open: false
                },
                {
                    title: '規則',
                    icon: 'mdi-cancel',
                    color: 'red darken-3',
                    type: 'markdown',
                    link: '/static/pdf/fire.pdf',
                    open: false
                }
            ]
        }
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
</style>
