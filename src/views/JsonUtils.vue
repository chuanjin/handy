<template>

    <div>
        <section class="hero is-warning is-medium is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Pretty or Minify Print JSON
                    </h1>
                    <h2 class="subtitle">
                    </h2>
                </div>
            </div>
        </section>

        <div class="container">
            <textarea class="textarea is-primary" rows="30" v-model="input_strings">
            </textarea>
            <button class="button is-info is-outlined" v-on:click="pretty">Pretty Json</button>
            <button class="button is-danger is-outlined" v-on:click="minify">Minify Json</button>
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
            input_strings: "Paste or Type your JSON here.",
        }
    },

    methods: {
        pretty: function() {
            this.input_strings = JSON.stringify(JSON.parse(this.input_strings), null, 4)
        },

        minify: function() {
            this.input_strings = JSON.stringify(JSON.parse(this.input_strings), null, '')
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

