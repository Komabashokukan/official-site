<template>
    <v-app>
        <!--
            <div>
                <a v-for="item in items" :key="item.date">
                    <div>{{ item.date }} {{ item.title }}</div>
                </a>
            </div>
        -->
    </v-app>
</template>

<script>
export default {
    name: 'Info',
    computed: {
        items () {
            return [
                { date: '2020-05-01', link: '#', title: '緊急事態宣言の発令に伴う閉館期間の延長について(再延長)', active: false },
                { date: '2020-04-10', link: '#', title: '緊急事態宣言の発令に伴う閉館期間の延長について', active: false },
                { date: '2020-03-27', link: '#', title: '駒場キャンパスの「ステージ・オレンジ」への移行に係る閉館期間の延長について', active: false },
                { date: '2020-03-03', link: '#', title: '新型コロナウイルスの感染拡大に伴う多目的ホールの使用中止について', active: false },
                { date: '2020-03-02', link: '#', title: '新型コロナウイルスの感染拡大に伴う多目的ホールの使用中止について', active: false },
                { date: '2020-03-01', link: '#', title: '新型コロナウイルスの感染拡大に伴う多目的ホールの使用中止について', active: false },
                { date: '2020-02-29', link: '#', title: '新型コロナウイルスの感染拡大に伴う多目的ホールの使用中止について', active: false }
            ]
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
