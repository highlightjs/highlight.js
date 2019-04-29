-- (c) 2013 John J. Camilleri under LGPL

concrete FoodsMlt of Foods = open Prelude in {
  flags coding=utf8 ;

  lincat
    Comment = SS ;
    Quality = {s : Gender => Number => Str} ;
    Kind = {s : Number => Str ; g : Gender} ;
    Item = {s : Str ; g : Gender ; n : Number} ;

  lin
    -- Pred item quality = ss (item.s ++ copula item.n item.g ++ quality.s ! item.g ! item.n) ;
    Pred item quality = ss (item.s ++ quality.s ! item.g ! item.n) ;

    This kind = det Sg "dan" "din" kind ;
    That kind = det Sg "dak" "dik" kind ;
    These kind = det Pl "dawn" "" kind ;
    Those kind = det Pl "dawk" "" kind ;

    Mod quality kind = {
      s = \\n => kind.s ! n ++ quality.s ! kind.g ! n ;
      g = kind.g
      } ;

    Wine = noun "inbid" "inbejjed" Masc ;
    Cheese = noun "ġobon" "ġobniet" Masc ;
    Fish = noun "ħuta" "ħut" Fem ;
    Pizza = noun "pizza" "pizzez" Fem ;

    Very qual = {s = \\g,n => qual.s ! g ! n ++ "ħafna"} ;

    Warm = adjective "sħun" "sħuna" "sħan" ;
    Expensive = adjective "għali" "għalja" "għaljin" ;
    Delicious = adjective "tajjeb" "tajba" "tajbin" ;
    Boring = uniAdj "tad-dwejjaq" ;
    Fresh = regAdj "frisk" ;
    Italian = regAdj "Taljan" ;

  param
    Number = Sg | Pl ;
    Gender = Masc | Fem ;

  oper
    --Create an adjective (full function)
    --Params: Sing Masc, Sing Fem, Plural
    adjective : (_,_,_ : Str) -> {s : Gender => Number => Str} = \iswed,sewda,suwed -> {
      s = table {
	Masc => table {
	  Sg => iswed ;
	  Pl => suwed
	  } ;
	Fem => table {
	  Sg => sewda ;
	  Pl => suwed
	  }
	}
      } ;

    --Create a regular adjective
    --Param: Sing Masc
    regAdj : Str -> {s : Gender => Number => Str} = \frisk ->
      adjective frisk (frisk + "a") (frisk + "i") ;

    --Create a "uni-adjective" eg tal-buzz
    --Param: Sing Masc
    uniAdj : Str -> {s : Gender => Number => Str} = \uni ->
      adjective uni uni uni ;

    --Create a noun
    --Params: Singular, Plural, Gender (inherent)
    noun : Str -> Str -> Gender -> {s : Number => Str ; g : Gender} = \ktieb,kotba,g -> {
      s = table {
	Sg => ktieb ;
	Pl => kotba
	} ;
      g = g
      } ;

    --Copula is a linking verb
    --Params: Number, Gender
    -- copula : Number -> Gender -> Str = \n,g -> case n of {
    --   Sg => case g of { Masc => "huwa" ; Fem => "hija" } ;
    --   Pl => "huma"
    --   } ;

    --Create an article, taking into account first letter of next word
    article = pre {
      "a"|"e"|"i"|"o"|"u" => "l-" ;
      --cons@("ċ"|"d"|"n"|"r"|"s"|"t"|"x"|"ż") => "i" + cons + "-" ;
      _ => "il-"
      } ;

    --Create a determinant
    --Params: Sg/Pl, Masc, Fem
    det : Number -> Str -> Str -> {s : Number => Str ; g : Gender} -> {s : Str ; g : Gender ; n : Number} = \n,m,f,cn -> {
      s = case n of {
	Sg => case cn.g of {Masc => m ; Fem => f}; --string
	Pl => m --default to masc
	} ++ article ++ cn.s ! n ;
      g = cn.g ; --gender
      n = n --number
      } ;

}
