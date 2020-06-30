<template>
    <article class="message" v-show="isVisible" >
        <div class="message-header">
            <slot name="topic"></slot>
            <button class="delete" @click="toggleMe"></button>
        </div>
        <div class="message-body" >
            <slot name="payload"></slot>
        </div>
    </article>
</template>

<script>
export default {
    name: 'TMessage',

    data: function() {
        return {
            isVisible: true
        }
    },

    methods: {
        toggleMe: function() {
            this.isVisible = false
        }
    }
}
</script>
