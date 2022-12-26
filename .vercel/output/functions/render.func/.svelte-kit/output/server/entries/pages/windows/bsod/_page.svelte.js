import { c as create_ssr_component, v as validate_component, e as escape } from "../../../../chunks/index.js";
const QR_svelte_svelte_type_style_lang = "";
const css = {
  code: "#qrcode.svelte-1brhcse{border:10px solid white}",
  map: null
};
const QR = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { codeValue } = $$props;
  let { squareSize } = $$props;
  if ($$props.codeValue === void 0 && $$bindings.codeValue && codeValue !== void 0)
    $$bindings.codeValue(codeValue);
  if ($$props.squareSize === void 0 && $$bindings.squareSize && squareSize !== void 0)
    $$bindings.squareSize(squareSize);
  $$result.css.add(css);
  return `<div id="${"qrcode"}" class="${"svelte-1brhcse"}"></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { errorCode, qrUrl } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main class="${"w-screen h-screen bg-blue-windows text-white"}"><div class="${"flex items-center w-full h-full justify-center"}"><section class="${"w-2/4 flex flex-col gap-4"}"><h1 class="${"text-9xl"}">:(</h1>
      <h1 class="${"text-3xl mt-10"}">Se ha producido un problema en su PC y necesita reiniciarse. Vamos a
        recopilar información sobre el error y después podrá reiniciar.
      </h1>

      <h2 class="${"text-gray-200 text-xl"}">0% completado</h2>
      <div class="${"flex w-full gap-6"}"><div class="${"bg-black"}">${validate_component(QR, "QR").$$render($$result, { codeValue: qrUrl, squareSize: 256 }, {}, {})}</div>
        <div class="${"text-xl flex flex-col justify-between flex-shrink w-2/4"}"><p>Si desea obtener más información y posibles correciones, visita:
            https://www.windows.com/stopcode
          </p>
          <div><h2>Si llamas a una persona de soporte técnico, dales esta
              información:
            </h2>
            <h2>Stop Code: ${escape(errorCode)}</h2></div></div></div></section></div></main>`;
});
export {
  Page as default
};
