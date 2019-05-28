<template>
  <div>
    <FullImage :hasGradient="true" alt="DevTreff" src="/images/DevTreff3_35.jpg">
      <template #content>
        <div class="flex flex-col h-full">
          <header class="header">
            <strong>
              <g-link to="/">
                <span class="flex items-center">
                  <img class="logo mr-3 mb-1" src="/images/devtreff-font-logo.svg">
                  {{ $static.metaData.siteName }}
                </span>
              </g-link>
            </strong>
            <nav class="nav">
              <g-link class="nav__link" to="/about">Archiv</g-link>
            </nav>
          </header>
          <div class="flex-1 flex justify-center md:items-center">
            <div class="max-w-4xl w-full mt-5 lg:mt-0">
              <slot name="hero"/>
            </div>
          </div>
        </div>
      </template>
    </FullImage>
    <main class="main text-dark">
      <slot name="main"/>
    </main>
  </div>
</template>

<static-query>
query {
  metaData {
    siteName
    coverImage
  }
}
</static-query>

<style>
html,
body {
  height: 100%;
}

body {
  font-family: "Raleway", sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}

.container {
  z-index: 20;
}

.logo {
  width: 20px;
  height: 20px;
}
</style>
