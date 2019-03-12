<template>
    <div class="string_utils">
        <h1>This is an String Utilities</h1>

        <div>

            <textarea rows="10" cols="100" v-model="input_strings">
            </textarea>
            <button v-on:click="reverse">Reverse</button>
            <button v-on:click="upprer_case">Upper Case</button>
            <button v-on:click="lower_case">Lower Case</button>
            <button v-on:click="sentense_case">Sentense Case</button>
            <button v-on:click="proper_case">Proper Case</button>
        </div>



    </div>
</template>

<script>

export default {
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
