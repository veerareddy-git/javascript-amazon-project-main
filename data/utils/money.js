export class Money {
  static format(cents) {
    return (cents / 100).toFixed(2);
  }
}
