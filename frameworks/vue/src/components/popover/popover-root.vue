<script lang="ts">
import type { RenderStrategyProps } from '../../utils'
import type { RootEmits, RootProps } from './popover.types'

export interface PopoverRootProps extends RootProps, RenderStrategyProps {}
export interface PopoverRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { usePopover } from './use-popover'
import { PopoverProvider } from './use-popover-context'

const props = withDefaults(defineProps<PopoverRootProps>(), {
  defaultOpen: undefined,
  open: undefined,
})
const emits = defineEmits<PopoverRootEmits>()

const popover = usePopover(props, emits)

PopoverProvider(popover)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <slot />
</template>
