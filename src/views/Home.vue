<template>
    <div>

        <section class="hero is-info is-large is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        This online tools contain a few handy utilities
                    </h1>
                    <h2 class="subtitle">
                        <router-link to="/string"><u>String Case Converter</u></router-link> | 
                        <router-link to="/json"><u>Pretty or Minify JSON</u></router-link>
                    </h2>
                </div>
            </div>
        </section>

        <Footer/>

    </div>

</template>


<script>

import Footer from '@/components/Footer.vue'

export default {
    name: 'home',

    components: {
        Footer
    }

}
</script>

