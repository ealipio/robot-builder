export default function (amount = 0, symbol = '$') {
  return `${symbol} ${amount.toFixed(2)}`;
}
