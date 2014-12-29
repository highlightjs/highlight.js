/*
Language: Objective C
Author: Valerii Hiora <valerii.hiora@gmail.com>
Contributors: Angel G. Olloqui <angelgarcia.mail@gmail.com>, Matt Diephouse <matt@diephouse.com>
Category: common
*/

function(hljs) {
  var OBJC_KEYWORDS = {
    keyword:
      'int float while char export sizeof typedef const struct for union ' +
      'unsigned long volatile static bool mutable if do return goto void ' +
      'enum else break extern asm case short default double register explicit ' +
      'signed typename this switch continue wchar_t inline readonly assign ' +
      'readwrite self @synchronized id typeof ' +
      'nonatomic super unichar IBOutlet IBAction strong weak copy ' +
      'in out inout bycopy byref oneway __strong __weak __block __autoreleasing ' +
      '@private @protected @public @try @property @end @throw @catch @finally ' +
      '@autoreleasepool @synthesize @dynamic @selector @optional @required',
    literal:
      'false true FALSE TRUE nil YES NO NULL',
    built_in:
      // UIKit Constants
      'NSUInteger UIEdgeInsets UIEdgeInsetsZero UIOffset UIOffsetZero UIRectEdge UIRectEdgeAll ' +
      'UIRectEdgeLeft UIRectEdgeNone UIRectEdgeRight UIRectEdgeTop ' +

      // NSString UIKit Additions
      'CGFloat CGPoint CGRect CGSize NSDictionary NSInteger NSLineBreakMode NSString ' +
      'NSStringDrawingOptions NSTextAlignment NSTextAlignmentCenter NSTextAlignmentJustified ' +
      'NSTextAlignmentNatural NSTextAlignmentRight NSWritingDirection NSWritingDirectionLeftToRight ' +
      'NSWritingDirectionRightToLeft UIBaselineAdjustment UIBaselineAdjustmentAlignBaselines ' +
      'UIBaselineAdjustmentNone UIFont UILineBreakMode UILineBreakModeCharacterWrap UILineBreakModeClip ' +
      'UILineBreakModeMiddleTruncation UILineBreakModeTailTruncation UILineBreakModeWordWrap ' +
      'UITextAlignmentCenter UITextAlignmentLeft UITextAlignmentRight UITextAttributeFont ' +
      'UITextAttributeTextShadowColor UITextAttributeTextShadowOffset ' +

      // CGGeometry
      'CGPointCreateDictionaryRepresentation CGPointEqualToPoint CGPointMake ' +
      'CGPointZero CGRectContainsPoint CGRectContainsRect CGRectCreateDictionaryRepresentation ' +
      'CGRectEdge CGRectEqualToRect CGRectGetHeight CGRectGetMaxX CGRectGetMaxY CGRectGetMidX ' +
      'CGRectGetMinX CGRectGetMinY CGRectGetWidth CGRectInfinite CGRectInset CGRectIntegral ' +
      'CGRectIntersectsRect CGRectIsEmpty CGRectIsInfinite CGRectIsNull CGRectMake ' +
      'CGRectMaxXEdge CGRectMaxYEdge CGRectMinXEdge CGRectMinYEdge CGRectNull CGRectOffset ' +
      'CGRectUnion CGRectZero CGSizeCreateDictionaryRepresentation CGSizeEqualToSize CGSizeMake ' +
      'CGSizeZero CGVector CGVectorMake ' +

      // Foundation Constants
      'CFByteOrderBigEndian CFByteOrderLittleEndian CFByteOrderUnknown NSAdminApplicationDirectory ' +
      'NSAlignAllEdgesNearest NSAlignAllEdgesOutward NSAlignHeightInward NSAlignHeightNearest ' +
      'NSAlignMaxXInward NSAlignMaxXNearest NSAlignMaxXOutward NSAlignMaxYInward NSAlignMaxYNearest ' +
      'NSAlignMinXInward NSAlignMinXNearest NSAlignMinXOutward NSAlignMinYInward NSAlignMinYNearest ' +
      'NSAlignRectFlipped NSAlignWidthInward NSAlignWidthNearest NSAlignWidthOutward NSAlignmentOptions ' +
      'NSAllDomainsMask NSAllLibrariesDirectory NSApplicationDirectory NSApplicationScriptsDirectory ' +
      'NSAutosavedInformationDirectory NSCachesDirectory NSCocoaErrorDomain NSCollectorDisabledOption ' +
      'NSCoreServiceDirectory NSDemoApplicationDirectory NSDesktopDirectory NSDestinationInvalidException ' +
      'NSDeveloperDirectory NSDocumentDirectory NSDocumentationDirectory NSDownloadsDirectory ' +
      'NSEnumerationOptions NSEnumerationReverse NSExecutableArchitectureMismatchError ' +
      'NSExecutableErrorMinimum NSExecutableLinkError NSExecutableLoadError NSExecutableNotLoadableError ' +
      'NSFeatureUnsupportedError NSFileErrorMaximum NSFileErrorMinimum NSFileLockingError ' +
      'NSFileReadCorruptFileError NSFileReadInapplicableStringEncodingError ' +
      'NSFileReadNoPermissionError NSFileReadNoSuchFileError NSFileReadTooLargeError ' +
      'NSFileReadUnknownStringEncodingError NSFileReadUnsupportedSchemeError NSFileWriteFileExistsError ' +
      'NSFileWriteInvalidFileNameError NSFileWriteNoPermissionError NSFileWriteOutOfSpaceError ' +
      'NSFileWriteUnsupportedSchemeError NSFileWriteVolumeReadOnlyError NSFormattingError ' +
      'NSFormattingErrorMinimum NSFoundationVersionNumber NSGenericException NSHashTableCallBacks ' +
      'NSIntHashCallBacks NSIntMapKeyCallBacks NSIntMapValueCallBacks NSIntegerHashCallBacks ' +
      'NSIntegerMapValueCallBacks NSIntegerMax NSInternalInconsistencyException ' +
      'NSInvalidReceivePortException NSInvalidSendPortException NSItemReplacementDirectory ' +
      'NSJavaDidSetupVirtualMachineNotification NSJavaWillCreateVirtualMachineNotification ' +
      'NSKeyValueValidationError NSLibraryDirectory NSLocalDomainMask NSMallocException ' +
      'NSMapTableValueCallBacks NSMoviesDirectory NSMusicDirectory NSNetworkDomainMask ' +
      'NSNonOwnedPointerMapKeyCallBacks NSNonOwnedPointerMapValueCallBacks ' +
      'NSNonRetainedObjectHashCallBacks NSNonRetainedObjectMapKeyCallBacks ' +
      'NSNotFound NSObjectHashCallBacks NSObjectInaccessibleException NSObjectMapKeyCallBacks ' +
      'NSObjectNotAvailableException NSOldStyleException NSOrderedAscending NSOrderedDescending ' +
      'NSOwnedObjectIdentityHashCallBacks NSOwnedPointerHashCallBacks NSOwnedPointerMapKeyCallBacks ' +
      'NSPicturesDirectory NSPoint NSPointerToStructHashCallBacks NSPortReceiveException ' +
      'NSPortTimeoutException NSPreferencePanesDirectory NSPrinterDescriptionDirectory ' +
      'NSPropertyListErrorMinimum NSPropertyListReadCorruptError NSPropertyListReadStreamError ' +
      'NSPropertyListWriteStreamError NSRangeException NSRect NSScannedOption NSSearchPathDirectory ' +
      'NSSharedPublicDirectory NSSize NSSortConcurrent NSSortOptions NSSortStable NSSystemDomainMask ' +
      'NSURLErrorBadServerResponse NSURLErrorBadURL NSURLErrorCallIsActive NSURLErrorCancelled ' +
      'NSURLErrorCannotConnectToHost NSURLErrorCannotCreateFile NSURLErrorCannotDecodeContentData ' +
      'NSURLErrorCannotFindHost NSURLErrorCannotLoadFromNetwork NSURLErrorCannotMoveFile ' +
      'NSURLErrorCannotParseResponse NSURLErrorCannotRemoveFile NSURLErrorCannotWriteToFile ' +
      'NSURLErrorClientCertificateRequired NSURLErrorDNSLookupFailed NSURLErrorDataLengthExceedsMaximum ' +
      'NSURLErrorDomain NSURLErrorDownloadDecodingFailedMidStream ' +
      'NSURLErrorFileDoesNotExist NSURLErrorFileIsDirectory NSURLErrorHTTPTooManyRedirects ' +
      'NSURLErrorNetworkConnectionLost NSURLErrorNoPermissionsToReadFile NSURLErrorNotConnectedToInternet ' +
      'NSURLErrorRequestBodyStreamExhausted NSURLErrorResourceUnavailable ' +
      'NSURLErrorServerCertificateHasBadDate NSURLErrorServerCertificateHasUnknownRoot ' +
      'NSURLErrorServerCertificateUntrusted NSURLErrorTimedOut NSURLErrorUnknown NSURLErrorUnsupportedURL ' +
      'NSURLErrorUserCancelledAuthentication NSURLErrorZeroByteResource NSUbiquitousFileErrorMaximum ' +
      'NSUbiquitousFileNotUploadedDueToQuotaError NSUbiquitousFileUbiquityServerNotAvailable ' +
      'NSUserCancelledError NSUserDirectory NSUserDomainMask NSValidationErrorMaximum ' +
      'NSXPCConnectionErrorMaximum NSXPCConnectionErrorMinimum NSXPCConnectionInterrupted ' +
      'NSXPCConnectionReplyInvalid NSZeroPoint NSZeroRect NSZeroSize NS_BigEndian NS_LittleEndian ' +

      // Foundation Data Types
      'NSAppleEventManagerSuspensionID NSArray NSComparator NSDecimal NSDecimalMaxSize NSException ' +
      'NSHashTable NSHashTableOptions NSMapEnumerator NSMapTable NSMapTableOptions NSPointArray ' +
      'NSRange NSRangePointer NSRectArray NSRectPointer NSSizeArray NSSizePointer NSSocketNativeHandle ' +
      'NSSwappedDouble NSSwappedFloat NSTimeInterval NSUncaughtExceptionHandler NSZone ' +

      // Foundation Functions
      'ABRecordCopyValue CFBridgingRelease CFBridgingRetain CFDateRef CFRelease CFStringRef CFTypeRef ' +
      'NSAllMapTableKeys NSAllMapTableValues NSAllocateCollectable NSAllocateMemoryPages NSAllocateObject ' +
      'NSCAssert NSCAssert1 NSCAssert2 NSCAssert3 NSCAssert4 NSCAssert5 NSCParameterAssert ' +
      'NSClassFromString NSCompareHashTables NSCompareMapTables NSContainsRect ' +
      'NSConvertHostFloatToSwapped NSConvertSwappedDoubleToHost NSConvertSwappedFloatToHost ' +
      'NSCopyMapTableWithZone NSCopyMemoryPages NSCopyObject NSCountHashTable NSCountMapTable ' +
      'NSCreateHashTableWithZone NSCreateMapTable NSCreateMapTableWithZone NSCreateZone ' +
      'NSDeallocateObject NSDecimalAdd NSDecimalCompact NSDecimalCompare NSDecimalCopy NSDecimalDivide ' +
      'NSDecimalMultiply NSDecimalMultiplyByPowerOf10 NSDecimalNormalize NSDecimalPower NSDecimalRound ' +
      'NSDecimalSubtract NSDecrementExtraRefCountWasZero NSDefaultMallocZone NSDivideRect ' +
      'NSEndMapTableEnumeration NSEnumerateHashTable NSEnumerateMapTable NSEqualPoints NSEqualRanges ' +
      'NSEqualSizes NSExtraRefCount NSFileTypeForHFSTypeCode NSFreeHashTable NSFreeMapTable ' +
      'NSGetSizeAndAlignment NSGetUncaughtExceptionHandler NSHFSTypeCodeFromFileType NSHFSTypeOfFile ' +
      'NSHashInsert NSHashInsertIfAbsent NSHashInsertKnownAbsent NSHashRemove NSHeight NSHomeDirectory ' +
      'NSHostByteOrder NSIncrementExtraRefCount NSInsetRect NSIntegralRect NSIntegralRectWithOptions ' +
      'NSIntersectionRect NSIntersectsRect NSIsEmptyRect NSJavaBundleCleanup NSJavaBundleSetup ' +
      'NSJavaClassesFromPath NSJavaNeedsToLoadClasses NSJavaNeedsVirtualMachine NSJavaObjectNamedInPath ' +
      'NSJavaSetup NSJavaSetupVirtualMachine NSLocalizedString NSLocalizedStringFromTable ' +
      'NSLocalizedStringWithDefaultValue NSLocationInRange NSLog NSLogPageSize NSLogv NSMakeCollectable ' +
      'NSMakeRange NSMakeRect NSMakeSize NSMapGet NSMapInsert NSMapInsertIfAbsent NSMapInsertKnownAbsent ' +
      'NSMapRemove NSMaxRange NSMaxX NSMaxY NSMidX NSMidY NSMinX NSMinY NSMouseInRect ' +
      'NSNextMapEnumeratorPair NSOffsetRect NSOpenStepRootDirectory NSPageSize NSParameterAssert ' +
      'NSPointFromString NSPointInRect NSPointToCGPoint NSProtocolFromString NSRangeFromString ' +
      'NSReallocateCollectable NSRectEdge NSRectFromCGRect NSRectFromString NSRectToCGRect NSRecycleZone ' +
      'NSResetMapTable NSRoundDownToMultipleOfPageSize NSRoundUpToMultipleOfPageSize NSRoundingMode ' +
      'NSSelectorFromString NSSetUncaughtExceptionHandler NSSetZoneName NSShouldRetainWithZone ' +
      'NSSizeFromString NSSizeToCGSize NSStringFromClass NSStringFromHashTable NSStringFromMapTable ' +
      'NSStringFromProtocol NSStringFromRange NSStringFromRect NSStringFromSelector NSStringFromSize ' +
      'NSSwapBigFloatToHost NSSwapBigIntToHost NSSwapBigLongLongToHost NSSwapBigLongToHost ' +
      'NSSwapDouble NSSwapFloat NSSwapHostDoubleToBig NSSwapHostDoubleToLittle NSSwapHostFloatToBig ' +
      'NSSwapHostIntToBig NSSwapHostIntToLittle NSSwapHostLongLongToBig NSSwapHostLongLongToLittle ' +
      'NSSwapHostLongToLittle NSSwapHostShortToBig NSSwapHostShortToLittle NSSwapInt ' +
      'NSSwapLittleFloatToHost NSSwapLittleIntToHost NSSwapLittleLongLongToHost NSSwapLittleLongToHost ' +
      'NSSwapLong NSSwapLongLong NSSwapShort NSTemporaryDirectory NSUnionRange NSUnionRect NSUserName ' +
      'NSZoneCalloc NSZoneFree NSZoneFromPointer NSZoneMalloc NSZoneName NSZoneRealloc NS_DURING ' +
      'NS_HANDLER NS_VALUERETURN NS_VOIDRETURN ' +

      // AppKit Constants
      'NSAbortModalException NSAbortPrintingException NSAccessibilityException NSAppKitIgnoredException ' +
      'NSBadBitmapParametersException NSBadComparisonException NSBadRTFColorTableException ' +
      'NSBadRTFFontTableException NSBadRTFStyleSheetException NSBlack NSBrowserIllegalDelegateException ' +
      'NSCalibratedRGBColorSpace NSCalibratedWhiteColorSpace NSColorListIOException ' +
      'NSCustomColorSpace NSDarkGray NSDeviceBlackColorSpace NSDeviceCMYKColorSpace NSDeviceRGBColorSpace ' +
      'NSDraggingException NSFontUnavailableException NSIconSize NSIllegalSelectorException ' +
      'NSInterfaceStyleDefault NSLightGray NSNamedColorSpace NSNibLoadingException ' +
      'NSPPDIncludeStackOverflowException NSPPDIncludeStackUnderflowException NSPPDParseException ' +
      'NSPatternColorSpace NSPrintPackageException NSPrintingCommunicationException ' +
      'NSServiceApplicationLaunchFailedError NSServiceApplicationNotFoundError NSServiceErrorMaximum ' +
      'NSServiceInvalidPasteboardDataError NSServiceMalformedServiceDictionaryError ' +
      'NSServiceRequestTimedOutError NSTIFFException NSTextLineTooLongException ' +
      'NSTextReadException NSTextReadInapplicableDocumentTypeError NSTextReadWriteErrorMaximum ' +
      'NSTextWriteException NSTextWriteInapplicableDocumentTypeError NSTokenSize ' +
      'NSWhite NSWindowServerCommunicationException NSWordTablesReadException NSWordTablesWriteException ' +

      // AppKit Data Types
      'NSAnimationEffect NSAnimationEffectDisappearingItemDefault NSAnimationEffectPoof ' +
      'NSBrowserAuxiliaryOpaque NSColorListAuxiliary NSColorListAuxiliaryOpaque NSFocusRingAbove ' +
      'NSFocusRingOnly NSFocusRingPlacement NSFocusRingType NSFocusRingTypeDefault ' +
      'NSFocusRingTypeNone NSFont NSInterfaceStyle NSMacintoshInterfaceStyle NSModalSession ' +
      'NSNoInterfaceStyle NSOpenGLContextAuxiliary NSOpenGLGOClearFormatCache NSOpenGLGOFormatCacheSize ' +
      'NSOpenGLGORetainRenderers NSOpenGLGOUseBuildCache NSOpenGLGlobalOption ' +
      'NSSavePanelAuxiliary NSSavePanelAuxiliaryOpaque NSScreenAuxiliary NSScreenAuxiliaryOpaque ' +
      'NSTabViewItemAuxiliaryOpaque NSTypesetterGlyphInfo NSWindows95InterfaceStyle ' +

      // iOS Classes & Protocols
      'AVAIFCOutputSettingsValidator AVAIFFOutputSettingsValidator AVAVAudioSettingsAudioOutputSettings ' +
      'AVAlphaUpdatingView AVArrayQueueFeeder AVAsset AVAssetCache AVAssetCacheInternal ' +
      'AVAssetDownloadSessionInternal AVAssetExportSession AVAssetExportSessionInternal ' +
      'AVAssetImageGeneratorInternal AVAssetInspector AVAssetInspectorLoader AVAssetInternal ' +
      'AVAssetMediaSelectionGroup AVAssetProxy AVAssetProxyInternal AVAssetReader ' +
      'AVAssetReaderAudioMixOutputInternal AVAssetReaderInternal AVAssetReaderOutput ' +
      'AVAssetReaderOutputMetadataAdaptor AVAssetReaderOutputMetadataAdaptorInternal ' +
      'AVAssetReaderSampleReferenceOutputInternal AVAssetReaderTrackOutput ' +
      'AVAssetReaderVideoCompositionOutput AVAssetReaderVideoCompositionOutputInternal ' +
      'AVAssetResourceLoaderDelegate AVAssetResourceLoaderInternal AVAssetResourceLoaderRequest ' +
      'AVAssetResourceLoadingContentInformationRequestInternal AVAssetResourceLoadingDataRequest ' +
      'AVAssetResourceLoadingRequest AVAssetResourceLoadingRequestInternal AVAssetResourceRenewalRequest ' +
      'AVAssetTrack AVAssetTrackEnumerator AVAssetTrackGroup AVAssetTrackGroupInternal ' +
      'AVAssetTrackInternal AVAssetTrackSegment AVAssetWriter ' +
      'AVAssetWriterClientInitiatedTerminalHelper AVAssetWriterConfigurationState ' +
      'AVAssetWriterFailedTerminalHelper AVAssetWriterFigAssetWriterNotificationHandler ' +
      'AVAssetWriterFinishWritingHelper AVAssetWriterFinishWritingHelperDelegate AVAssetWriterHelper ' +
      'AVAssetWriterInputConfigurationState AVAssetWriterInputFigAssetWriterEndPassOperation ' +
      'AVAssetWriterInputGroupInternal AVAssetWriterInputHelper AVAssetWriterInputInterPassAnalysisHelper ' +
      'AVAssetWriterInputMediaDataRequester AVAssetWriterInputMediaDataRequesterDelegate ' +
      'AVAssetWriterInputMetadataAdaptorInternal AVAssetWriterInputNoMorePassesHelper ' +
      'AVAssetWriterInputPassDescriptionInternal AVAssetWriterInputPassDescriptionResponder ' +
      'AVAssetWriterInputPixelBufferAdaptorInternal AVAssetWriterInputSelectionOption ' +
      'AVAssetWriterInputUnknownHelper AVAssetWriterInputWritingHelper AVAssetWriterInternal ' +
      'AVAssetWriterSynchronousNonMainThreadFinishWritingDelegate AVAssetWriterTerminalHelper ' +
      'AVAssetWriterWritingHelper AVAsynchronousKeyValueLoading AVAsynchronousVideoCompositionRequest ' +
      'AVAudio3DMixing AVAudioBuffer AVAudioChannelLayout AVAudioClient AVAudioClock AVAudioDevice ' +
      'AVAudioEngine AVAudioEnvironmentDistanceAttenuationParameters AVAudioEnvironmentNode ' +
      'AVAudioFile AVAudioFormat AVAudioIONode AVAudioInputNode AVAudioManager AVAudioMix ' +
      'AVAudioMixInputParametersInternal AVAudioMixInternal AVAudioMixerNode AVAudioMixing AVAudioNode ' +
      'AVAudioOutputNode AVAudioOutputSettings AVAudioPCMBuffer AVAudioPayload AVAudioPlayer ' +
      'AVAudioRecorder AVAudioSession AVAudioSessionChannelDescription ' +
      'AVAudioSessionDelegate AVAudioSessionDelegateMediaPlayerOnly AVAudioSessionMediaPlayerOnly ' +
      'AVAudioSessionPortDescription AVAudioSessionRouteDescription AVAudioSettingsValueConstrainer ' +
      'AVAudioTier AVAudioTierPicker AVAudioTime AVAudioUnit AVAudioUnitDelay AVAudioUnitDistortion ' +
      'AVAudioUnitEQFilterParameters AVAudioUnitEffect AVAudioUnitGenerator AVAudioUnitMIDIInstrument ' +
      'AVAudioUnitSampler AVAudioUnitTimeEffect AVAudioUnitTimePitch AVAudioUnitVarispeed AVButton ' +
      'AVCMNotificationDispatcherListenerAndCallback AVCMNotificationDispatcherListenerKey ' +
      'AVCallbackRegistry AVCaptureAudioChannel AVCaptureAudioChannelInternal ' +
      'AVCaptureAudioChannel_FigRecorder AVCaptureAudioDataOutput AVCaptureAudioDataOutputInternal ' +
      'AVCaptureAudioDataOutput_FigRecorder AVCaptureAutoExposureBracketedStillImageSettings ' +
      'AVCaptureConnection AVCaptureConnectionInternal AVCaptureConnectionInternal_FigRecorder ' +
      'AVCaptureDevice AVCaptureDeviceControlRequest AVCaptureDeviceControlRequestQueue ' +
      'AVCaptureDeviceFormat AVCaptureDeviceFormatInternal AVCaptureDeviceFormatInternal_FigRecorder ' +
      'AVCaptureDeviceInput AVCaptureDeviceInputInternal AVCaptureDeviceInputInternal_FigRecorder ' +
      'AVCaptureDeviceInternal AVCaptureDeviceInternal_FigRecorder AVCaptureDevice_FigRecorder ' +
      'AVCaptureFigAudioDevice_FigRecorder AVCaptureFigVideoDevice AVCaptureFigVideoDevice_FigRecorder ' +
      'AVCaptureFileOutputDelegateWrapper AVCaptureFileOutputDelegateWrapper_FigRecorder ' +
      'AVCaptureFileOutputInternal_FigRecorder AVCaptureFileOutputRecordingDelegate ' +
      'AVCaptureInput AVCaptureInputInternal AVCaptureInputInternal_FigRecorder AVCaptureInputPort ' +
      'AVCaptureInputPortInternal_FigRecorder AVCaptureInputPort_FigRecorder AVCaptureInput_FigRecorder ' +
      'AVCaptureMetadataInput AVCaptureMetadataInputInternal AVCaptureMetadataOutput ' +
      'AVCaptureMetadataOutputInternal_FigRecorder AVCaptureMetadataOutputObjectsDelegate ' +
      'AVCaptureMovieFileOutput AVCaptureMovieFileOutputInternal ' +
      'AVCaptureMovieFileOutput_FigRecorder AVCaptureOutput AVCaptureOutputInternal ' +
      'AVCaptureOutput_FigRecorder AVCapturePrepareBracketRequest AVCapturePrewarmer ' +
      'AVCaptureSession AVCaptureSessionConfiguration AVCaptureSessionInternal ' +
      'AVCaptureSession_FigRecorder AVCaptureStillImageOutput AVCaptureStillImageOutputInternal ' +
      'AVCaptureStillImageOutput_FigRecorder AVCaptureStillImageRequest ' +
      'AVCaptureVideoDataOutput AVCaptureVideoDataOutputInternal ' +
      'AVCaptureVideoDataOutputSampleBufferDelegate AVCaptureVideoDataOutput_FigRecorder ' +
      'AVCaptureVideoPreviewLayerInternal AVCaptureVideoPreviewLayerInternal_FigRecorder ' +
      'AVChapter AVChapterMetadataItem AVChapterMetadataItemInternal AVComposition ' +
      'AVCompositionInternal AVCompositionTrack AVCompositionTrackInternal ' +
      'AVCompositionTrackSegment AVCompositionTrackSegmentInternal AVConcreteMutableValueTiming ' +
      'AVConference AVConferenceDelegate AVConferencePreview AVConferenceXPCClient AVConferenceXPCServer ' +
      'AVControllerFig AVControllerRemoteFig AVControllerRemoteFigStream AVCustomVideoCompositorSession ' +
      'AVDecodedVideoSettingsForFig AVDelegateStorage AVEmbeddedPlaybackControlsViewController ' +
      'AVExportSettingsOutputSettingsAssistantVideoSettingsAdjuster AVExternalDevice ' +
      'AVExternalDeviceControllerInternal AVExternalDeviceHID AVExternalDeviceHIDInternal ' +
      'AVExternalDeviceScreenBorrowToken AVExternalDeviceTurnByTurnToken AVExternalPlaybackIndicatorView ' +
      'AVExternalProtectionMonitorInternal AVFigAssetInspector AVFigAssetInspectorLoader ' +
      'AVFigAssetWriterAudioTrack AVFigAssetWriterGenericTrack AVFigAssetWriterTrack ' +
      'AVFigObjectInspector AVFileProcessor AVFileValidator AVFlashlight AVFlashlightInternal ' +
      'AVFlashlight_FigRecorder AVFloat64Range AVFormatReaderInspector AVFormatSpecification ' +
      'AVFrameRateRangeInternal AVFrameRateRangeInternal_FigRecorder AVFrameRateRange_FigRecorder ' +
      'AVFromNotifySafeThreadPostNotificationNameDict AVFullScreenPlaybackControlsViewController ' +
      'AVGarbageCollectedWeakReference AVGenericMediaFileOutputSettingsValidator ' +
      'AVISOOutputSettingsValidator AVInternalDeviceList AVItem AVItemAccessLog AVItemAccessLogEvent ' +
      'AVItemAccessLogInternal AVItemErrorLog AVItemErrorLogEvent AVItemErrorLogEventInternal ' +
      'AVLoadedTimeRangesView AVLoadingIndicatorView AVMIDIPlayer AVMediaDataRequester ' +
      'AVMediaFileOutputSettingsValidator AVMediaFileType AVMediaSelectionGroup ' +
      'AVMediaSelectionKeyValueOption AVMediaSelectionOption AVMediaSelectionOptionInternal ' +
      'AVMediaSelectionViewController AVMetadataEnumerator AVMetadataFaceObject ' +
      'AVMetadataFaceObjectInternal_FigRecorder AVMetadataFaceObject_FigRecorder AVMetadataItem ' +
      'AVMetadataItemFilterForSharing AVMetadataItemFilterInternal AVMetadataItemInternal ' +
      'AVMetadataMachineReadableCodeObjectInternal ' +
      'AVMetadataMachineReadableCodeObject_FigRecorder AVMetadataObject AVMetadataObjectInternal ' +
      'AVMetadataObject_FigRecorder AVMutableAudioMix AVMutableAudioMixInputParameters ' +
      'AVMutableCompositionInternal AVMutableCompositionTrack AVMutableCompositionTrackInternal ' +
      'AVMutableScheduledAudioParameters AVMutableTimedMetadataGroup AVMutableValueTiming ' +
      'AVMutableVideoCompositionInstruction AVMutableVideoCompositionLayerInstruction ' +
      'AVObjectRegistry AVOccasionalTimebaseObserver AVOnceTimebaseObserver AVOutputSettings ' +
      'AVOutputSettingsAssistantBaseSettingsProvider AVOutputSettingsAssistantInternal ' +
      'AVOutputSettingsAssistantVideoSettingsAdjuster AVOutputSettingsValidation ' +
      'AVPingTest AVPixelBufferAttributeMediator AVPixelBufferAttributesVideoOutputSettings ' +
      'AVPlaybackItem AVPlaybackItemInspector AVPlaybackItemInspectorLoader AVPlaybackItemTrackInspector ' +
      'AVPlayer AVPlayerConnection AVPlayerController AVPlayerControllerInternal ' +
      'AVPlayerInternal AVPlayerItem AVPlayerItemAccessLog AVPlayerItemAccessLogEvent ' +
      'AVPlayerItemAccessLogInternal AVPlayerItemErrorLog AVPlayerItemErrorLogEvent ' +
      'AVPlayerItemErrorLogInternal AVPlayerItemInternal AVPlayerItemLegibleOutput ' +
      'AVPlayerItemLegibleOutputInternal AVPlayerItemLegibleOutputPushDelegate ' +
      'AVPlayerItemMetadataOutput AVPlayerItemMetadataOutputInternal AVPlayerItemOutput ' +
      'AVPlayerItemOutputPullDelegate AVPlayerItemOutputPushDelegate AVPlayerItemTrack ' +
      'AVPlayerItemVideoOutput AVPlayerItemVideoOutputInternal AVPlayerLayer ' +
      'AVPlayerLayerInternal AVPlayerMediaSelectionCriteria AVPlayerMediaSelectionCriteriaInternal ' +
      'AVPlayerViewController AVPlayerViewControllerDelegate AVPropertyStorage AVQueue AVQueueFeeder ' +
      'AVQueuePlayerInternal AVQueuedSampleBufferRendering AVQueuedSampleBufferRenderingInternal ' +
      'AVRawImageReprocessorInternal AVRecorder AVRecorderAudioQueueImpl AVRecorderImpl ' +
      'AVReencodedVideoSettingsForFig AVRemoteCommandController AVResolvedCaptureOptions ' +
      'AVRunLoopCondition AVRunLoopConditionRunLoopState AVSafePerformOnMainThreadTargetDict ' +
      'AVSampleBufferDisplayLayer AVSampleBufferDisplayLayerContentLayer ' +
      'AVScheduledAudioParameters AVScheduledAudioParametersInternal AVScrubber AVSpeechSynthesisVoice ' +
      'AVSpeechSynthesizerDelegate AVSpeechUtterance AVStreamingResourceInspector AVSubtitleLayer ' +
      'AVSynchronizedLayer AVSynchronizedLayerInternal AVSystemController AVTableViewCell AVTextStyleRule ' +
      'AVTimeFormatter AVTimeMarkerObservation AVTimebaseObserver AVTimedMetadataGroup ' +
      'AVTouchIgnoringView AVTrackReaderInspector AVURLAsset AVURLAssetInternal ' +
      'AVUnreachableAssetInspectorLoader AVUnsupportedContentIndicatorView AVVCAudioBuffer AVValue ' +
      'AVVideoCompositing AVVideoComposition AVVideoCompositionCoreAnimationTool ' +
      'AVVideoCompositionInstruction AVVideoCompositionInstructionInternal AVVideoCompositionInternal ' +
      'AVVideoCompositionLayerInstructionInternal AVVideoCompositionRenderContext ' +
      'AVVideoLayer AVVideoLayerDelegate AVVideoLayerView AVVideoOutputSettings AVVideoPerformanceMetrics ' +
      'AVVoiceController AVWAVEOutputSettingsValidator AVWeakKeyValueObserverProxy AVWeakReference ' +
      'CAAction CAAnimation CAAnimationGroup CABackdropLayer CABasicAnimation CABehavior ' +
      'CACGPathCodingSegment CACGPatternCodingProxy CACodingProxy CAContext CAContextImpl ' +
      'CADAnonymousInterface CADCalendarInterface CADCalendarItemInterface CADClientInterface ' +
      'CADDebugInterface CADEntityWrapper CADEventEntityWrapper CADEventInterface CADInterface ' +
      'CADObjectInterface CADReminderInterface CADSourceInterface CADXPCProxyHelper ' +
      'CADisplay CADisplayLink CADisplayMode CADistanceFieldLayer CADynamicsBehavior CAEAGLLayer ' +
      'CAEmitterCell CAEmitterLayer CAFilter CAForceField CAGradientLayer CAIOSurfaceCodingProxy ' +
      'CALayer CALayerArray CALayerHost CALight CALinearMaskLayer CAMAnimationDelegate CAMAnimationHelper ' +
      'CAMApplicationViewController CAMAssetSaver CAMAvalanche CAMAvalancheCaptureService ' +
      'CAMAvalancheSession CAMBadgeTextView CAMBadgeView CAMBlurredSnapshotView CAMBottomBar ' +
      'CAMButtonLabel CAMCameraRoll CAMCameraRollObserver CAMCameraRollSpec CAMCameraSpec CAMCameraView ' +
      'CAMCaptureController CAMCaptureRequest CAMCaptureResponse CAMCaptureService ' +
      'CAMDebugCaptureService CAMEffectFilterManager CAMEffectPreviewView ' +
      'CAMEffectSelectionViewControllerDelegate CAMEffectSelectionViewControllerView ' +
      'CAMEffectsGridLabelsView CAMEffectsGridView CAMEffectsRenderer CAMElapsedTimeView ' +
      'CAMExpandableMenuButtonDelegate CAMExposureBiasSlider CAMExposureBiasSliderThumb ' +
      'CAMFaceTrackingView CAMFilterButton CAMFlashBadge CAMFlashButton CAMFlipButton ' +
      'CAMFocusLockAttachmentView CAMFocusLockView CAMFocusPointView CAMFocusSplitAttachmentView ' +
      'CAMFormattingManager CAMGLView CAMGridView CAMHDRBadge CAMHDRButton CAMHardwareLockIndicatorView ' +
      'CAMImageWell CAMInflightAsset CAMKeepDaemonAliveAssertion CAMLParser CAMLWriter ' +
      'CAMLocationCaptureService CAMLocationController CAMLowDiskSpaceAlertView CAMModeDial ' +
      'CAMModeDialItem CAMMutablePanoramaCaptureRequest CAMMutableStillImageCaptureRequest ' +
      'CAMNebulaDaemonClientProtocol CAMNebulaDaemonProtocol CAMNebulaDaemonProtocolLimited ' +
      'CAMNebulaSecondaryState CAMNebulaUtilities CAMPadApplicationSpec CAMPadCameraRollSpec ' +
      'CAMPanoramaArrowView CAMPanoramaCaptureParameters CAMPanoramaCaptureRequest CAMPanoramaLabel ' +
      'CAMPanoramaView CAMPhoneApplicationSpec CAMPhoneCameraRollSpec CAMPhoneImagePickerSpec ' +
      'CAMSecureWindow CAMShutterButton CAMSlalomIndicatorView CAMStillImageCaptureRequest ' +
      'CAMStillImageCaptureResponse CAMTimelapseBackendController CAMTimelapseBackendSessionContext ' +
      'CAMTimelapseDiskUtilities CAMTimelapseJPEGReader CAMTimelapseMovieWriter CAMTimelapseSettings ' +
      'CAMTimelapseState CAMTimerButton CAMTimerButtonDelegate CAMTimerIndicatorView CAMTopBar ' +
      'CAMTorchPattern CAMTorchPatternController CAMVideoCaptureRequest CAMVideoCaptureResponse ' +
      'CAMZoomSlider CAMZoomSliderDelegate CAMatchMoveAnimation CAMediaTiming CAMediaTimingFunction ' +
      'CAMeshInterpolator CAMeshTransform CAMutableMeshTransform CAPackage CAPropertyAnimation ' +
      'CARenderer CAReplicatorLayer CAScrollLayer CAShapeLayer CASlotProxy CASmoothedTextLayer CASpring ' +
      'CAState CAStateAddAnimation CAStateAddElement CAStateController CAStateControllerAnimation ' +
      'CAStateControllerTransition CAStateControllerUndo CAStateElement CAStateRecorder ' +
      'CAStateRemoveElement CAStateSetValue CAStateTransition CAStateTransitionElement ' +
      'CATextLayer CATiledLayer CATransaction CATransactionCompletionItem CATransformLayer CATransition ' +
      'CAWindowServer CAWindowServerDisplay CIAccordionFoldTransition CIAdditionCompositing CIAffineClamp ' +
      'CIAffineTransform CIAreaHistogram CIAutoEnhanceFace CIAztecCodeGenerator CIBarcodeDetector ' +
      'CIBlendModeFilter CIBlendWithAlphaMask CIBlendWithMask CIBloom CIBumpDistortion ' +
      'CIBurstActionClassifier CIBurstClusterDivider CIBurstFaceConfigEntry CIBurstFaceInfo ' +
      'CIBurstFaceStat CIBurstImageFaceAnalysisContext CIBurstImageSet CIBurstImageSetInternal ' +
      'CIBurstThumbnailCluster CIBurstYUVImage CICheckerboardGenerator CICircleSplashDistortion ' +
      'CICode128BarcodeGenerator CICodeGenerator CIColor CIColorBalance CIColorBlendMode ' +
      'CIColorClamp CIColorControls CIColorCrossPolynomial CIColorCube CIColorCubeWithColorSpace ' +
      'CIColorInvert CIColorKernel CIColorMap CIColorMatrix CIColorMonochrome CIColorPolynomial ' +
      'CIConstantColorGenerator CIContext CIConvolution3X3 CIConvolution5X5 CIConvolution9Horizontal ' +
      'CICopyMachineTransition CICrop CIDarkenBlendMode CIDetector CIDifferenceBlendMode ' +
      'CIDissolveTransition CIDivideBlendMode CIDotScreen CIEightfoldReflectedTile ' +
      'CIEnhancementCalculator CIEnhancementHistogram CIExclusionBlendMode CIExposureAdjust CIFaceBalance ' +
      'CIFaceFeature CIFalseColor CIFeature CIFilter CIFilterClassDescription CIFlashTransition ' +
      'CIFourfoldRotatedTile CIFourfoldTranslatedTile CIGammaAdjust CIGaussianBlur CIGaussianGradient ' +
      'CIGlideReflectedTile CIGloom CIHardLightBlendMode CIHatchedScreen CIHighlightShadowAdjust ' +
      'CIHoleDistortion CIHueAdjust CIHueBlendMode CIImage CIImageRowReader CIKernel ' +
      'CILightTunnel CILightenBlendMode CILineScreen CILinearBurnBlendMode CILinearDodgeBlendMode ' +
      'CILinearToSRGBToneCurve CILumaMap CILuminosityBlendMode CIMaskToAlpha CIMaskedVariableBlur ' +
      'CIMaximumCompositing CIMinimumComponent CIMinimumCompositing CIMipmapBlur CIMirror CIModTransition ' +
      'CIMultiplyCompositing CIOverlayBlendMode CIPDF417BarcodeGenerator CIPerspectiveCorrection ' +
      'CIPerspectiveTransform CIPerspectiveTransformWithExtent CIPhotoEffect CIPhotoEffectChrome ' +
      'CIPhotoEffectInstant CIPhotoEffectMono CIPhotoEffectNoir CIPhotoEffectProcess CIPhotoEffectTonal ' +
      'CIPhotoGrain CIPinLightBlendMode CIPinchDistortion CIPixellate CIPlusDarkerCompositing ' +
      'CIPremultiply CIQRCodeFeature CIQRCodeGenerator CIRadialGradient CIRandomGenerator ' +
      'CIRectangleFeature CIRedEyeCorrections CIRedEyeRepair CIReedSolomon CISRGBToneCurveToLinear ' +
      'CIScreenBlendMode CISepiaTone CISharpenLuminance CISimpleTile CISixfoldReflectedTile ' +
      'CISkyAndGrassAdjust CISmartBlackAndWhite CISmartColorFilter CISmartToneFilter ' +
      'CISoftLightBlendMode CISourceAtopCompositing CISourceInCompositing CISourceOutCompositing ' +
      'CIStarShineGenerator CIStraightenFilter CIStretch CIStripesGenerator CISubtractBlendMode ' +
      'CITemperatureAndTint CIThermal CITile2Filter CITileFilter CIToneCurve CITriangleKaleidoscope ' +
      'CITwirlDistortion CIUnpremultiply CIUnsharpMask CIVector CIVibrance CIVignette CIVignetteEffect ' +
      'CIWarpKernel CIWhitePointAdjust CIWrapMirror CIXRay MKActivityItemSocialSource ' +
      'MKActivityViewController MKActivityViewControllerDelegate MKAmbientLightMonitor MKAnnotation ' +
      'MKAnnotationCalloutControllerDelegate MKAnnotationContainerView MKAnnotationContainerViewDelegate ' +
      'MKAnnotationManagerDelegate MKAnnotationMarkerContainer MKAnnotationModel ' +
      'MKAnnotationSelector MKAnnotationView MKAnnotationViewInternal MKAppImageManager ' +
      'MKApplicationStateMonitor MKAttributionLabel MKBasicMapView MKBlockBasedSnapshotRequester ' +
      'MKCalloutBackgroundView MKCalloutBasedAnnotationCalloutController MKCalloutSource MKCircle ' +
      'MKCircleView MKCompassView MKCoreLocationProvider MKCustomSeparatorTableViewCell MKDate ' +
      'MKDirectionsRequest MKDirectionsResponse MKDistanceDetailProvider MKDistanceFormatter ' +
      'MKGeodesicPolyline MKIconManager MKInstructionContents MKJunction MKLabelMarkerView MKLayer ' +
      'MKLocalSearchCompleter MKLocalSearchRequest MKLocalSearchResponse MKLocatableObject ' +
      'MKLocationManagerObserver MKLocationManagerOperation MKLocationManagerSingleUpdater ' +
      'MKLocationProviderDelegate MKMapAnnotationManager MKMapAttribution MKMapAttributionImage ' +
      'MKMapGestureController MKMapGestureControllerDelegate MKMapItem MKMapItemMetadata ' +
      'MKMapItemMetadataImageRequest MKMapItemMetadataRequest MKMapItemMetadataRequester MKMapService ' +
      'MKMapServiceSearchTicket MKMapServiceTicket MKMapSnapshot MKMapSnapshotCreator ' +
      'MKMapSnapshotOptions MKMapSnapshotRequest MKMapSnapshotter MKMapView MKMapViewDelegate ' +
      'MKModernUserLocationView MKMultiPoint MKNewAnnotationContainerView MKOldAnnotationContainerView ' +
      'MKOrientationContext MKOverlay MKOverlayContainerView MKOverlayContainerViewDelegate ' +
      'MKOverlayPathView MKOverlayRenderer MKOverlayView MKPinAnnotationView MKPlaceActionsViewController ' +
      'MKPlaceActivityProvider MKPlaceAttributionCell MKPlaceAttributionCellProvider ' +
      'MKPlaceCardReviewsControllerDelegate MKPlaceDealCell MKPlaceHeaderBackgroundView ' +
      'MKPlaceHeaderBackgroundView_Flyover MKPlaceHeaderBackgroundView_Slideshow ' +
      'MKPlaceHeaderView MKPlaceHeaderViewCinematics MKPlaceHeaderViewDelegate ' +
      'MKPlaceInfoViewController MKPlaceInfoViewControllerDelegate MKPlaceInfoViewInlineMapCell ' +
      'MKPlaceNearbyAppsMetricsCoordinator MKPlaceNearbyAppsViewController ' +
      'MKPlacePhotosViewController MKPlaceReviewsViewCell MKPlaceReviewsViewCheckInWriteCell ' +
      'MKPlaceReviewsViewController MKPlaceSectionHeaderView MKPlaceSharedAttributionDelegate ' +
      'MKPlaceURLActivityProvider MKPlaceViewNearbyAppCollectionViewCell MKPlaceViewNearbyAppsCell ' +
      'MKPlaceViewStyleProvider MKPlacemark MKPointAnnotation MKPolygon MKPolygonRenderer MKPolygonView ' +
      'MKPolylineRenderer MKPolylineView MKPopoverBasedAnnotationCalloutController MKQuadTrie ' +
      'MKReverseGeocoderInternal MKRightPaddedTextAttachment MKRoute MKRouteActivityProvider ' +
      'MKRouteStep MKRouteStepPolyline MKRouteTextActivityProvider MKRouteURLActivityProvider MKScaleView ' +
      'MKSearchCompleter MKSearchCompleterDelegate MKSearchCompletion MKSegmentedControlTabBarView ' +
      'MKSharedAttributionViewController MKSmallCalloutView MKSmallCalloutViewController ' +
      'MKStackingViewController MKStackingViewControllerDelegate MKStackingViewControllerPreferredSizeUse ' +
      'MKStackingViewControllerSizableView MKStarRatingAndLabelView MKStarRatingView MKStarkCompassView ' +
      'MKThreadContext MKThrottledGate MKTileOverlay MKTileOverlayRenderer MKTileOverlayRequester ' +
      'MKTileOverlayTile MKTiltGestureRecognizer MKTrafficSupport MKURLSerializer MKUserLocation ' +
      'MKUserLocationAnnotationViewProxy MKUserLocationInternal MKUserLocationView ' +
      'MKUserTrackingButtonTarget MKVariableDelayTapRecognizer MKVariableDelayTapRecognizerDelegate ' +
      'MKYelpDeal MPAVAdItem MPAVController MPAVControllerNode MPAVControllerProtocol ' +
      'MPAVDestinationBrowser MPAVErrorResolver MPAVErrorResolverDelegate MPAVItem ' +
      'MPAVPlaylistFeeder MPAVPlaylistManager MPAVQueuePlayerFeeder MPAVQueuePlayerFeederSource MPAVRoute ' +
      'MPAVRoutingControllerDelegate MPAVRoutingSheet MPAVRoutingTableViewCell ' +
      'MPAVRoutingViewController MPAVRoutingViewControllerDelegate MPAVSystemRoutingController ' +
      'MPAbstractFullScreenVideoViewController MPAbstractNetworkArtworkDataSource ' +
      'MPAdvertisementContainerView MPAlternateTextTrack MPAlternateTrack ' +
      'MPAlternateTracks MPAlternateTracksContainerViewController MPAlternateTracksTransitionController ' +
      'MPArrayQueueFeeder MPArrayQueueItem MPArtworkCatalog MPArtworkConfiguration MPArtworkDataSource ' +
      'MPArtworkResizeOperation MPArtworkResizeUtility MPAudioAndSubtitlesController ' +
      'MPAudioDeviceController MPAudioRouteCell MPAudioRoutingPicker MPAudioVideoRoutingActionSheet ' +
      'MPAudioVideoRoutingTableViewCellLayoutManager MPAudioVideoRoutingTableViewController ' +
      'MPButton MPCacheableConcreteMediaEntity MPChangePlaybackPositionCommandEvent ' +
      'MPChangePlaybackRateCommandEvent MPChangeRepeatModeCommand MPChangeRepeatModeCommandEvent ' +
      'MPChangeShuffleModeCommandEvent MPClientMediaPickerController MPClosedCaptionDisplay ' +
      'MPCloudAVURLAsset MPCloudAssetDownloadController MPCloudAssetDownloadSessionIdentifier ' +
      'MPCompleteMyCollectionArtworkDataSource MPConcreteMediaEntityPropertiesCache MPConcreteMediaItem ' +
      'MPConcreteMediaItemCollection MPConcreteMediaPlaylist MPContentItem MPControllerProtocol ' +
      'MPDetailScrubController MPDetailScrubControllerDelegate MPDetailSlider MPDetailSliderDelegate ' +
      'MPDownloadManager MPFeedbackCommand MPFeedbackCommandEvent MPFlipTransitionController ' +
      'MPFullscreenWindow MPHomeSharingArtworkDataSource MPHomeSharingErrorResolver ' +
      'MPHomeSharingRentalErrorResolver MPHomeSharingRentalTracker MPHomeSharingURLProtocol ' +
      'MPInlineAudioTransportControls MPInlineTransportControls MPInlineVideoController ' +
      'MPItemDownloadProperties MPItemDownloadSession MPKnockoutButton ' +
      'MPLoggingUtility MPML3ErrorResolver MPMediaArray MPMediaChapter MPMediaChapterTimeMarker ' +
      'MPMediaCompoundAnyPredicate MPMediaCompoundPredicate MPMediaConditionalPredicate MPMediaEntity ' +
      'MPMediaEntityResultSetArray MPMediaItem MPMediaItemArray MPMediaItemArrayPIDEncodableItem ' +
      'MPMediaItemCollection MPMediaLibrary MPMediaLibraryArtwork MPMediaLibraryArtworkDataSource ' +
      'MPMediaLibraryConnectionAssertion MPMediaLibraryDataProvider MPMediaLibraryDataProviderML3 ' +
      'MPMediaLibraryDataProviderSystemML3 MPMediaPersistentIDsPredicate MPMediaPickerController ' +
      'MPMediaPlayback MPMediaPlaylist MPMediaPredicate MPMediaPropertyPredicate MPMediaQuery ' +
      'MPMediaQueryMutableSectionInfo MPMediaQueryNowPlayingItem MPMediaQueryQueueFeeder ' +
      'MPMediaQuerySectionInfo MPMediaQueryShuffledItems MPMovie MPMovieAccessLog MPMovieAccessLogEvent ' +
      'MPMovieErrorLogEvent MPMoviePlayerController MPMoviePlayerControllerNew ' +
      'MPMoviePlayerViewControllerInternal MPMovieTVHUDView MPMovieThumbnailRequest MPMovieView ' +
      'MPMusicPlayerClientState MPMusicPlayerController MPMusicPlayerControllerInternal ' +
      'MPMusicPlayerControllerServerInternal MPNetworkPlayabilityMonitor MPNondurableMediaItem ' +
      'MPNowPlayingObserver MPPCompoundPredicate MPPConditionalPredicate MPPMediaPredicate ' +
      'MPPMediaQuery MPPPersistentIDsPredicate MPPPropertyPredicate MPPProtobufferCoding ' +
      'MPPasswordAlertView MPPlaceholderAVItem MPPlaceholderArtwork MPPlayableContentCallbackContext ' +
      'MPPlaybackContext MPPlaybackControlsView MPPlaybackTitlesView MPPurchaseCommand ' +
      'MPQueryPlaybackContext MPQueueFeeder MPQueueFeederState MPQueuePlayer MPRadioLibrary ' +
      'MPRadioStationRemotePlaybackQueue MPRatingCommand MPRatingCommandEvent MPReflectionImageView ' +
      'MPRemoteCommandCenter MPRemoteCommandDelegate MPRemoteCommandEvent MPRemoteMediaPickerController ' +
      'MPRestrictionsMonitor MPRotatingViewController MPSSLookupResponseTransformContext ' +
      'MPServerObject MPServerObjectProxy MPServiceMediaPickerController MPSetPlaybackQueueCommandEvent ' +
      'MPSkipIntervalCommand MPSkipIntervalCommandEvent MPSkipTrackCommand MPSkipTrackCommandEvent ' +
      'MPStoreAVItem MPStoreAsset MPStoreCollectionCompletionOffering MPStoreCompletionOfferResponse ' +
      'MPStoreCompletionOfferingController MPStoreCompletionOfferingLookupItem MPStoreDownload ' +
      'MPStoreDownloadManagerObserver MPStoreItemContext MPStoreItemOffer MPStoreOffer ' +
      'MPStoreOfferMediaItem MPStoreOfferMediaItemArtwork MPStoreOfferMediaItemArtworkDescriptor ' +
      'MPStorePlayWhileDownloadController MPSubtitlesContainerView MPSwipableView MPSwipableViewDelegate ' +
      'MPTVOutWindow MPTapGestureRecognizer MPTermsViewController MPTimeMarker MPTimedMetadata ' +
      'MPTransportButton MPTransportControls MPTransportControlsTarget MPUITransitionViewRunner ' +
      'MPUbiquitousPlaybackPositionController MPUsageStatistics MPUserNotification MPVideoBackgroundView ' +
      'MPVideoControllerProtocol MPVideoDestinationBackgroundView MPVideoOverlay MPVideoOverlayDelegate ' +
      'MPVideoPlaybackOverlayView MPVideoView MPVideoViewController MPViewController MPVolumeController ' +
      'MPVolumeHUDController MPVolumeSettingsController MPVolumeSlider MPVolumeView ' +
      'MPWeakRef MPWeakTimer NSAKDeserializer NSAKDeserializerStream NSAKSerializer NSAKSerializerStream ' +
      'NSATSGlyphStorage NSATSLineFragment NSATSTypesetter NSAboutURLProtocol NSAddressCheckingResult ' +
      'NSAggregateExpression NSAllDescendantPathsEnumerator NSAnyKeyExpression NSArchiver ' +
      'NSAsyncSSDownloadManager NSAsynchronousFetchRequest NSAsynchronousFetchResult NSAtomicStore ' +
      'NSAttributeDescription NSAttributeDictionary NSAttributeDictionaryEnumerator ' +
      'NSAttributedString NSAutoCalendar NSAutoContentAccessingProxy NSAutoLocale NSAutoreleasePool ' +
      'NSBasicObjectID NSBatchUpdateRequest NSBatchUpdateResult NSBetweenPredicateOperator ' +
      'NSBig5HKSCSEncodingDetector NSBigEEncodingDetector NSBigMutableString NSBinaryObjectStore ' +
      'NSBlock NSBlockExpression NSBlockInvocation NSBlockOperation NSBlockPredicate NSByteCountFormatter ' +
      'NSCFAttributedString NSCFCharacterSet NSCFData NSCFDictionary NSCFError NSCFInputStream ' +
      'NSCFSet NSCFTimer NSCFType NSCIDGlyphInfo NSCTGlyphInfo NSCTRubyAnnotation NSCache NSCacheDelegate ' +
      'NSCachedURLResponseInternal NSCalendar NSCalendarDate NSCharacterSet NSCheapMutableString ' +
      'NSClassicMapTable NSCoder NSCoding NSColor NSComparisonPredicate NSComparisonPredicateOperator ' +
      'NSComplexRegularExpressionCheckingResult NSCompoundPredicate NSCompoundPredicateOperator ' +
      'NSConcreteData NSConcreteDistantObjectRequest NSConcreteFileHandle NSConcreteFileHandleARCWeakRef ' +
      'NSConcreteMapTable NSConcreteMapTableValueEnumerator NSConcreteMutableAttributedString ' +
      'NSConcreteNotification NSConcreteNotifyingMutableAttributedString NSConcretePipe ' +
      'NSConcretePointerFunctions NSConcretePortCoder NSConcreteProtocolChecker NSConcreteScanner ' +
      'NSConcreteTextStorage NSConcreteValue NSCondition NSConditionLock NSConnection NSConnectionHelper ' +
      'NSConstantString NSConstantValueExpression NSContentSizeLayoutConstraint NSCopying ' +
      'NSCountedSet NSCursor NSCustomPredicateOperator NSDOStreamData NSDashCheckingResult NSData ' +
      'NSDate NSDateCheckingResult NSDateComponents NSDateComponentsFormatter NSDateFormatter ' +
      'NSDebugString NSDecimalNumber NSDecimalNumberBehaviors NSDecimalNumberHandler ' +
      'NSDeserializerStream NSDictionaryMapNode NSDictionaryStoreMap NSDirInfo NSDirInfoDeserializer ' +
      'NSDirectoryEnumerator NSDirectorySubpathsOperation NSDirectoryTraversalOperation ' +
      'NSDistantObject NSDistantObjectRequest NSDistantObjectTableEntry NSDistributedNotificationCenter ' +
      'NSDocInfo NSDocumentDeserializer NSDocumentDifferenceSize NSDocumentDifferenceSizeTriple ' +
      'NSEUCGB2312EncodingDetector NSEUCJPEncodingDetector NSEUCKREncodingDetector ' +
      'NSEncodingDetector NSEnergyFormatter NSEntityDescription NSEntityMapping NSEntityMigrationPolicy ' +
      'NSEnumerator NSEqualityPredicateOperator NSError NSExpression NSExpressionDescription ' +
      'NSExtension NSExtensionBundleHelper NSExtensionContext NSExtensionItem NSExtensionRequestHandling ' +
      'NSExtraLMData NSFalsePredicate NSFastEnumeration NSFaultHandler NSFetchRequest ' +
      'NSFetchedPropertyDescription NSFetchedResultsController NSFetchedResultsSectionInfo ' +
      'NSFileAccessArbiterProxy NSFileAccessClaim NSFileAccessIntent NSFileAccessNode NSFileAttributes ' +
      'NSFileCoordinatorAccessorBlockCompletion NSFileHandle NSFileManager NSFileMultipleAccessClaim ' +
      'NSFilePresenterOperationRecord NSFilePresenterProxy NSFilePresenterRelinquishment ' +
      'NSFileProviderExtension NSFileProviderProxy NSFileReactorProxy NSFileReadingClaim ' +
      'NSFileSecurity NSFileSubarbitrationClaim NSFileVersion NSFileWatcher NSFileWatcherObservations ' +
      'NSFileWrapperMoreIVars NSFileWritingClaim NSFileWritingWritingClaim NSFilesystemItemCopyOperation ' +
      'NSFilesystemItemMoveOperation NSFilesystemItemRemoveOperation NSFormatter NSFunctionExpression ' +
      'NSGBKEncodingDetector NSGZipDecoder NSGlyphGenerator NSGlyphInfo NSGlyphNameGlyphInfo ' +
      'NSHTMLReader NSHTMLWebDelegate NSHTMLWriter NSHTTPCookie NSHTTPCookieStorage ' +
      'NSHTTPURLRequestParameters NSHTTPURLResponse NSHTTPURLResponseInternal NSHZGB2312EncodingDetector ' +
      'NSIBPrototypingLayoutConstraint NSISConstraint NSISEngine NSISEngineDelegate ' +
      'NSISLinearExpression NSISO2022CNEncodingDetector NSISO2022EncodingDetector ' +
      'NSISO2022JP2EncodingDetector NSISO2022JPEncodingDetector NSISO2022KREncodingDetector ' +
      'NSISO88595EncodingDetector NSISO88596EncodingDetector NSISO88597EncodingDetector ' +
      'NSISOLATIN10EncodingDetector NSISOLATIN1EncodingDetector NSISOLATIN2EncodingDetector ' +
      'NSISOLATIN4EncodingDetector NSISOLATIN5EncodingDetector NSISOLATIN6EncodingDetector ' +
      'NSISOLATIN8EncodingDetector NSISOLATIN9EncodingDetector NSISObjectiveLinearExpression ' +
      'NSISRestrictedToNonNegativeMarkerVariable NSISRestrictedToNonNegativeMarkerVariableToBeMinimized ' +
      'NSISRestrictedToNonNegativeVariableToBeMinimized NSISRestrictedToZeroMarkerVariable NSISRowBody ' +
      'NSISVariable NSISVariableDelegate NSIdRunStorage NSIdentityGlyphInfo NSInPredicateOperator ' +
      'NSIncrementalStoreNode NSIndexPath NSIndexSet NSInputStream NSInsertionPointHelper NSInvocation ' +
      'NSItemProvider NSJSONSerialization NSJoin NSKeyPathExpression NSKeyPathSpecifierExpression ' +
      'NSKeyValueArray NSKeyValueChangeDictionary NSKeyValueCollectionGetter NSKeyValueComputedProperty ' +
      'NSKeyValueFastMutableArray NSKeyValueFastMutableArray1 NSKeyValueFastMutableArray2 ' +
      'NSKeyValueFastMutableCollection2Getter NSKeyValueFastMutableOrderedSet ' +
      'NSKeyValueFastMutableOrderedSet2 NSKeyValueFastMutableSet NSKeyValueFastMutableSet1 ' +
      'NSKeyValueGetter NSKeyValueIvarGetter NSKeyValueIvarMutableArray ' +
      'NSKeyValueIvarMutableOrderedSet NSKeyValueIvarMutableSet NSKeyValueIvarSetter ' +
      'NSKeyValueMethodSetter NSKeyValueMutableArray NSKeyValueMutableOrderedSet NSKeyValueMutableSet ' +
      'NSKeyValueMutatingCollectionMethodSet NSKeyValueMutatingOrderedSetMethodSet ' +
      'NSKeyValueNestedProperty NSKeyValueNilOrderedSetEnumerator NSKeyValueNilSetEnumerator ' +
      'NSKeyValueNonmutatingCollectionMethodSet NSKeyValueNonmutatingOrderedSetMethodSet ' +
      'NSKeyValueNotifyingMutableArray NSKeyValueNotifyingMutableCollectionGetter ' +
      'NSKeyValueNotifyingMutableSet NSKeyValueObservance NSKeyValueObservationInfo NSKeyValueOrderedSet ' +
      'NSKeyValueProxyCaching NSKeyValueProxyGetter NSKeyValueProxyShareKey NSKeyValueSet ' +
      'NSKeyValueShareableObservanceKey NSKeyValueShareableObservationInfoKey NSKeyValueSlowGetter ' +
      'NSKeyValueSlowMutableCollectionGetter NSKeyValueSlowMutableOrderedSet NSKeyValueSlowMutableSet ' +
      'NSKeyValueUndefinedGetter NSKeyValueUndefinedSetter NSKeyValueUnnestedProperty NSKeyedArchiver ' +
      'NSKeyedPortCoder NSKeyedUnarchiver NSKnownKeysDictionary NSKnownKeysDictionary1 ' +
      'NSKnownKeysMappingStrategy NSKnownKeysMappingStrategy1 NSKnownKeysMappingStrategy2 ' +
      'NSLayoutConstraintParser NSLayoutItem NSLayoutManager NSLayoutManagerDelegate ' +
      'NSLayoutManagerTextBlockRowArrayCache NSLeafProxy NSLengthFormatter NSLikePredicateOperator ' +
      'NSLinguisticTagger NSLinkCheckingResult NSLocale NSLocalizableString NSLock NSLocking ' +
      'NSMachPort NSManagedObject NSManagedObjectContext NSManagedObjectContextFaultingDelegate ' +
      'NSManagedObjectModel NSManagedObjectModelBundle NSMappedObjectStore NSMappingModel NSMassFormatter ' +
      'NSMemoryObjectStore NSMemoryStoreEqualityPredicateOperator NSMemoryStoreInPredicateOperator ' +
      'NSMergePolicy NSMergedPolicyLocalizationPolicy NSMessagePort NSMessagePortNameServer ' +
      'NSMetadataQuery NSMetadataQueryAttributeValueTuple NSMetadataQueryDelegate ' +
      'NSMethodSignature NSMigrationContext NSMigrationManager NSMultiReadUniWriteLock NSMutableArray ' +
      'NSMutableCharacterSet NSMutableCopying NSMutableData NSMutableDictionary NSMutableIndexSet ' +
      'NSMutableParagraphStyle NSMutableRLEArray NSMutableSet NSMutableString NSMutableStringProxy ' +
      'NSMutableURLRequest NSNetService NSNetServiceBrowser NSNetServiceBrowserDelegate ' +
      'NSNetServicesInternal NSNotification NSNotificationCenter NSNotificationQueue NSNull ' +
      'NSNumber NSNumberFormatter NSObject NSOperation NSOperationQueue NSOrderedSet NSOrthography ' +
      'NSOutputStream NSOwnedDictionaryProxy NSPageData NSParagraphStyle NSParagraphStyleExtraData ' +
      'NSPersistentStore NSPersistentStoreAsynchronousResult NSPersistentStoreCache ' +
      'NSPersistentStoreMap NSPersistentStoreRequest NSPersistentStoreResult NSPhoneNumberCheckingResult ' +
      'NSPipe NSPlaceholderMutableString NSPlaceholderNumber NSPlaceholderString NSPlaceholderValue ' +
      'NSPointerFunctions NSPort NSPortCoder NSPortMessage NSPortNameServer NSPredicate ' +
      'NSPredicateVisitor NSPredicatedStoreRequest NSPrivateCoreDataClassForFindingBundle NSProcessInfo ' +
      'NSProgressPublisher NSProgressRegistrar NSProgressSubscriber NSProgressValues ' +
      'NSPropertyListSerialization NSPropertyMapping NSPropertyStoreMapping NSPropertyTransform ' +
      'NSProxy NSPullChangeHistoryRequest NSPurgeableData NSQuoteCheckingResult NSRLEArray NSRTFD ' +
      'NSRTFReaderTableState NSRTFWriter NSRecursiveLock NSRegularExpression ' +
      'NSRelationshipDescription NSRelationshipStoreMapping NSReplacementCheckingResult NSRubyAnnotation ' +
      'NSRunStorage NSSHIFTJISEncodingDetector NSSQLAdapter NSSQLAliasGenerator NSSQLAttribute ' +
      'NSSQLBindVariable NSSQLChannel NSSQLColumn NSSQLCompoundWhereIntermediate NSSQLConnection ' +
      'NSSQLCore NSSQLCorrelation NSSQLCorrelationTableUpdateTracker NSSQLEntity NSSQLEntityKey ' +
      'NSSQLExpressionIntermediate NSSQLFetchCountIntermediate NSSQLFetchDictionaryCountIntermediate ' +
      'NSSQLForeignEntityKey NSSQLForeignKey NSSQLForeignKeyIntermediate NSSQLForeignOrderKey ' +
      'NSSQLGenerator NSSQLGroupByIntermediate NSSQLHavingIntermediate NSSQLIntermediate ' +
      'NSSQLKeypathExpressionIntermediate NSSQLLimitIntermediate NSSQLManyToMany NSSQLModel ' +
      'NSSQLOptLockKey NSSQLOrderIntermediate NSSQLPredicateAnalyser NSSQLPrimaryKey NSSQLProperty ' +
      'NSSQLRelationship NSSQLRow NSSQLRowCache NSSQLSelectIntermediate NSSQLSimpleWhereIntermediate ' +
      'NSSQLStatementIntermediate NSSQLStoreMappingGenerator NSSQLSubqueryExpressionIntermediate ' +
      'NSSQLToMany NSSQLToOne NSSQLUpdateColumnsIntermediate NSSQLUpdateIntermediate ' +
      'NSSQLiteAdapter NSSQLiteConnection NSSQLiteInPlaceMigrationManager NSSQLiteIntarrayTable ' +
      'NSSaveChangesRequest NSScalarObjectID48 NSScalarObjectID64 NSScanner NSSearchPathEnumerator ' +
      'NSSelfExpression NSSerializerStream NSSet NSSetExpression NSShadow NSSharedKeyDictionary ' +
      'NSSimpleAttributeDictionary NSSimpleAttributeDictionaryEnumerator NSSimpleCString ' +
      'NSSimpleRegularExpressionCheckingResult NSSingleByteEncodingDetector NSSingleLineTypesetter ' +
      'NSSortDescriptor NSSpellCheckingResult NSStorage NSStoreMapNode NSStoreMapping ' +
      'NSStoreMigrationPolicy NSStream NSStreamDelegate NSStringDrawingTextStorage ' +
      'NSStringPredicateOperator NSStringROMKeySet_Embedded NSSubqueryExpression NSSubrangeData ' +
      'NSSubstitutionCheckingResult NSSubstringPredicateOperator NSSymbolicExpression ' +
      'NSTaggedPointerStringCStringContainer NSTask NSTempAttributeDictionary NSTemporaryObjectID ' +
      'NSTextAlternatives NSTextAttachment NSTextAttachmentCell NSTextAttachmentContainer NSTextBlock ' +
      'NSTextCheckingResult NSTextContainer NSTextContainerView NSTextLayoutOrientationProvider ' +
      'NSTextStorage NSTextTab NSTextTable NSTextTableBlock NSThread NSTimeZone NSTimer ' +
      'NSTransitInformationCheckingResult NSTruePredicate NSTypesetter NSUITextViewCommonMethods NSURL ' +
      'NSURLAuthenticationChallengeInternal NSURLAuthenticationChallengeSender NSURLCache ' +
      'NSURLComponents NSURLConnection NSURLConnectionDataDelegate NSURLConnectionDelegate ' +
      'NSURLConnectionInternalBackgroundDownload NSURLConnectionInternalConnection ' +
      'NSURLCredential NSURLCredentialStorage NSURLDirectoryEnumerator NSURLDownload NSURLDownloadDecoder ' +
      'NSURLDownloadInternal NSURLError NSURLFileTypeMappings NSURLFileTypeMappingsInternal ' +
      'NSURLKeyValuePair NSURLProtectionSpace NSURLProtocol NSURLProtocolClient NSURLProtocolInternal ' +
      'NSURLQueue NSURLQueueNode NSURLRequest NSURLRequestInternal NSURLResponse NSURLResponseInternal ' +
      'NSURLSessionAVAssetDownloadTask NSURLSessionConfiguration NSURLSessionDataDelegate ' +
      'NSURLSessionDataTask NSURLSessionDataTaskSubclass NSURLSessionDelegate ' +
      'NSURLSessionDownloadTask NSURLSessionDownloadTaskSubclass NSURLSessionStreamTask ' +
      'NSURLSessionSubclass NSURLSessionTask NSURLSessionTaskDelegate NSURLSessionTaskSubclass ' +
      'NSURLSessionUploadTaskSubclass NSURLStorageCacheClient NSURLStorage_CacheClient ' +
      'NSUTF16BaseEncodingDetector NSUTF16EncodingDetector NSUTF16LEEncodingDetector ' +
      'NSUTF32EncodingDetector NSUTF32LEEncodingDetector NSUTF7EncodingDetector NSUTF8EncodingDetector ' +
      'NSUUID NSUbiquitousKeyValueStore NSUnarchiver NSUndoManager NSUndoManagerProxy NSUndoTextOperation ' +
      'NSUnkeyedPortCoder NSUnknownRequestTypeResult NSUserActivity NSUserActivityDelegate NSUserDefaults ' +
      'NSValue NSValueTransformer NSVariableAssignmentExpression NSVariableExpression ' +
      'NSWINDOWS1251EncodingDetector NSWINDOWS1252EncodingDetector NSWINDOWS1253EncodingDetector ' +
      'NSWINDOWS1255EncodingDetector NSWINDOWS1256EncodingDetector NSWINDOWS1257EncodingDetector ' +
      'NSWINDOWS874EncodingDetector NSWINDOWS932EncodingDetector NSWINDOWS936EncodingDetector ' +
      'NSWINDOWS950EncodingDetector NSWeakCallback NSWeakPointerValue NSXMLParser NSXMLParserDelegate ' +
      'NSXPCConnection NSXPCConnectionDelegate NSXPCDecoder NSXPCEncoder NSXPCInterface NSXPCListener ' +
      'NSXPCListenerEndpoint NSXPCProxyCreating UIAcceleration UIAccelerometer UIAccelerometerDelegate ' +
      'UIAccessibilityElement UIAccessibilityIdentification UIAccessoryBackgroundTaskAction UIActionSheet ' +
      'UIActivity UIActivityContinuationAction UIActivityGroupViewController ' +
      'UIActivityIndicatorView UIActivityItemDeferredSource UIActivityItemImageRep UIActivityItemProvider ' +
      'UIActivityItemSource UIActivityItemSourceAttachment UIActivityItemURLRep UIActivityViewController ' +
      'UIActivityViewPopoverBackgroundView UIAdaptivePresentationControllerDelegate ' +
      'UIAlertAction UIAlertButton UIAlertController UIAlertControllerBackgroundView ' +
      'UIAlertControllerDescriptor UIAlertControllerStackManager UIAlertControllerVisualStyle ' +
      'UIAlertControllerVisualStyleActionSheetCar UIAlertControllerVisualStyleAlert ' +
      'UIAlertControllerVisualStyleProviding UIAlertLabeledButton UIAlertMediaButton ' +
      'UIAlertTextView UIAlertView UIAlertViewDelegate UIAlphaAnimation UIAnimation UIAnimator ' +
      'UIAppearanceContainer UIApplication UIApplicationDelegate UIApplicationExtensionActivity ' +
      'UIApplicationSceneClientSettings UIApplicationSceneClientSettingsDiffInspector ' +
      'UIApplicationSceneSettingsDiffInspector UIApplicationSceneTransitionContext ' +
      'UIAttachmentBehavior UIAutoRotatingWindow UIAutocorrectInlinePrompt UIAutocorrectShadowView ' +
      'UIAutoscroll UIAutoscrollContainer UIAutoscrollDelegate UIBarButtonItem UIBarButtonItemProxy ' +
      'UIBarPositioning UIBarPositioningDelegate UIBezierPath UIBlurEffect UIBookViewController UIButton ' +
      'UIButtonContent UIButtonLabel UICGColor UICIColor UICTFont UICTFontDescriptor ' +
      'UICachedDeviceRGBColor UICachedDeviceWhiteColor UICalloutBar UICalloutBarBackground ' +
      'UICalloutBarDelegate UICalloutView UICellHighlightingSupport UICheckeredPatternView UIClassSwapper ' +
      'UIClassicStatusBarView UIClassicWindow UIClientRotationContext UICollectionReusableView ' +
      'UICollectionViewAnimation UICollectionViewCell UICollectionViewController ' +
      'UICollectionViewData UICollectionViewDataSource UICollectionViewDelegate ' +
      'UICollectionViewFlowLayout UICollectionViewFlowLayoutInvalidationContext UICollectionViewLayout ' +
      'UICollectionViewLayoutInvalidationContext UICollectionViewTransitionLayout UICollectionViewUpdate ' +
      'UICollectionViewUpdateItem UICollisionBehavior UICollisionBehaviorDelegate UIColor ' +
      'UICompletionCell UICompletionTable UICompletionTablePrivate UICompositeImageElement ' +
      'UIConcreteLocalNotification UIContentContainer UIControl UIControlTargetAction UICoordinateSpace ' +
      'UICustomObject UIDOMHTMLOptGroupCell UIDOMHTMLOptGroupSelectedItem UIDOMHTMLOptionPickerCell ' +
      'UIDataSourceModelAssociation UIDateLabel UIDatePicker UIDatePickerContentView ' +
      'UIDefaultKeyboardInput UIDelayedAction UIDelayedControlTargetAction UIDevice ' +
      'UIDeviceRGBColor UIDeviceWhiteColor UIDictationController UIDictationFloatingStarkView ' +
      'UIDictationLandingViewSettings UIDictationMeterView UIDictationPhrase UIDictationPopUpView ' +
      'UIDictationStreamingOperation UIDictationStreamingOperations UIDictationView ' +
      'UIDictationiPhoneLayoutView UIDimmingView UIDimmingViewDelegate UIDocument ' +
      'UIDocumentErrorRecoveryAttempter UIDocumentInteractionController ' +
      'UIDocumentInteractionControllerDelegatePrivate UIDocumentMenuViewController ' +
      'UIDocumentPasswordView UIDocumentPasswordViewDelegate UIDocumentPickerExtensionViewController ' +
      'UIDocumentStorageManager UIDragRecognizer UIDragger UIDropShadowView UIDynamicAnimator ' +
      'UIDynamicAnimatorTicker UIDynamicBehavior UIDynamicCaret UIDynamicItem UIDynamicItemBehavior ' +
      'UIFetchContentInBackgroundAction UIFetchContentInBackgroundActionResponse UIFieldEditor UIFlicker ' +
      'UIFontDescriptor UIFormPeripheral UIFrameAnimation UIFullScreenViewController UIGestureAnimation ' +
      'UIGestureInfo UIGestureRecognizer UIGestureRecognizerDelegate UIGestureRecognizerDelegatePrivate ' +
      'UIGobblerGestureRecognizer UIGradient UIGravityBehavior UIGroupTableViewCellBackground ' +
      'UIHandleLocalNotificationAction UIHandleRemoteNotificationAction UIHandleStatusBarTapAction ' +
      'UIImage UIImageAsset UIImageLSResourceProxy UIImageNibPlaceholder ' +
      'UIImagePickerController UIImagePickerControllerDelegate UIImageView UIInlineCandidateTextView ' +
      'UIInputSetHostView UIInputSwitcher UIInputSwitcherSelectionExtraView UIInputSwitcherShadowView ' +
      'UIInputSwitcherTableCellBackgroundView UIInputSwitcherTableView UIInputSwitcherView UIInputView ' +
      'UIInputViewAnimationControllerBasic UIInputViewAnimationControllerSlide ' +
      'UIInputViewAnimationControllerViewController UIInputViewAnimationControllerViewControllerContext ' +
      'UIInputViewAnimationStyle UIInputViewAnimationStyleDirectional UIInputViewAnimationStyleExtraView ' +
      'UIInputViewControllerInterface UIInputViewControllerInterfaceClient UIInputViewPlacementTransition ' +
      'UIInputViewRotateTransition UIInputViewSet UIInputViewSetNotificationInfo UIInputViewSetPlacement ' +
      'UIInputViewSetPlacementInitialPosition UIInputViewSetPlacementOffScreenDown ' +
      'UIInputViewSetPlacementOffScreenLeft UIInputViewSetPlacementOffScreenRight ' +
      'UIInputViewSetPlacementUndocked UIInputViewSlideTransition UIInputViewTransition ' +
      'UIInsertControl UIInternalEvent UIInterpolatingMotionEffect UIKBBackdropView UIKBBackgroundView ' +
      'UIKBCacheToken UIKBCacheToken_Key UIKBCacheToken_KeyFilledTemplate UIKBCacheToken_KeyMask ' +
      'UIKBCacheToken_Keyplane UIKBCacheableView UIKBCandidateCollectionView UIKBCandidateGapView ' +
      'UIKBColorGradient UIKBCursorSelection UIKBDimmingView UIKBEdgeEffect UIKBGeometry UIKBGradient ' +
      'UIKBHandwritingBoxcarFilterPointFIFO UIKBHandwritingCandidateView UIKBHandwritingCandidateViewCell ' +
      'UIKBHandwritingQuadCurvePointFIFO UIKBHandwritingStrokeEnabled UIKBHandwritingStrokePointFIFO ' +
      'UIKBHandwritingView UIKBInputBackdropView UIKBKeyDisplayContents UIKBKeyInterval UIKBKeyView ' +
      'UIKBMergeAction UIKBRenderConfig UIKBRenderEffect UIKBRenderFactory UIKBRenderFactory10Key ' +
      'UIKBRenderFactory10Key_LandscapeChoco UIKBRenderFactory10Key_LandscapeTruffle ' +
      'UIKBRenderFactory50On_Landscape UIKBRenderFactory50On_Portrait UIKBRenderFactoryEmoji_iPad ' +
      'UIKBRenderFactoryEmoji_iPad_Split UIKBRenderFactoryEmoji_iPhone UIKBRenderFactoryHWR_Landscape ' +
      'UIKBRenderFactoryLayoutSegment UIKBRenderFactoryNumberPad UIKBRenderFactoryNumberPadLandscape ' +
      'UIKBRenderFactory_Car UIKBRenderFactory_CarLinear UIKBRenderFactory_Emoji ' +
      'UIKBRenderFactoryiPad UIKBRenderFactoryiPad10Key_Landscape UIKBRenderFactoryiPad10Key_Portrait ' +
      'UIKBRenderFactoryiPadHWR_Portrait UIKBRenderFactoryiPadLandscape ' +
      'UIKBRenderFactoryiPadPasscode UIKBRenderFactoryiPadSplit UIKBRenderFactoryiPhone ' +
      'UIKBRenderFactoryiPhoneChocoLandscape UIKBRenderFactoryiPhoneLandscape ' +
      'UIKBRenderFactoryiPhonePasscode UIKBRenderFactoryiPhoneTruffle ' +
      'UIKBRenderGeometry UIKBRenderTraits UIKBRenderer UIKBScreenTraits UIKBShadowEffect UIKBShape ' +
      'UIKBSplitImageView UIKBSplitKeyplaneGenerator UIKBSplitRow UIKBSplitTraits UIKBTextEditingTraits ' +
      'UIKBThemedView UIKBTree UIKBTreeLocalizedKeylistEnumerator UIKBTree_Compile UIKeyCommand ' +
      'UIKeyboard UIKeyboardAutocorrectionController UIKeyboardAutomatic UIKeyboardBackdropCornerView ' +
      'UIKeyboardButton UIKeyboardCache UIKeyboardCandidateBar UIKeyboardCandidateBarCell ' +
      'UIKeyboardCandidateBarDelegate UIKeyboardCandidateBarLayout UIKeyboardCandidateBarLayoutAttributes ' +
      'UIKeyboardCandidateBarSegmentControl UIKeyboardCandidateBarShadow ' +
      'UIKeyboardCandidateGrid UIKeyboardCandidateGridCell UIKeyboardCandidateGridCellAttributes ' +
      'UIKeyboardCandidateGridCollectionViewController ' +
      'UIKeyboardCandidateGridHeader UIKeyboardCandidateGridHeaderContainerView ' +
      'UIKeyboardCandidateGridLayoutDelegate UIKeyboardCandidateGridOverlayBackgroundView ' +
      'UIKeyboardCandidateGridSecondaryCandidatesLayout UIKeyboardCandidateInlineFloatingToggleButton ' +
      'UIKeyboardCandidateList UIKeyboardCandidateListDelegate UIKeyboardCandidateLogButton ' +
      'UIKeyboardCandidatePocketShadow UIKeyboardCandidateRowViewController ' +
      'UIKeyboardCandidateSortControl UIKeyboardCandidateSplitKeyboardToggleButton ' +
      'UIKeyboardCandidateUnsplitKeyboardToggleButton UIKeyboardCandidateUtilities ' +
      'UIKeyboardCandidateViewInline UIKeyboardCandidateView_Floating UIKeyboardCandidateView_iPad ' +
      'UIKeyboardCandidateView_iPhone_Bar UIKeyboardCandidateView_iPhone_Floating UIKeyboardCornerView ' +
      'UIKeyboardDicationBackgroundGradientView UIKeyboardDictationMenu ' +
      'UIKeyboardEmoji UIKeyboardEmojiCategory UIKeyboardEmojiCategoryBar UIKeyboardEmojiCategoryBar_iPad ' +
      'UIKeyboardEmojiCategoryControl UIKeyboardEmojiCategoryController UIKeyboardEmojiCategoryPicker ' +
      'UIKeyboardEmojiDefaultsController UIKeyboardEmojiGraphics UIKeyboardEmojiImageView ' +
      'UIKeyboardEmojiInputController UIKeyboardEmojiPage UIKeyboardEmojiPicker ' +
      'UIKeyboardEmojiPickerCharacterCell UIKeyboardEmojiPressIndicationDelegate ' +
      'UIKeyboardEmojiSplit UIKeyboardEmojiSplitCategoryCell UIKeyboardEmojiSplitCategoryPicker ' +
      'UIKeyboardEmojiSplitCharacterPicker UIKeyboardEmojiView UIKeyboardExtensionInputMode ' +
      'UIKeyboardImpl UIKeyboardImplGeometryDelegate UIKeyboardInput UIKeyboardInputManagerClient ' +
      'UIKeyboardInputManagerMux UIKeyboardInputMode UIKeyboardInputModeController ' +
      'UIKeyboardKeyplaneTransitionDelegate UIKeyboardLayout UIKeyboardLayoutCursor ' +
      'UIKeyboardLayoutStar UIKeyboardMenuView UIKeyboardPredictionBarGrabber UIKeyboardPredictionCell ' +
      'UIKeyboardPredictiveSettings UIKeyboardPreferencesController UIKeyboardRotationState ' +
      'UIKeyboardSliceSet UIKeyboardSliceStore UIKeyboardSliceTransitionView UIKeyboardSplitControlMenu ' +
      'UIKeyboardSquishTransition UIKeyboardSuggestedInputMode UIKeyboardSyntheticTouch ' +
      'UIKeyboardTaskQueue UIKeyboardTouchInfo UIKeyboardTransitionSlice UIKeyboardWipeGestureRecognizer ' +
      'UILabel UILayoutContainerView UILayoutSupport UILexicon UILexiconEntry UILocalNotification ' +
      'UILongPressGestureRecognizer UIMailActivity UIManagedDocument UIMarkupTextPrintFormatter ' +
      'UIMenuItem UIMessageActivity UIModalView UIModalViewDelegate UIMoreListCellLayoutManager ' +
      'UIMoreNavigationController UIMorphingLabel UIMorphingLabelGlyphSet UIMotionEffect ' +
      'UIMotionEvent UIMoveEvent UIMovieClosedCaptionData UIMoviePlayerController UIMovieScrubber ' +
      'UIMovieScrubberDelegate UIMovieScrubberEditingView UIMovieScrubberThumbnailView ' +
      'UIMovieScrubberTrackView UIMovieScrubberTrackViewDataSource UIMovieScrubberTrackViewDelegate ' +
      'UIMultiColumnsNavigationTransitionView UIMutableApplicationSceneClientSettings ' +
      'UIMutableIndexPath UIMutableStatusBarStyleRequest UIMutableUserNotificationAction ' +
      'UIMutableUserNotificationCategory UINavBarPrompt UINavigationBar UINavigationBarDelegate ' +
      'UINavigationController UINavigationControllerDelegate UINavigationItem UINavigationItemButtonView ' +
      'UINavigationTransitionView UINib UINibCoderValue UINibDecoder UINibEncoder UINibKeyValuePair ' +
      'UINibStringIDTable UINotesTableView UIObjectRestoration UIOldSliderButton UIOldSliderControl ' +
      'UIOnePartImageView UIOpenURLAction UIPDFAnnotation UIPDFAnnotationController ' +
      'UIPDFAnnotationParserDelegate UIPDFAnnotationView UIPDFCircleAnnotation UIPDFDocument ' +
      'UIPDFHighlightAnnotation UIPDFHighlightAnnotationView UIPDFHighlightLayer UIPDFHighlighter ' +
      'UIPDFLinkAnnotation UIPDFMagnifierController UIPDFMarkupAnnotation UIPDFPage ' +
      'UIPDFPageContentLayer UIPDFPageContentTiledLayer UIPDFPageImageCache UIPDFPageRenderJob ' +
      'UIPDFPageView UIPDFPageViewDelegate UIPDFParagraphWidget UIPDFParserDelegate ' +
      'UIPDFPopupAnnotation UIPDFPopupAnnotationView UIPDFSearchHighlightsController UIPDFSelection ' +
      'UIPDFSelectionLayer UIPDFSelectionWidget UIPDFSquareAnnotation UIPDFSquareOrCircleAnnotation ' +
      'UIPDFStrikeOutAnnotation UIPDFTextAnnotation UIPDFTextRangeWidget UIPDFUnderlineAnnotation ' +
      'UIPDFViewManager UIPDFViewTouchHandler UIPadAppearanceContainer UIPageControl UIPageController ' +
      'UIPageControllerScrollView UIPageViewController UIPageViewControllerDataSource ' +
      'UIPanGestureRecognizer UIPanGestureVelocitySample UIPasscodeField UIPasteboard ' +
      'UIPeripheralHost UIPeripheralHostState UIPeripheralHostView UIPhoneAppearanceContainer ' +
      'UIPhysicalButtonsEvent UIPhysicalKeyboardEvent UIPickerColumnView UIPickerContentView ' +
      'UIPickerTableViewCell UIPickerTableViewContainerDelegate UIPickerTableViewTitledCell ' +
      'UIPickerView UIPickerViewDataSource UIPickerViewDelegate UIPickerViewScrollTesting ' +
      'UIPlaceholderColor UIPopoverBackgroundView UIPopoverBackgroundViewMethods UIPopoverButton ' +
      'UIPopoverControllerDelegate UIPopoverControllerDelegatePrivate UIPopoverPresentationController ' +
      'UIPresentationController UIPrintActivity UIPrintActivityWrapperNavigationController ' +
      'UIPrintInfo UIPrintInfoRequest UIPrintInteractionController UIPrintInteractionControllerInternals ' +
      'UIPrintPanelTableViewController UIPrintPanelViewController UIPrintPanelWindow UIPrintPaper ' +
      'UIPrintRangePickerView UIPrintRangeViewController UIPrintStatusJobTableViewCell ' +
      'UIPrintStatusTableViewCell UIPrintStatusTableViewController UIPrintStatusViewController UIPrinter ' +
      'UIPrinterBrowserViewController UIPrinterInternals UIPrinterPickerController ' +
      'UIPrinterPickerViewController UIPrinterPickerWindow UIPrinterSearchingView ' +
      'UIPrinterSetupConnectingView UIPrinterSetupDisplayPINView UIPrinterSetupDisplayPINViewController ' +
      'UIPrinterSetupPINView UIPrinterSetupPINViewController UIPrinterTableViewCell UIPrintingMessageView ' +
      'UIPrintingProgressViewController UIProgressHUD UIProgressIndicator UIProgressView UIProxyObject ' +
      'UIReferenceLibraryViewController UIRefreshControl UIRemoteApplication UIRemoteControlEvent ' +
      'UIRemoteKeyboardWindow UIRemoteSheetInfo UIRemoveControl UIRemoveControlMinusButton ' +
      'UIRemoveControlTextButton UIRemoveControlTextFrameAnimation UIResignActiveAction UIResizableView ' +
      'UIResumeActiveAction UIRivenFactory UIRotationAnimation UIRotationGestureRecognizer ' +
      'UIRowMoveUpdateItem UIRuntimeAccessibilityConfiguration UIRuntimeConnection ' +
      'UIRuntimeOutletCollectionConnection UIRuntimeOutletConnection UISaveToCameraRollActivity UIScreen ' +
      'UIScreenMode UIScrollAnimation UIScrollTestParameters UIScrollView ' +
      'UIScrollViewDelayedTouchesBeganGestureRecognizer UIScrollViewDelegate ' +
      'UIScrollViewPagingSwipeGestureRecognizer UIScrollViewPanGestureRecognizer ' +
      'UIScrollViewScrollAnimation UIScrubberControl UIScrubberTimeView UISearchBar UISearchBarBackground ' +
      'UISearchBarTextField UISearchBarTextFieldLabel UISearchController UISearchControllerDelegate ' +
      'UISearchDisplayControllerContainerView UISearchDisplayDelegate UISearchField ' +
      'UISearchResultsUpdating UISectionRowData UISegment UISegmentLabel UISegmentedControl ' +
      'UISelectionGrabberDot UISelectionTapRecognizer UIShadowView UISimpleSelectionRect ' +
      'UISiriTaskAction UISlider UISliderContent UISnapBehavior UISnapshotModalViewController ' +
      'UISocialActivity UISoftwareDimmingWindow UISplitViewController UISplitViewControllerDelegate ' +
      'UISpringBoardHostedView UIStateRestorationKeyedUnarchiver UIStateRestoring UIStatusBar ' +
      'UIStatusBarAdornmentWindow UIStatusBarAirplaneModeItemView UIStatusBarAnimationParameters ' +
      'UIStatusBarBackgroundView UIStatusBarBatteryItemView UIStatusBarBatteryPercentItemView ' +
      'UIStatusBarBluetoothItemView UIStatusBarButtonActionItemView UIStatusBarComposedData ' +
      'UIStatusBarDataNetworkItemView UIStatusBarDoubleHeightItemView ' +
      'UIStatusBarExternalInCallForegroundStyleAttributes ' +
      'UIStatusBarExternalStyleAttributes UIStatusBarExternalTranslucentForegroundStyleAttributes ' +
      'UIStatusBarForegroundView UIStatusBarHideAnimationParameters UIStatusBarHomeItemView ' +
      'UIStatusBarItem UIStatusBarItemView UIStatusBarLayoutManager UIStatusBarLocationItemView ' +
      'UIStatusBarLockScreenStyleAttributes UIStatusBarMapsCompassItemView UIStatusBarNavigationItemView ' +
      'UIStatusBarNewUIForegroundStyleAttributes UIStatusBarNewUIStyleAttributes ' +
      'UIStatusBarOrientationAnimationParameters UIStatusBarPublisher UIStatusBarQuietModeItemView ' +
      'UIStatusBarServer UIStatusBarServerClient UIStatusBarServerThread UIStatusBarServiceItemView ' +
      'UIStatusBarStateObserver UIStatusBarStyleAnimationParameters UIStatusBarStyleAttributes ' +
      'UIStatusBarTetheringItemView UIStatusBarThermalColorItemView UIStatusBarTimeItemView ' +
      'UIStatusBarViewController UIStatusBarWindow UIStepper UIStoryboard UIStoryboardEmbedSegue ' +
      'UIStoryboardModalSegue UIStoryboardModalSegueTemplate UIStoryboardPopoverPresentationSegue ' +
      'UIStoryboardPopoverSegue UIStoryboardPopoverSegueTemplate UIStoryboardPresentationSegue ' +
      'UIStoryboardPushSegue UIStoryboardPushSegueTemplate UIStoryboardReplaceSegue ' +
      'UIStoryboardScene UIStoryboardSegue UIStoryboardSegueTemplate UIStoryboardShowSegue ' +
      'UIStoryboardUnwindSegueTemplate UISubTest UISwappableImageView UISwipeGestureRecognizer UISwitch ' +
      'UITabBar UITabBarButton UITabBarButtonLabel UITabBarController UITabBarControllerDelegate ' +
      'UITabBarDelegate UITabBarItem UITabBarItemProxy UITabBarSelectionIndicatorView ' +
      'UITableView UITableViewBackgroundView UITableViewCell UITableViewCellContentMirror ' +
      'UITableViewCellDeleteConfirmationControl_Legacy UITableViewCellDeleteConfirmationGestureRecognizer ' +
      'UITableViewCellDetailDisclosureView UITableViewCellEditControl UITableViewCellEditingData ' +
      'UITableViewCellLayoutManagerEditable1 UITableViewCellLayoutManagerSubtitle ' +
      'UITableViewCellLayoutManagerValue2 UITableViewCellReorderControl UITableViewCellSelectedBackground ' +
      'UITableViewController UITableViewControllerKeyboardSupport UITableViewCountView ' +
      'UITableViewDataSourcePrivate UITableViewDelegate UITableViewHeaderFooterView UITableViewIndex ' +
      'UITableViewIndexOverlaySelectionView UITableViewIndexOverlaySelectionViewCollectionViewCell ' +
      'UITableViewIndexOverlaySelectionViewCollectionViewLayoutAttributes UITableViewLabel UITableViewRow ' +
      'UITableViewRowData UITableViewSection UITableViewSubviewReusing UITableViewUpdateGap ' +
      'UITableViewWrapperView UITapAndAHalfRecognizer UITapGestureRecognizer UITapRecognizer ' +
      'UITestTwoAppearanceContainer UITextAttachmentView UITextAutoscrolling UITextChecker ' +
      'UITextContentView UITextContentViewDelegate UITextDocumentProxy UITextEffectsOrdering ' +
      'UITextEffectsWindowHosted UITextEffectsWindowNoAbove UITextField UITextFieldAtomBackgroundView ' +
      'UITextFieldBorderView UITextFieldCenteredLabel UITextFieldDelegate UITextFieldLabel ' +
      'UITextInput UITextInputAdditions UITextInputArrowKeyHistory UITextInputController ' +
      'UITextInputDelegate UITextInputMode UITextInputPrivate UITextInputStringTokenizer ' +
      'UITextInputTraits UITextInputTraits_Private UITextInput_Internal UITextInteractionAssistant ' +
      'UITextLinkInteraction UITextMagnifier UITextMagnifierCaret UITextMagnifierCaretRenderer ' +
      'UITextMagnifierRangedRenderer UITextMagnifierRenderer UITextMagnifierTimeWeightedPoint ' +
      'UITextPositionImpl UITextRange UITextRangeImpl UITextRangeView UITextRenderingAttributes ' +
      'UITextReplacementGenerator UITextReplacementGeneratorForChineseTransliteration ' +
      'UITextReplacementGeneratorForDictation UITextSelection UITextSelectionRect UITextSelectionRectImpl ' +
      'UITextTapRecognizer UITextView UITextViewDelegate UITextViewPrintFormatter UITexturedButton ' +
      'UIThreePartImageView UIToolbar UIToolbarButton UIToolbarButtonBadge UIToolbarTextButton UITouch ' +
      'UITouchTapInfo UITouchesEvent UITraitCollection UITraitEnvironment UITransformAnimation ' +
      'UITwoSidedAlertController UIUpdateItem UIUserNotificationAction UIUserNotificationActionSettings ' +
      'UIUserNotificationSettings UIVariableDelayLoupeGesture UIVibrancyEffect UIVideoEditorController ' +
      'UIVideoEditorControllerDelegatePrivate UIView UIViewAnimation UIViewAnimationBlockDelegate ' +
      'UIViewAnimationState UIViewController UIViewControllerAction UIViewControllerAnimatedTransitioning ' +
      'UIViewControllerAnimatorTransitioning UIViewControllerBuiltinTransitionViewAnimator ' +
      'UIViewControllerContextTransitioningEx UIViewControllerInteractiveTransitioning ' +
      'UIViewControllerPresenting UIViewControllerRestoration UIViewControllerTransitionCoordinator ' +
      'UIViewControllerTransitioningDelegate UIViewControllerWrapperView UIViewHeartbeat ' +
      'UIViewPrintFormatter UIViewSpringAnimationState UIVirtualResizeAction UIVirtualResizeResetAction ' +
      'UIVisualEffectView UIWKAutocorrectionContext UIWKAutocorrectionRects UIWKInteractionViewProtocol ' +
      'UIWKSelectionView UIWKTextInteractionAssistant UIWebBrowserFindOnPageHighlighter UIWebBrowserView ' +
      'UIWebClipIcon UIWebClipLinkTag UIWebDateTimePopoverViewController UIWebDefaultDateTimePicker ' +
      'UIWebDocumentView UIWebDocumentViewPrintFormatter UIWebDragDotView UIWebElementAction ' +
      'UIWebFileUploadPanel UIWebFileUploadPanelDelegate UIWebFindOnPageHighlighter UIWebFormAccessory ' +
      'UIWebFormControl UIWebFormDateTimePeripheral UIWebFormDelegate UIWebFormRotatingAccessoryPopover ' +
      'UIWebGeolocationPolicyDecider UIWebLayer UIWebOptGroup UIWebOverflowContentView ' +
      'UIWebOverflowScrollListener UIWebOverflowScrollView UIWebOverflowScrollViewInfo UIWebPDFLabelView ' +
      'UIWebPDFSearchController UIWebPDFSearchOperation UIWebPDFSearchOperationDelegate ' +
      'UIWebPDFView UIWebPDFViewDelegate UIWebPDFViewHandler UIWebPDFViewHandlerDelegate ' +
      'UIWebPaginationInfo UIWebPlaybackTargetPicker UIWebPlugInView UIWebRotatingAlertController ' +
      'UIWebRotatingNodePopoverDelegate UIWebScrollView UIWebSelectMultiplePicker UIWebSelectPopover ' +
      'UIWebSelectTableViewController UIWebSelectedItemPrivate UIWebSelection UIWebSelectionAssistant ' +
      'UIWebSelectionGraph UIWebSelectionHandle UIWebSelectionNode UIWebSelectionOutline ' +
      'UIWebTextRangeView UIWebTiledView UIWebTouchEventsGestureRecognizer ' +
      'UIWebURLAction UIWebView UIWebViewDelegate UIWebViewInternal UIWebViewPrintFormatter ' +
      'UIWheelEvent UIWindow UIWindowController UIWindowLayer UIZoomViewController ' +

      // OS X Classes & Protocols
      'AVAnimator AVAppendableData AVAssetAudioExtractor AVAssetCollection AVAssetCollectionFactory ' +
      'AVAssetCollectionInspectorLoader AVAssetCollectionInternal AVAtomicCancelationToken ' +
      'AVAudioAmplitudeExtractionSessionHelper AVAudioExtractor AVAudioLevelIndicatorView ' +
      'AVAudioTrimControlsViewController AVAudioUnitComponent AVAudioUnitComponentManager AVAudioView ' +
      'AVB17221ACMPInterface AVB17221ACMPMessage AVB17221ACMPPendingResponse AVB17221AECPAEMMessage ' +
      'AVB17221AECPAddressAccessMessage AVB17221AECPAddressAccessTLV AVB17221AECPClient ' +
      'AVB17221AECPMessage AVB17221AECPPendingResponse AVB17221AECPVendorMessage AVB17221AEMAVBInterface ' +
      'AVB17221AEMAudioCluster AVB17221AEMAudioMap AVB17221AEMAudioMapping AVB17221AEMAudioUnit ' +
      'AVB17221AEMBodePlotEntry AVB17221AEMClockDomain AVB17221AEMClockDomainedModelObject ' +
      'AVB17221AEMCluster AVB17221AEMConfiguration AVB17221AEMControl AVB17221AEMControlBlock ' +
      'AVB17221AEMControlDescriptorBodePlotValue AVB17221AEMControlDescriptorGPTPValue ' +
      'AVB17221AEMControlDescriptorSMPTETimeValue AVB17221AEMControlDescriptorSamplingRateValue ' +
      'AVB17221AEMControlDescriptorSelectorValue AVB17221AEMControlDescriptorUTF8Value ' +
      'AVB17221AEMControlDescriptorVendorValue AVB17221AEMDescriptorCount AVB17221AEMEntity ' +
      'AVB17221AEMExternalPort AVB17221AEMInternalPort AVB17221AEMJack AVB17221AEMLMMMapping ' +
      'AVB17221AEMLocalRemoteMapping AVB17221AEMLocale AVB17221AEMLocalizedStringReference ' +
      'AVB17221AEMMatrix AVB17221AEMMatrixSignal AVB17221AEMMemoryObject AVB17221AEMMemoryObjectData ' +
      'AVB17221AEMModelObject AVB17221AEMNamedClockDomainedModelObject AVB17221AEMNamedModelObject ' +
      'AVB17221AEMPort AVB17221AEMSamplingRate AVB17221AEMSamplingRateRange AVB17221AEMSensorCluster ' +
      'AVB17221AEMSensorMap AVB17221AEMSensorMapping AVB17221AEMSensorUnit AVB17221AEMSignal ' +
      'AVB17221AEMSignalCombinerMapping AVB17221AEMSignalDemultiplexer ' +
      'AVB17221AEMSignalMultiplexer AVB17221AEMSignalMultiplexerMapping AVB17221AEMSignalPort ' +
      'AVB17221AEMSignalSplitter AVB17221AEMSignalSplitterMapping AVB17221AEMSignalTranscoder ' +
      'AVB17221AEMStreamFormat AVB17221AEMStreamPort AVB17221AEMStrings AVB17221AEMUnit ' +
      'AVB17221AEMVideoCluster AVB17221AEMVideoFormatSpecific AVB17221AEMVideoMap AVB17221AEMVideoMapping ' +
      'AVB17221AEMVideoUnit AVB17221Entity AVB17221EntityDiscovery AVB17221EntityDiscoveryDelegate ' +
      'AVB1722ControlInterface AVB1722MAAP AVB8021ASTimeSync AVB8021ASTimeSyncClient AVBAVDECCController ' +
      'AVBAVDECCEntityInterface AVBAudioDriverManager AVBCABox AVBCACoreAudio AVBCAObject ' +
      'AVBEthernetClient AVBEthernetInterface AVBIIDCIOSurfaceOutputStream AVBIIDCIOSurfaceStream ' +
      'AVBInterface AVBInterfaceDelegate AVBMAAPMACAddress AVBMACAddress AVBMRP AVBMSRPDomain ' +
      'AVBMSRPListener AVBMSRPListenerClient AVBMSRPTalker AVBMSRPTalkerAttribute AVBMSRPTalkerClient ' +
      'AVBMutableBool AVBNetworkClient AVBNub AVBOutputStream AVBStream AVBTimeSyncClockManager ' +
      'AVBVirtualStream AVBVirtualStreamConnection AVCamera AVCameraDisabledView AVCameraList ' +
      'AVCaptureAudioFileOutput AVCaptureAudioFileOutputInternal AVCaptureAudioPreviewOutput ' +
      'AVCaptureAudioSettings AVCaptureController AVCaptureControllerDelegate ' +
      'AVCaptureControlsViewController AVCaptureDALDevice AVCaptureDeviceInputSource ' +
      'AVCaptureDeviceInputSourceItem AVCaptureDeviceSelectionController ' +
      'AVCaptureFileOutputRecordingOperationDescriptor AVCaptureHALDevice AVCaptureOperationDescriptor ' +
      'AVCaptureOperationDescriptorQueueItem AVCaptureOutputSettings AVCaptureQualityItem ' +
      'AVCaptureScreenInputInternal AVCaptureSessionInternalState AVCaptureStillImageOutputUtils ' +
      'AVCaptureVideoDataOutputCallbackData AVCaptureVideoSettings AVCaptureView AVChapterMenuController ' +
      'AVChapterPopUpButtonMenuTextFieldCell AVChapterPopupButonMenuItemView ' +
      'AVCircularProgressIndicator AVConferencePreviewServer AVControlsContainerViewController ' +
      'AVControlsViewController AVDataPool AVEstimatedDurationFormatter AVExportProgressWindowController ' +
      'AVExportSessionHelperDelegate AVFloatingCaptureControlsViewController ' +
      'AVFloatingTrimControlsViewController AVFoundationExportSession AVFragmentedMovie ' +
      'AVFragmentedMovieMinder AVFragmentedMovieMinderInternal AVFragmentedMovieTrack ' +
      'AVImageQueue AVInlineCaptureControlsViewController ' +
      'AVInlinePlaybackControlsViewController AVInlineTrimControlsViewController ' +
      'AVIsFiniteValueTransformer AVIsRewindingValueTransformer AVMediaDataStorage ' +
      'AVMinimalPlaybackControlsViewController AVMovableView AVMovie AVMovieInternal AVMovieTrack ' +
      'AVMutableMovie AVMutableMovieInternal AVMutableMovieTrack AVMutableMovieTrackInternal ' +
      'AVPlayPauseShuttleControllerView AVPlayerControlsViewController AVPooledData AVPopUpButton ' +
      'AVProgressEstimator AVReadOnlyRangeOfAppendableData AVResolvedDecompressionSettings ' +
      'AVSampleBufferAudioRendererInternal AVSampleBufferGenerator AVSampleBufferGeneratorInternal ' +
      'AVSampleBufferRenderSynchronizerInternal AVSampleBufferRequest AVSampleBufferRequestInternal ' +
      'AVSampleCursorInternal AVScrollSliderView AVScrubberCell AVScrubberValueTransformer ' +
      'AVShareController AVShuttleSliderValueTransformer AVSlowMotionSlider AVSlowMotionSliderDelegate ' +
      'AVSlowMotionSliderTrackView AVStackView AVStatusOverlayView AVStreamDataAsset ' +
      'AVStreamDataAssetTrackInspector AVStreamDataInspectionOnlyAsset AVStreamDataParser ' +
      'AVSystemControllerUI AVTimeIndicatorPopover AVTimeIndicatorPopoverContentViewController ' +
      'AVTrimControlsAudioTrackView AVTrimControlsTrackView AVTrimControlsTrackViewController ' +
      'AVTrimControlsViewController AVTrimControlsViewControllerDelegate AVTrimDimmerView ' +
      'AVTrimIndicatorFocusRingView AVTrimIndicatorView AVTrimSelectionEndFocusRingView ' +
      'AVTrimSelectionView AVTrimTracksView AVTrimView AVTrimViewDelegate AVVolumeButton ' +
      'AVVolumeImageValueTransformer CAAdditionalCertInfo CAAnimationDelegateBlockHelper ' +
      'CABasicConstraintsExtension CABoxLayoutManager CACertInfo CAConstraint CAConstraintLayoutManager ' +
      'CAGraphView CAIdentityName CAKeyPairAttributes CAKeyUsageExtension CALAbstractEntity ' +
      'CALActionValue CALAddress CALApplePropertiesFilter CALAttachment CALBag CALBridgevCal ' +
      'CALCancelFilter CALChainedFilter CALChangeTracker CALClassificationTypeValue CALColorModel ' +
      'CALDAVPublishOperation CALDailyRecurrence CALDate CALDateOnly CALDateTime CALDetachmentDelegate ' +
      'CALDuplicateFilter CALDuration CALDurationLocalization CALEntity CALEntityChangeTracker ' +
      'CALEntityWithAlarmSearchElement CALExportFilter CALFTPPublishOperation CALFilter ' +
      'CALFreeBusy CALFreeBusyTime CALIdentityManager CALIndexSearchElement CALInvitationPropertiesFilter ' +
      'CALJournalOccurrence CALKeychain CALMethodValue CALMonthlyRecurrence CALMultipleOccurrencesView ' +
      'CALOccurrableEntity CALOccurrence CALOccurrencesCache CALParticipationStatusParameter ' +
      'CALPredefinedValue CALProperty CALPropertyFilter CALPropertyMultiValue CALPropertyQuery ' +
      'CALPublishFilter CALPublishOperation CALPublishOperationDelegate CALPublisher CALQuery CALRecurID ' +
      'CALRedBlackTree CALRemotePublisher CALRequestFilter CALRequestStatus CALRoleParameter ' +
      'CALScheduleStatusParameter CALScriptUtils CALSearchElement CALSourceFactory CALStatusTypeValue ' +
      'CALSubscribeFilter CALTimeRange CALTimeRangeSubstractionResult CALTodo CALTransparencyTypeValue ' +
      'CALURLPublisher CALView CALWeekDayNumber CALWeekDuration CALWeeklyRecurrence CALYearlyRecurrence ' +
      'CALvCALParseState CALvCALParsedLine CALvCALRecurrence CAOpenGLLayer CAPannerView CAPluginLayer ' +
      'CARemoteLayerClient CARemoteLayerServer CAScrollLayoutManager CASubjectAltNameExtension ' +
      'CASurroundPannerView CATableLayoutManager CAWrappedLayoutManager CIASG66Percent CIASG75Percent ' +
      'CIAccordianFoldTransition CIAddBlendMode CIAdjustBrightnessContrast CIAdvancedHeightFieldFromMask ' +
      'CIAdvancedShadedMaterial CIAlphaAddBlendMode CIAreaAverage CIAreaCummulativeHistogramAlpha ' +
      'CIAreaMaximumAlpha CIAreaMinimum CIAreaMinimumAlpha CIAutoBlackPointWhitePoint CIAxialBlur ' +
      'CIBackground CIBehindBlendMode CIBilateralConvolution CIBilateralFilter CIBitmapContext ' +
      'CIBoxBlur CIBurnBlendMode CICGContext CICGContextImpl CICGSFilter CICLCallbackData CICLContext ' +
      'CICMYKHalftone CICVImageProviderDelegate CICheapBlur CICheapMorphology CICheatBlur CIChopLines ' +
      'CICircularWrap CIColorWheelGenerator CIColumnAverage CIComicEffect CIContextDebugImpl ' +
      'CIConvolution CIConvolution7X7 CIConvolutionNxN CICorrectHighlights CICropAlphaFilter ' +
      'CICubicGradientGenerator CICubicGradientGenerator2 CICubicGradientGenerator3 ' +
      'CICubicGradientGenerator5 CIDarkerBlendMode CIDepthOfField CIDesaturateGamutMapping CIDiffusion ' +
      'CIDisplaceWithNoise CIDisplacementDistortion CIDistanceFieldFromMask CIDroste CIEdgeWork CIEdges ' +
      'CIEnvironment CIFilterConstructor CIFilterGenerator CIFilterGeneratorCIFilter ' +
      'CIFilterListProvider CIFilterPlugIn CIFilterShape CIFlat3X3ChromaBlur CIFlat5X5ChromaBlur ' +
      'CIGamutAlarm CIGamutClamp CIGamutRollOff CIGaussianChromaBlurMinimum CIGelBlendMode CIGlassLozenge ' +
      'CIHardMixBlendMode CIHeightFieldFromConstraints CIHeightFieldFromMask CIHexagonalPixellate ' +
      'CIHistogram CIHistogramDisplay CIImageAccumulator CIKaleidoscope CIKuwaharaNagaoFilter ' +
      'CILineOverlay CILinearBumpField CILinearGradientWithCubicEndsGenerator CILinearLightBlendMode ' +
      'CILuminanceGamutMapping CILuminescentPremultiplyBlendMode CIMakeShadowMask CIMaterialMap ' +
      'CIMaterialMapLightGenerator CIMaterialMapReflectionMapLightGenerator CIMedianFilter CIMixOver ' +
      'CIMorphologyGradient CIMorphologyLaplacian CIMorphologyMax CIMorphologyMin CIMotionBlur ' +
      'CIMutableVector CINoiseReduction CIOpTile CIOpacity CIOpenGLContext CIOpenGLContextImpl ' +
      'CIPageCurlWithShadowTransition CIParallelogramTile CIPartialAreaHistogram CIPatternFill ' +
      'CIPixelZoom CIPlugIn CIPlugInStandardFilter CIPointillize CIProSharpenEdges ' +
      'CIPromise CIPromiseInvocation CIPseudoMedian CIRAWFilterImpl CIRAWGamutMapping CIRAWSharpen ' +
      'CIRecordingContext CIRecordingContextImpl CIRectangleGenerator CIRectsGenerator ' +
      'CIRenderProviderDelegate CIRippleTransition CIRotatingCubeTransition CIRowAverage ' +
      'CISampler CIScharrMagnitude CIShadedMaterial CIShapedWaterRipple CISilhouetteAlphaBlendMode ' +
      'CISmallChromaMorphologyMinimum CISmallCircularChromaBlur CISmallSharpenEdgesAndChromaBlur ' +
      'CISphereGradient CISpotColor CISpotLight CIStencilAlphaBlendMode CIStencilLumaBlendMode ' +
      'CIStripGenerator CISunbeamsGenerator CISymmetricNearestNeighbor CITagWithColorSpace ' +
      'CITorusLensDistortion CITransferImage CITriangleTile CIUIStripesGenerator CIVarianceConvolution ' +
      'CIVideoNoiseFilter CIVividLightBlendMode CIWhitePoint CIWindowedSincConvolution CIYCbCrSurface ' +
      'NSAEDescriptorTranslator NSATSUStyleObject NSAccessibility NSAccessibilityAXUIElementWrapper ' +
      'NSAccessibilityButton NSAccessibilityCheckBox NSAccessibilityChildPanel ' +
      'NSAccessibilityContainsTransientUI NSAccessibilityElement NSAccessibilityGroup ' +
      'NSAccessibilityImageMockUIElement NSAccessibilityIndexedMockUIElement NSAccessibilityLayoutArea ' +
      'NSAccessibilityList NSAccessibilityMenuExtrasMenuBar NSAccessibilityMockStatusBarItem ' +
      'NSAccessibilityNavigableStaticText NSAccessibilityNotifier NSAccessibilityOutline ' +
      'NSAccessibilityProgressIndicator NSAccessibilityProxy NSAccessibilityRadioButton ' +
      'NSAccessibilityReparentingCellProxy NSAccessibilityReparentingProxy NSAccessibilityRow ' +
      'NSAccessibilityScrollerPart NSAccessibilitySegment NSAccessibilitySlider ' +
      'NSAccessibilityStaticText NSAccessibilityStepper NSAccessibilityStepperArrowButton ' +
      'NSAccessibilityTable NSAccessibilityTableHeaderCellProxy NSAccessibilityTextLink ' +
      'NSAccessibilityWindowGrowBox NSAccessoryWindow NSAccessoryWindowContentView NSActionBinder ' +
      'NSAdminMultiAuthenticator NSAdminPrefAuthenticator NSAdminPreference NSAffineTransformView NSAlert ' +
      'NSAnimatablePropertyContainer NSAnimation NSAnimationContext NSAnimationDelegate NSAnimationHelper ' +
      'NSAnimationManager NSAppearance NSAppearanceAuxiliary NSAppearanceCustomization ' +
      'NSAppleEventHandling NSAppleEventManager NSAppleScript NSApplication NSApplicationBundlePresenter ' +
      'NSApplicationExtensionItem NSApplicationExtensionSession NSAquaAppearance ' +
      'NSAquaUserInterfaceTheme NSArrayController NSArrayDetailBinder NSAttachmentTextStorage ' +
      'NSAutounbinderBinding NSAutounbinderObservance NSBackdropView NSBackgroundActivityScheduler ' +
      'NSBezierPath NSBinder NSBitmapGraphicsContext NSBitmapImageRep NSBlockedOn15995015Layer NSBox ' +
      'NSBrowser NSBrowserBinder NSBrowserCell NSBrowserColumnViewController NSBrowserDelegate ' +
      'NSBuiltinAppearance NSBuiltinCharacterSet NSButton NSButtonCell NSButtonImageSource ' +
      'NSButtonTextFieldCell NSCALayerGraphicsContext NSCFPrefManager NSCFRunLoopObserver ' +
      'NSCGImageRep NSCGImageSnapshotRep NSCGLDrawable NSCGLSurface NSCGSContext NSCGSWindowBackdrop ' +
      'NSCMYKSliders NSCTFont NSCTFontCollection NSCTFontDescriptor NSCachedColorSpaceColor ' +
      'NSCachedDeviceWhiteColor NSCachedImageRep NSCachedRGBColor NSCachedTableCellView ' +
      'NSCachedWhiteColor NSCalibratedRGBColor NSCalibratedWhiteColor NSCallbackDictionary ' +
      'NSCandidateTextField NSCarbonMenuImpl NSCarbonMenuWindow NSCarbonWindow NSCarbonWindowContentView ' +
      'NSCatalogColor NSCell NSCellAuxiliary NSCellMouseTrackingInfo NSCellUndoManager NSCellView ' +
      'NSClassDescription NSClassSwapper NSClickGestureRecognizer NSClipView NSCloneCommand ' +
      'NSCoercionHandler NSCollectionView NSCollectionViewBinder NSCollectionViewChildProxy ' +
      'NSColorList NSColorPanel NSColorPanelColorWell NSColorPanelResizeDimple NSColorPanelTextController ' +
      'NSColorPicker NSColorPickerColorSpacePopUp NSColorPickerCrayon NSColorPickerCrayonView ' +
      'NSColorPickerGridViewController NSColorPickerGridViewDelegate NSColorPickerImagePopupButton ' +
      'NSColorPickerMatrixViewDelegate NSColorPickerPageableNameList ' +
      'NSColorPickerSelectingTextField NSColorPickerSliders NSColorPickerUser NSColorPickerUserView ' +
      'NSColorPickerWheelView NSColorPickingCustom NSColorPickingDefault NSColorPopoverController ' +
      'NSColorScaleSlider NSColorScaleSliderCell NSColorSpace NSColorSpaceColor NSColorSpaceSliders ' +
      'NSColorSwatchCell NSColorWell NSComboBox NSComboBoxButtonCell NSComboBoxCell ' +
      'NSComboBoxDataSource NSComboBoxDelegate NSComboBoxWindow NSComboTableView NSCompositeAppearance ' +
      'NSConcreteGlyphGenerator NSConcretePrintOperation NSConcurrentEventMonitor NSConnectionDelegate ' +
      'NSContentLayoutView NSControl NSControlAuxiliary NSControlTextEditingDelegate NSController ' +
      'NSCoreDataXPCMessage NSCoreDragManager NSCoreUIImageRep NSCorrectionPanel NSCorrectionShadowView ' +
      'NSCorrectionTextFieldContainer NSCorrectionTextView NSCorrectionTypedTextHighlightView ' +
      'NSCrayon NSCrayonRow NSCreateCommand NSCreateCommandMoreIVars NSCrossfadeView NSCustomImageRep ' +
      'NSCustomReleaseData NSCustomResource NSCustomView NSDataDetectionIndicatorMenu ' +
      'NSDatePicker NSDatePickerCell NSDeferredSheet NSDefinitionExternalModule NSDeleteCommand ' +
      'NSDeviceCMYKColor NSDeviceRGBColor NSDeviceWhiteColor NSDictationManager NSDictionaryController ' +
      'NSDictionaryEntry NSDimingView NSDisclosureButtonCell NSDisplayFontBinder NSDisplayLink ' +
      'NSDisplayPatternTitleBinder NSDistributedLock NSDocFormatReader NSDocFormatWriter NSDockFrameView ' +
      'NSDockMiniViewController NSDockMiniViewWindow NSDockTile NSDocument ' +
      'NSDocumentController NSDocumentControllerMoreIVars NSDocumentControllerOpening ' +
      'NSDocumentControllerSubMenuDelegate NSDocumentDragButton NSDocumentErrorRecoveryAttempter ' +
      'NSDocumentNonModalAlertViewController NSDocumentRevisionsAuxiliaryWindow ' +
      'NSDocumentRevisionsController NSDocumentRevisionsNonLocalVersionPlaceholderView ' +
      'NSDocumentRevisionsRevertProgressOverlayWindow NSDocumentRevisionsStackItem ' +
      'NSDocumentRevisionsView NSDocumentRevisionsWindow NSDocumentRevisionsWindowTransformAnimation ' +
      'NSDocumentTextAttachmentScrollView NSDocumentTitlebarPopoverViewController ' +
      'NSDoubleClickActionBinder NSDownloadController NSDragDestination NSDragEventTracker ' +
      'NSDraggingDestinationView NSDraggingImageComponent NSDraggingInfo NSDraggingInfoPrivate ' +
      'NSDraggingSession NSDraggingSource NSDrawer NSDrawerBinder NSDrawerFrame NSDrawerWindow ' +
      'NSEPSImageRep NSEagerTrackingCell NSEditableBinder NSEditorBinder NSEvent NSEventAuxiliary ' +
      'NSEventTracker NSExceptionAlertController NSExceptionHandler NSExceptionHandlingRecursiveLock ' +
      'NSExitFullScreenStatusItem NSExtraMICData NSExtraMIData NSFTPURLHandle NSFacetImageRep ' +
      'NSFakeServiceResponder NSFileDragSource NSFileLocationComponent NSFileLocator ' +
      'NSFilePromiseDragSource NSFileSpecifier NSFileURLHandle NSFilterServicesPasteboard NSFindIndicator ' +
      'NSFindPattern NSFindPatternAttachment NSFindPatternAttachmentCell NSFindPatternComboBox ' +
      'NSFindPatternFieldEditor NSFindPatternManager NSFindPatternSearchField NSFindPatternTextField ' +
      'NSFloatRange NSFocusStack NSFocusState NSFontCollection NSFontDescriptor NSFontEffectsBox ' +
      'NSFontOptions NSFontOptionsColorWell NSFontOptionsPreviewBox NSFontPanel NSFontPanelColorWell ' +
      'NSFontSmoothingButton NSForm NSFormCell NSFrameView NSGarbageCollector NSGenerationToken ' +
      'NSGestureRecognizerTarget NSGetCommand NSGlyphStorage NSGradient NSGradientColor ' +
      'NSGraphicCell NSGraphicsContext NSGrayFrame NSGreySliders NSHIObject NSHSBSliders NSHTTPURLHandle ' +
      'NSHelpManager NSHyphenator NSIBHelpConnector NSIBObjectData NSIBObjectDataAuxilary ' +
      'NSIBUserDefinedRuntimeAttributesConnector NSIconRefBitmapImageRep NSIconRefImageRep NSIconView ' +
      'NSIconViewDelegate NSIgnoreMisspelledWords NSImage NSImageCacheView NSImageCell ' +
      'NSImageKitViewTextAttachmentCell NSImageKitViewTextAttachmentCellHelper ' +
      'NSImageRep NSImageTextFieldCell NSImageURLReferencingRepProvider NSImageView ' +
      'NSImageViewTextAttachmentCell NSIndexSpecifier NSInputClientWrapper NSInputContext NSInputManager ' +
      'NSInputServerMouseTracker NSInputServiceProvider NSInspectorBar NSInspectorBarItem ' +
      'NSJavaConfiguration NSJavaVirtualMachine NSKeyBinding NSKeyBindingAtom NSKeyBindingManager ' +
      'NSKeySetBinding NSKeyboardShortcut NSKeyedArchiverWrapper NSKeyedUnarchiverDelegate ' +
      'NSKitPanelController NSLSNotificationHelper NSLSNotificationHelperCountedSet ' +
      'NSLabelView NSLabelViewCell NSLanguageContext NSLayerCentricRemoteView ' +
      'NSLayerContentsFacet NSLayerContentsProvider NSLayerDrawDelegate NSLazyBrowserCell ' +
      'NSLegacyScrollerImp NSLevelIndicator NSLevelIndicatorCell NSLineHeightFormatter ' +
      'NSLocalInputServer NSLocalTitlebarRenamingWindow NSLocalWindowWrappingRemoteWindow NSLogicalTest ' +
      'NSMachPortDelegate NSMagnificationGestureRecognizer NSMagnifierWindowContentView ' +
      'NSMagnifierWindowContentViewLoupe NSMatrix NSMatrixDelegate NSMediaLibraryBrowserController NSMenu ' +
      'NSMenuDelegate NSMenuHighlightView NSMenuItem NSMenuItemCell NSMenuItemHighlightColor ' +
      'NSMenuKEUniquer NSMenuTemplate NSMenuTrackingInfo NSMetalPatternColor NSMiddleSpecifier ' +
      'NSMoveCommand NSMoveHelper NSMovePanel NSMovie NSMovieViewTextAttachmentCell NSMultiProxyDelegate ' +
      'NSMultiplePagePDFImageViewTextAttachmentCell NSMultipleSelectionBinder NSMutableAffineTransform ' +
      'NSMutableFontDescriptor NSMutableRangeArray NSNameSpecifier NSNavAdvancedSearchController ' +
      'NSNavBannerView NSNavBox NSNavBrowser NSNavBrowserCell NSNavBrowserDelegate NSNavBrowserTableView ' +
      'NSNavCell NSNavDataSource NSNavDisplayNameFilePropertySortDescriptor NSNavExpansionButtonCell ' +
      'NSNavFBENode NSNavFBENodePreviewHelper NSNavFBENodeTask NSNavFBEQueryChildNode NSNavFBEQueryNode ' +
      'NSNavFileBrowser NSNavFileListDelegate NSNavFilePropertySortDescriptor NSNavFileSizeFormatter ' +
      'NSNavFinderViewFileBrowser NSNavFlippedView NSNavHistoryState NSNavIconView NSNavIconViewCell ' +
      'NSNavLayoutView NSNavMatrix NSNavMediaBrowserDelegate NSNavMediaNode NSNavNameFieldFormatter ' +
      'NSNavNewFolderController NSNavNode NSNavNodePopUpButton NSNavNodePreviewController ' +
      'NSNavNodeSharedServerController NSNavNodeTask NSNavODSAskToUseTask NSNavOutlineCell ' +
      'NSNavOutlineDelegate NSNavOutlineHeaderCell NSNavOutlineView NSNavOutlineViewDelegate ' +
      'NSNavProgressErrorViewController NSNavProgressStatusViewController NSNavProgressWindow ' +
      'NSNavRuleEditor NSNavScopeButton NSNavScopeButtonCell NSNavScopeView NSNavSegmentSwitchControl ' +
      'NSNavSharedServerController NSNavSidebarController NSNavSimpleButtonCell ' +
      'NSNavSortingContext NSNavSplitView NSNavSplitViewController NSNavView NSNavViewController ' +
      'NSNextStepFrame NSNib NSNibAXAttributeConnector NSNibAXRelationshipConnector NSNibBindingConnector ' +
      'NSNibControlConnector NSNibExternalObjectPlaceholder NSNibOutletCollectionConnector ' +
      'NSODContext NSODNode NSODQuery NSODRecord NSODSession NSOVShowMoreButtonCell NSOVTrackingAreaOwner ' +
      'NSObjectController NSObjectDetailBinder NSObjectParameterBinder NSObjectSpecifier NSObsoleteBitmap ' +
      'NSOpenDocumentReader NSOpenDocumentWriter NSOpenGLContext NSOpenGLContext_QuartzComposer ' +
      'NSOpenGLPixelBuffer NSOpenGLPixelFormat NSOpenGLView NSOpenPanel NSOpenSavePanelDelegate ' +
      'NSOutlineColumnMockGroup NSOutlineMockDisclosureTriangle NSOutlineRow NSOutlineView ' +
      'NSOutlineViewDataSource NSOutlineViewDelegate NSOutlineViewInlineOutlineCell ' +
      'NSOverdrawableTileLayer NSOverlayScrollerImp NSPDFImageRep NSPDFInfo NSPDFPanel ' +
      'NSPICTImageRep NSPPDParse NSPSMatrix NSPageController NSPageLayout NSPageableTableView ' +
      'NSPanel NSPanelController NSPasteboard NSPasteboardFilter NSPasteboardItem ' +
      'NSPasteboardReading NSPasteboardWriting NSPathCell NSPathComponentCell NSPathControl ' +
      'NSPathControlDelegate NSPathControlItem NSPatternColor NSPersistentDocument NSPersistentUIBucket ' +
      'NSPersistentUIEncodedReference NSPersistentUIManager NSPersistentUIPreservedStateDirectory ' +
      'NSPersistentUIRestorer NSPersistentUISecureURLHerder NSPersistentUIUnarchiver ' +
      'NSPersistentUIWindowRestoration NSPersistentUIWindowSnapshotter NSPoofView NSPopUpButton ' +
      'NSPopover NSPopoverBinder NSPopoverColorWell NSPopoverDelegate NSPopoverFrame NSPopoverToolbar ' +
      'NSPositionalSpecifier NSPositionalSpecifierMoreIVars NSPredicateEditor ' +
      'NSPrefAnimatedView NSPrefCrossFadeView NSPrefCrossFadeWindow NSPrefCrossFadeWindowMoveHelper ' +
      'NSPrefPaneBundle NSPrefPaneSearchCenter NSPrefPaneUtils NSPrefPanesCenter NSPrefRemoteViewService ' +
      'NSPreference NSPreferencePane NSPreferences NSPreferencesModule NSPressGestureRecognizer ' +
      'NSPrintGraphicsContextAdvancing NSPrintInfo NSPrintInfoAdditionalIVars NSPrintInfoDictionaryProxy ' +
      'NSPrintOperationPrintEventRetrofitInfo NSPrintPanel NSPrintPanelAccessorizing ' +
      'NSPrintPreviewController NSPrintPreviewGraphicsContext NSPrintSpoolingGraphicsContext ' +
      'NSPrinter NSPrivateAutomatorFrameworkClassForFindingBundle NSProgressIndicator ' +
      'NSProgressPanel NSProgressiveLayer NSPropertySpecifier NSProxyPreferencePane NSQuitCommand ' +
      'NSRandomSpecifier NSRangeSpecifier NSRecentDocumentInfo NSRectSet NSRefreshRequest NSRegion ' +
      'NSRegularOverlayScrollerImp NSRelativeSpecifier NSRemoteAccessoryView NSRemoteInputServer ' +
      'NSRemoteOpenPanel NSRemotePanel NSRemotePanelOrderingContext NSRemoteResponder ' +
      'NSRemoteSavePanel NSRemoteSavePanelOrderingContext NSRemoteServiceConnection ' +
      'NSRemoteServiceEndpoint NSRemoteServiceMessage NSRemoteServiceReply NSRemoteServiceRequest ' +
      'NSRemoteTitlebarRenamingWindowController NSRemoteView NSRemoteViewBase NSRemoteViewDelegate ' +
      'NSRemoteWindowController NSRendezvousAppModalSessionController NSRendezvousChildPanelController ' +
      'NSRendezvousChildWindowDelegate NSRendezvousCorrectionPanelController ' +
      'NSRendezvousSheetController NSRendezvousWindowController NSRendezvousWindowDelegate NSResponder ' +
      'NSRotationGestureRecognizer NSRowClipView NSRuleEditor NSRuleEditorButton NSRuleEditorButtonCell ' +
      'NSRuleEditorLocalizer NSRuleEditorPopupButton NSRuleEditorPopupButtonCell NSRuleEditorTextField ' +
      'NSRuleEditorViewSlice NSRuleEditorViewSliceDropSeparator NSRuleEditorViewSliceRow NSRulerLabelCell ' +
      'NSRulerMarkerPanel NSRulerMarkerView NSRulerView NSRulerViewAccessibilityPanelController ' +
      'NSRunningApplication NSSavePanel NSSavePanelAlertStyleContentView NSSavePanelNameFieldCell ' +
      'NSScreenBackgroundView NSScreenDisplayLink NSScriptArgumentDescription ' +
      'NSScriptClassDescription NSScriptClassDescriptionMoreIVars NSScriptCoercionHandler NSScriptCommand ' +
      'NSScriptCommandDescription NSScriptCommandDescriptionMoreIVars NSScriptCommandMoreIVars ' +
      'NSScriptDeclaredRecordTypeDescription NSScriptEnumerationDescription NSScriptEnumeratorDescription ' +
      'NSScriptExecutionContextMoreIVars NSScriptFakeObjectTypeDescription NSScriptListTypeDescription ' +
      'NSScriptObjectTypeDescription NSScriptPropertiesRecordTypeDescription NSScriptPropertyDescription ' +
      'NSScriptRecordTypeDescription NSScriptSDEFElement NSScriptSDEFParser NSScriptSuiteDescription ' +
      'NSScriptSynonymDescription NSScriptToManyRelationshipDescription ' +
      'NSScriptTypeDescription NSScriptValueTypeDescription NSScriptWhoseTest ' +
      'NSScrollAnimationHelper NSScrollView NSScrollViewMirrorView NSScroller NSScrollerImp ' +
      'NSScrollerImpPair NSScrollerImpPairDelegate NSScrollingBehavior NSScrollingBehaviorConcurrentVBL ' +
      'NSScrollingConcurrentData NSSearchButtonCellProxy NSSearchField NSSearchFieldBinder ' +
      'NSSecureStringWrapper NSSecureTextField NSSecureTextFieldCell NSSecureTextStorage NSSecureTextView ' +
      'NSSegmentedCell NSSegmentedControl NSSegmentedControlBinder NSSeguePerforming NSSelectionArray ' +
      'NSSelfDestructingRemoteViewDelegate NSSerializer NSServiceListener NSServiceListenerProto ' +
      'NSServiceMasterProto NSServiceViewControllerUnifyingProxy NSServicesMenuHandler ' +
      'NSServicesRolloverView NSServicesRolloverViewDelegate NSSetCommand NSShadowSurface ' +
      'NSSharingService NSSharingServiceDelegate NSSharingServicePicker NSSharingServicePickerDelegate ' +
      'NSSharingServiceReserved NSSharingService_Subsystem NSSidebarImage NSSidebarImageCell NSSlider ' +
      'NSSliderViewRequiredMethods NSSmallLegacyScrollerImp NSSmallOverlayScrollerImp ' +
      'NSSnapshotContextSignature NSSocketPortNameServer NSSortedArray NSSound ' +
      'NSSourceListBackgroundView NSSpecifierTest NSSpeechRecognizer NSSpeechRecognizerVars ' +
      'NSSpeechSynthesizerDelegate NSSpeechSynthesizerVars NSSpellChecker NSSpellServer ' +
      'NSSpellingLanguageTableView NSSpellingPanel NSSpellingSubstring NSSplitView NSSplitViewController ' +
      'NSSplitViewDividerDragParams NSSplitViewItem NSSplitViewSplitter NSSplitViewVariables NSStackView ' +
      'NSStackViewSpacer NSStatusBar NSStatusBarButton NSStatusBarButtonCell NSStatusBarWindow ' +
      'NSStatusItemReplicant NSStatusItemReplicantView NSStepper NSStepperCell NSStopTouchingMeBox ' +
      'NSStoryboardEmbedSegue NSStoryboardEmbedSegueTemplate NSStoryboardModalSegue ' +
      'NSStoryboardPopoverSegue NSStoryboardPopoverSegueTemplate NSStoryboardScene NSStoryboardSegue ' +
      'NSStoryboardSegueTemplate NSStoryboardSheetSegue NSStoryboardSheetSegueTemplate ' +
      'NSStoryboardShowSegueTemplate NSStringMeasurementCacheKey NSStringROMKeySet_MacOSX ' +
      'NSSubrectImageRep NSSurface NSSuspensionRemoteViewDelegate NSSuspensionWindow NSSystemInfoPanel ' +
      'NSTabView NSTabViewBinder NSTabViewButtons NSTabViewController NSTabViewDelegate NSTabViewItem ' +
      'NSTableAssociation NSTableBackgroundView NSTableBinder NSTableCellView NSTableCellViewAux ' +
      'NSTableColumnBinder NSTableColumnDragInfo NSTableDragInfo NSTableHeaderCell NSTableHeaderCellView ' +
      'NSTableHeaderView NSTableOptions NSTableOptionsPanel NSTableOverlappingColumnClipHelper NSTableRow ' +
      'NSTableRowData NSTableRowView NSTableUpdateData NSTableUpdateDeleteItem NSTableUpdateInsertItem ' +
      'NSTableUpdateMoveItem NSTableView NSTableViewCellElement NSTableViewCellMockElement ' +
      'NSTableViewChildCellProxy NSTableViewDataSource NSTableViewDelegate NSTableViewDropFeedbackData ' +
      'NSTableViewListCellMockElement NSTableViewListCellProxy NSTargetAnimationInfo ' +
      'NSText NSTextAttachmentEditor NSTextAttachmentImageView NSTextCheckingOperation NSTextColorBinder ' +
      'NSTextDragInfo NSTextField NSTextFieldCell NSTextFieldDelegate NSTextFinder ' +
      'NSTextFinderBarContainer NSTextFinderBarSearchField NSTextFinderBarSearchFieldCell ' +
      'NSTextFinderBarTextFieldCell NSTextFinderBarView NSTextFinderIndicatorManager NSTextInput ' +
      'NSTextInputClient_IncrementalSearch NSTextInputContext NSTextLayer NSTextPlaceholder ' +
      'NSTextReplacementNode NSTextRulerOptions NSTextStorageCharacterArray NSTextStorageDelegate ' +
      'NSTextTemplate NSTextValueBinder NSTextView NSTextViewAttachmentEditCompletionAnimation ' +
      'NSTextViewCompletionTableView NSTextViewCompletionWindow NSTextViewDelegate NSTextViewIvars ' +
      'NSTextViewTemplate NSTexturedComboBox NSTexturedComboBoxCell NSThemeAutosaveButton ' +
      'NSThemeDocumentButton NSThemeDocumentButtonCell NSThemeDocumentButtonPopUpMenuProxy NSThemeFrame ' +
      'NSThemeFrameTitleTextField NSTileLayer NSTileScrollingInfoLayer NSTitleBinder NSTitleTextFieldCell ' +
      'NSTitlebarContainerView NSTitlebarFloatingWindow NSTitlebarRenamingAuxiliaryWindow ' +
      'NSTitlebarThemeFrame NSTitlebarView NSTitlebarViewController NSTitledFrame NSTokenAttachment ' +
      'NSTokenField NSTokenFieldCell NSTokenFieldDelegate NSTokenTextView NSToolTip NSToolTipManager ' +
      'NSToolTipStringDrawingLayoutManager NSToolbar NSToolbarButton NSToolbarClippedItemsIndicator ' +
      'NSToolbarDelegate NSToolbarFlexibleSpaceItem NSToolbarFullScreenContentView ' +
      'NSToolbarFullScreenWindow NSToolbarFullScreenWindowManager NSToolbarGroupView NSToolbarItem ' +
      'NSToolbarItemGroup NSToolbarItemViewer NSToolbarPoofAnimator NSToolbarSeparatorItem ' +
      'NSToolbarSpaceItem NSToolbarView NSTouch NSTouchDevice NSTracer NSTrackableOutlineView ' +
      'NSTrackingAreaReservedIVars NSTrackingInfoImpl NSTreeController NSTreeControllerTreeNode ' +
      'NSTreeNode NSTypeSelectBackgroundView NSTypeSelectPanel NSUIActivityDocumentManager ' +
      'NSUIActivityInfo NSUIActivityManager NSUIActivityProvider NSUIActivityResponderMonitor ' +
      'NSURLConnectionDelegateProxy NSURLConnectionHandle NSURLHandle NSURLHandleClient ' +
      'NSUndoSetAttributes NSUndoTyping NSUniqueIDSpecifier NSUserAppleScriptTask NSUserAutomatorTask ' +
      'NSUserInterfaceItemIdentification NSUserInterfaceTheme NSUserInterfaceValidations ' +
      'NSUserNotificationAction NSUserNotificationCenter NSUserNotificationCenterDelegate ' +
      'NSUserScriptTaskRunner NSUserScriptTaskServiceDelegate NSUserUnixTask NSVBAccessoryWindow ' +
      'NSVBNamedFault NSVBOpenPanel NSVBSavePanel NSVBXPCConnectionClient NSVB_ProxyObject ' +
      'NSVB_TargetedProxy NSVB_View NSVB_ViewAnimationAttributes NSVB_ViewServiceBehaviorProxy ' +
      'NSVB_ViewServiceFencingController NSVB_ViewServiceImplicitAnimationDecodingProxy ' +
      'NSVB_ViewServiceReplyAwaitingTrampoline NSVB_ViewServiceReplyControlProxy ' +
      'NSVB_ViewServiceXPCMachSendRight NSVB_Window NSValidatedUserInterfaceItem NSValueBinder ' +
      'NSVibrantLightAppearance NSView NSViewAnimation NSViewBridge NSViewBridgeObject ' +
      'NSViewBuffer NSViewController NSViewControllerModalWindowTransition ' +
      'NSViewControllerPresentationAnimator NSViewControllerPresentationAnimatorObject ' +
      'NSViewControllerSheetTransition NSViewControllerUtilityWindowTransition ' +
      'NSViewDynamicToolTipManager NSViewHierarchyLock NSViewMultiClipDrawingHelper NSViewRemoteBridge ' +
      'NSViewServiceAccessoryView NSViewServiceApplication NSViewServiceBridge ' +
      'NSViewServiceMarshal NSViewService_PKSubsystem NSViewStateBinder NSViewTemplate ' +
      'NSViewTextAttachmentCellHelper NSViewWindowBackingStoreBuffer NSVisualEffectView ' +
      'NSWhoseSpecifier NSWhoseTest NSWindow NSWindowAnchorInfo NSWindowAuxiliary NSWindowBatchOrdering ' +
      'NSWindowCentricRemoteView NSWindowController NSWindowControllerMoreIVars NSWindowDelegate ' +
      'NSWindowGraphicsContext NSWindowMenuItem NSWindowRestoration NSWindowScaleAnimation ' +
      'NSWindowTitleBinder NSWordMLReader NSWordMLWriter NSWorkspace NSWorkspaceApplicationKVOHelper ' +
      'NSWrapperCellView NSXMLAttributeDeclaration NSXMLChildren NSXMLContext NSXMLDTD NSXMLDTDNode ' +
      'NSXMLDocumentMap NSXMLDocumentMapNode NSXMLElement NSXMLElementDeclarationContent ' +
      'NSXMLFidelityNode NSXMLNSArrayTransformerName NSXMLNSDataTransformerName ' +
      'NSXMLNSNumberTransformerName NSXMLNSURLTransformerName NSXMLNamedFidelityNode NSXMLNamedNode ' +
      'NSXMLObjectStore NSXMLObjectStore2 NSXMLObjectStoreCacheNode2 NSXMLSAXParser NSXMLSchemaType ' +
      'NSXMLTreeReader NSXPCRow NSXPCServerProtocol NSXPCSharedListener NSXPCSharedListenerDelegate ' +
      'NSXPCSharedListenerManagerDelegate NSXPCStore NSXPCStoreConnection NSXPCStoreConnectionInfo ' +
      'NSXPCStoreNotificationObserver NSXPCStoreServer NSXPCStoreServerConnectionContext ' +
      'NSXPCStoreServerRequestHandlingPolicy NSZipFileArchive NSZipTextReader ' +

      // Other Builtins
      'BOOL NSFetchedResultsChangeType UIInterfaceOrientation dispatch_async dispatch_once ' +
      'dispatch_queue_t dispatch_sync '
  };
  var LEXEMES = /[a-zA-Z@][a-zA-Z0-9_]*/;
  var CLASS_KEYWORDS = '@interface @class @protocol @implementation';
  return {
    aliases: ['m', 'mm', 'objc', 'obj-c'],
    keywords: OBJC_KEYWORDS, lexemes: LEXEMES,
    illegal: '</',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        variants: [
          {
            begin: '@"', end: '"',
            illegal: '\\n',
            contains: [hljs.BACKSLASH_ESCAPE]
          },
          {
            begin: '\'', end: '[^\\\\]\'',
            illegal: '[^\\\\][^\']'
          }
        ]
      },
      {
        className: 'preprocessor',
        begin: '#',
        end: '$',
        contains: [
          {
            className: 'title',
            variants: [
              { begin: '\"', end: '\"' },
              { begin: '<', end: '>' }
            ]
          }
        ]
      },
      {
        className: 'class',
        begin: '(' + CLASS_KEYWORDS.split(' ').join('|') + ')\\b', end: '({|$)', excludeEnd: true,
        keywords: CLASS_KEYWORDS, lexemes: LEXEMES,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE
        ]
      },
      {
        className: 'variable',
        begin: '\\.'+hljs.UNDERSCORE_IDENT_RE,
        relevance: 0
      }
    ]
  };
}
