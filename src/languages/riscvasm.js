/*
Language: RISC-V Assembly
Author: Ckristian Duran <ckristian_duran@hotmail.com>
Description: RISC-V Assembly including RV32-IMAFDC + picorv32 instructions
Category: assembler
*/

// Based on ARM assembly (like everything in this awful project)
function(hljs) {
    //local labels: %?[FB]?[AT]?\d{1,2}\w+
  return {
    case_insensitive: true,
    aliases: ['riscv'],
    lexemes: '\\.?' + hljs.IDENT_RE,
    keywords: {
      meta:
        //GNU preprocs
        '.2byte .4byte .align .ascii .asciz .balign .byte .code .data .else .end .endif .endm .endr .equ .err '+
        '.exitm .extern .global .hword .if .ifdef .ifndef .include .irp .long .macro .rept .req .section '+
        '.set .skip .space .text .word .riscv .code16 .code32 .ltorg '+
        //RISC-V directives (ARM VERY BASED, sorry but there are so many pdfs and so little time)
        'ALIAS ALIGN RISCV AREA ASSERT ATTR CN CODE CODE16 CODE32 COMMON CP DATA DCB DCD DCDU DCDO DCFD DCFDU '+
        'DCI DCQ DCQU DCW DCWU DN ELIF ELSE END ENDFUNC ENDIF ENDP ENTRY EQU EXPORT EXPORTAS EXTERN FIELD FILL '+
        'FUNCTION GBLA GBLL GBLS GET GLOBAL IF IMPORT INCBIN INCLUDE INFO KEEP LCLA LCLL LCLS LTORG MACRO MAP '+
        'MEND MEXIT NOFP OPT PRESERVE8 PROC QN READONLY RELOC REQUIRE REQUIRE8 RLIST FN ROUT SETA SETL SETS SN '+
        'SPACE SUBT TTL WHILE WEND ',
      built_in:
        // Integer registers
        'x0 x1 x2 x3 x4 x5 x6 x7 x8 x9 x10 x11 x12 x13 x14 x15 '+ // Common names
        'x16 x17 x18 x19 x20 x21 x22 x23 x24 x25 x26 x27 x28 x29 x30 x31 '+
        'pc zero ra sp gp tp fp '+ // typical with other names
        's0 s1 s2 s3 s4 s5 s6 s7 s8 s9 s10 s11 '+ // save registers
        't0 t1 t2 t3 t4 t5 t6 '+ // temp registers
        'a0 a1 a2 a3 a4 a5 a6 a7 '+ // arg registers
        // fp registers
        'f0 f1 f2 f3 f4 f5 f6 f7 f8 f9 f10 f11 f12 f13 f14 f15 '+ // Common names
        'f16 f17 f18 f19 f20 f21 f22 f23 f24 f25 f26 f27 f28 f29 f30 f31 '+
        'fs0 fs1 fs2 fs3 fs4 fs5 fs6 fs7 fs8 fs9 fs10 fs11 '+ // save registers
        'ft0 ft1 ft2 ft3 ft4 ft5 ft6 ft7 ft8 ft9 ft10 ft11 '+ // temp registers
        'fa0 fa1 fa2 fa3 fa4 fa5 fa6 fa7 '+ // arg registers

        '{PC} {VAR} {TRUE} {FALSE} {OPT} {CONFIG} {ENDIAN} {CODESIZE} {CPU} {FPU} {ARCHITECTURE} '+
        '{PCSTOREOFFSET} {RISCVASM_VERSION} {INTER} {ROPI} {RWPI} {SWST} {NOSWST} . @'
    },
    contains: [
      {
        className: 'keyword',
        begin: '\\b('+     //mnemonics
            // RV32I
            'lui|auipc|jal|jalr|beq|bne|blt|bge|bltu|bgeu|lb|lh|lw|'+
            'lbu|lhu|sb|sh|sw|addi|slti|sltiu|xori|ori|andi|slli|srli|'+
            'srai|add|sub|sll|slt|sltu|xor|srl|sra|or|and|fence|fence\\.i|'+
            'ecall|ebreak|csrrw|csrrs|csrrc|csrrwi|csrrsi|csrrci|'+
            // RV64I
            'lwu|ld|sd|addiw|slliw|srliw|sraiw|addw|subw|sllw|srlw|sraw|'+
            // RV32M
            'mul|mulh|mulhu|mulhsu|div|divu|rem|remu|'+
            // RV64M
            'mulw|divw|divuw|remw|remuw|'+
            // RV32A
            'lr\\.w|sc\\.w|amoswap\\.w|amoadd\\.w|amoxor\\.w|amoand\\.w|amoor\\.w|amomin\\.w|amomax\\.w|amominu\\.w|amomaxu\\.w|'+
            // RV64A
            'lr\\.d|sc\\.d|amoswap\\.d|amoadd\\.d|amoxor\\.d|amoand\\.d|amoor\\.d|amomin\\.d|amomax\\.d|amominu\\.d|amomaxu\\.d|'+
            // RV32F
            'flw|fsw|fmadd\\.s|fmsub\\.s|fnmsub\\.s|fnmadd\\.s|fadd\\.s|fsub\\.s|fmul\\.s|fdiv\\.s|fsqrt\\.s|fsgnj\\.s|fsgnjn\\.s|'+
            'fsgnjx\\.s|fmin\\.s|fmax\\.s|fcvt\\.w\\.s|fcvt\\.wu\\.s|fmv\\.x\\.s|feq\\.s|flt\\.s|fle\\.s|fclass\\.s|fcvt\\.s\\.w|fcvt\\.s\\.wu|fmv\\.s\\.x|'+
            // RV64F
            'fcvt\\.l\\.s|fcvt\\.lu\\.s|fcvy\\.s\\.l|fcvt\\.s\\.lu|'+
            // RV32D
            'fld|fsd|fmadd\\.d|fmsub\\.d|fnmsub\\.d|fnmadd\\.d|fadd\\.d|fsub\\.d|fmul\\.d|fdiv\\.d|fsqrt\\.d|fsgnj\\.d|fsgnjn\\.d|'+
            'fsgnjx\\.d|fmin\\.d|fmax\\.d|fcvt\\.s\\.d|fcvt\\.d\\.s|feq\\.d|flt\\.d|fle\\.d|fclass\\.d|fcvt\\.w\\.d|fcvt\\.wu\\.d|fcvt\\.d\\.w|fcvt\\.d\\.wu|'+
            // RV64D
            'fcvt\\.l\\.d|fcvt\\.lu\\.d|fmv\\.x\\.d|fcvt\\.d\\.l|fcvt\\.d\\.lu|fmv\\.d\\.x|'+
            // RV32C
            'c\\.addi4spn|c\\.fld|c\\.lq|c\\.lw|c\\.flw|c\\.ld|c\\.fsd|c\\.sq|c\\.sw|c\\.fsw|c\\.sd|c\\.nop|c\\.addi|c\\.jal|c\\.addiw|c\\.li|'+
            'c\\.addi16sp|c\\.lui|c\\.srli|c\\.srli64|c\\.srai|c\\.srai64|c\\.andi|c\\.sub|c\\.xor|c\\.or|c\\.and|c\\.subw|c\\.addw|c\\.j|'+
            'c\\.beqz|c\\.bnez|c\\.slli|c\\.slli64|c\\.fldsp|c\\.lqsp|c\\.lwsp|c\\.flwsp|c\\.ldsp|c\\.jr|c\\.mv|c\\.ebreak|c\\.jalr|c\\.add|'+
            'c\\.fsdsp|c\\.sqsp|c\\.fswsp|c\\.sdsp|'+
            // picorv32 IRQ
            'getq|setq|retirq|maskirq|waitirq|timer|'+
            // RV32 alias
            'la|nop|li|mv|not|neg|negw|sext\\.w|seqz|snez|sltz|sgtz|fmv\\.s|fabs\\.s|fneg\\.s|fmv\\.d|fabs\\.d|fneg\\.d|'+
            'beqz|bnez|blez|bgez|bltz|bgtz|j|jr|ret|call|tail|rdtimer|rdtimerh|rdcycle|rdcycleh|rdinstr|rdinstrh'+
        ')', 
        end: '\\s'
      },
      hljs.COMMENT('[;@]', '$', {relevance: 0}),
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: '\'',
        end: '[^\\\\]\'',
        relevance: 0
      },
      {
        className: 'title',
        begin: '\\|', end: '\\|',
        illegal: '\\n',
        relevance: 0
      },
      {
        className: 'number',
        variants: [
            {begin: '[#$=]?0x[0-9a-f]+'}, //hex
            {begin: '[#$=]?0b[01]+'},     //bin
            {begin: '[#$=]\\d+'},        //literal
            {begin: '\\b\\d+'}           //bare number
        ],
        relevance: 0
      },
      {
        className: 'symbol',
        variants: [
            {begin: '^[a-z_\\.\\$][a-z0-9_\\.\\$]+'}, //RISCV syntax
            {begin: '^\\s*[a-z_\\.\\$][a-z0-9_\\.\\$]+:'}, //GNU RISCV syntax
            {begin: '[=#]\\w+' }  //label reference
        ],
        relevance: 0
      }
    ]
  };
}
