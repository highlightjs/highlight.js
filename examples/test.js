

var hl = require("../highlight.js").Highlight,
    code_string = "<?php\n"+
                  "\techo \"Hello world!\";\n"+
                  "\tfor($i=0;$i<100;$i++){\n"+
                  "\t\techo \"$i\";\n"+
                  "\t}\n"+
                  "?>",

    code_block =  "<p>PHP code:</p>\n"+
                  "<code><?php\n"+
                  "\techo \"Hello world!\";\n"+
                  "\tfor($i=0;$i<100;$i++){\n"+
                  "\t\techo \"$i\";\n"+
                  "\t}\n"+
                  "?></code>"+
                  "<code><?php\n"+
                  "\techo \"Hello world!\";\n"+
                  "\tfor($i=0;$i<100;$i++){\n"+
                  "\t\techo \"$i\";\n"+
                  "\t}\n"+
                  "?></code>",
    html1 = hl(code_string), // convert all
    html2 = hl(code_string,'  '), // convert with special tab replacer
    html3 = hl(code_block, false, true); // convert only inside <code/>

console.log(html1);
console.log(html2);
console.log(html3);
