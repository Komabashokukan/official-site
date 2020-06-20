<template>
  <v-row>
    <v-col>
      <v-sheet>
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-toolbar-title>
            {{this.showedYear}}年 {{ this.showedMonth }}月
          </v-toolbar-title>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="100%">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          @change="updateRange"
        >
          <template v-slot:day="{ present, past, date }">
            <v-row
              class="fill-height"
            >
              <template v-if="past && tracked[date]">
                <v-sheet
                  v-for="(percent, i) in tracked[date]"
                  :key="i"
                  :title="category[i]"
                  :color="colors[i]"
                  :width="`${percent}%`"
                  height="40%"
                  tile
                ></v-sheet>
              </template>
            </v-row>
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
    data: () => ({
        today: '2019-01-10',
        tracked: {
            '2019-01-09': [23, 45, 10],
            '2019-01-08': [10],
            '2019-01-07': [0, 78, 5],
            '2019-01-06': [0, 0, 50],
            '2019-01-05': [0, 10, 23],
            '2019-01-04': [2, 90],
            '2019-01-03': [10, 32],
            '2019-01-02': [80, 10, 10],
            '2019-01-01': [20, 25, 10]
        },
        colors: ['#1867c0', '#fb8c00', '#000000'],
        category: ['Development', 'Meetings', 'Slacking'],
        showedMonth: '',
        showedYear: '',
        focus: '',
        type: 'month',
        typeToLabel: {
            month: 'Month',
            week: 'Week',
            day: 'Day',
            '4day': '4 Days'
        },
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']
    }),
    mounted () {
        this.$refs.calendar.checkChange()
    },
    methods: {
        viewDay ({ date }) {
            this.focus = date
            this.type = 'day'
        },
        getEventColor (event) {
            return event.color
        },
        setToday () {
            this.focus = ''
        },
        prev () {
            this.$refs.calendar.prev()
        },
        next () {
            this.$refs.calendar.next()
        },
        showEvent ({ nativeEvent, event }) {
            const open = () => {
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                // eslint-disable-next-line no-return-assign
                setTimeout(() => this.selectedOpen = true, 10)
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                setTimeout(open, 10)
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },
        updateRange ({ start, end }) {
            this.events = this.fetchDB({ start, end })
            this.updateTitle()
        },
        updateTitle () {
            let tmpDate = {}
            if (this.focus.length === 0) {
                tmpDate = this.$refs.calendar.start.split('-')
            } else {
                tmpDate = this.focus.split('-')
            }
            this.showedYear = Number(tmpDate[0])
            this.showedMonth = Number(tmpDate[1])
        },
        rnd (a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
        // 後に変える
        fetchDB ({ start, end }) {
            const events = []
            const min = new Date(`${start.date}T00:00:00`)
            const max = new Date(`${end.date}T23:59:59`)
            const days = (max.getTime() - min.getTime()) / 86400000
            const eventCount = days - 20
            for (let i = 0; i < eventCount; i++) {
                const allDay = this.rnd(0, 3) === 0
                const firstTimestamp = this.rnd(min.getTime(), max.getTime())
                const first = new Date(firstTimestamp - (firstTimestamp % 900000))
                const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
                const second = new Date(first.getTime() + secondTimestamp)
                const detail = 'hello'
                console.log(first.toISOString().substring(0, 16))

                events.push({
                    name: this.names[this.rnd(0, this.names.length - 1)],
                    start: first.toISOString().substring(0, 16),
                    end: second.toISOString().substring(0, 16),
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    timed: !allDay,
                    details: detail
                })
            }
            return events
        }
    }
}
</script>
