<template>
  <div class="template-sub-page">
    <div class="template-sub-title">
      <div id="sub-page-title">
        <slot name="title"/>
      </div>
      <div id="sub-page-actions">
        <slot name="actions"/>
      </div>
    </div>
    <div class="template-sub-content">
      <slot name="content" class="template-sub-content"/>
    </div>
    <slot name="dialogs"/>
  </div>
</template>

<style lang="scss">
.template-sub-page {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;

  .template-sub-title {
    margin: 12px 24px;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto 1fr;
    align-items: center;

    #sub-page-title {
      font-size: 24px;
      font-weight: 800;
      margin-right: 48px;
    }

  }
}
</style>
