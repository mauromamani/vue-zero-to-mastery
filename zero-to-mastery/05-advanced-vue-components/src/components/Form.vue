<template>
  <form>
    <div class="help">
      <slot name="help">No content provided.</slot>
    </div>

    <div class="fields">
      <slot name="fields">No filds</slot>
    </div>

    <div class="buttons">
      <slot name="buttons">No buttons</slot>
    </div>

    <slot>No dummy text provided</slot>
  </form>
</template>
