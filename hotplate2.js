/*
 * The hotplat could be represented (6x6) as
 *
 *     0 * * * * 0
 *     * * * * * *
 *     * * 1 1 * *
 *     * * 1 1 * *
 *     * * * * * *
 *     0 * * * * 0
 *
 */
(function () {
  "use strict";

  var red   = '\u001b[31m'
    , yellow  = '\u001b[33m'
    , blue  = '\u001b[34m'
    , reset = '\u001b[0m'
    ;
  function pad(num) {
    num = String(num);

    while (num.length < 6) {
      num = ' ' + num;
    }

    return num;
  }
  /*
   * rows: number of rows
   * cols: number of columns
   * diff: maximum allowable difference
   * initial: the start value of each cell
   * turns: maximum number of turns
   */
  function HotPlate(opts) {
    var me = this
      ;
      
    me.numrows = opts.rows;
    me.numcols = opts.cols;
    me.prevRows = [];
    me.nextRows = [];
    me.maxDiff = opts.diff || 0.00001;
    me.maxTurns = opts.turns || 100 * 1000;

    me.initializeGrid(me.prevRows);
    me.initializeGrid(me.nextRows);

    //console.log(me.prevRows);
    //console.log(me.nextRows);
  }

  HotPlate.prototype.initializeGrid = function (rows) {
    var me = this
      , row
      , i
      , j
      ;

    for (i = 0; i < me.numrows; i += 1) {
      row = [];
      rows.push(row);
      for (j = 0; j < me.numcols; j += 1) {
        row.push(me.initial || 0);
      }
    }

    // 0, 1, 2, [3, 4], 5, 6, 7
    rows[(me.numrows / 2) - 1][(me.numcols / 2) - 1] = 100;
    rows[(me.numrows / 2) - 1][(me.numcols / 2)] = 100;
    rows[(me.numrows / 2)][(me.numcols / 2) - 1] = 100;
    rows[(me.numrows / 2)][(me.numcols / 2)] = 100;
  };

  HotPlate.prototype.run = function () {
    var me = this
      , diff = 100
      , sum
      , count
      , i
      , j
      , rows
      , turns = 0
      , str
      , color
      ;

    while (diff > me.maxDiff && turns < me.maxTurns) {
      turns += 1;
      diff = 0;

      for (i = 0; i < me.numrows; i += 1) {
        for (j = 0; j < me.numcols; j += 1) {
          // ignore the cold cells (cornermost)
          if (
                 (i === 0 && j === 0)
              || (i === 0 && j === me.numcols - 1)
              || (i === me.numrows - 1 && j === 0)
              || (i === me.numrows - 1 && j === me.numcols - 1)
          ) {
            continue;
          }

          // ignore hot cells (centermost)
          if (
                 (i === (me.numrows / 2) - 1 && j === (me.numcols / 2) - 1)
              || (i === (me.numrows / 2) - 1 && j === (me.numcols / 2))
              || (i === (me.numrows / 2) && j === (me.numcols / 2) - 1)
              || (i === (me.numrows / 2) && j === (me.numcols / 2))
          ) {
            continue;
          }

          // add up, left, right, down and self values
          // (but only if they exist)
          rows = me.prevRows;
          //console.log(rows);
          sum = 0;
          count = 0;
          if (i > 0) {
            count += 1;
            sum += rows[i - 1][j];
            //console.log('i>0:', rows[i - 1] + rows[j]);
          }
          if (i < me.numrows - 1) {
            count += 1;
            sum += rows[i + 1][j];
            //console.log('i<last:', rows[i + 1] + rows[j]);
          }
          if (j > 0) {
            count += 1;
            sum += rows[i][j - 1];
            //console.log('j>0:', rows[i] + rows[j - 1]);
          }
          if (j < me.numcols - 1) {
            count += 1;
            sum += rows[i][j + 1];
            //console.log('j<last:', rows[i] + rows[j + 1]);
          }

          /*
          console.log(
              'i:' + i
            , 'j:' + j
            , 'i,j:' + me.nextRows[i][j]
            , 'sum:' + sum
            , 'count:' + count
            , 'avg:' + sum / count
          );
          */
          me.nextRows[i][j] = sum / count;

          diff = Math.max(diff, Math.abs(me.nextRows[i][j] - me.prevRows[i][j]));
        }
      }

      me.prevRows = me.nextRows;
      me.nextRows = [];
      me.initializeGrid(me.nextRows);
    }

    console.log('Grid:', me.numrows + 'x' + me.numcols);
    console.log('Turns:', turns);
    console.log('Diff:', me.maxDiff);
    for (i = 0; i < me.numrows; i += 1) {
      str = '';
      for (j = 0; j < me.numcols; j += 1) {
        if (me.prevRows[i][j] < 33) {
          color = blue;
        } else if (me.prevRows[i][j] > 66) {
          color = red;
        } else {
          color = yellow;
        }
        str += ' ' + color + pad((me.prevRows[i][j]).toFixed(2));
      }
      console.log(str);
    }
    console.log(reset + 'Actual Diff:', diff);
  };

  HotPlate.create = function (opts) {
    return new HotPlate(opts);
  };

  HotPlate.create({ cols: 8, rows: 16}).run();
}());
