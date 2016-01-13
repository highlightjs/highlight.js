10 CLS
20 FOR I = 0 TO 15
22 FOR J = 0 TO 7
30 COLOR I,J
40 PRINT " ** ";
45 NEXT J
46 COLOR I,0
47 GOSUB 100
48 PRINT
50 NEXT I
60 COLOR 15,0
99 END
100 FOR T = 65 TO 90
101 PRINT CHR$(T);
102 NEXT T
103 RETURN
200 REM Data types test
201 TOTAL# = 3.30#		'Double precision variable
202 BALANCE! = 3!		'Single precision variable
203 B2! = 12e5			'120000
204 ITEMS% = 10			'Integer variable
205 HEXTEST = &H12DB	'Hex value
