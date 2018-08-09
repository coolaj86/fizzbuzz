* The Drunken Bishop - Draw an image based on a hash
* Boggle(TM)d Keyboard - given a key sequence, find matching words based on fat-fingering a qwerty keyboard

Word Map
--------

Find the shortest path between to words, changing only one letter at a time,
but must match another real word with each change.

Example:

```
rake -> moon
```

```
        r         k      a         e      l        d
rake -> make -> male -> mole -> mold -> mood -> moon
m         l      o         d      o        n
```

Inputs:
  * Word list (dictionary)
  * A start word
  * An end word
