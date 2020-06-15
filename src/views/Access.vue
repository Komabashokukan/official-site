<template>
    <v-container fluid fill-height class="white">
        <v-layout wrap justify-center>

            <v-flex md5 sm12 class="text-left order-0 mt-md-8 pl-4">
                <h2 class="mb-2">アクセス</h2>
                <p>〒153-0041 東京都目黒区駒場3-8-1 東京大学教養学部多目的ホール</p>
                <p>京王井の頭線「駒場東大前駅」下車徒歩七分</p>
                <p><u>駐車場などはございませんので、公共交通機関をご利用ください。</u></p>
            </v-flex>

            <v-flex md5 sm12 class="text-left order-0 mt-md-8 pl-4">
                <h2 class="mb-2">お問い合わせ</h2>
                <p>電話番号: 090-3816-3855</p>
                <p>メール: <a href="mailto:komabashokukan@gmail.com" class="blue--text">komabashokukan@gmail.com</a></p>
            </v-flex>

            <v-flex md5 class="order-1 mr-md-5">
                <v-card height="55vh" elevation="11">
                    <v-card-title>Google Map</v-card-title>
                    <iframe class="map_frame" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.6980397054963!2d139.68550101484388!3d35.659810580199306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f353919ea56f%3A0xd619d48f6dc33bb8!2z6aeS5aC05bCP56m66ZaTICjmnbHlpKfpp5LloLTjgq3jg6Pjg7Pjg5Hjgrkg5aSa55uu55qE44Ob44O844OrKQ!5e0!3m2!1sja!2sjp!4v1463417096374" frameborder="0" allowfullscreen></iframe>
                </v-card>
            </v-flex>

            <v-flex md5 class="order-2 ml-md-3">
                <v-card height="55vh" elevation="11">
                    <v-card-title>大学構内マップ</v-card-title>
                    <v-button @click.stop="map_dialog = !map_dialog">
                        <v-img class="map_image" alt="komaba_map.png" src="@/assets/komaba_map.png" style="cursor:pointer;" />
                    </v-button>
                </v-card>
            </v-flex>

            <v-dialog v-model="map_dialog">
                <v-button @click.stop="map_dialog = !map_dialog">
                    <v-img alt="komaba_map.png" src="@/assets/komaba_map.png" style="cursor:pointer;" />
                </v-button>
            </v-dialog>

            <v-flex md12 class="order-last">
                Copyright {{ new Date().getFullYear() }} - {{ new Date().getFullYear() + 1 }} 多目的ホール総務部 All Rights Reserved.
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    name: 'Access',
    data () {
        return {
            map_dialog: false
        }
    }
}

</script>

<style scoped>
.map_frame {
    width: 90%;
    height: 45vh;
    border: 0;
}
.map_image {
    height: 45vh;
}
</style>
