<script>
import appConfig from '@src/app.config'

export default {
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
  data() {
    return {
      productIcons: [
        'up-arrow-cirlce',
        'up-arrow',
        'upload',
        'vision-insurance',
        'volume',
      ],
    }
  },
}
</script>

<template>
  <ul class="icon-list">
    <li v-for="(icon, index) in productIcons" :key="index">
      <div class="icon">
        <BaseIcon width="32" height="32" color="#f00" :name="icon"/>
      </div>
      <div class="icon-name">{{ icon }}</div>
    </li>
  </ul>
</template>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss" scoped>
> *,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
}

.icon-list {
  display: flex;
  flex-wrap: wrap;

  li {
    width: 16.6%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    display: flex;
    margin: 60px 0 0 0;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: #0099d6;
      transform: scale(1.1);

      .icon-name {
        color: #0099d6;
      }
    }
  }
}

.icon {
  width: 64px;
  height: 64px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  display: flex;
}

.icon-name {
  padding-top: 15px;
  color: #999;
  word-break: break-all;
  text-align: center;
  height: 50px;
}
</style>
