<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ColorPickerValueTextProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { ark } from '../factory'

defineProps<ColorPickerValueTextProps>()
</script>

<template>
  <ark.span v-bind="colorPickerAnatomy.build().valueText.attrs" :as-child="asChild">
    <!-- TODO {slots.default?.() || api.value.valueAsString} -->
    <slot />
  </ark.span>
</template>
