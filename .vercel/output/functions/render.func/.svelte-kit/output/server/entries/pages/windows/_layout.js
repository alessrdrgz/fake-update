async function load({ url: { searchParams } }) {
  return {
    errorCode: searchParams.get("errorCode") ?? "SYS_EXCEPTION_PONIES_NOT_HANDLED",
    qrUrl: searchParams.get("qrUrl") ?? "https://bit.ly/3WEz1eJ"
  };
}
export {
  load
};
