<script>
  // @ts-nocheck

  import { ErrorMessage, Field } from 'sveltik'
  export let name = ''
  export let type = 'text'
  export let label = ''
  export let className = ''
</script>

<div>
  <div class={`styled-input ${className}`}>
    <Field {type} {name} autocomplete="off" />
    <label for={name}>{label}</label>
  </div>
  <ErrorMessage {name} as="div" class="text-red-500 mt-2" />
</div>
