<template>
    <v-card>
        <v-card-title>フォーム</v-card-title>
        <v-card-subtitle>各種申請フォームはこちらです。</v-card-subtitle>

        <v-container>
            <v-layout wrap justify-space-around>

                <v-flex md3 v-for="item in items" :key="item.title" class="ml-4 mr-4 ml-md-2 mr-md-2 mb-4">
                    <v-card align="center" class="pt-4" :to="item.to">
                        <v-avatar tile size="96px" class="blue lighten-1">
                            <v-icon color="white" size="84px">
                                {{ item.icon }}
                            </v-icon>
                        </v-avatar>

                        <div class="text-center form-title mx-2">{{ item.title }}</div>
                    </v-card>
                </v-flex>

            </v-layout>
        </v-container>

    </v-card>
</template>

<script>
export default {
    name: 'Form',
    computed: {
        items () {
            return [
                { title: '継続使用申請書', to: '/form/reservation_request', icon: 'mdi-file-document' },
                { title: '継続使用計画書', to: '/form/project_plan', icon: 'mdi-calendar-multiple-check' },
                { title: '時間外使用申請書', to: '/form/overtime_use', icon: 'mdi-table-clock' },
                { title: '退出時点検表(舞台部門)', to: '/form/exit_check', icon: 'mdi-format-list-checks' },
                { title: '退出時点検表(照明部門)', to: '/form/exit_check_light', icon: 'mdi-format-list-checks' },
                { title: '退出時点検表(音響部門)', to: '/form/exit_check_sound', icon: 'mdi-format-list-checks' },
                { title: '同意書', to: '/form/consent', icon: 'mdi-badge-account-horizontal-outline' }
            ]
        }
    }
}
</script>

<style scoped>

.form-title {
    font-size: 16pt;
}

</style>
