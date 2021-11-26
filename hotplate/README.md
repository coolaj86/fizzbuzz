HotPlate
===

(originally from <https://gist.github.com/coolaj86/6033171>)

You have a 16x16 grid of which the 4 centermost cells are always 100 degrees and the cornermost cells are always 0 degrees. All other cells start at 50 degrees.

For example, a 6x6 grid would look like this:

    |  0  | 50  | 50  | 50  | 50  |  0  |
    | 50  | 50  | 50  | 50  | 50  | 50  |
    | 50  | 50  | 100 | 100 | 50  | 50  |
    | 50  | 50  | 100 | 100 | 50  | 50  |
    | 50  | 50  | 50  | 50  | 50  | 50  |
    |  0  | 50  | 50  | 50  | 50  |  0  |

Each turn the temperature of each cell (aside from the 4 hot and 4 cold) changes to be the average of the 4 adjacent cells left, right, up, and down.

The goal is to determine how many turns it takes until not a single cell has changes more than 0.001 degrees and then print out the grid.

For example, the result of running on a 6x6 grid would be this:

    Grid: 6x6
    Turns: 57
    Diff: 0.001
       0.00  33.33  49.99  49.99  33.33   0.00
      33.33  50.00  66.66  66.66  50.00  33.33
      49.99  66.66 100.00 100.00  66.66  49.99
      49.99  66.66 100.00 100.00  66.66  49.99
      33.33  50.00  66.66  66.66  50.00  33.33
       0.00  33.33  49.99  49.99  33.33   0.00
    Actual Diff: 0.0009489096904715666

Or with a splash of color:

!["Fancy Grid"](http://i.imgur.com/udnNfE6.png "Fancy 6x6")

**Bonus**:
Print out a colorful web page grid using jQuery.
You'll need
[a function to convert from wavelength to rgb](https://github.com/scottbyrns/Wavelength-To-RGB/blob/master/wavelength.js).
Instead of a tight loop, only do one turn per millisecond and update the grid each turn so that you can watch it update (or 10 milliseconds, whatever number seems visually appealing).

Hint
---

Many find it conceptually simpler to use 2-dimensional arrays for this problem, however, it's easier to solve programmatically with a 1-dimensional array. Either approach will work. The former is easier to understand, the second is easier to code.

(more hints to come)
