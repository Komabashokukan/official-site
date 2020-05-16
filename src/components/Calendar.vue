<template>
    <div class="info">
        <h3 class="text-left">お知らせ</h3>
        <div class="list-group justify-content-left">
            <a v-for="item in items" :key="item.date" :href="item.link" class="list-group-item align-items-left" :class="item.active">
                 <div class="d-flex w-100">
                     <span class="text-left text-nowrap align-middle">{{ item.date }}</span>
                     <span class="title text-left">{{ item.title }}</span>
                 </div>
            </a>
        </div>
    </div>
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
                { date: '2020-03-03', link: '#', title: '新型コロナウイルスの感染拡大に伴う多目的ホールの使用中止について', active: false },
                { date: '2020-03-03', link: '#', title: '新型コロナウイルスの感染拡大に伴う多目的ホールの使用中止について', active: false },
                { date: '2020-03-03', link: '#', title: '新型コロナウイルスの感染拡大に伴う多目的ホールの使用中止について', active: false }
            ]
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.info a {
    color: #000000;
}

.info h3 {
    margin-top: 5px;
    margin-bottom: 26px;
}

.list-group {
    height: 400px;
    overflow: scroll;
}

.list-group-item {
    padding-left: 2em;
    padding-right: 2em;
}

.title {
    margin-left: 2em;
}

</style>
