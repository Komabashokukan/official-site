<template>
    <v-container fluid fill-height class="white">
        <v-layout wrap justify-center>

            <v-flex md2 class="hidden-md-and-down"></v-flex>
            <v-flex md8 sm12 class="text-left mt-md-5">
                <h2>駒場小空間とは？</h2>
            </v-flex>
            <v-flex md2 class="hidden-md-and-down"></v-flex>

            <template v-for="card in cards">

                <v-flex md4 sm12 :key="card.title" class="ml-md-2 mr-md-2">
                    <v-card elevation="9">
                        <v-img :src="card.image" class="white--text align-end"
                                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                height="200px"
                        >
                            <v-card-title v-text="card.title"></v-card-title>
                        </v-img>

                        <v-card-subtitle class="text-left">
                            {{ card.description }}
                        </v-card-subtitle>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn text @click="card.open = true">{{ card.button }}</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>

                <v-dialog :key="card.dialog" v-model="card.open" class="white">
                    <v-card>
                        <v-card-actions>
                            <v-btn icon @click="card.open = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-actions>

                        <v-card-title>{{ card.title }}</v-card-title>
                        <Equipment v-if="card.dialog === 'Equipment'" />
                        <History v-if="card.dialog === 'History'" />

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn text @click="card.open = false">閉じる</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

            </template>

            <v-flex md12 class="order-last">
                Copyright {{ new Date().getFullYear() }} - {{ new Date().getFullYear() + 1 }} 多目的ホール総務部 All Rights Reserved.
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Equipment from '@/views/about/Equipment';
import History from '@/views/about/History';

export default {
    name: 'About',
    components: { Equipment, History },
    data () {
        return {
            cards : [
                {
                    title: '歴史',
                    image: '/static/hall_exterior.jpg',
                    description: '駒場小空間は、1997年、旧駒場寮の廃寮に伴い廃止された...',
                    button: '続きを見る',
                    open: false,
                    dialog: 'History'
                },
                {
                    title: '施設',
                    image: '/static/hall_interior.png',
                    description: '駒場小空間の施設概要を表示します。',
                    button: '説明を見る',
                    open: false,
                    dialog: 'Equipment'
                }
            ]
        }
    }
}

</script>

<style scoped>

</style>
