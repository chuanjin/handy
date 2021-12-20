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
export default {
  name: 'MessageList',
  props: {
    messages: Array
  }
}
</script>
