xquery version "3.1";
(:~
 : @author Duncan Paterson
 : @version 1.0:)

declare variable $local:num := math:log10(12345);

(
let $map := map { 'R': 'red', 'G': 'green', 'B': 'blue' }
return (
  $map?*          (: 1. returns all values; same as: map:keys($map) ! $map(.) :),
  $map?R          (: 2. returns the value associated with the key 'R'; same as: $map('R') :),
  $map?('G','B')  (: 3. returns the values associated with the key 'G' and 'B' :)
),

declare function local:city($country as node()*) as element (country) {
for $country in doc('factbook')//country
where $country/@population > 100000000
let $name := $country/name[1]
for $city in $country//city[population gt 1000000]
group by $name
return
   element country { attribute type { $name },
    $city/name }
};

return
('A', 'B', 'C') => count(),

<root>{local:city(.) + $local:num}</root>
