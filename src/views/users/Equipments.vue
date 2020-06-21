<template>
    <v-card>
        <v-card-title>備品</v-card-title>
        <v-card-subtitle>各種備品の数・状態が確認できます</v-card-subtitle>
        <v-container fluid fill-height>
            <v-layout wrap justify-center>
                <v-card>
                    <v-list two-line subheader class="text-left">
                        <template v-for="(item, index) in items">
                            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
                            <v-divider v-else-if="item.divider" :key="index"></v-divider>
                            <v-tooltip right v-else :key="item.name">
                                <template v-slot:activator="{ on }">
                                    <v-list-item class="file-tile" v-on="on" :to="item.to">
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
    name: 'Equipments',
    computed: {
        items () {
            return [
                { header: '舞台' },
                { name: '舞台備品一覧', to: '#', icon: 'mdi-screw-machine-round-top', color: 'blue lighten-2', description: '最新の舞台備品の数が確認できます。' },
                { divider: true },
                { header: '音響' },
                { name: '音響備品一覧', to: '#', icon: 'mdi-music-note', color: 'green lighten-1', description: '最新の音響機材の数が確認できます。' },
                { divider: true },
                { header: '照明' },
                { name: '照明備品一覧', to: '/equipments/equipment_light', icon: 'mdi-lightbulb-on', color: 'orange lighten-2', description: '最新の照明機材の数が確認できます。' },
                { name: '機材管理表', to: '/equipments/equipment_log_light', icon: 'mdi-lightbulb-on', color: 'orange lighten-2', description: '過去の退出チェックの確認・修正はこちらからできます。' },
                { name: '予備球管理表', to: '/equipments/lightbulb', icon: 'mdi-lightbulb-on', color: 'orange lighten-2', description: '予備球の確認・修正はこちらからできます。' }
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
