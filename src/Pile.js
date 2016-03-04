export default class Pile extends Array {
  /**
   * Empty out the pile
   *
   * @access  public
   * @return  array
   */
  empty() {
    return this.splice(0, this.length);
  }

  /**
   * Copy all values into a different pile
   *
   * @access  public
   * @param   array
   * @return  void
   */
  copyInto(array) {
    array.push.apply(array, this.slice());
  }

  /**
   * Empty all values and move them into a different pile
   *
   * @access  public
   * @param   array    an array-like object
   * @return  void
   */
  emptyInto(array) {
    array.push.apply(array, this.empty());
  }

  /**
   * Shift off the first value and push it onto a different pile
   *
   * @access  public
   * @param   array    an array-like object
   * @return  mixed
   */
  shiftInto(array) {
    const value = this.shift();
    array.push(value);
    return value;
  }
}
