export default class Pile extends Array {
  constructor() {
    super();

    /**
     * Empty out the pile
     *
     * @access  public
     * @return  array
     */
    this.empty = () => this.splice(0, this.length);

    /**
     * Copy all values into a different pile
     *
     * @access  public
     * @param   array
     * @return  void
     */
    this.copyInto = (array) => array.push(...this.slice());

    /**
     * Empty all values and move them into a different pile
     *
     * @access  public
     * @param   array    an array-like object
     * @return  void
     */
    this.emptyInto = (array) => array.push(...this.empty());

    /**
     * Shift off the first value and push it onto a different pile
     *
     * @access  public
     * @param   array    an array-like object
     * @return  mixed
     */
    this.shiftInto = (array) => {
      const value = this.shift();
      array.push(value);
      return value;
    };
  }
}
