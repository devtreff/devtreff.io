<template>
  <header class="header">
    <strong>
      <g-link to="/">
        <span
          :class="['flex items-center', isBlack ? 'text-dark' : 'text-white']"
        >
          <img
            class="logo mr-3 mb-1"
            :src="
              isBlack
                ? '/images/devtreff-font-logo-black.svg'
                : '/images/devtreff-font-logo.svg'
            "
          />
          {{ $static.metadata.siteName }}
        </span>
      </g-link>
    </strong>
    <!-- <nav class="nav">
      <g-link class="nav__link" to="/archive">Archiv</g-link>
    </nav>-->
  </header>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  props: {
    isBlack: Boolean
  }
};
</script>
