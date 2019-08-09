<template>
  <ul class="ml-10">
    <li v-for="agendaItem in agenda" :key="agendaItem._uid" class="flex">
      <div>
        <span class="agenda-item-time">{{ agendaItem.time }}</span>
        <div class="font-bold">{{ agendaItem.title }}</div>
        <div>{{ agendaItem.subtitle }}</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    agenda: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  @apply border-l-2 border-orange-500;
  position: relative;
  margin-left: 40px;

  &:not(:last-child) {
    padding-bottom: 30px;
  }

  &::before {
    content: "\2022";
    @apply text-orange-500;
    font-weight: bold;
    display: inline-block;
    font-size: 35px;
    margin-left: -7px;
    margin-top: -22px;
    width: 20px;
  }

  .agenda-item-time {
    position: absolute;
    width: 100px;
    margin-left: -130px;
    margin-top: 3px;
    text-align: end;
    @apply font-bold text-orange-500 text-xs;
  }

  > * {
    @media (max-width: theme("screens.md")) {
      max-width: 200px;
    }
    margin-top: -8px;
  }
}
</style>
