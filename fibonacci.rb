def fib1 a, b
  puts a
  return if (a >= 100)
  fib1(b, a + b)
end

def fib2
  a = 0
  b = 1
  while a <= 100
    puts a
    newb = a + b
    a = b
    b = newb
  end
  puts a
end

fib1 0, 1
puts ''
fib2()
