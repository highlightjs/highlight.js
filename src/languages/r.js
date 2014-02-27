/*
Language: R
Author: Joe Cheng <joe@rstudio.org>
*/

function(hljs) {
  var IDENT_RE = '([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*';

  return {
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        begin: IDENT_RE,
        lexemes: IDENT_RE,
        keywords: {
          keyword:
            'function if ifelse in break next repeat else for return switch while try tryCatch|10 ' +
            'stop stopifnot warning require library attach detach source setMethod setGeneric ' +
            'setGroupGeneric setClass ...|10',
          built_in:
            'acf acf2AR add.scope add1 addmargins aggregate aggregate.data.frame ' +
            'aggregate.default aggregate.ts AIC alias anova anova.glm anova.glmlist anova.lm ' +
            'anova.lmlist anova.mlm anovalist.lm ansari.test aov approx approxfun ar ar.burg ' +
            'ar.mle ar.ols ar.yw arima arima.sim arima0 arima0.diag ARMAacf ARMAtoMA ' +
            'as.dendrogram as.dist as.formula as.hclust as.stepfun as.ts asOneSidedFormula ' +
            'ave bandwidth.kernel bartlett.test binom.test binomial biplot Box.test bw.bcv ' +
            'bw.nrd bw.nrd0 bw.SJ bw.ucv C cancor case.names ccf chisq.test clearNames ' +
            'cmdscale coef coefficients complete.cases confint confint.default constrOptim ' +
            'contr.helmert contr.poly contr.SAS contr.sum contr.treatment contrasts convolve ' +
            'cooks.distance cophenetic cor cor.test cov cov.wt cov2cor covratio cpgram cutree ' +
            'cycle D dbeta dbinom dcauchy dchisq decompose delete.response deltat dendrapply ' +
            'density density.default deriv deriv.default deriv.formula deriv3 deriv3.default ' +
            'deriv3.formula deviance dexp df df.kernel df.residual dfbeta dfbetas dffits ' +
            'dgamma dgeom dhyper diff.ts diffinv dist dlnorm dlogis dmultinom dnbinom dnorm ' +
            'dpois drop.scope drop.terms drop1 dsignrank dt dummy.coef dunif dweibull dwilcox ' +
            'ecdf eff.aovlist effects embed end estVar expand.model.frame extractAIC factanal ' +
            'factor.scope family fft filter fisher.test fitted fitted.values fivenum ' +
            'fligner.test formula frequency friedman.test ftable Gamma gaussian get_all_vars ' +
            'getInitial glm glm.control glm.fit glm.fit.null hasTsp hat hatvalues ' +
            'hatvalues.lm hclust heatmap HoltWinters influence influence.measures integrate ' +
            'interaction.plot inverse.gaussian IQR is.empty.model is.leaf is.mts is.stepfun ' +
            'is.ts is.tskernel isoreg KalmanForecast KalmanLike KalmanRun KalmanSmooth ' +
            'kernapply kernel kmeans knots kruskal.test ks.test ksmooth lag lag.plot line ' +
            'lines.ts lm lm.fit lm.fit.null lm.influence lm.wfit lm.wfit.null loadings loess ' +
            'loess.control loess.smooth logLik loglin lowess ls.diag ls.print lsfit mad ' +
            'mahalanobis make.link makeARIMA makepredictcall manova mantelhaen.test ' +
            'mauchley.test mauchly.test mcnemar.test median median.default medpolish ' +
            'model.extract model.frame model.frame.aovlist model.frame.default ' +
            'model.frame.glm model.frame.lm model.matrix model.matrix.default model.matrix.lm ' +
            'model.offset model.response model.tables model.weights monthplot mood.test mvfft ' +
            'na.action na.contiguous na.exclude na.fail na.omit na.pass napredict naprint ' +
            'naresid nextn nlm nlminb nls nls.control NLSstAsymptotic NLSstClosestX ' +
            'NLSstLfAsymptote NLSstRtAsymptote numericDeriv offset oneway.test optim optimise ' +
            'optimize order.dendrogram p.adjust p.adjust.methods pacf pairwise.prop.test ' +
            'pairwise.t.test pairwise.table pairwise.wilcox.test pbeta pbinom pbirthday ' +
            'pcauchy pchisq pexp pf pgamma pgeom phyper plclust plnorm plogis plot.density ' +
            'plot.ecdf plot.lm plot.mlm plot.spec plot.spec.coherency plot.spec.phase ' +
            'plot.stepfun plot.ts plot.TukeyHSD pnbinom pnorm poisson poly polym power ' +
            'power.anova.test power.prop.test power.t.test PP.test ppoints ppois ppr prcomp ' +
            'predict predict.glm predict.lm predict.mlm predict.poly preplot princomp ' +
            'print.anova print.coefmat print.density print.family print.formula print.ftable ' +
            'print.glm print.infl print.integrate print.lm print.logLik print.terms print.ts ' +
            'printCoefmat profile proj promax prop.test prop.trend.test psignrank pt ptukey ' +
            'punif pweibull pwilcox qbeta qbinom qbirthday qcauchy qchisq qexp qf qgamma ' +
            'qgeom qhyper qlnorm qlogis qnbinom qnorm qpois qqline qqnorm qqnorm.default ' +
            'qqplot qsignrank qt qtukey quade.test quantile quantile.default quasi ' +
            'quasibinomial quasipoisson qunif qweibull qwilcox r2dtable rbeta rbinom rcauchy ' +
            'rchisq read.ftable rect.hclust reformulate relevel reorder replications reshape ' +
            'reshapeLong reshapeWide resid residuals residuals.default residuals.glm ' +
            'residuals.lm rexp rf rgamma rgeom rhyper rlnorm rlogis rmultinom rnbinom rnorm ' +
            'rpois rsignrank rstandard rstandard.glm rstandard.lm rstudent rstudent.glm ' +
            'rstudent.lm rt runif runmed rweibull rwilcox scatter.smooth screeplot sd ' +
            'se.contrast selfStart setNames shapiro.test simulate smooth smooth.spline ' +
            'smoothEnds sortedXyData spec.ar spec.pgram spec.taper spectrum spline splinefun ' +
            'SSasymp SSasympOff SSasympOrig SSbiexp SSD SSfol SSfpl SSgompertz SSlogis ' +
            'SSmicmen SSweibull start stat.anova step stepfun stl StructTS summary.aov ' +
            'summary.aovlist summary.glm summary.infl summary.lm summary.manova summary.mlm ' +
            'summary.stepfun supsmu symnum t.test termplot terms terms.aovlist terms.default ' +
            'terms.formula terms.terms time toeplitz ts ts.intersect ts.plot ts.union tsdiag ' +
            'tsp tsSmooth TukeyHSD TukeyHSD.aov uniroot update update.default update.formula ' +
            'var var.test variable.names varimax vcov weighted.mean weighted.residuals ' +
            'weights wilcox.test window write.ftable xtabs abline arrows assocplot axis Axis ' +
            'axis.Date axis.POSIXct axTicks barplot barplot.default box boxplot ' +
            'boxplot.default bxp cdplot close.screen co.intervals contour contour.default ' +
            'coplot curve dotchart erase.screen filled.contour fourfoldplot frame grid hist ' +
            'hist.default identify image image.default layout layout.show lcm legend lines ' +
            'lines.default locator matlines matplot matpoints mosaicplot mtext pairs ' +
            'pairs.default panel.smooth par persp pie piechart plot plot.default plot.design ' +
            'plot.new plot.window plot.xy points points.default polygon rect rug screen ' +
            'segments spineplot split.screen stars stem strheight stripchart strwidth ' +
            'sunflowerplot symbols text text.default title xinch xyinch yinch ' +
            'as.graphicsAnnot bitmap bmp boxplot.stats bringToTop check.options chull CIDFont ' +
            'cm cm.colors col2rgb colorConverter colorRamp colorRampPalette colors ' +
            'colorspaces colours contourLines convertColor dev.control dev.copy dev.copy2eps ' +
            'dev.cur dev.interactive dev.list dev.next dev.off dev.prev dev.print dev.set ' +
            'dev2bitmap embedFonts extendrange getGraphicsEvent graphics.off gray gray.colors ' +
            'grey grey.colors hcl heat.colors Hershey hsv jpeg make.rgb n2mfrow nclass.FD ' +
            'nclass.scott nclass.Sturges palette pdf pdfFonts pictex png postscript ' +
            'postscriptFont postscriptFonts ps.options rainbow recordGraphics recordPlot ' +
            'replayPlot rgb rgb2hsv savePlot terrain.colors topo.colors trans3d Type1Font ' +
            'win.graph win.metafile win.print windows windowsFont windowsFonts x11 X11 xfig ' +
            'xy.coords xyz.coords alarm apropos argsAnywhere as.person as.personList as.roman ' +
            'assignInNamespace available.packages browseEnv browseURL bug.report ' +
            'capture.output checkCRAN choose.dir choose.files chooseCRANmirror citation ' +
            'citEntry citFooter citHeader close.socket combn compareVersion contrib.url ' +
            'count.fields CRAN.packages data data.entry dataentry de de.ncols de.restore ' +
            'de.setup debugger demo DLL.version download.file download.packages dump.frames ' +
            'edit emacs example file.edit file_test Filters find fix fixInNamespace ' +
            'fixup.libraries.URLs fixup.package.URLs flush.console formatOL formatUL ' +
            'getAnywhere getClipboardFormats getFromNamespace getIdentification getS3method ' +
            'getWindowsHandle getWindowTitle glob2rx head head.matrix help help.search ' +
            'help.start history index.search install.packages installed.packages ' +
            'limitedLabels link.html.help loadhistory loadRconsole localeToCharset ls.str ' +
            'lsf.str make.packages.html make.search.html make.socket ' +
            'makeRweaveLatexCodeRunner memory.limit memory.size menu methods mirror2html ' +
            'modifyList new.packages normalizePath object.size old.packages package.contents ' +
            'package.skeleton packageDescription packageStatus page person personList pico ' +
            'prompt promptData promptPackage read.csv read.csv2 read.delim read.delim2 ' +
            'read.DIF read.fortran read.fwf read.socket read.table readCitationFile ' +
            'readClipboard readNEWS recover remove.packages Rprof Rprofmem RShowDoc ' +
            'RSiteSearch Rtangle RtangleSetup RtangleWritedoc RweaveChunkPrefix ' +
            'RweaveEvalWithOpt RweaveLatex RweaveLatexFinish RweaveLatexOptions ' +
            'RweaveLatexSetup RweaveLatexWritedoc RweaveTryStop savehistory select.list ' +
            'sessionInfo setRepositories setStatusBar setWindowTitle shortPathName stack ' +
            'Stangle str strOptions summaryRprof Sweave SweaveHooks SweaveSyntaxLatex ' +
            'SweaveSyntaxNoweb SweaveSyntConv tail tail.matrix timestamp toBibtex toLatex ' +
            'type.convert unstack update.packages update.packageStatus upgrade url.show ' +
            'URLdecode URLencode vi View vignette win.version winDialog winDialogString ' +
            'winMenuAdd winMenuAddItem winMenuDel winMenuDelItem winMenuItems winMenuNames ' +
            'withVisible write.csv write.csv2 write.socket write.table writeClipboard ' +
            'wsbrowser xedit xemacs zip.file.extract zip.unpack ability.cov airmiles ' +
            'AirPassengers airquality anscombe attenu attitude austres beaver1 beaver2 ' +
            'BJsales BJsales.lead BOD cars ChickWeight chickwts co2 CO2 crimtab discoveries ' +
            'DNase esoph euro euro.cross eurodist EuStockMarkets faithful fdeaths ' +
            'Formaldehyde freeny freeny.x freeny.y HairEyeColor Harman23.cor Harman74.cor ' +
            'Indometh infert InsectSprays iris iris3 islands JohnsonJohnson LakeHuron ldeaths ' +
            'lh LifeCycleSavings Loblolly longley lynx mdeaths morley mtcars nhtemp Nile ' +
            'nottem Orange OrchardSprays PlantGrowth precip presidents pressure Puromycin ' +
            'quakes randu rivers rock Seatbelts sleep stack.loss stack.x stackloss state.abb ' +
            'state.area state.center state.division state.name state.region state.x77 ' +
            'sunspot.month sunspot.year sunspots swiss Theoph Titanic ToothGrowth treering ' +
            'trees UCBAdmissions UKDriverDeaths UKgas USAccDeaths USArrests USJudgeRatings ' +
            'USPersonalExpenditure uspop VADeaths volcano warpbreaks women WorldPhones ' +
            'WWWusage addNextMethod allGenerics allNames Arith as asMethodDefinition ' +
            'assignClassDef assignMethodsMetaData balanceMethodsList cacheGenericsMetaData ' +
            'cacheMetaData cacheMethod callGeneric callNextMethod canCoerce cbind2 ' +
            'checkSlotAssignment classMetaName coerce Compare completeClassDefinition ' +
            'completeExtends completeSubclasses Complex conformMethod defaultDumpName ' +
            'defaultPrototype doPrimitiveMethod dumpMethod dumpMethods el elNamed empty.dump ' +
            'emptyMethodsList existsFunction existsMethod extends finalDefaultMethod ' +
            'findClass findFunction findMethod findUnique fixPre1.8 formalArgs functionBody ' +
            'generic.skeleton getAccess getAllMethods getAllSuperClasses getClass getClassDef ' +
            'getClasses getClassName getClassPackage getDataPart getExtends getFunction ' +
            'getGeneric getGenerics getGroup getGroupMembers getMethod getMethods ' +
            'getMethodsForDispatch getMethodsMetaData getPackageName getProperties ' +
            'getPrototype getSlots getSubclasses getValidity getVirtual hasArg hasMethod ' +
            'initialize insertMethod is isClass isClassDef isClassUnion isGeneric ' +
            'isGrammarSymbol isGroup isSealedClass isSealedMethod isVirtualClass languageEl ' +
            'linearizeMlist listFromMethods listFromMlist loadMethod Logic ' +
            'makeClassRepresentation makeExtends makeGeneric makeMethodsList ' +
            'makePrototypeFromClassDef makeStandardGeneric matchSignature Math Math2 ' +
            'mergeMethods metaNameUndo method.skeleton MethodAddCoerce methodSignatureMatrix ' +
            'MethodsList MethodsListSelect methodsPackageMetaName missingArg mlistMetaName ' +
            'new newBasic newClassRepresentation newEmptyObject Ops packageSlot ' +
            'possibleExtends promptClass promptMethods prototype Quote rbind2 ' +
            'reconcilePropertiesAndPrototype rematchDefinition removeClass removeGeneric ' +
            'removeMethod removeMethods removeMethodsObject representation requireMethods ' +
            'resetClass resetGeneric sealClass seemsS4Object selectMethod sessionData setAs ' +
            'setClass setClassUnion setDataPart setGeneric setGroupGeneric setIs setMethod ' +
            'setOldClass setPackageName setPrimitiveMethods setReplaceMethod setValidity show ' +
            'showClass showDefault showExtends showMethods showMlist signature ' +
            'SignatureMethod sigToEnv slot slotNames substituteDirect substituteFunctionArgs ' +
            'Summary superClassDepth testVirtual traceOff traceOn tryNew trySilent ' +
            'unRematchDefinition validObject validSlotNames abbreviate abs acos acosh ' +
            'addTaskCallback agrep alist all all.equal all.equal.character all.equal.default ' +
            'all.equal.factor all.equal.formula all.equal.language all.equal.list ' +
            'all.equal.numeric all.equal.POSIXct all.equal.raw all.names all.vars any aperm ' +
            'append apply Arg args array as.array as.call as.character as.character.condition ' +
            'as.character.Date as.character.default as.character.error as.character.factor ' +
            'as.character.hexmode as.character.octmode as.character.package_version ' +
            'as.character.POSIXt as.character.srcref as.complex as.complex.default ' +
            'as.data.frame as.data.frame.array as.data.frame.AsIs as.data.frame.character ' +
            'as.data.frame.complex as.data.frame.data.frame as.data.frame.Date ' +
            'as.data.frame.default as.data.frame.difftime as.data.frame.factor ' +
            'as.data.frame.integer as.data.frame.list as.data.frame.logical ' +
            'as.data.frame.matrix as.data.frame.model.matrix as.data.frame.numeric ' +
            'as.data.frame.ordered as.data.frame.package_version as.data.frame.POSIXct ' +
            'as.data.frame.POSIXlt as.data.frame.raw as.data.frame.table as.data.frame.ts ' +
            'as.data.frame.vector as.Date as.Date.character as.Date.date as.Date.dates ' +
            'as.Date.default as.Date.factor as.Date.POSIXct as.Date.POSIXlt as.difftime ' +
            'as.double as.double.default as.double.difftime as.environment as.expression ' +
            'as.expression.default as.factor as.function as.function.default as.integer ' +
            'as.integer.default as.list as.list.data.frame as.list.default ' +
            'as.list.environment as.list.factor as.logical as.logical.default as.matrix ' +
            'as.matrix.data.frame as.matrix.default as.matrix.noquote as.matrix.POSIXlt ' +
            'as.name as.null as.null.default as.numeric as.numeric.POSIXlt as.ordered ' +
            'as.package_version as.pairlist as.POSIXct as.POSIXct.date as.POSIXct.Date ' +
            'as.POSIXct.dates as.POSIXct.default as.POSIXct.POSIXlt as.POSIXlt as.qr as.raw ' +
            'as.real as.single as.single.default as.symbol as.table as.table.default ' +
            'as.vector as.vector.factor asin asinh asNamespace asS4 assign atan atan2 atanh ' +
            'attach attachNamespace attr attr.all.equal attributes autoload autoloader ' +
            'backsolve baseenv basename besselI besselJ besselK besselY beta bindingIsActive ' +
            'bindingIsLocked bindtextdomain body bquote browser builtins by by.data.frame ' +
            'by.default bzfile c c.Date c.noquote c.package_version c.POSIXct c.POSIXlt call ' +
            'callCC capabilities casefold cat category cbind cbind.data.frame ceiling ' +
            'char.expand character charmatch charToRaw chartr check_tzones chol chol2inv ' +
            'choose class close close.connection close.srcfile closeAllConnections codes ' +
            'codes.factor codes.ordered col colMeans colnames colSums commandArgs comment ' +
            'complex computeRestarts conditionCall conditionCall.condition conditionMessage ' +
            'conditionMessage.condition conflicts Conj contributors cos cosh crossprod ' +
            'Cstack_info cummax cummin cumprod cumsum cut cut.Date cut.default cut.POSIXt ' +
            'data.class data.frame data.matrix date debug default.stringsAsFactors delay ' +
            'delayedAssign deparse det detach determinant determinant.matrix dget diag diff ' +
            'diff.Date diff.default diff.POSIXt difftime digamma dim dim.data.frame dimnames ' +
            'dimnames.data.frame dir dir.create dirname do.call double dput dQuote drop dump ' +
            'duplicated duplicated.array duplicated.data.frame duplicated.default ' +
            'duplicated.matrix duplicated.POSIXlt dyn.load dyn.unload eapply eigen emptyenv ' +
            'encodeString Encoding env.profile environment environmentIsLocked ' +
            'environmentName eval eval.parent evalq exists exp expand.grid expm1 expression ' +
            'factor factorial fifo file file.access file.append file.choose file.copy ' +
            'file.create file.exists file.info file.path file.remove file.rename file.show ' +
            'file.symlink findInterval findPackageEnv findRestart floor flush ' +
            'flush.connection force formals format format.AsIs format.char format.data.frame ' +
            'format.Date format.default format.difftime format.factor format.hexmode ' +
            'format.info format.octmode format.POSIXct format.POSIXlt format.pval formatC ' +
            'formatDL forwardsolve gamma gammaCody gc gc.time gcinfo gctorture get ' +
            'getAllConnections getCallingDLL getCallingDLLe getCConverterDescriptions ' +
            'getCConverterStatus getConnection getDLLRegisteredRoutines ' +
            'getDLLRegisteredRoutines.character getDLLRegisteredRoutines.DLLInfo getenv ' +
            'geterrmessage getExportedValue getHook getLoadedDLLs getNamespace ' +
            'getNamespaceExports getNamespaceImports getNamespaceInfo getNamespaceName ' +
            'getNamespaceUsers getNamespaceVersion getNativeSymbolInfo getNumCConverters ' +
            'getOption getRversion getSrcLines getTaskCallbackNames gettext gettextf getwd gl ' +
            'globalenv gregexpr grep gsub gzcon gzfile httpclient I iconv iconvlist identical ' +
            'Im importIntoEnv inherits integer interaction interactive intersect intToBits ' +
            'intToUtf8 inverse.rle invisible invokeRestart invokeRestartInteractively ' +
            'is.array is.atomic is.call is.character is.complex is.data.frame is.double ' +
            'is.element is.environment is.expression is.factor is.finite is.function ' +
            'is.infinite is.integer is.language is.list is.loaded is.logical is.matrix is.na ' +
            'is.na.data.frame is.na.POSIXlt is.name is.nan is.null is.numeric is.object ' +
            'is.ordered is.package_version is.pairlist is.primitive is.qr is.R is.raw is.real ' +
            'is.recursive is.single is.symbol is.table is.unsorted is.vector isBaseNamespace ' +
            'isIncomplete isNamespace ISOdate ISOdatetime isOpen isRestart isS4 isSeekable ' +
            'isSymmetric isSymmetric.matrix isTRUE jitter julian julian.Date julian.POSIXt ' +
            'kappa kappa.default kappa.lm kappa.qr kappa.tri kronecker l10n_info La.chol ' +
            'La.chol2inv La.eigen La.svd labels labels.default lapply last.warning lazyLoad ' +
            'lbeta lchoose length letters LETTERS levels lfactorial lgamma library ' +
            'library.dynam library.dynam.unload licence license list list.files load ' +
            'loadedNamespaces loadingNamespaceInfo loadNamespace loadURL local lockBinding ' +
            'lockEnvironment log log10 log1p log2 logb logical lower.tri ls machine Machine ' +
            'make.names make.unique makeActiveBinding manglePackageName mapply margin.table ' +
            'mat.or.vec match match.arg match.call match.fun Math.data.frame Math.Date ' +
            'Math.difftime Math.factor Math.POSIXt matrix max max.col mean mean.data.frame ' +
            'mean.Date mean.default mean.difftime mean.POSIXct mean.POSIXlt mem.limits ' +
            'memory.profile merge merge.data.frame merge.default message mget min missing Mod ' +
            'mode month.abb month.name months months.Date months.POSIXt names namespaceExport ' +
            'namespaceImport namespaceImportClasses namespaceImportFrom ' +
            'namespaceImportMethods nargs nchar ncol NCOL new.env NextMethod ngettext nlevels ' +
            'noquote nrow NROW numeric objects oldClass on.exit open open.connection ' +
            'open.srcfile open.srcfilecopy Ops.data.frame Ops.Date Ops.difftime Ops.factor ' +
            'Ops.ordered Ops.package_version Ops.POSIXt options order ordered outer ' +
            'package.description package_version packageEvent packageHasNamespace ' +
            'packageStartupMessage packBits pairlist parent.env parent.frame parse parse.dcf ' +
            'parseNamespaceFile paste path.expand pentagamma pi pipe Platform pmatch pmax ' +
            'pmax.int pmin pmin.int polyroot pos.to.env pretty prettyNum print print.AsIs ' +
            'print.atomic print.by print.condition print.connection print.data.frame ' +
            'print.Date print.default print.difftime print.DLLInfo print.DLLInfoList ' +
            'print.DLLRegisteredRoutines print.factor print.hexmode print.libraryIQR ' +
            'print.listof print.NativeRoutineList print.noquote print.octmode ' +
            'print.package_version print.packageInfo print.POSIXct print.POSIXlt ' +
            'print.proc_time print.restart print.rle print.simple.list print.srcfile ' +
            'print.srcref print.summary.table print.table print.warnings printNoClass ' +
            'prmatrix proc.time prod prop.table provide psigamma pushBack pushBackLength q qr ' +
            'qr.coef qr.fitted qr.Q qr.qty qr.qy qr.R qr.resid qr.solve qr.X quarters ' +
            'quarters.Date quarters.POSIXt quit quote R.home R.version R.Version ' +
            'R.version.string range range.default rank rapply raw rawShift rawToBits ' +
            'rawToChar rbind rbind.data.frame Re read.dcf read.table.url readBin readChar ' +
            'readline readLines real Recall reg.finalizer regexpr registerS3method ' +
            'registerS3methods remove removeCConverter removeTaskCallback rep rep.Date ' +
            'rep.factor rep.int rep.POSIXct rep.POSIXlt replace replicate require restart ' +
            'restartDescription restartFormals retracemem return rev rev.default rle rm ' +
            'RNGkind RNGversion round round.Date round.difftime round.POSIXt row row.names ' +
            'row.names.data.frame row.names.default rowMeans rownames rowsum ' +
            'rowsum.data.frame rowsum.default rowSums sample sapply save save.image ' +
            'saveNamespaceImage scale scale.default scan scan.url search searchpaths seek ' +
            'seek.connection seq seq.Date seq.default seq.int seq.POSIXt seq_along seq_len ' +
            'sequence serialize set.seed setCConverterStatus setdiff setequal setHook ' +
            'setNamespaceInfo setwd shell shell.exec showConnections shQuote sign ' +
            'signalCondition signif simpleCondition simpleError simpleMessage simpleWarning ' +
            'sin single sinh sink sink.number slice.index socketConnection socketSelect solve ' +
            'solve.default solve.qr sort sort.default sort.int sort.list sort.POSIXlt source ' +
            'source.url split split.data.frame split.default sprintf sqrt sQuote srcfile ' +
            'srcfilecopy srcref standardGeneric stderr stdin stdout stop stopifnot ' +
            'storage.mode strftime strptime strsplit strtrim structure strwrap sub subset ' +
            'subset.data.frame subset.default subset.matrix substitute substr substring sum ' +
            'summary summary.connection summary.data.frame Summary.data.frame summary.Date ' +
            'Summary.Date summary.default Summary.difftime summary.factor Summary.factor ' +
            'summary.matrix Summary.package_version summary.POSIXct Summary.POSIXct ' +
            'summary.POSIXlt Summary.POSIXlt summary.table suppressMessages ' +
            'suppressPackageStartupMessages suppressWarnings svd sweep symbol.C symbol.For ' +
            'sys.call sys.calls Sys.Date sys.frame sys.frames sys.function Sys.getenv ' +
            'Sys.getlocale Sys.getpid Sys.glob Sys.info sys.load.image Sys.localeconv ' +
            'sys.nframe sys.on.exit sys.parent sys.parents Sys.putenv sys.save.image ' +
            'Sys.setenv Sys.setlocale Sys.sleep sys.source sys.status Sys.time Sys.timezone ' +
            'Sys.unsetenv system system.file system.time t t.data.frame t.default table ' +
            'tabulate tan tanh tapply taskCallbackManager tcrossprod tempdir tempfile ' +
            'testPlatformEquivalence tetragamma textConnection textConnectionValue tolower ' +
            'topenv toString toString.default toupper trace traceback tracemem tracingState ' +
            'transform transform.data.frame transform.default trigamma trunc trunc.Date ' +
            'trunc.POSIXt truncate truncate.connection try tryCatch typeof unclass undebug ' +
            'union unique unique.array unique.data.frame unique.default unique.matrix ' +
            'unique.POSIXlt units units.difftime unix unix.time unlink unlist unloadNamespace ' +
            'unlockBinding unname unserialize unsplit untrace untracemem unz upper.tri url ' +
            'UseMethod utf8ToInt vector Vectorize version Version warning warnings weekdays ' +
            'weekdays.Date weekdays.POSIXt which which.max which.min with with.default ' +
            'withCallingHandlers withRestarts write write.dcf write.table0 writeBin writeChar ' +
            'writeLines xor xpdrows.data.frame zapsmall lset xtable',
          literal:
            'NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 ' +
            'NA_complex_|10'
        },
        relevance: 0
      },
      {
        // hex value
        className: 'number',
        begin: "0[xX][0-9a-fA-F]+[Li]?\\b",
        relevance: 0
      },
      {
        // explicit integer
        className: 'number',
        begin: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
        relevance: 0
      },
      {
        // number with trailing decimal
        className: 'number',
        begin: "\\d+\\.(?!\\d)(?:i\\b)?",
        relevance: 0
      },
      {
        // number
        className: 'number',
        begin: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
        relevance: 0
      },
      {
        // number with leading decimal
        className: 'number',
        begin: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",
        relevance: 0
      },

      {
        // escaped identifier
        begin: '`',
        end: '`',
        relevance: 0
      },

      {
        className: 'string',
        contains: [hljs.BACKSLASH_ESCAPE],
        variants: [
          {begin: '"', end: '"'},
          {begin: "'", end: "'"}
        ]
      }
    ]
  };
}
