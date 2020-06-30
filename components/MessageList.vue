<template>

    <div class="field">
        <p class="control">
            <TMessage v-for="m in messages" :key="m.topic">
                <template slot="topic">{{m.topic}}</template>
                <template slot="payload">{{m.payload}}</template>
            </TMessage>
        </p>
    </div>

</template>

<script>

import TMessage from '@/components/TMessage.vue'

export default {
    name: 'MessageList',

    components: {
        TMessage
    },

    props: {
        messages: Array
    }
}
</script>
