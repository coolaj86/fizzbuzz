package main

import (
        "flag"
        "fmt"
        "strconv"
)

var max int
var ch chan int

func fib(a, b int) {
//func fib(a, b int, bag []int) {
  //append(bag, a)
  ch <- a
  //fmt.Println(a)

  if b > max {
    ch <- b
    //append(bag, b)
    //fmt.Println(b)
  } else {
    fib(b, a + b)
  }
}

func fibloop() {
  a, b := 1, 1

  ch <- a
  ch <- b
  //fmt.Println(a)
  //fmt.Println(b)

  for b < max {
    a, b = b, a + b
    ch <- b
    //fmt.Println(b)
  }
}

func printStuff() {
  for {
    i := <-ch
    fmt.Println(i)
  }
}

func main() {
  flag.Parse()
  
  var e error
  ch = make(chan int)

  go printStuff()

  // stop counting once we get over 100 (or a user-set max)
  if 0 == flag.NArg() {
    max = 100
  } else {
    max, e = strconv.Atoi(flag.Args()[0])
  }

  if nil != e {
    fmt.Println("argument must be an integer")
    return
  }
  
  fmt.Println("recursively...")
  fib(1, 1)

  fmt.Println("")

  fmt.Println("iteratively...")
  fibloop()
}
