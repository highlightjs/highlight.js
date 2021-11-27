# General operators (from R documentation `?Syntax`)

:: :::
$ @
[ [[
^
- +
:
%any%
* /
+ -
< > <= >= == !=
!
&  &&
| ||
~
-> ->>
<- <<-
=
?

# Subset extraction

x[3]
x[["a"]]
x$y
x$`a a`
x$"a b"

# Operators

2-2, 2+2, 2~2, 2*2, 2/2, 2^2, 2<2, 2>2, 2==2, 2>=2, 2<=2, 2!=2, a<-2, a=2, a<<-2, a:=2, 2->a, 2->>a, 1:2
a <- 10
~a+b
!TRUE
?help, ?`?`, methods?show, ??topic
TRUE&FALSE, T|F
TRUE&&FALSE, T||F
base::sum, base:::sum

# Custom operators

2%*%3
a%<>%b
2%in%y
a %`tick`% b
a %'quot'% b
a %"quot"% b
a %for% b
a %\% b
a %`% b

`% %` = paste
"foo"`% %`"bar"
