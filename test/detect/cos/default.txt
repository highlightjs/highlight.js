#dim test as %Library.Integer
SET test = 123.099
set ^global = %request.Content
Write "Current date """, $ztimestamp, """, result: ", test + ^global = 125.099
do ##class(Cinema.Utils).AddShow("test") // class method call
do ##super() ; another one-line comment
d:(^global = 2) ..thisClassMethod(1, 2, "test")
/*
 * Sub-languages support:
 */
&sql( SELECT * FROM Cinema.Film WHERE Length > 2 )
&js<for (var i = 0; i < String("test").split("").length); ++i) {
    console.log(i);
}>
&html<<!DOCTYPE html>
<html>
<head> <meta name="test"/> </head>
<body>Test</body>
</html>>

quit $$$OK
