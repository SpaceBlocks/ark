import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as tagsInput from '@zag-js/tags-input'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers/environment'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseTagsInputProps
  extends Optional<Omit<tagsInput.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial value of the tags input.
   */
  defaultValue?: tagsInput.Context['value']
}

export interface UseTagsInputReturn extends tagsInput.Api<PropTypes> {}

export const useTagsInput = (props: UseTagsInputProps): UseTagsInputReturn => {
  const initialContext: tagsInput.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    value: props.defaultValue,
  }

  const context: tagsInput.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onValueInvalid: useEvent(props.onValueInvalid),
    onHighlightChange: useEvent(props.onHighlightChange),
  }

  const [state, send] = useMachine(tagsInput.machine(initialContext), { context })

  return tagsInput.connect(state, send, normalizeProps)
}
