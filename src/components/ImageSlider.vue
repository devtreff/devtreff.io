<template>
  <div class="no-scrollbars w-full md:overflow-x-auto pb-8 pt-8">
    <div class="image-container relative flex w-full lg:ml-64">
      <div class="md:flex-1"></div>
      <slot/>
    </div>
  </div>
</template>

<static-query>
query {
  metaData{
    tailwind {
      theme {
        screens {
          md
        }
      }
    }  
  }
}
</static-query>

<script lang="ts">
import Vue from "vue";

function handleMouseOverImage(event) {
  let left = 0;
  const rect = event.target.getBoundingClientRect();
  const halfTargetWidth = rect.width / 2;
  const halfScreenWidth = screen.width / 2;
  const halfTargetWidthPos = event.target.offsetLeft + halfTargetWidth;

  if (screen.width >= this.mdScreenSize) {
    let delta = halfTargetWidth;
    if (event.clientX > event.target.x + halfTargetWidth) {
      left = this.$el.scrollLeft - delta;
    } else {
      left = this.$el.scrollLeft + delta;
    }

    this.$el.scrollTo({
      left,
      behavior: "smooth"
    });
  }
}

function handleMouseOverContainer(event) {
  this.$el.scrollTo({
    left: 0,
    behavior: "smooth"
  });
}

export default Vue.extend({
  computed: {
    mdScreenSize() {
      return parseInt(this.$static.metaData.tailwind.theme.screens.md, 10);
    }
  },
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
.no-scrollbars {
  &::-webkit-scrollbar {
    display: none;
  }
}

.image-container {
  @media (max-width: theme("screens.md")) {
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    scroll-padding: 50%;
  }

  img {
    scroll-snap-align: center;

    @media (max-width: theme("screens.md")) {
      scroll-snap-align: center;
    }

    @media (min-width: theme("screens.md")) {
      cursor: pointer;
      transition: transform 200ms ease-in-out;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>
