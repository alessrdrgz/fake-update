<script>
  import QR from '../../../components/windows/QR.svelte'
  /** @type {import('./$types').PageData} */
  export let data
  const { errorCode, qrUrl } = data
</script>

<main class="w-screen h-screen bg-blue-windows text-white">
  <div class="flex items-center w-full h-full justify-center">
    <section class="w-2/4 flex flex-col gap-4">
      <h1 class="text-9xl">:(</h1>
      <h1 class="text-3xl mt-10">
        Se ha producido un problema en su PC y necesita reiniciarse. Vamos a
        recopilar información sobre el error y después podrá reiniciar.
      </h1>

      <h2 class="text-gray-200 text-xl">0% completado</h2>
      <div class="flex w-full gap-6">
        <div class="bg-black">
          <QR codeValue={qrUrl} squareSize={256} />
        </div>
        <div class="text-xl flex flex-col justify-between flex-shrink w-2/4">
          <p>
            Si desea obtener más información y posibles correciones, visita:
            https://www.windows.com/stopcode
          </p>
          <div>
            <h2>
              Si llamas a una persona de soporte técnico, dales esta
              información:
            </h2>
            <h2>Stop Code: {errorCode}</h2>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>
