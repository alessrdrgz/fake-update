<script>
  import WindowsUpdate from '../../components/windows/UpdateScreen.svelte'
  /** @type {import('./$types').PageData} */
  export let data
</script>

<main class="w-screen h-screen bg-blue-windows"><WindowsUpdate {data} /></main>
