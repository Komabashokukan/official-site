<template>
    <div ref="viewer"></div>
</template>

<script>
import Webviewer from '@pdftron/webviewer';

export default {
    name: 'Fire',
    props: {
        url: String
    },
    mounted () {
        Webviewer({
            path: '/lib',
            initialDoc: this.url
        }, this.$refs.viewer).then((instance) => {
        });
    }
}
</script>

<style scoped>

</style>
