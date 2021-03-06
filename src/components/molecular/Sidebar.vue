<template>
  <div class="sidebar" :class="{ left, right, collapsed }">
    <slot></slot>
    <Icon
      v-if="collapsable"
      class="toggle-collapse"
      :name="collapsed === left ? 'chevron_right' : 'chevron_left'"
      recolor
      @click="toggleCollapse"
    ></Icon>
  </div>
</template>

<script>
import Molecular from '~/scripts/component'

export default new Molecular({
  name: 'Sidebar',
  types: ['left', 'right'],
  props: {
    collapsable: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    collapsed: false,
  }),
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed
      this.onWidthChange()
      this.$emit(this.collapsed ? 'collapse' : 'expand')
    },
    onWidthChange() {
      this.$emit(
        'changeWidth',
        this.collapsed ? '3rem' : window.innerWidth >= 1000 ? '300px' : '30vw'
      )
    },
  },
  mounted() {
    this.onWidthChange()
    window.addEventListener('resize', this.onWidthChange)
  },
})
</script>

<style lang="scss" scoped>
@import '/styles/shadows';
@import '/styles/colors';

.sidebar {
  position: fixed;
  top: 0;
  width: 30vw;
  height: 100vh;
  box-sizing: border-box;
  z-index: 1000;
  overflow: scroll;

  @include colorScheme('surface');
  box-shadow: shadow(7);

  @media screen and (min-width: 1000px) {
    width: 300px;
  }

  transition: width 0.15s ease;

  .toggle-collapse {
    position: absolute;
    height: 2rem;
    bottom: 0;
    left: 0;
    margin-bottom: 0.5rem;
  }

  &.left {
    .toggle-collapse {
      left: initial;
      right: 0;
    }
  }
}

.right {
  right: 0;
}

.collapsed {
  width: 3rem;
}
</style>
