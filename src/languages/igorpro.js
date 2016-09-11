/*
 * Language: Igor Pro
 * Author: Adam Light <adam@wavemetrics.com>,
 *         Thomas Braun <thomas.braun@byte-physics.de>
 * Contributors:
 * Category: scientific
 * Description: Programming language used by Igor Pro (www.igorpro.net)
*/

function(hljs) {

  var WAVE_DECLARATION = {
    className : 'keyword',
    relevance : 10,
    begin     : '^\\s*Wave\\b'
  };

  var PRE_PROCESSOR = {
    className : 'meta',
    begin     : '^#[a-z]+'
  };

  var IGOR_KEYWORDS = {
  /* Igor Keywords */
    keyword: 'window while waveclear variable|10 uint64 try threadsafe switch svar ' +
			'submenu structure struct strswitch string strconstant static return prompt prompt ' +
			'proc picture override nvar multithread menu macro int64 int if ' +
			'function funcref for endtry endswitch endstructure endmacro endif endfor end ' +
			'elseif else double doprompt do dfref default continue constant complex ' +
			'catch case break abortonvalue abortonrte',

  /* Igor Operations */
	  built_in: 'AddListItem AiryA AiryAD AiryB AiryBD AnnotationInfo AnnotationList AxisInfo' +
  'AxisList AxisList AxisValFromPixel AxonTelegraphAGetDataNum' +
  'AxonTelegraphAGetDataString AxonTelegraphAGetDataString' +
  'AxonTelegraphAGetDataStruct AxonTelegraphAGetDataStruct AxonTelegraphGetDataNum' +
  'AxonTelegraphGetDataString AxonTelegraphGetDataString' +
  'AxonTelegraphGetDataStruct AxonTelegraphGetDataStruct AxonTelegraphGetTimeoutMs' +
  'AxonTelegraphSetTimeoutMs AxonTelegraphSetTimeoutMs Besseli Besselj Besselk' +
  'Bessely Bessely BinarySearch BinarySearchInterp CTabList CaptureHistory' +
  'CaptureHistoryStart CaptureHistoryStart CheckName ChildWindowList CleanupName' +
  'ContourInfo ContourInfo ContourNameList ContourNameToWaveRef ContourZ' +
  'ControlNameList ControlNameList ConvertTextEncoding CountObjects' +
  'CountObjectsDFR CountObjectsDFR CreationDate CsrInfo CsrWave CsrWaveRef' +
  'CsrXWave CsrXWave CsrXWaveRef DataFolderDir DataFolderExists' +
  'DataFolderRefStatus DataFolderRefStatus DataFolderRefsEqual DateToJulian Dawson' +
  'DimDelta DimDelta DimOffset DimSize ExpConvExp ExpConvExpFit' +
  'ExpConvExpFit1Shape ExpConvExpFit1Shape ExpConvExpFit1ShapeBL ExpConvExpFitBL' +
  'ExpGauss ExpGauss ExpGaussFit ExpGaussFit1Shape ExpGaussFit1ShapeBL' +
  'ExpGaussFitBL ExpGaussFitBL FetchURL FindDimLabel FindListItem FontList' +
  'FontSizeHeight FontSizeHeight FontSizeStringWidth FresnelCos FresnelSin' +
  'FuncRefInfo FuncRefInfo FunctionInfo FunctionList FunctionPath' +
  'GISGetAllFileFormats GISGetAllFileFormats GISIgorGISVersion GISSRefsAreEqual' +
  'Gauss Gauss Gauss1D Gauss2D GaussFit GaussFit1Width GaussFit1WidthBL GaussFitBL' +
  'GetBrowserLine GetBrowserLine GetBrowserSelection GetDataFolder' +
  'GetDataFolderDFR GetDataFolderDFR GetDefaultFont GetDefaultFontSize' +
  'GetDefaultFontStyle GetDefaultFontStyle GetDimLabel GetEnvironmentVariable' +
  'GetErrMessage GetErrMessage GetFormula GetIndependentModuleName' +
  'GetIndexedObjName GetIndexedObjName GetIndexedObjNameDFR GetKeyState' +
  'GetRTErrMessage GetRTErrMessage GetRTError GetRTLocInfo GetRTLocation' +
  'GetRTStackInfo GetRTStackInfo GetScrapText GetUserData GetWavesDataFolder' +
  'GetWavesDataFolderDFR GetWavesDataFolderDFR GizmoInfo GizmoScale GrepList' +
  'GrepString GrepString GuideInfo GuideNameList HDF5AttributeInfo HDF5DatasetInfo' +
  'HDF5LibraryInfo HDF5LibraryInfo HDF5TypeInfo Hash HyperG0F1 HyperG1F1 HyperG2F1' +
  'HyperGNoise HyperGNoise HyperGPFQ IgorInfo IgorVersion ImageInfo ImageNameList' +
  'ImageNameToWaveRef ImageNameToWaveRef IndependentModuleList IndexToScale' +
  'IndexedDir IndexedDir IndexedFile Inf Integrate1D Interp2D Interp3D ItemsInList' +
  'JacobiCn JacobiCn JacobiSn JulianToDate Laguerre LaguerreA LaguerreGauss' +
  'LambertW LambertW LayoutInfo LegendreA ListMatch ListToTextWave' +
  'ListToWaveRefWave ListToWaveRefWave LorentzianFit LorentzianFit1Width' +
  'LorentzianFit1WidthBL LorentzianFit1WidthBL LorentzianFitBL LowerStr' +
  'MCC_AutoBridgeBal MCC_AutoBridgeBal MCC_AutoFastComp MCC_AutoPipetteOffset' +
  'MCC_AutoSlowComp MCC_AutoSlowComp MCC_AutoWholeCellComp MCC_GetBridgeBalEnable' +
  'MCC_GetBridgeBalResist MCC_GetBridgeBalResist MCC_GetFastCompCap' +
  'MCC_GetFastCompTau MCC_GetFastCompTau MCC_GetHolding MCC_GetHoldingEnable' +
  'MCC_GetMode MCC_GetMode MCC_GetNeutralizationCap MCC_GetNeutralizationEnable' +
  'MCC_GetOscKillerEnable MCC_GetOscKillerEnable MCC_GetPipetteOffset' +
  'MCC_GetPrimarySignalGain MCC_GetPrimarySignalGain MCC_GetPrimarySignalHPF' +
  'MCC_GetPrimarySignalLPF MCC_GetPrimarySignalLPF MCC_GetRsCompBandwidth' +
  'MCC_GetRsCompCorrection MCC_GetRsCompCorrection MCC_GetRsCompEnable' +
  'MCC_GetRsCompPrediction MCC_GetRsCompPrediction MCC_GetSecondarySignalGain' +
  'MCC_GetSecondarySignalLPF MCC_GetSecondarySignalLPF MCC_GetSlowCompCap' +
  'MCC_GetSlowCompTau MCC_GetSlowCompTau MCC_GetSlowCompTauX20Enable' +
  'MCC_GetSlowCurrentInjEnable MCC_GetSlowCurrentInjEnable' +
  'MCC_GetSlowCurrentInjLevel MCC_GetSlowCurrentInjLevel' +
  'MCC_GetSlowCurrentInjSetlTime MCC_GetSlowCurrentInjSetlTime' +
  'MCC_GetWholeCellCompCap MCC_GetWholeCellCompCap MCC_GetWholeCellCompEnable' +
  'MCC_GetWholeCellCompResist MCC_GetWholeCellCompResist MCC_SelectMultiClamp700B' +
  'MCC_SetBridgeBalEnable MCC_SetBridgeBalEnable MCC_SetBridgeBalResist' +
  'MCC_SetFastCompCap MCC_SetFastCompCap MCC_SetFastCompTau MCC_SetHolding' +
  'MCC_SetHoldingEnable MCC_SetHoldingEnable MCC_SetMode MCC_SetNeutralizationCap' +
  'MCC_SetNeutralizationEnable MCC_SetNeutralizationEnable MCC_SetOscKillerEnable' +
  'MCC_SetPipetteOffset MCC_SetPipetteOffset MCC_SetPrimarySignalGain' +
  'MCC_SetPrimarySignalHPF MCC_SetPrimarySignalHPF MCC_SetPrimarySignalLPF' +
  'MCC_SetRsCompBandwidth MCC_SetRsCompBandwidth MCC_SetRsCompCorrection' +
  'MCC_SetRsCompEnable MCC_SetRsCompEnable MCC_SetRsCompPrediction' +
  'MCC_SetSecondarySignalGain MCC_SetSecondarySignalGain MCC_SetSecondarySignalLPF' +
  'MCC_SetSlowCompCap MCC_SetSlowCompCap MCC_SetSlowCompTau' +
  'MCC_SetSlowCompTauX20Enable MCC_SetSlowCompTauX20Enable' +
  'MCC_SetSlowCurrentInjEnable MCC_SetSlowCurrentInjEnable' +
  'MCC_SetSlowCurrentInjLevel MCC_SetSlowCurrentInjLevel' +
  'MCC_SetSlowCurrentInjSetlTime MCC_SetSlowCurrentInjSetlTime MCC_SetTimeoutMs' +
  'MCC_SetWholeCellCompCap MCC_SetWholeCellCompCap MCC_SetWholeCellCompEnable' +
  'MCC_SetWholeCellCompResist MCC_SetWholeCellCompResist MPFXEMGPeak' +
  'MPFXExpConvExpPeak MPFXExpConvExpPeak MPFXGaussPeak MPFXLorenzianPeak' +
  'MPFXVoigtPeak MPFXVoigtPeak MacroList MandelbrotPoint MarcumQ MatrixCondition' +
  'MatrixDet MatrixDet MatrixDot MatrixRank MatrixTrace ModDate NVAR_Exists NaN' +
  'NameOfWave NameOfWave NewFreeDataFolder NewFreeWave NormalizeUnicode' +
  'NumVarOrDefault NumVarOrDefault NumberByKey OperationList PICTInfo PICTList' +
  'PadString PadString PanelResolution ParamIsDefault ParseFilePath PathList Pi' +
  'PixelFromAxisVal PixelFromAxisVal PolygonArea PossiblyQuoteName ProcedureText' +
  'RemoveByKey RemoveByKey RemoveEnding RemoveFromList RemoveListItem' +
  'ReplaceNumberByKey ReplaceNumberByKey ReplaceString ReplaceStringByKey' +
  'SQL2DBinaryWaveToTextWave SQL2DBinaryWaveToTextWave SQLAllocHandle SQLAllocStmt' +
  'SQLBinaryWavesToTextWave SQLBinaryWavesToTextWave SQLBindCol SQLBindParameter' +
  'SQLBrowseConnect SQLBrowseConnect SQLBulkOperations SQLCancel SQLCloseCursor' +
  'SQLColAttributeNum SQLColAttributeNum SQLColAttributeStr SQLColumnPrivileges' +
  'SQLColumns SQLColumns SQLConnect SQLDataSources SQLDescribeCol SQLDescribeParam' +
  'SQLDisconnect SQLDisconnect SQLDriverConnect SQLDrivers SQLEndTran SQLError' +
  'SQLExecDirect SQLExecDirect SQLExecute SQLFetch SQLFetchScroll SQLForeignKeys' +
  'SQLFreeConnect SQLFreeConnect SQLFreeEnv SQLFreeHandle SQLFreeStmt' +
  'SQLGetConnectAttrNum SQLGetConnectAttrNum SQLGetConnectAttrStr SQLGetCursorName' +
  'SQLGetDataNum SQLGetDataNum SQLGetDataStr SQLGetDescFieldNum SQLGetDescFieldStr' +
  'SQLGetDescRec SQLGetDescRec SQLGetDiagFieldNum SQLGetDiagFieldStr SQLGetDiagRec' +
  'SQLGetEnvAttrNum SQLGetEnvAttrNum SQLGetEnvAttrStr SQLGetFunctions' +
  'SQLGetInfoNum SQLGetInfoNum SQLGetInfoStr SQLGetStmtAttrNum SQLGetStmtAttrStr' +
  'SQLGetTypeInfo SQLGetTypeInfo SQLMoreResults SQLNativeSql SQLNumParams' +
  'SQLNumResultCols SQLNumResultCols SQLNumResultRowsIfKnown SQLNumRowsFetched' +
  'SQLParamData SQLParamData SQLPrepare SQLPrimaryKeys SQLProcedureColumns' +
  'SQLProcedures SQLProcedures SQLPutData SQLReinitialize SQLRowCount' +
  'SQLSetConnectAttrNum SQLSetConnectAttrNum SQLSetConnectAttrStr SQLSetCursorName' +
  'SQLSetDescFieldNum SQLSetDescFieldNum SQLSetDescFieldStr SQLSetDescRec' +
  'SQLSetEnvAttrNum SQLSetEnvAttrNum SQLSetEnvAttrStr SQLSetPos SQLSetStmtAttrNum' +
  'SQLSetStmtAttrStr SQLSetStmtAttrStr SQLSpecialColumns SQLStatistics' +
  'SQLTablePrivileges SQLTablePrivileges SQLTables SQLTextWaveTo2DBinaryWave' +
  'SQLTextWaveToBinaryWaves SQLTextWaveToBinaryWaves SQLUpdateBoundValues' +
  'SQLXOPCheckState SQLXOPCheckState SVAR_Exists ScreenResolution Secs2Date' +
  'Secs2Time Secs2Time SelectNumber SelectString SetEnvironmentVariable SortList' +
  'SpecialCharacterInfo SpecialCharacterInfo SpecialCharacterList SpecialDirPath' +
  'SphericalBessJ SphericalBessJ SphericalBessJD SphericalBessY SphericalBessYD' +
  'SphericalHarmonics SphericalHarmonics StartMSTimer StatsBetaCDF StatsBetaPDF' +
  'StatsBinomialCDF StatsBinomialCDF StatsBinomialPDF StatsCMSSDCDF StatsCauchyCDF' +
  'StatsCauchyPDF StatsCauchyPDF StatsChiCDF StatsChiPDF StatsCorrelation' +
  'StatsDExpCDF StatsDExpCDF StatsDExpPDF StatsEValueCDF StatsEValuePDF' +
  'StatsErlangCDF StatsErlangCDF StatsErlangPDF StatsErrorPDF StatsExpCDF' +
  'StatsExpPDF StatsExpPDF StatsFCDF StatsFPDF StatsFriedmanCDF StatsGEVCDF' +
  'StatsGEVPDF StatsGEVPDF StatsGammaCDF StatsGammaPDF StatsGeometricCDF' +
  'StatsGeometricPDF StatsGeometricPDF StatsHyperGCDF StatsHyperGPDF' +
  'StatsInvBetaCDF StatsInvBetaCDF StatsInvBinomialCDF StatsInvCMSSDCDF' +
  'StatsInvCauchyCDF StatsInvCauchyCDF StatsInvChiCDF StatsInvDExpCDF' +
  'StatsInvEValueCDF StatsInvEValueCDF StatsInvExpCDF StatsInvFCDF' +
  'StatsInvFriedmanCDF StatsInvFriedmanCDF StatsInvGammaCDF StatsInvGeometricCDF' +
  'StatsInvKuiperCDF StatsInvKuiperCDF StatsInvLogNormalCDF StatsInvLogisticCDF' +
  'StatsInvMaxwellCDF StatsInvMaxwellCDF StatsInvMooreCDF StatsInvNBinomialCDF' +
  'StatsInvNCChiCDF StatsInvNCChiCDF StatsInvNCFCDF StatsInvNormalCDF' +
  'StatsInvParetoCDF StatsInvParetoCDF StatsInvPoissonCDF StatsInvPowerCDF' +
  'StatsInvQCDF StatsInvQCDF StatsInvQpCDF StatsInvRayleighCDF' +
  'StatsInvRectangularCDF StatsInvRectangularCDF StatsInvSpearmanCDF' +
  'StatsInvStudentCDF StatsInvStudentCDF StatsInvTopDownCDF StatsInvTriangularCDF' +
  'StatsInvUsquaredCDF StatsInvUsquaredCDF StatsInvVonMisesCDF StatsInvWeibullCDF' +
  'StatsKuiperCDF StatsKuiperCDF StatsLogNormalCDF StatsLogNormalPDF' +
  'StatsLogisticCDF StatsLogisticCDF StatsLogisticPDF StatsMaxwellCDF' +
  'StatsMaxwellPDF StatsMaxwellPDF StatsMedian StatsMooreCDF StatsNBinomialCDF' +
  'StatsNBinomialPDF StatsNBinomialPDF StatsNCChiCDF StatsNCChiPDF StatsNCFCDF' +
  'StatsNCFPDF StatsNCFPDF StatsNCTCDF StatsNCTPDF StatsNormalCDF StatsNormalPDF' +
  'StatsParetoCDF StatsParetoCDF StatsParetoPDF StatsPermute StatsPoissonCDF' +
  'StatsPoissonPDF StatsPoissonPDF StatsPowerCDF StatsPowerNoise StatsPowerPDF' +
  'StatsQCDF StatsQCDF StatsQpCDF StatsRayleighCDF StatsRayleighPDF' +
  'StatsRectangularCDF StatsRectangularCDF StatsRectangularPDF StatsRunsCDF' +
  'StatsSpearmanRhoCDF StatsSpearmanRhoCDF StatsStudentCDF StatsStudentPDF' +
  'StatsTopDownCDF StatsTopDownCDF StatsTriangularCDF StatsTriangularPDF' +
  'StatsTrimmedMean StatsTrimmedMean StatsUSquaredCDF StatsVonMisesCDF' +
  'StatsVonMisesNoise StatsVonMisesNoise StatsVonMisesPDF StatsWaldCDF' +
  'StatsWaldPDF StatsWaldPDF StatsWeibullCDF StatsWeibullPDF StopMSTimer' +
  'StrVarOrDefault StrVarOrDefault StringByKey StringFromList StringList StudentA' +
  'StudentT StudentT TDMAddChannel TDMAddGroup TDMAppendDataValues' +
  'TDMAppendDataValuesTime TDMAppendDataValuesTime TDMChannelPropertyExists' +
  'TDMCloseChannel TDMCloseChannel TDMCloseFile TDMCloseGroup' +
  'TDMCreateChannelProperty TDMCreateChannelProperty TDMCreateFile' +
  'TDMCreateFileProperty TDMCreateFileProperty TDMCreateGroupProperty' +
  'TDMFilePropertyExists TDMFilePropertyExists TDMGetChannelPropertyNames' +
  'TDMGetChannelPropertyNum TDMGetChannelPropertyNum TDMGetChannelPropertyStr' +
  'TDMGetChannelPropertyTime TDMGetChannelPropertyTime TDMGetChannelPropertyType' +
  'TDMGetChannelStringPropertyLen TDMGetChannelStringPropertyLen TDMGetChannels' +
  'TDMGetDataType TDMGetDataType TDMGetDataValues TDMGetDataValuesTime' +
  'TDMGetFilePropertyNames TDMGetFilePropertyNames TDMGetFilePropertyNum' +
  'TDMGetFilePropertyStr TDMGetFilePropertyStr TDMGetFilePropertyTime' +
  'TDMGetFilePropertyType TDMGetFilePropertyType TDMGetFileStringPropertyLen' +
  'TDMGetGroupPropertyNames TDMGetGroupPropertyNames TDMGetGroupPropertyNum' +
  'TDMGetGroupPropertyStr TDMGetGroupPropertyStr TDMGetGroupPropertyTime' +
  'TDMGetGroupPropertyType TDMGetGroupPropertyType TDMGetGroupStringPropertyLen' +
  'TDMGetGroups TDMGetGroups TDMGetLibraryErrorDescription' +
  'TDMGetNumChannelProperties TDMGetNumChannelProperties TDMGetNumChannels' +
  'TDMGetNumDataValues TDMGetNumDataValues TDMGetNumFileProperties' +
  'TDMGetNumGroupProperties TDMGetNumGroupProperties TDMGetNumGroups' +
  'TDMGroupPropertyExists TDMGroupPropertyExists TDMOpenFile TDMOpenFileEx' +
  'TDMRemoveChannel TDMRemoveChannel TDMRemoveGroup TDMReplaceDataValues' +
  'TDMReplaceDataValuesTime TDMReplaceDataValuesTime TDMSaveFile' +
  'TDMSetChannelPropertyNum TDMSetChannelPropertyNum TDMSetChannelPropertyStr' +
  'TDMSetChannelPropertyTime TDMSetChannelPropertyTime TDMSetDataValues' +
  'TDMSetDataValuesTime TDMSetDataValuesTime TDMSetFilePropertyNum' +
  'TDMSetFilePropertyStr TDMSetFilePropertyStr TDMSetFilePropertyTime' +
  'TDMSetGroupPropertyNum TDMSetGroupPropertyNum TDMSetGroupPropertyStr' +
  'TDMSetGroupPropertyTime TDMSetGroupPropertyTime TableInfo TagVal TagWaveRef' +
  'TextEncodingCode TextEncodingCode TextEncodingName TextFile ThreadGroupCreate' +
  'ThreadGroupGetDF ThreadGroupGetDF ThreadGroupGetDFR ThreadGroupRelease' +
  'ThreadGroupWait ThreadGroupWait ThreadProcessorCount ThreadReturnValue' +
  'TraceFromPixel TraceFromPixel TraceInfo TraceNameList TraceNameToWaveRef' +
  'TrimString TrimString URLDecode URLEncode UnPadString UniqueName' +
  'UnsetEnvironmentVariable UnsetEnvironmentVariable UpperStr VariableList' +
  'Variance Variance Voigt VoigtFit VoigtFit1Shape VoigtFit1Shape1Width' +
  'VoigtFit1Shape1WidthBL VoigtFit1Shape1WidthBL VoigtFit1ShapeBL VoigtFitBL' +
  'VoigtFunc VoigtFunc WMFindWholeWord WaveCRC WaveDims WaveExists WaveInfo' +
  'WaveList WaveList WaveMax WaveMin WaveName WaveRefIndexed WaveRefIndexedDFR' +
  'WaveRefWaveToList WaveRefWaveToList WaveRefsEqual WaveTextEncoding WaveType' +
  'WaveUnits WaveUnits WhichListItem WinList WinName WinRecreation WinType' +
  'XWaveName XWaveName XWaveRefFromTrace ZernikeR abs acos acosh alog area areaXY' +
  'asin asin asinh atan atan2 atanh beta betai binomial binomialNoise binomialln' +
  'cabs cabs ceil cequal char2num chebyshev chebyshevU cmplx cmpstr conj cos' +
  'cosIntegral cosIntegral cosh cot coth cpowi csc csch date date2secs datetime' +
  'defined defined deltax digamma dilogarithm ei enoise equalWaves erf erfc erfcw' +
  'exists exists exp expInt expIntegralE1 expNoise fDAQmx_AI_GetReader' +
  'fDAQmx_AO_UpdateOutputs fDAQmx_AO_UpdateOutputs fDAQmx_CTR_Finished' +
  'fDAQmx_CTR_IsFinished fDAQmx_CTR_IsFinished fDAQmx_CTR_IsPulseFinished' +
  'fDAQmx_CTR_ReadCounter fDAQmx_CTR_ReadCounter fDAQmx_CTR_ReadWithOptions' +
  'fDAQmx_CTR_SetPulseFrequency fDAQmx_CTR_SetPulseFrequency fDAQmx_CTR_Start' +
  'fDAQmx_ConnectTerminals fDAQmx_ConnectTerminals fDAQmx_DIO_Finished' +
  'fDAQmx_DIO_PortWidth fDAQmx_DIO_PortWidth fDAQmx_DIO_Read fDAQmx_DIO_Write' +
  'fDAQmx_DeviceNames fDAQmx_DeviceNames fDAQmx_DisconnectTerminals' +
  'fDAQmx_ErrorString fDAQmx_ErrorString fDAQmx_ExternalCalDate' +
  'fDAQmx_NumAnalogInputs fDAQmx_NumAnalogInputs fDAQmx_NumAnalogOutputs' +
  'fDAQmx_NumCounters fDAQmx_NumCounters fDAQmx_NumDIOPorts fDAQmx_ReadChan' +
  'fDAQmx_ReadNamedChan fDAQmx_ReadNamedChan fDAQmx_ResetDevice' +
  'fDAQmx_ScanGetAvailable fDAQmx_ScanGetAvailable fDAQmx_ScanGetNextIndex' +
  'fDAQmx_ScanStart fDAQmx_ScanStart fDAQmx_ScanStop fDAQmx_ScanWait' +
  'fDAQmx_ScanWaitWithTimeout fDAQmx_ScanWaitWithTimeout fDAQmx_SelfCalDate' +
  'fDAQmx_SelfCalibration fDAQmx_SelfCalibration fDAQmx_WF_IsFinished' +
  'fDAQmx_WF_WaitUntilFinished fDAQmx_WF_WaitUntilFinished fDAQmx_WaveformStart' +
  'fDAQmx_WaveformStop fDAQmx_WaveformStop fDAQmx_WriteChan factorial fakedata' +
  'faverage faverage faverageXY floor gamma gammaEuler gammaInc gammaNoise gammln' +
  'gammp gammp gammq gcd gnoise hcsr hermite hermiteGauss imag interp inverseERF' +
  'inverseERFC inverseERFC leftx limit ln log logNormalNoise lorentzianNoise' +
  'magsqr magsqr max mean median min mod norm note num2char num2istr num2str' +
  'numpnts numpnts numtype p2rect pcsr pnt2x poissonNoise poly poly2D qcsr r2polar' +
  'real real rightx round sawtooth scaleToIndex sec sech sign sin sinIntegral sinc' +
  'sinh sinh sqrt str2num stringCRC stringmatch strlen strsearch sum tan tanh' +
  'ticks ticks time trunc vcsr viAssertIntrSignal viAssertTrigger' +
  'viAssertUtilSignal viAssertUtilSignal viClear viClose viDisableEvent' +
  'viDiscardEvents viDiscardEvents viEnableEvent viFindNext viFindRsrc' +
  'viGetAttribute viGetAttribute viGetAttributeString viGpibCommand' +
  'viGpibControlATN viGpibControlATN viGpibControlREN viGpibPassControl' +
  'viGpibSendIFC viGpibSendIFC viIn16 viIn32 viIn8 viLock viMapAddress' +
  'viMapTrigger viMapTrigger viMemAlloc viMemFree viMoveIn16 viMoveIn32 viMoveIn8' +
  'viMoveOut16 viMoveOut16 viMoveOut32 viMoveOut8 viOpen viOpenDefaultRM viOut16' +
  'viOut32 viOut32 viOut8 viPeek16 viPeek32 viPeek8 viPoke16 viPoke32 viPoke8' +
  'viRead viRead viReadSTB viSetAttribute viSetAttributeString viStatusDesc' +
  'viTerminate viTerminate viUnlock viUnmapAddress viUnmapTrigger viUsbControlIn' +
  'viUsbControlOut viUsbControlOut viVxiCommandQuery viWaitOnEvent viWrite wnoise' +
  'x2pnt x2pnt xcsr zcsr zeta'

  /* Igor Built-in Functions */
  class: 'APMath Abort AddFIFOData AddFIFOVectData AddMovieAudio AddMovieFrame AdoptFiles' +
  'Append Append AppendImage AppendLayoutObject AppendMatrixContour AppendText' +
  'AppendToGizmo AppendToGizmo AppendToGraph AppendToLayout AppendToTable' +
  'AppendXYZContour AppendXYZContour AutoPositionWindow AxonTelegraphFindServers' +
  'BackgroundInfo BackgroundInfo Beep BoundingBall BoxSmooth BrowseURL BuildMenu' +
  'Button Button CWT Chart CheckBox CheckDisplayed ChooseColor Close CloseHelp' +
  'CloseMovie CloseMovie CloseProc ColorScale ColorTab2Wave Concatenate ControlBar' +
  'ControlInfo ControlInfo ControlUpdate ConvertGlobalStringTextEncoding' +
  'ConvexHull ConvexHull Convolve CopyFile CopyFolder CopyScales Correlate' +
  'CreateAliasShortcut CreateAliasShortcut CreateBrowser Cross CtrlBackground' +
  'CtrlFIFO CtrlFIFO CtrlNamedBackground Cursor CurveFit CustomControl' +
  'DAQmx_AI_SetupReader DAQmx_AI_SetupReader DAQmx_AO_SetOutputs' +
  'DAQmx_CTR_CountEdges DAQmx_CTR_CountEdges DAQmx_CTR_OutputPulse' +
  'DAQmx_CTR_Period DAQmx_CTR_Period DAQmx_CTR_PulseWidth DAQmx_DIO_Config' +
  'DAQmx_DIO_WriteNewData DAQmx_DIO_WriteNewData DAQmx_Scan DAQmx_WaveformGen DPSS' +
  'DSPDetrend DSPDetrend DSPPeriodogram DWT Debugger DebuggerOptions DefaultFont' +
  'DefaultGuiControls DefaultGuiControls DefaultGuiFont DefaultTextEncoding' +
  'DefineGuide DefineGuide DelayUpdate DeleteAnnotations DeleteFile DeleteFolder' +
  'DeletePoints DeletePoints Differentiate Display DisplayHelpTopic' +
  'DisplayProcedure DisplayProcedure DoAlert DoIgorMenu DoUpdate DoWindow' +
  'DoXOPIdle DoXOPIdle DrawAction DrawArc DrawBezier DrawLine DrawOval DrawPICT' +
  'DrawPoly DrawPoly DrawRRect DrawRect DrawText DrawUserShape Duplicate' +
  'DuplicateDataFolder DuplicateDataFolder EdgeStats Edit ErrorBars' +
  'EstimatePeakSizes EstimatePeakSizes Execute ExecuteScriptText' +
  'ExperimentModified ExperimentModified ExportGizmo Extract FBinRead FBinWrite' +
  'FFT FFT FGetPos FIFO2Wave FIFOStatus FPClustering FReadLine FSetPos FStatus' +
  'FTPCreateDirectory FTPCreateDirectory FTPDelete FTPDownload FTPUpload' +
  'FastGaussTransform FastGaussTransform FastOp FilterFIR FilterIIR FindAPeak' +
  'FindContour FindContour FindDuplicates FindLevel FindLevels FindPeak' +
  'FindPointsInPoly FindPointsInPoly FindRoots FindSequence FindValue FuncFit' +
  'FuncFitMD FuncFitMD GBLoadWave GISCreateVectorLayer GISGetRasterInfo' +
  'GISGetRegisteredFileInfo GISGetRegisteredFileInfo GISGetVectorLayerInfo' +
  'GISLoadRasterData GISLoadRasterData GISLoadVectorData GISRasterizeVectorData' +
  'GISRegisterFile GISRegisterFile GISTransformCoords GISUnRegisterFile' +
  'GISWriteFieldData GISWriteFieldData GISWriteGeometryData GISWriteRaster GPIB2' +
  'GPIBRead2 GPIBRead2 GPIBReadBinary2 GPIBReadBinaryWave2 GPIBReadWave2' +
  'GPIBWrite2 GPIBWrite2 GPIBWriteBinary2 GPIBWriteBinaryWave2 GPIBWriteWave2' +
  'GetAxis GetAxis GetCamera GetFileFolderInfo GetGizmo GetLastUserMenuInfo' +
  'GetMarquee GetMarquee GetMouse GetSelection GetWindow GraphNormal GraphWaveDraw' +
  'GraphWaveEdit GraphWaveEdit Grep GroupBox HDF5CloseFile HDF5CloseGroup' +
  'HDF5ConvertColors HDF5ConvertColors HDF5CreateFile HDF5CreateGroup' +
  'HDF5CreateLink HDF5CreateLink HDF5Dump HDF5DumpErrors HDF5DumpState' +
  'HDF5ListAttributes HDF5ListAttributes HDF5ListGroup HDF5LoadData HDF5LoadGroup' +
  'HDF5LoadImage HDF5LoadImage HDF5OpenFile HDF5OpenGroup HDF5SaveData' +
  'HDF5SaveGroup HDF5SaveGroup HDF5SaveImage HDF5TestOperation HDF5UnlinkObject' +
  'HDFInfo HDFInfo HDFReadImage HDFReadSDS HDFReadVset Hanning HideIgorMenus' +
  'HideInfo HideInfo HideProcedures HideTools HilbertTransform Histogram ICA IFFT' +
  'ImageAnalyzeParticles ImageAnalyzeParticles ImageBlend ImageBoundaryToMask' +
  'ImageEdgeDetection ImageEdgeDetection ImageFileInfo ImageFilter ImageFocus' +
  'ImageFromXYZ ImageFromXYZ ImageGLCM ImageGenerateROIMask ImageHistModification' +
  'ImageHistogram ImageHistogram ImageInterpolate ImageLineProfile ImageLoad' +
  'ImageMorphology ImageMorphology ImageRegistration ImageRemoveBackground' +
  'ImageRestore ImageRestore ImageRotate ImageSave ImageSeedFill ImageSkeleton3d' +
  'ImageSnake ImageSnake ImageStats ImageThreshold ImageTransform ImageUnwrapPhase' +
  'ImageWindow ImageWindow IndexSort InsertPoints Integrate Integrate2D' +
  'IntegrateODE IntegrateODE Interp3DPath Interpolate2 Interpolate3D JCAMPLoadWave' +
  'JointHistogram JointHistogram KMeans KillBackground KillControl KillDataFolder' +
  'KillFIFO KillFIFO KillFreeAxis KillPICTs KillPath KillStrings KillVariables' +
  'KillWaves KillWaves KillWindow Label Layout LayoutPageAction LayoutSlideShow' +
  'Legend Legend LinearFeedbackShiftRegister ListBox LoadData LoadPICT' +
  'LoadPackagePreferences LoadPackagePreferences LoadWave Loess LombPeriodogram' +
  'MCC_FindServers MCC_FindServers MLLoadWave Make MakeIndex MarkPerfTestTime' +
  'MatrixConvolve MatrixConvolve MatrixCorr MatrixEigenV MatrixFilter MatrixGLM' +
  'MatrixGaussJ MatrixGaussJ MatrixInverse MatrixLLS MatrixLUBkSub MatrixLUD' +
  'MatrixLUDTD MatrixLUDTD MatrixLinearSolve MatrixLinearSolveTD MatrixMultiply' +
  'MatrixOP MatrixOP MatrixSVBkSub MatrixSVD MatrixSchur MatrixSolve' +
  'MatrixTranspose MatrixTranspose MeasureStyledText Modify ModifyBrowser' +
  'ModifyCamera ModifyCamera ModifyContour ModifyControl ModifyControlList' +
  'ModifyFreeAxis ModifyFreeAxis ModifyGizmo ModifyGraph ModifyImage ModifyLayout' +
  'ModifyPanel ModifyPanel ModifyTable ModifyWaterfall MoveDataFolder MoveFile' +
  'MoveFolder MoveFolder MoveString MoveSubwindow MoveVariable MoveWave MoveWindow' +
  'MultiTaperPSD MultiTaperPSD MultiThreadingControl NI4882 NeuralNetworkRun' +
  'NeuralNetworkTrain NeuralNetworkTrain NewCamera NewDataFolder NewFIFO' +
  'NewFIFOChan NewFIFOChan NewFreeAxis NewGizmo NewImage NewLayout NewMovie' +
  'NewNotebook NewNotebook NewPanel NewPath NewWaterfall Note Notebook' +
  'NotebookAction NotebookAction Open OpenHelp OpenNotebook Optimize PCA' +
  'ParseOperationTemplate ParseOperationTemplate PathInfo PauseForUser PauseUpdate' +
  'PlayMovie PlayMovie PlayMovieAction PlaySound PopupContextualMenu PopupMenu' +
  'Preferences Preferences PrimeFactors Print PrintGraphs PrintLayout' +
  'PrintNotebook PrintNotebook PrintSettings PrintTable Project PulseStats' +
  'PutScrapText PutScrapText Quit RatioFromNumber Redimension Remove RemoveContour' +
  'RemoveFromGizmo RemoveFromGizmo RemoveFromGraph RemoveFromLayout' +
  'RemoveFromTable RemoveFromTable RemoveImage RemoveLayoutObjects RemovePath' +
  'Rename Rename RenameDataFolder RenamePICT RenamePath RenameWindow ReorderImages' +
  'ReorderTraces ReorderTraces ReplaceText ReplaceWave Resample ResumeUpdate' +
  'Reverse Reverse Rotate SQLHighLevelOp Save SaveData SaveExperiment' +
  'SaveGraphCopy SaveGraphCopy SaveNotebook SavePICT SavePackagePreferences' +
  'SaveTableCopy SaveTableCopy SetActiveSubwindow SetAxis SetBackground' +
  'SetDashPattern SetDashPattern SetDataFolder SetDimLabel SetDrawEnv SetDrawLayer' +
  'SetFileFolderInfo SetFileFolderInfo SetFormula SetIgorHook SetIgorMenuMode' +
  'SetIgorOption SetIgorOption SetMarquee SetProcessSleep SetRandomSeed SetScale' +
  'SetVariable SetVariable SetWaveLock SetWaveTextEncoding SetWindow ShowIgorMenus' +
  'ShowInfo ShowInfo ShowTools Silent Sleep Slider Smooth SmoothCustom Sort' +
  'SortColumns SortColumns SoundInRecord SoundInSet SoundInStartChart' +
  'SoundInStatus SoundInStatus SoundInStopChart SoundLoadWave SoundSaveWave' +
  'SphericalInterpolate SphericalInterpolate SphericalTriangulate SplitString' +
  'SplitWave SplitWave Stack StackWindows StatsANOVA1Test StatsANOVA2NRTest' +
  'StatsANOVA2RMTest StatsANOVA2RMTest StatsANOVA2Test StatsAngularDistanceTest' +
  'StatsChiTest StatsChiTest StatsCircularCorrelationTest StatsCircularMeans' +
  'StatsCircularMoments StatsCircularMoments StatsCircularTwoSampleTest' +
  'StatsCochranTest StatsCochranTest StatsContingencyTable StatsDIPTest' +
  'StatsDunnettTest StatsDunnettTest StatsFTest StatsFriedmanTest' +
  'StatsHodgesAjneTest StatsHodgesAjneTest StatsJBTest StatsKDE StatsKSTest' +
  'StatsKWTest StatsKWTest StatsKendallTauTest StatsLinearCorrelationTest' +
  'StatsLinearRegression StatsLinearRegression StatsMultiCorrelationTest' +
  'StatsNPMCTest StatsNPMCTest StatsNPNominalSRTest StatsQuantiles' +
  'StatsRankCorrelationTest StatsRankCorrelationTest StatsResample StatsSRTest' +
  'StatsSample StatsSample StatsScheffeTest StatsShapiroWilkTest StatsSignTest' +
  'StatsTTest StatsTTest StatsTukeyTest StatsVariancesTest StatsWRCorrelationTest' +
  'StatsWatsonUSquaredTest StatsWatsonUSquaredTest StatsWatsonWilliamsTest' +
  'StatsWheelerWatsonTest StatsWheelerWatsonTest StatsWilcoxonRankTest String' +
  'StructGet StructGet StructPut SumDimension SumSeries TDMLoadData TDMSaveData' +
  'TabControl TabControl Tag TextBox ThreadGroupPutDF ThreadStart Tile TileWindows' +
  'TitleBox TitleBox ToCommandLine ToolsGrid Triangulate3d URLRequest Unwrap VDT2' +
  'VDTClosePort2 VDTClosePort2 VDTGetPortList2 VDTGetStatus2 VDTOpenPort2' +
  'VDTOperationsPort2 VDTOperationsPort2 VDTRead2 VDTReadBinary2' +
  'VDTReadBinaryWave2 VDTReadBinaryWave2 VDTReadHex2 VDTReadHexWave2 VDTReadWave2' +
  'VDTTerminalPort2 VDTTerminalPort2 VDTWrite2 VDTWriteBinary2 VDTWriteBinaryWave2' +
  'VDTWriteHex2 VDTWriteHex2 VDTWriteHexWave2 VDTWriteWave2 VISAControl VISARead' +
  'VISAReadBinary VISAReadBinary VISAReadBinaryWave VISAReadWave VISAWrite' +
  'VISAWriteBinary VISAWriteBinary VISAWriteBinaryWave VISAWriteWave ValDisplay' +
  'Variable Variable WaveMeanStdv WaveStats WaveTransform WignerTransform' +
  'WindowFunction WindowFunction XLLoadWave cd dir fprintf printf pwd sprintf' +
  'sscanf sscanf wfprintf'
  };

  return {
    case_insensitive: true, // language is case-insensitive
    keywords: IGOR_KEYWORDS,
    illegal: '^@|^{',
    contains: [
      PRE_PROCESSOR,
      WAVE_DECLARATION,
      hljs.C_LINE_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
    ]
  };
}
