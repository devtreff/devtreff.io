<template>
    <div class="overflow-x-auto flex pb-8 pt-8 image-container lg:ml-64">
        <!-- <div class=""> -->
        <!-- <div class="md:flex-1" :style="{ maxWidth: '300px' }"></div> -->
        <slot/>
        <!-- </div> -->
    </div>
</template>

<static-query>
    query {
    metadata{
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

    function handleMouseOverContainer() {
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
            this.$el.removeEventListener(
                "mouseleave",
                handleMouseOverContainer.bind(this)
            );
        },
        mounted() {
            this.$el.addEventListener(
                "mouseleave",
                handleMouseOverContainer.bind(this)
            );
        }
    });
</script>

<style lang="scss">
    .no-scrollbars {
        &::-webkit-scrollbar {
            display: none;
        }
    }

    // .image-container {
    //   @media (max-width: theme("screens.md")) {
    //     overflow-x: scroll;
    //     scroll-snap-type: x mandatory;
    //     scroll-padding: 0 50%;
    //     @apply px-8;
    //   }

    //   & > * {
    //     scroll-snap-align: center;
    //   }

    //   img {
    //     @media (max-width: theme("screens.md")) {
    //       scroll-snap-align: center;
    //       width: 100vw;
    //     }

    //     @media (min-width: theme("screens.md")) {
    //       cursor: pointer;
    //       transition: transform 200ms ease-in-out;
    //     }
    //   }
    // }
</style>
