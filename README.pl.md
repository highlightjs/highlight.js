# Highlight.js
 
[![Build Status](https://travis-ci.org/highlightjs/highlight.js.svg?branch=master)](https://travis-ci.org/highlightjs/highlight.js) [![Greenkeeper badge](https://badges.greenkeeper.io/highlightjs/highlight.js.svg)](https://greenkeeper.io/) [![rozmiar instalacji](https://packagephobia.now.sh/badge?p=highlight.js)](https://packagephobia.now.sh/result?p=highlight.js)
 
Highlight.js jest to biblioteka do podświetlania składni języka Javascript. Działa w przeglądarce oraz po stronie serwerowej.
Działa z każdym Markup, nie jest zależny od frameworka, i posiada automatyczne wykrywanie językow.
 
#### Aktualizacja do wersji 10
 
Wersja 10 jest najwiekszą aktualizacją jaka do tej pory wyszła.
Jeżeli aktualizujesz z wersji 9, spodziewaj sią wielkich zmian także upewnij się wcześniej czego oczekiwać.
 
Proszę przeczytaj
[VERSION_10_UPGRADE.md](https://github.com/highlightjs/highlight.js/blob/master/VERSION_10_UPGRADE.md) dla zrozumienia kluczowych zmian i czynności które będziesz musiał wykonać.
Sprawdź [VERSION_10_BREAKING_CHANGES.md](https://github.com/highlightjs/highlight.js/blob/master/VERSION_10_BREAKING_CHANGES.md) jeżeli szukasz bardziej szczegółowej listy i
[CHANGES.md](https://github.com/highlightjs/highlight.js/blob/master/CHANGES.md) 
Żeby poznać co jeszcze jest nowego.
 
##### Wsparcie dla starszej wersji
 
Prosze sprawdź [OLD_VERSIONS.md](https://github.com/highlightjs/highlight.js/blob/master/OLD_VERSIONS.md) w celu uzyskania wiekszej ilości informacji
## Jak zacząć?
 
Minimalne wymagania do użycia `highlight.js` na stronie internetowej to podlinkowanie biblioteki w twoim projekcie, wraz z plikiem stylów i wywołanie 
`[”initHighlightingOnLoad”][1]:`
 
```html
<link rel="stylesheet" href="/path/to/styles/default.css">
<script src="/path/to/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```
To pomoże znaleźć i podświetlić kod po środku tagów `<pre><code>`;
Biblioteka próbuje rozpoznać język automatycznie. Jeżeli wykrywanie nie zadziała, możesz wybrać język w atrybucie `class`
 
```html
<pre><code class="html">...</code></pre>
```
 
Klasy mogą posiadać również prefix z `language-` albo `lang-`.
 
```html
<pre><code class="language-html">...</code></pre>
```
 
### Zwykły tekst i wyłączenie podświetlania tekstu
Żeby nałożyć style na tekst taki jak kod, ale bez podświetlania go użyj klasy `plaintext`: 
 
```html
<pre><code class="plaintext">...</code></pre>
```
 
Żeby wyłączyć podświetlanie tekstu, użyj klasy `nohighlight`:
 
```html
<pre><code class="nohighlight">...</code></pre>
```
 
### Wspierane języki
 
Highlight.js wspiera ponad 180 różnych języków w głównej bibiotece. Są też również wtyczki językowe pozwalające dodać nowy język. Możesz znaleźć pełną liste wspieranych języków na [SUPPORTED_LANGUAGES.md][9].
 
## Konfiguracja niestandardowa
 
Kiedy potrzebujesz nieco wiecej kontroli nad zainicjowanym highlight.js, możesz użyć funkcji [`highlightBlock`][3] i [`configure`][4]. To pozwala kontrolować Ci *co* wyróżnić i *kiedy*.
Tutaj jest odpowiednik wywołania [`initHighlightingOnLoad`][1] używając vanilla JSa:
 
```js
document.addEventListener('DOMContentLoaded', (event) => {
 document.querySelectorAll('pre code').forEach((block) => {
   hljs.highlightBlock(block);
 });
});
```
 
Możesz użyć jakichkolwiek tagów zamiast `<pre><code>` żeby oznaczyć swój kod. Jeżeli nie używasz kontenera który zapobiega przerwą w linijce, będziesz potrzebowac zkonfugurować highlight.js żeby korzystał z tagu `<br>`:
```js
hljs.configure({useBR: true});
 
document.querySelectorAll('div.code').forEach((block) => {
 hljs.highlightBlock(block);
});
```
 
Dla innych opcji sprawdź dokumentację [`configure`][4].
 
 
## Używanie z Vue.js
 
Zarejestruj wtyczkę z Vue:
 
```js
Vue.use(hljs.vuePlugin);
```
 
I będziesz miec dostęp do komponentu `highlightjs` w swoim templates:
 
```html
 <div id="app">
   <!-- bind to a data property named `code` -->
   <highlightjs autodetect :code="code" />
   <!-- or literal code works as well -->
   <highlightjs language='javascript' code="var x = 5;" />
 </div>
```
 
## Web Workers
 
Możesz używac podświetlania w środku web workera żeby uniknąć lagów przeglądarki kiedy masz doczynienia z dużymi fragmentami kodu. 
 
 
W twoim głównym skrypcie:
 
```js
addEventListener('load', () => {
 const code = document.querySelector('#code');
 const worker = new Worker('worker.js');
 worker.onmessage = (event) => { code.innerHTML = event.data; }
 worker.postMessage(code.textContent);
});
```
 
W worker.js:
 
```js
onmessage = (event) => {
 importScripts('<path>/highlight.min.js');
 const result = self.hljs.highlightAuto(event.data);
 postMessage(result.value);
};
```
 
## Node.js
 
Możesz używac highlight.js z node do podświetlania kontentu przed wysłaniem go do przeglądarki.
Upewnij się aby używac właściwości `.value` aby dostać zformatowany html.
Więcej informacji o obiekcie zwrotnym w dokumentacji
https://highlightjs.readthedocs.io/en/latest/api.html
 
 
```js
// require the highlight.js library, including all languages
const hljs = require('./highlight.js');
const highlightedCode = hljs.highlightAuto('<span>Hello World!</span>').value
```
 
Albo załaduj język który potrzebujesz.
 
```js
const hljs = require("highlight.js/lib/core");  // require only the core library
// separately require languages
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
 
const highlightedCode = hljs.highlight('xml', '<span>Hello World!</span>').value
```
 
 
## Moduły ES6
 
Najpierw zainstaluj przez `npm` albo `yarn` -- Zobacz [Getting the Library](#getting-the-library) poniżej.
 
W twojej aplikacji:
 
```js
import hljs from 'highlight.js';
```
Domyślny import importuje wszystkie języki. Dlatego prawdopodobnie bardziej efektywne będzie importowanie tylko biblioteki i potrzebnych języków:
 
```js
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
```
Zdobycie
Aby ustawić styl podświetlania składni, jeśli narzędzie do kompilacji przetwarza CSS z punktu wejścia JavaScript, możesz również zaimportować arkusz stylów bezpośrednio jako moduły:
 
 
```js
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';
```
 
 
## Pozyskiwanie biblioteki
 
You can get highlight.js as a hosted, or custom-build, browser script or
as a server module. Right out of the box the browser script supports
both AMD and CommonJS, so if you wish you can use RequireJS or
Browserify without having to build from source. The server module also
works perfectly fine with Browserify, but there is the option to use a
build specific to browsers rather than something meant for a server.
Możesz pobrać highlight.js jako hostowany lub niestandardowy skrypt przeglądarki lub jako moduł serwerowy. Skrypt obsługuje zarówno AMD, jak i CommonJS, więc jeśli chcesz, możesz użyć RequireJS lub Browserify bez konieczności budowania ze źródła. Moduł serwera również działa doskonale z Browserify, ale istnieje możliwość użycia builda specyficznego dla przeglądarki, a nie coś przeznaczonego dla serwera.
 
 
 
** Nie łącz bezpośrednio z GitHubem. ** Biblioteka nie powinna działać prosto
od źródła wymaga budowania. Jeśli żadna z gotowych opcji Ci nie odpowiada, patrz
 [building documentation][6].
 
**On Almond.** ** Musisz użyć optymalizatora, aby nadać modułowi nazwę. Na
przykład:
 
 
```bash
r.js -o name=hljs paths.hljs=/path/to/highlight out=highlight.js
```
 
### Hosting CDN
 
Wstępnie skompilowana wersja highlight.js w pakiecie z wieloma popularnymi językami jest obsługiwana przez następujące sieci CDN:
 
**cdnjs** ([link](https://cdnjs.com/libraries/highlight.js))
 
```html
<link rel="stylesheet"
     href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/default.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/highlight.min.js"></script>
<!-- and it's easy to individually load additional languages -->
<script charset="UTF-8"
src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/languages/go.min.js"></script>
```
 
**jsdelivr** ([link](https://www.jsdelivr.com/package/gh/highlightjs/cdn-release))
 
```html
<link rel="stylesheet"
     href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.1.2/build/styles/default.min.css">
<script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.1.2/build/highlight.min.js"></script>
```
 
**unpkg** ([link](https://unpkg.com/browse/@highlightjs/cdn-assets/))
 
```html
<link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@10.3.1/styles/default.min.css">
<script src="https://unpkg.com/@highlightjs/cdn-assets@10.3.1/highlight.min.js"></script>
```
 
** Uwaga: ** *Pakiet `highlight.min.js` hostowany przez CDN nie obejmuje wszystkich języków. * Byłby to
bardzo duży. Możesz znaleźć naszą listę „popularnych” języków, które domyślnie umieszczamy w pakiecie na naszym
 [download page][5].
 
### Hosting własny
 
[download page][5] może szybko wygenerować niestandardowy pakiet zawierający tylko potrzebne języki.
 
Alternatywnie możesz zbudować pakiet przeglądarki z [source](#source):
 
```
node tools/build.js -t browser :common
```
 
Zobacz naszą [building documentation][6] aby uzyskać więcej informacji.
 
** Uwaga: ** Budowanie ze źródła powinno zawsze skutkować kompilacjami o najmniejszym rozmiarze. Strona pobierania witryny jest zoptymalizowana pod kątem szybkości, a nie rozmiaru.
 
 
#### Prebuilt CDN assets
 
Możesz także pobrać i samodzielnie hostować te same zasoby, które udostępniamy za pośrednictwem naszych własnych sieci CDN. Publikujemy te kompilacje w
[cdn-release](https://github.com/highlightjs/cdn-release) repozytorium Github.  Możesz łatwo pobrać pojedyncze pliki z punktów końcowych CDN za pomocą `curl`, etc; Jeżeli potrzebujesz tylko `highlight.min.js` i pojedyńczego pliku CSS.
 
There is also an npm package [@highlightjs/cdn-assets](https://www.npmjs.com/package/@highlightjs/cdn-assets) if pulling the assets in via `npm` or `yarn` would be easier for your build process.
 
 
### NPM / Node.js moduły serwerowe
 
Highlight.js jest również używany na serwerze. Pakiet ze wszystkimi wspieranymi językami może być zainstalowany przez NPM albo Yarn:
 
```bash
npm install highlight.js
# or
yarn add highlight.js
```
 
Alternatywnie, możesz zbudowac build z [source](#source):
 
```bash
node tools/build.js -t node
```
 
Zobacz naszą [building documentation][6] jeżeli chcesz uzyskać więcej informacji.
 
 
### Źródlo
 
[Current source][10] jest dostępny na GitHub.
 
 
## License
 
Highlight.js jest wypuszczony pod licencja BSD. Zobacz [LICENSE][7] plik
Jeżeli chcesz wiecej informacji.
 
 
## Linki
 
Oficjalna biblioteka dostępna na <https://highlightjs.org/>.
 
Dalsza szczegółowa dokumentacja dotycząca interfejsu API i innych tematów znajduje się pod adresem
<http://highlightjs.readthedocs.io/>.
 
Authors and contributors are listed in the [AUTHORS.txt][8] file.
 
[1]: http://highlightjs.readthedocs.io/en/latest/api.html#inithighlightingonload
[2]: http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html
[3]: http://highlightjs.readthedocs.io/en/latest/api.html#highlightblock-block
[4]: http://highlightjs.readthedocs.io/en/latest/api.html#configure-options
[5]: https://highlightjs.org/download/
[6]: http://highlightjs.readthedocs.io/en/latest/building-testing.html
[7]: https://github.com/highlightjs/highlight.js/blob/master/LICENSE
[8]: https://github.com/highlightjs/highlight.js/blob/master/AUTHORS.txt
[9]: https://github.com/highlightjs/highlight.js/blob/master/SUPPORTED_LANGUAGES.md
[10]: https://github.com/highlightjs/
 

