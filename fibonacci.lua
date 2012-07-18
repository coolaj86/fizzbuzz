--[[
-- Good 'ol fashioned recursion
--]]
function fib (a, b)
  print(a)
  if b >= 100 then
    print(b)
  else
    fib(b, a + b)
  end
end

--[[
-- Good 'ol fashioned loop
--]]
function fibLoop()
  local a = 1
  local b = 1

  repeat
    print(a)
    b = a + b
    a = b - a
  until b >= 100

  print(a)
  print(b)
end

--
fibLoop()
--fib(1, 1)
