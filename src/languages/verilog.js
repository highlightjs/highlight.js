/*
Language: Verilog
Author: Jon Evans <jon@craftyjon.com>
Description: Verilog is a hardware description language used in electronic design automation to describe digital and mixed-signal systems.  This highlighter is based on Verilog-1995.
*/

function(hljs) {
  return {
    aliases: ['v'],
    case_insensitive: false,
    keywords: {
      keyword:
        'always and assign begin buf bufif0 bufif1 case casex casez cmos deassign ' +
        'default defparam disable edge else end endcase endfunction endmodule ' +
        'endprimitive endspecify endtable endtask event for force forever fork ' +
        'function if ifnone initial inout input join macromodule module nand ' +
        'negedge nmos nor not notif0 notif1 or output parameter pmos posedge ' +
        'primitive pulldown pullup rcmos release repeat rnmos rpmos rtran ' +
        'rtranif0 rtranif1 specify specparam table task timescale tran ' +
        'tranif0 tranif1 wait while xnor xor ' +
        // types
        'highz0 highz1 integer large medium pull0 pull1 real realtime reg ' +
        'scalared signed small strong0 strong1 supply0 supply0 supply1 supply1 ' +
        'time tri tri0 tri1 triand trior trireg vectored wand weak0 weak1 wire wor'
    },
    contains: [
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'number',
        begin: '(\\b((\\d\'(b|h|o|d|B|H|O|D))[0-9xzXZa-fA-F]+))|(\\B((\'(b|h|o|d|B|H|O|D))[0-9xzXZa-fA-F]+))|(\\b([0-9xzXZ])+)',
        contains: [hljs.BACKSLASH_ESCAPE],
        relevance: 0
      },
      /* parameters to instances */
      {
        className: 'variable',
        begin: '#\\((?!parameter).+\\)'
      }
    ]
  }; // return
}
