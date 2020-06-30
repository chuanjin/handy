<template>

    <div>
        <section class="hero is-primary is-medium is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        String Case Converter
                    </h1>
                    <h2 class="subtitle">
                    </h2>
                </div>
            </div>
        </section>

        <div class="container">
            <textarea class="textarea is-primary" rows="10" v-model="input_strings">
            </textarea>
            <button class="button is-primary is-outlined" v-on:click="upprer_case">Upper Case</button>
            <button class="button is-info is-outlined" v-on:click="lower_case">Lower Case</button>
            <button class="button is-success is-outlined" v-on:click="sentense_case">Sentense Case</button>
            <button class="button is-link is-outlined" v-on:click="proper_case">Proper Case</button>
            <button class="button is-danger is-outlined" v-on:click="reverse">Reverse</button>
        </div>

        <Footer/>
    </div>

</template>

<script>

import Footer from '@/components/Footer.vue'

export default {

    components: {
        Footer
    },

    data() {
        return {
            input_strings: "Paste or Type your string here."
        }
    },

    methods: {
        reverse: function () {
            this.input_strings = this.input_strings.split('').reverse().join('')
        },

        upprer_case: function () {
            this.input_strings = this.input_strings.toUpperCase()
        },

        lower_case: function () {
            this.input_strings = this.input_strings.toLowerCase()
        },

        capitalize: function(s) {
            return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
        },

        sentense_case: function() {
            this.input_strings = this.capitalize(this.input_strings)
        },

        proper_case: function () {
            this.input_strings =
                this.input_strings.split(' ').map(function(s) {
                    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
                }).join(' ')
        }
    }
}

</script>

<style scoped>

.button {
    margin: 5px;
}
textarea {
    margin: 10px;
}

</style>
