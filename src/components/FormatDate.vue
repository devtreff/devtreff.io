<template>
    <span>{{this.formattedDate}}</span>
</template>

<script lang="ts">
import Vue from 'vue'
import { DateTime } from "luxon";

export default Vue.extend({
    props: {
        dateString: {
            type: String
        },
        parseFormat: {
            type: String,
            default: "yyyy-MM-dd HH:mm"
        },
        format: {
            type: String,
            default: "d. LLLL yyyy"
        }
    },
    computed:{
        formattedDate(){
            return DateTime.fromFormat(
                this.dateString,
                this.parseFormat
            ).setLocale('de').toFormat(this.format);
        }
    }
})
</script>
