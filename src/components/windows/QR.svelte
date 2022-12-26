<script lang="ts">
  import { onMount } from 'svelte'

  export let codeValue: string
  export let squareSize: number

  let qrcode

  onMount(() => {
    const script = document.createElement('script')
    script.src =
      'https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js'
    document.head.append(script)

    script.onload = function () {
      qrcode = new QRCode('qrcode', {
        text: codeValue,
        width: squareSize,
        height: squareSize,
        colorDark: '#006DAE',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    }
  })
</script>

<div id="qrcode" />

<style>
  #qrcode {
    border: 10px solid white;
  }
</style>
