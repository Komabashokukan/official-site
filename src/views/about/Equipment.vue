<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
            <tr>
                <th class="text-left">項目</th>
                <th class="text-left">内容</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.content" class="text-left">
                    <td>{{ item.name }}</td>
                    <td>{{ item.content }}</td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
export default {
    name: 'Equipment',
    computed: {
        items () {
            return [
                { name: '所在地', content: '〒153-0041 東京都目黒区駒場3-8-1 東京大学教養学部多目的ホール' },
                { name: 'ホールの大きさ', content: '縦、横約16.5m　高さ約7m' },
                { name: '階数', content: '地上3階' },
                { name: '主要施設', content: '1F 多目的ホール' }
            ]
        }
    }
}
</script>

<style scoped>

</style>
