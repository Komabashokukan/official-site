<template>
    <div class="about h-100">
        <div class="cards container-md align-middle text-left pt-4 pl-sm-5 bg-light h-100">
            <h3>駒場小空間とは？</h3>
            <div v-for="card in cards" :key="card.title" class="card col-sm-5">
                <img :src="card.image" class="img-fluid" />
                <div class="card-body">
                    <h5 class="card-title">{{ card.title }}</h5>
                    <p class="card-text">{{ card.description }}</p>
                    <div class="text-right"><a href="#" class="btn btn-primary">{{ card.button }}</a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'About',
    computed: {
        cards () {
            return [
                { title: '概要', image: '/static/hall_exterior.jpg', description: '駒場小空間は、1997年、旧駒場寮の廃寮に伴い廃止された...', button: '続きを見る', modal: 'modal_abstract' },
                { title: '施設', image: '/static/hall_interior.png', description: '駒場小空間の施設概要を表示します', button: '説明を見る', modal: 'modal_abstract' }
            ]
        }
    }
}

</script>

<style scoped>
.access {
    background-color: #000000;
    margin-bottom: 15vh;
}

.cards {
    height: 50vh;
    overflow: scroll;
}

</style>
