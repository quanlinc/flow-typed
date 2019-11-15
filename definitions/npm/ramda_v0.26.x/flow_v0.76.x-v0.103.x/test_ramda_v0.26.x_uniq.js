/* @flow */
/*eslint-disable no-undef, no-unused-vars, no-console*/
import { uniq } from "ramda";

describe('Read Only', () => {
  it('should accept read only array', () => {
    const readOnlyNumbers: $ReadOnlyArray<number> = Object.freeze([1,1,2,3,4,3])
    uniq(readOnlyArrNumbers): $ReadOnlyArray<number>
  });

  it('should throw error for not read only input', () => {
    const nonReadOnlyNumbers: Array<number> = [1,1,2,3,4,3]
    // $ExpectError
    uniq(nonReadOnlyNumbers): $ReadOnlyArray<number>
  });

})