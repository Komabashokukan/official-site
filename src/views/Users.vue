<template>
    <v-container fluid fill-height class="white">
        <v-layout wrap justify-center>
            <v-flex md10>
                <v-card>
                    <v-tabs v-model="tab" background-color="grey lighten-2" color="grey" icons-and-text centered>
                        <v-tab v-for="item in items" :key="item.tab">
                            {{ item.tab }}<v-icon>{{ item.icon }}</v-icon>
                        </v-tab>
                    </v-tabs>

                    <v-tabs-slider></v-tabs-slider>

                    <v-tabs-items v-model="tab">
                        <v-tab-item v-for="item in items" :key="item.tab">
                            <Download v-if="item.content === 'Download'" />
                            <Schedule v-if="item.content === 'Schedule'" />
                            <Form v-if="item.content === 'Form'" />
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import Download from '@/views/users/Download';
import Schedule from '@/views/users/Schedule';
import Form from '@/views/users/Form';

export default {
    name: 'Users',
    components: { Download, Schedule, Form },
    data () {
      return {
          tab: 0,
          items: [
              { tab: 'schedule', icon: 'mdi-calendar-check', content: 'Schedule' },
              { tab: 'download', icon: 'mdi-download', content: 'Download' },
              { tab: 'form', icon: 'mdi-file-document-edit', content: 'Form' }
          ]
      }
    }
}

</script>

<style scoped>
  .cards {
    height: 50vh;
    overflow: scroll;
  }

  .dialog {
    width: 50vw;
  }

</style>

