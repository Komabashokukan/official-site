<template>
    <v-container>
        <v-card>
            <v-system-bar color="orange lighten-2"></v-system-bar>
            <v-container>
                <v-layout wrap>
                    <v-flex xs8 md10 class='text-left'>
                        <v-card-title>予備球管理表</v-card-title>
                    </v-flex>
                    <v-flex xs2 md1 class='pt-5'>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn text dark x-small color="blue" v-bind="attrs" v-on="on">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </template>
                            <span>個数の変更を記録する</span>
                        </v-tooltip>
                    </v-flex>
                    <v-flex xs2 md1 class='pt-5'>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn text dark x-small color="blue" v-bind="attrs" v-on="on">
                                    <v-icon>pageview</v-icon>
                                </v-btn>
                            </template>
                            <span>変更履歴を確認する</span>
                        </v-tooltip>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
        <v-card class='mt-1'>
            <v-list>
                <v-list-item v-for="lightbulb in lightbulbs" :key="lightbulb.name">
                    <v-list-item-content class="font-weight-bold text-left">
                        {{ lightbulb.name }}
                    </v-list-item-content>
                    <v-list-item-content>
                        {{ lightbulb.amount }}
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
    </v-container>
</template>
<script>
export default {
    name: 'Lightbulb',
    data () {
        return {
            lightbulbs:[
                { name: '500W', amount: 20 },
                { name: '1000W', amount: 15 },
                { name: '575W', amount: 30 }
            ]
        }
    }
}
</script>
