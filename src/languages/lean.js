/*
Language: Lean
Author: Patrick Massot
Category: scientific
Description: Language definition for Lean theorem prover
*/

function(hljs) {
  var LEAN_KEYWORDS = {
      keyword:
        'theorem|10 lemma|10 definition def class structure instance ' +
		'example inductive coinductive ' +
		'axiom axioms hypothesis constant constants ' +
		'universe universes variable variables parameter parameters ' +
	    'begin end ' +
        'import open theory prelude renaming hiding exposing ' +
		'calc  match do  by let in extends ' +
		'fun assume ' +
		'#check #eval #reduce #print',
      built_in:
        'Type Prop|10 Sort rw|10 rewrite rwa erw subst substs ' +
	    'simp dsimp simpa simp_intros finish ' +
	    'unfold unfold1 dunfold unfold_projs unfold_coes ' +
	    'delta cc ac_reflexivity ac_refl ' +
	    'existsi|10 cases rcases with intro intros introv by_cases ' +
	    'refl rfl funext propext exact exacts ' +
	    'refine apply eapply fapply apply_with apply_instance ' +
	    'induction rename assumption revert generalize specialize clear ' +
	    'contradiction by_contradiction by_contra trivial exfalso ' +
	    'symmetry transitivity destruct constructor econstructor ' +
	    'left right split injection injections ' +
	    'repeat try continue skip swap solve1 abstract all_goals any_goals done ' +
	    'fail_if_success success_if_fail guard_target guard_hyp ' +
	    'have replace at suffices show from ' +
	    'congr congr_n congr_arg norm_num ring ',
	  literal:
		'tt ff',
	  meta:
		'noncomputable|10 private protected meta mutual',
	  section:
		'section namespace end',
	  strong:
		'sorry admit',
    };

  var LEAN_IDENT_RE = /[A-Za-z_][\\w\u207F-\u209C\u1D62-\u1D6A\u2079\']*/;

  var DASH_COMMENT = hljs.COMMENT('--', '$');
  var MULTI_LINE_COMMENT = hljs.COMMENT('/-[^-]', '-/');
  var DOC_COMMENT = {
	  className: 'doctag',
	  begin: '/-[-!]',
	  end: '-/'
  };

  var ATTRIBUTE_DECORATOR = {
	  className: 'meta',
	  begin: '@\\[',
	  end: '\\]'
  };

  var ATTRIBUTE_LINE = {
	  className: 'meta',
	  begin: '^attribute',
	  end: '$'
  };

  var LEAN_DEFINITION =	{
        className: 'theorem',
        beginKeywords: 'def theorem lemma class instance structure', end: ':=', excludeEnd: true,
        contains: [
          {
            className: 'keyword',
            begin: /extends/
          },
          hljs.inherit(hljs.TITLE_MODE, {
            begin: LEAN_IDENT_RE
          }),
          {
            className: 'params',
            begin: /[([{]/, end: /[)\]}]/, endsParent: false,
            keywords: LEAN_KEYWORDS,
          },
          {
            className: 'symbol',
            begin: /:/,
			endsParent: true
          },
        ],
          keywords: LEAN_KEYWORDS
  };
  return {
    keywords: LEAN_KEYWORDS,
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      DASH_COMMENT,
      MULTI_LINE_COMMENT,
      DOC_COMMENT,
	  LEAN_DEFINITION,
      ATTRIBUTE_DECORATOR, ATTRIBUTE_LINE,
	  {begin: /⟨/}  // relevance booster
    ]
  };
}
