<script lang="ts">
  // @ts-nocheck
  import { PUBLIC_BASE_URL } from '$env/static/public'
  import Snackbar, { Label } from '@smui/snackbar'
  import { Form, Sveltik } from 'sveltik'
  import Input from '../components/windows/Input.svelte'

  let successSnackbar: Snackbar

  let initialValues = {
    errorCode: '',
    qrUrl: ''
  }

  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

  let validate = (values) => {
    const errors: { errorCode?: string; qrUrl?: string } = {}
    if (!values.errorCode) errors.errorCode = 'Necesario'

    if (!values.qrUrl) errors.qrUrl = 'Necesario'
    else if (!urlRegex.test(values.qrUrl))
      errors.qrUrl = 'URL introducida inválida'

    return errors
  }

  let onSubmit = (
    values: { errorCode: string; qrUrl: string },
    { setSubmitting }
  ) => {
    const url = `${PUBLIC_BASE_URL}/windows?errorCode=${values.errorCode}&qrUrl=${values.qrUrl}`
    navigator.clipboard.writeText(url)
    setSubmitting(false)
    successSnackbar.open()
  }
</script>

<div class="h-screen w-screen">
  <main class="items-center justify-center gradient-bg flex h-full w-full">
    <div
      class="md:rounded-xl p-4 md:p-6 bg-dark md:h-auto md:w-auto h-full w-full"
    >
      <Sveltik {initialValues} {validate} {onSubmit} let:isSubmitting>
        <Form
          class="flex gap-8 flex-col w-full md:px-20 md:mt-10 h-full justify-center"
        >
          <h1 class="text-white text-4xl text-center">
            Fake W10 update generator
          </h1>
          <Input name="errorCode" label="Código de error" className="w-full" />
          <Input name="qrUrl" label="URL del código QR" className="w-full" />
          <button
            type="submit"
            disabled={isSubmitting}
            class="mt-2 py-4 px-1 text-2xl text-white bg-blue-500 rounded-2xl enabled:hover:bg-blue-700 transition-all duration-200 ease-in-out enabled:hover:scale-90 disabled:bg-gray-500"
            >Generar</button
          >
        </Form>
      </Sveltik>
    </div>
  </main>
</div>

<Snackbar bind:this={successSnackbar}>
  <Label>URL copiada al portapapeles</Label>
</Snackbar>
