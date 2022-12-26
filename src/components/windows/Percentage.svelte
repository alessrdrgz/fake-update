<script lang="ts">
  import { goto } from '$app/navigation'
  let percentage: HTMLSpanElement

  export let data

  const { errorCode, qrUrl } = data

  const redirect = () =>
    goto(`/windows/bsod?errorCode=${errorCode}&qrUrl=${qrUrl}`)

  const updatePercentage = () => {
    if (percentage) {
      percentage.innerHTML = `${parseInt(percentage.innerHTML) + 1}`
      if (parseInt(percentage.innerHTML) !== 100) {
        const s = Math.floor(Math.random() * (10 - 2 + 1) + 2)
        setTimeout(updatePercentage, s * 1000)
      } else redirect()
    }
  }

  setTimeout(updatePercentage, 1500)

  const handleKey = (e: KeyboardEvent) => {
    const { key } = e
    if (key === 'Enter') redirect()
  }
</script>

<h1><span bind:this={percentage}>0</span>% completado</h1>

<svelte:window on:keypress|preventDefault={handleKey} />
