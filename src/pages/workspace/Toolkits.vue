<template>
  <div class="toolkits">
    <Header s3>Toolkits</Header>
    <div class="grid">
      <InfoCard>
        <Paragraph>
          Toolkits accelerate the development of ideas while building a solid
          foundation for your startup.
          <Break></Break>
          Based on templates, they help you to structure, test and validate your
          assumptions scientifically.
        </Paragraph>
      </InfoCard>
      <Toolkit
        v-for="kit in toolkits"
        :id="kit.id"
        :key="kit.id"
        :title="kit.title"
        :description="kit.description"
        :img="
          `https://s3.eu-central-1.amazonaws.com/eutopia.media/tool_${(toolkits.indexOf(
            kit
          ) %
            6) +
            1}.svg`
        "
      ></Toolkit>
      <Loader v-if="loading"></Loader>
    </div>
  </div>
</template>

<script>
import Toolkit from '~/components/molecular/ToolkitCard'
import InfoCard from '~/components/molecular/InfoCard'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Toolkits',
  components: {
    Toolkit,
    InfoCard,
  },
  computed: mapState('toolkit', ['toolkits', 'loading']),
  created() {
    if (this.toolkits.length === 0) this.fetchToolkits()
  },
  methods: mapActions('toolkit', ['fetchToolkits']),
}
</script>

<style lang="scss" scoped>
.toolkits {
  display: flex;
  flex-direction: column;

  .grid {
    margin-top: 1rem;
    flex-grow: 1;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3vw;
  }
}
</style>
