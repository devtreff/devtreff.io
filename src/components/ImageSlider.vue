<template>
  <div class="image-container w-full overflow-x-auto pb-8 pt-8">
    <div class="relative flex w-full lg:ml-64">
      <div class="flex-1"></div>
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

function handleMouseOverImage(event) {
  let left = 0;
  const rect = event.target.getBoundingClientRect();
  const halfWidth = rect.width / 2;

  if (event.clientX > event.target.x + halfWidth) {
    left = this.$el.scrollLeft - halfWidth;
  } else {
    left = this.$el.scrollLeft + halfWidth;
  }

  this.$el.scrollTo({
    left,
    behavior: "smooth"
  });
}

function handleMouseOverContainer(event) {
  this.$el.scrollTo({
    left: 0,
    behavior: "smooth"
  });
}

export default Vue.extend({
  beforeDestroy() {
    const images = this.$el.querySelectorAll("img");

    this.$el.removeEventListener(
      "mouseleave",
      handleMouseOverContainer.bind(this)
    );

    images.forEach(image => {
      image.removeEventListener("mouseover", handleMouseOverImage.bind(this));
    });
  },
  mounted() {
    const images = this.$el.querySelectorAll("img");

    this.$el.addEventListener(
      "mouseleave",
      handleMouseOverContainer.bind(this)
    );

    images.forEach(image => {
      image.addEventListener("mouseover", handleMouseOverImage.bind(this));
    });
  }
});
</script>


<style lang="scss">
.image-container {
  &::-webkit-scrollbar {
    display: none;
  }
  img {
    @apply pt-2;
    cursor: pointer;
    transition: transform 200ms ease-in-out;

    @media (min-width: theme("screens.sm")) {
      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>
