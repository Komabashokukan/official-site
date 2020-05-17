<template>
    <v-app class="wrapper">
        <Header />
        <v-content style="background-color: black;">
            <v-container fluid fill-height>
                <v-layout justify-center align-center>
                    <router-view></router-view>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import Header from '@/components/Header'

export default {
    name: 'App',
    components: {
        Header
    }
}
</script>

<style>

.wrapper {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: black;
    width: 100%;
}

@media (min-width: 576px) {
    .wrapper {
        overflow: hidden;
    }
}

</style>
