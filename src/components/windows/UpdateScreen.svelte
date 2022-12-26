<script lang="ts">
  import Percentage from './Percentage.svelte'
  import WindowsSpinner from './Spinner.svelte'

  export let data: { errorCode: string; qrUrl: string }
</script>

<div class="flex items-center w-full h-full justify-center">
  <section
    class="text-2xl text-white text-center font-thin h-full flex items-center justify-center w-full flex-col"
  >
    <div class="h-full w-full relative">
      <div class="w-full absolute top-2/4">
        <WindowsSpinner />
        <h1>Trabajando en las actualizaciones</h1>
        <Percentage {data} />
        <h1>No apague el equipo. Esto puede tomar varios minutos.</h1>
      </div>
    </div>
    <div class="h-full relative w-full">
      <h1 class="absolute top-2/4 w-full">
        Su equipo se reiniciará varias veces
      </h1>
    </div>
  </section>
</div>
