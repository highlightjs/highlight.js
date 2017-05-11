/*
Language: C#
Author: Jason Diamond <jason@diamond.name>
Category: common
*/

function(hljs) {
  var SYSTEM = {
    classes: 'AbandonedMutexException AccessedThroughPropertyAttribute AccessRule AccessRule AccessViolationException AceEnumerator Action Action Action Action Action Action Action Action Action ActivatedClientTypeEntry ActivatedServiceTypeEntry ActivationArguments ActivationContext Activator Aes AggregateException AllMembershipCondition AllowPartiallyTrustedCallersAttribute AllowReversePInvokeCallsAttribute AmbiguousMatchException AppContext AppDomain AppDomainInitializer AppDomainManager AppDomainSetup AppDomainUnloadedException ApplicationActivator ApplicationDirectory ApplicationDirectoryMembershipCondition ApplicationException ApplicationId ApplicationIdentity ApplicationSecurityInfo ApplicationSecurityManager ApplicationTrust ApplicationTrustCollection ApplicationTrustEnumerator ArgIterator ArgumentException ArgumentNullException ArgumentOutOfRangeException ArithmeticException Array ArrayList ArraySegment ArrayTypeMismatchException ArrayWithOffset ASCIIEncoding Assembly AssemblyAlgorithmIdAttribute AssemblyBuilder AssemblyCompanyAttribute AssemblyConfigurationAttribute AssemblyCopyrightAttribute AssemblyCultureAttribute AssemblyDefaultAliasAttribute AssemblyDelaySignAttribute AssemblyDescriptionAttribute AssemblyFileVersionAttribute AssemblyFlagsAttribute AssemblyHash AssemblyInformationalVersionAttribute AssemblyKeyFileAttribute AssemblyKeyNameAttribute AssemblyLoadEventArgs AssemblyLoadEventHandler AssemblyMetadataAttribute AssemblyName AssemblyNameProxy AssemblyProductAttribute AssemblySignatureKeyAttribute AssemblyTargetedPatchBandAttribute AssemblyTitleAttribute AssemblyTrademarkAttribute AssemblyVersionAttribute AsymmetricAlgorithm AsymmetricKeyExchangeDeformatter AsymmetricKeyExchangeFormatter AsymmetricSignatureDeformatter AsymmetricSignatureFormatter AsyncCallback AsyncFlowControl AsyncLocal AsyncLocalValueChangedArgs AsyncResult AsyncStateMachineAttribute AsyncTaskMethodBuilder AsyncTaskMethodBuilder AsyncVoidMethodBuilder Attribute AttributeUsageAttribute AuditRule AuditRule AuthorizationRule AuthorizationRuleCollection AutomationProxyAttribute AutoResetEvent BadImageFormatException BaseChannelObjectWithProperties BaseChannelSinkWithProperties BaseChannelWithProperties BestFitMappingAttribute BinaryFormatter BinaryReader BinaryWriter BIND_OPTS BIND_OPTS Binder BINDPTR BINDPTR BitArray BitConverter Boolean BStrWrapper Buffer BufferedStream Byte Calendar CallContext CallConvCdecl CallConvFastcall CallConvStdcall CallConvThiscall CallerFilePathAttribute CallerLineNumberAttribute CallerMemberNameAttribute CancellationToken CancellationTokenRegistration CancellationTokenSource CannotUnloadAppDomainException CaseInsensitiveComparer CaseInsensitiveHashCodeProvider ChannelDataStore ChannelServices Char CharEnumerator CharUnicodeInfo ChineseLunisolarCalendar Claim ClaimsIdentity ClaimsPrincipal ClaimTypes ClaimValueTypes ClassInterfaceAttribute ClientChannelSinkStack ClientSponsor CLSCompliantAttribute CoClassAttribute CodeAccessPermission CodeAccessSecurityAttribute CodeConnectAccess CodeGroup Collection CollectionBase ComAliasNameAttribute ComCompatibleVersionAttribute ComConversionLossAttribute ComDefaultInterfaceAttribute ComEventInterfaceAttribute ComEventsHelper COMException ComImportAttribute CommonAce CommonAcl CommonObjectSecurity CommonSecurityDescriptor CompareInfo Comparer Comparer Comparison CompatibilitySwitch CompilationRelaxationsAttribute CompilerGeneratedAttribute CompilerGlobalScopeAttribute CompilerMarshalOverride ComponentGuaranteesAttribute CompoundAce CompressedStack ComRegisterFunctionAttribute ComSourceInterfacesAttribute ComUnregisterFunctionAttribute ComVisibleAttribute ConcurrentDictionary ConcurrentExclusiveSchedulerPair ConcurrentQueue ConcurrentStack ConditionalAttribute ConditionalWeakTable ConfiguredTaskAwaitable ConfiguredTaskAwaitable CONNECTDATA CONNECTDATA Console ConsoleCancelEventArgs ConsoleCancelEventHandler ConsoleKeyInfo ConstructionCall ConstructionResponse ConstructorBuilder ConstructorInfo Context ContextAttribute ContextBoundObject ContextCallback ContextMarshalException ContextProperty ContextStaticAttribute Contract ContractAbbreviatorAttribute ContractArgumentValidatorAttribute ContractClassAttribute ContractClassForAttribute ContractFailedEventArgs ContractHelper ContractHelper ContractInvariantMethodAttribute ContractOptionAttribute ContractPublicPropertyNameAttribute ContractReferenceAssemblyAttribute ContractRuntimeIgnoredAttribute ContractVerificationAttribute Convert Converter CountdownEvent CriticalFinalizerObject CriticalHandle CriticalHandleMinusOneIsInvalid CriticalHandleZeroOrMinusOneIsInvalid CrossAppDomainDelegate CrossContextDelegate CryptoAPITransform CryptoConfig CryptographicException CryptographicUnexpectedOperationException CryptoKeyAccessRule CryptoKeyAuditRule CryptoKeySecurity CryptoStream CspKeyContainerInfo CspParameters CultureInfo CultureNotFoundException CurrencyWrapper CustomAce CustomAttributeBuilder CustomAttributeData CustomAttributeExtensions CustomAttributeFormatException CustomAttributeNamedArgument CustomAttributeTypedArgument CustomConstantAttribute DataMisalignedException DateTime DateTimeConstantAttribute DateTimeFormatInfo DateTimeOffset DaylightTime DBNull DebuggableAttribute Debugger DebuggerBrowsableAttribute DebuggerDisplayAttribute DebuggerHiddenAttribute DebuggerNonUserCodeAttribute DebuggerStepperBoundaryAttribute DebuggerStepThroughAttribute DebuggerTypeProxyAttribute DebuggerVisualizerAttribute Decimal DecimalConstantAttribute Decoder DecoderExceptionFallback DecoderExceptionFallbackBuffer DecoderFallback DecoderFallbackBuffer DecoderFallbackException DecoderReplacementFallback DecoderReplacementFallbackBuffer DefaultCharSetAttribute DefaultDependencyAttribute DefaultDllImportSearchPathsAttribute DefaultInterfaceAttribute DefaultMemberAttribute Delegate DependencyAttribute DeriveBytes DES DESCryptoServiceProvider DesignerNamespaceResolveEventArgs Dictionary DictionaryBase DictionaryEntry Directory DirectoryInfo DirectoryNotFoundException DirectoryObjectSecurity DirectorySecurity DisablePrivateReflectionAttribute DiscardableAttribute DiscretionaryAcl DispatchWrapper DispIdAttribute DISPPARAMS DISPPARAMS DivideByZeroException DllImportAttribute DllNotFoundException Double DriveInfo DriveNotFoundException DSA DSACryptoServiceProvider DSAParameters DSASignatureDeformatter DSASignatureFormatter DuplicateWaitObjectException DynamicILInfo DynamicMethod EastAsianLunisolarCalendar ELEMDESC ELEMDESC Encoder EncoderExceptionFallback EncoderExceptionFallbackBuffer EncoderFallback EncoderFallbackBuffer EncoderFallbackException EncoderReplacementFallback EncoderReplacementFallbackBuffer Encoding EncodingInfo EncodingProvider EndOfStreamException EnterpriseServicesHelper EntryPointNotFoundException Enum EnumBuilder Environment EnvironmentPermission EnvironmentPermissionAttribute EqualityComparer ErrorWrapper EventArgs EventAttribute EventBuilder EventCommandEventArgs EventDataAttribute EventFieldAttribute EventHandler EventHandler EventIgnoreAttribute EventInfo EventListener EventRegistrationToken EventRegistrationTokenTable EventSource EventSourceAttribute EventSourceCreatedEventArgs EventSourceException EventSourceOptions EventToken EventWaitHandle EventWaitHandleAccessRule EventWaitHandleAuditRule EventWaitHandleSecurity EventWrittenEventArgs Evidence EvidenceBase EXCEPINFO EXCEPINFO Exception ExceptionDispatchInfo ExceptionHandler ExceptionHandlingClause ExecutionContext ExecutionEngineException ExtensibleClassFactory ExtensionAttribute ExternalException FieldAccessException FieldBuilder FieldInfo FieldOffsetAttribute FieldToken File FileCodeGroup FileDialogPermission FileDialogPermissionAttribute FileInfo FileIOPermission FileIOPermissionAttribute FileLoadException FileNotFoundException FileSecurity FileStream FileSystemAccessRule FileSystemAuditRule FileSystemInfo FileSystemSecurity FILETIME FILETIME FirstChanceExceptionEventArgs FirstMatchCodeGroup FixedAddressValueTypeAttribute FixedBufferAttribute FlagsAttribute FormatException FormattableString FormattableStringFactory Formatter FormatterConverter FormatterServices FromBase64Transform Func Func Func Func Func Func Func Func Func FUNCDESC FUNCDESC GacIdentityPermission GacIdentityPermissionAttribute GacInstalled GacMembershipCondition GC GCHandle GCSettings GenericAce GenericAcl GenericIdentity GenericPrincipal GenericSecurityDescriptor GenericTypeParameterBuilder GregorianCalendar Guid GuidAttribute HandleProcessCorruptedStateExceptionsAttribute HandleRef HasCopySemanticsAttribute Hash HashAlgorithm HashAlgorithmName HashMembershipCondition Hashtable Header HeaderHandler HebrewCalendar HijriCalendar HMAC HMACMD5 HMACRIPEMD160 HMACSHA1 HMACSHA256 HMACSHA384 HMACSHA512 HostExecutionContext HostExecutionContextManager HostProtectionAttribute HostProtectionException HostSecurityManager IdentityNotMappedException IdentityReference IdentityReferenceCollection IDispatchConstantAttribute IDispatchImplAttribute IDLDESC IDLDESC IdnMapping ILGenerator ImportedFromTypeLibAttribute InAttribute IndexerNameAttribute IndexOutOfRangeException InsufficientExecutionStackException InsufficientMemoryException Int16 Int32 Int64 InterfaceImplementedInVersionAttribute InterfaceMapping InterfaceTypeAttribute Interlocked InternalActivationContextHelper InternalApplicationIdentityHelper InternalMessageWrapper InternalRemotingServices InternalRM InternalST InternalsVisibleToAttribute IntPtr IntrospectionExtensions InvalidCastException InvalidComObjectException InvalidFilterCriteriaException InvalidOleVariantTypeException InvalidOperationException InvalidProgramException InvalidTimeZoneException IOCompletionCallback IOException IsBoxed IsByValue IsConst IsCopyConstructed IsExplicitlyDereferenced IsImplicitlyDereferenced IsJitIntrinsic IsLong IsolatedStorage IsolatedStorageException IsolatedStorageFile IsolatedStorageFilePermission IsolatedStorageFilePermissionAttribute IsolatedStorageFileStream IsolatedStoragePermission IsolatedStoragePermissionAttribute IsolatedStorageSecurityState IsPinned IsSignUnspecifiedByte IsUdtReturn IsVolatile IteratorStateMachineAttribute IUnknownConstantAttribute JapaneseCalendar JapaneseLunisolarCalendar JulianCalendar KeyContainerPermission KeyContainerPermissionAccessEntry KeyContainerPermissionAccessEntryCollection KeyContainerPermissionAccessEntryEnumerator KeyContainerPermissionAttribute KeyedCollection KeyedHashAlgorithm KeyNotFoundException KeySizes KeyValuePair KnownAce KoreanCalendar KoreanLunisolarCalendar Label Lazy LazyInitializer LCIDConversionAttribute LifetimeServices List LoaderOptimizationAttribute LocalBuilder LocalDataStoreSlot LocalVariableInfo LockCookie LockRecursionException LogicalCallContext MACTripleDES ManagedToNativeComInteropStubAttribute ManifestResourceInfo ManualResetEvent ManualResetEventSlim Marshal MarshalAsAttribute MarshalByRefObject MarshalDirectiveException MaskGenerationMethod Math MD5 MD5CryptoServiceProvider MemberAccessException MemberFilter MemberInfo MemoryFailPoint MemoryStream MessageSurrogateFilter MethodAccessException MethodBase MethodBody MethodBuilder MethodCall MethodCallMessageWrapper MethodImplAttribute MethodInfo MethodRental MethodResponse MethodReturnMessageWrapper MethodToken Missing MissingFieldException MissingManifestResourceException MissingMemberException MissingMethodException MissingSatelliteAssemblyException Module ModuleBuilder ModuleHandle ModuleResolveEventHandler Monitor MTAThreadAttribute MulticastDelegate MulticastNotSupportedException Mutex MutexAccessRule MutexAuditRule MutexSecurity NamedPermissionSet NamespaceResolveEventArgs NativeCppClassAttribute NativeObjectSecurity NativeOverlapped NetCodeGroup NeutralResourcesLanguageAttribute NonEventAttribute NonSerializedAttribute NotFiniteNumberException NotImplementedException NotSupportedException NTAccount Nullable Nullable NullReferenceException NumberFormatInfo ObfuscateAssemblyAttribute ObfuscationAttribute Object ObjectAccessRule ObjectAce ObjectAuditRule ObjectCreationDelegate ObjectDisposedException ObjectHandle ObjectIDGenerator ObjectManager ObjectSecurity ObjectSecurity ObjRef ObsoleteAttribute OnDeserializedAttribute OnDeserializingAttribute OneWayAttribute OnSerializedAttribute OnSerializingAttribute OpCode OpCodes OperatingSystem OperationCanceledException OptionalAttribute OptionalFieldAttribute OrderablePartitioner OutAttribute OutOfMemoryException OverflowException Overlapped Parallel ParallelLoopResult ParallelLoopState ParallelOptions ParamArrayAttribute PARAMDESC PARAMDESC ParameterBuilder ParameterInfo ParameterizedThreadStart ParameterModifier ParameterToken Partitioner Partitioner PasswordDeriveBytes Path PathTooLongException PermissionRequestEvidence PermissionSet PermissionSetAttribute PersianCalendar PKCS1MaskGenerationMethod PlatformNotSupportedException Pointer PolicyException PolicyLevel PolicyStatement Predicate PrePrepareMethodAttribute PreserveSigAttribute PrimaryInteropAssemblyAttribute PrincipalPermission PrincipalPermissionAttribute PrivilegeNotHeldException ProfileOptimization ProgIdAttribute Progress PropertyBuilder PropertyInfo PropertyToken ProxyAttribute Publisher PublisherIdentityPermission PublisherIdentityPermissionAttribute PublisherMembershipCondition PureAttribute QualifiedAce Queue Random RandomNumberGenerator RankException RawAcl RawSecurityDescriptor RC2 RC2CryptoServiceProvider ReaderWriterLock ReadOnlyArrayAttribute ReadOnlyCollection ReadOnlyCollectionBase ReadOnlyDictionary ReadOnlyPermissionSet RealProxy ReferenceAssemblyAttribute ReflectionContext ReflectionPermission ReflectionPermissionAttribute ReflectionTypeLoadException RegionInfo RegisteredWaitHandle RegistrationServices Registry RegistryAccessRule RegistryAuditRule RegistryKey RegistryPermission RegistryPermissionAttribute RegistrySecurity ReliabilityContractAttribute RemotingConfiguration RemotingException RemotingServices RemotingSurrogateSelector RemotingTimeoutException RequiredAttributeAttribute ResolveEventArgs ResolveEventHandler ResourceConsumptionAttribute ResourceExposureAttribute ResourceManager ResourceReader ResourceSet ResourceWriter ReturnMessage ReturnValueNameAttribute Rfc2898DeriveBytes Rijndael RijndaelManaged RijndaelManagedTransform RIPEMD160 RIPEMD160Managed RNGCryptoServiceProvider RSA RSACryptoServiceProvider RSAEncryptionPadding RSAOAEPKeyExchangeDeformatter RSAOAEPKeyExchangeFormatter RSAParameters RSAPKCS1KeyExchangeDeformatter RSAPKCS1KeyExchangeFormatter RSAPKCS1SignatureDeformatter RSAPKCS1SignatureFormatter RSASignaturePadding RuntimeArgumentHandle RuntimeCompatibilityAttribute RuntimeEnvironment RuntimeFieldHandle RuntimeHelpers RuntimeMethodHandle RuntimeReflectionExtensions RuntimeTypeHandle RuntimeWrappedException SafeAccessTokenHandle SafeArrayRankMismatchException SafeArrayTypeMismatchException SafeBuffer SafeFileHandle SafeHandle SafeHandleMinusOneIsInvalid SafeHandleZeroOrMinusOneIsInvalid SafeRegistryHandle SafeSerializationEventArgs SafeWaitHandle SatelliteContractVersionAttribute SByte ScopelessEnumAttribute SecureString SecurityAttribute SecurityContext SecurityCriticalAttribute SecurityElement SecurityException SecurityIdentifier SecurityManager SecurityPermission SecurityPermissionAttribute SecurityRulesAttribute SecuritySafeCriticalAttribute SecurityState SecurityTransparentAttribute SecurityTreatAsSafeAttribute SEHException SemaphoreFullException SemaphoreSlim SendOrPostCallback SerializableAttribute SerializationBinder SerializationEntry SerializationException SerializationInfo SerializationInfoEnumerator SerializationObjectManager ServerChannelSinkStack ServerException ServerFault SetWin32ContextInIDispatchAttribute SHA1 SHA1CryptoServiceProvider SHA1Managed SHA256 SHA256Managed SHA384 SHA384Managed SHA512 SHA512Managed SignatureDescription SignatureHelper SignatureToken Single SinkProviderData Site SiteIdentityPermission SiteIdentityPermissionAttribute SiteMembershipCondition SoapAnyUri SoapAttribute SoapBase64Binary SoapDate SoapDateTime SoapDay SoapDuration SoapEntities SoapEntity SoapFault SoapFieldAttribute SoapHexBinary SoapId SoapIdref SoapIdrefs SoapInteger SoapLanguage SoapMessage SoapMethodAttribute SoapMonth SoapMonthDay SoapName SoapNcName SoapNegativeInteger SoapNmtoken SoapNmtokens SoapNonNegativeInteger SoapNonPositiveInteger SoapNormalizedString SoapNotation SoapParameterAttribute SoapPositiveInteger SoapQName SoapServices SoapTime SoapToken SoapTypeAttribute SoapYear SoapYearMonth SortedList SortKey SortVersion SpecialNameAttribute SpinLock SpinWait Stack StackFrame StackOverflowException StackTrace StateMachineAttribute STAThreadAttribute STATSTG STATSTG Stream StreamingContext StreamReader StreamWriter String StringBuilder StringComparer StringFreezingAttribute StringInfo StringReader StringToken StringWriter StrongName StrongNameIdentityPermission StrongNameIdentityPermissionAttribute StrongNameKeyPair StrongNameMembershipCondition StrongNamePublicKeyBlob StructLayoutAttribute StructuralComparisons SuppressIldasmAttribute SuppressMessageAttribute SuppressUnmanagedCodeSecurityAttribute SurrogateSelector SymbolToken SymDocumentType SymLanguageType SymLanguageVendor SymmetricAlgorithm SynchronizationAttribute SynchronizationContext SynchronizationLockException SystemAcl SystemException TaiwanCalendar TaiwanLunisolarCalendar TargetedPatchingOptOutAttribute TargetException TargetFrameworkAttribute TargetInvocationException TargetParameterCountException Task Task TaskAwaiter TaskAwaiter TaskCanceledException TaskCompletionSource TaskFactory TaskFactory TaskScheduler TaskSchedulerException TextElementEnumerator TextInfo TextReader TextWriter ThaiBuddhistCalendar Thread ThreadAbortException ThreadInterruptedException ThreadLocal ThreadPool ThreadStart ThreadStartException ThreadStateException ThreadStaticAttribute Timeout TimeoutException Timer TimerCallback TimeSpan TimeZone TimeZoneInfo TimeZoneNotFoundException ToBase64Transform TrackingServices TransportHeaders TripleDES TripleDESCryptoServiceProvider TrustManagerContext Tuple Tuple Tuple Tuple Tuple Tuple Tuple Tuple Tuple Type TypeAccessException TYPEATTR TYPEATTR TypeBuilder TypeDelegator TYPEDESC TYPEDESC TypedReference TypeEntry TypeFilter TypeForwardedFromAttribute TypeForwardedToAttribute TypeIdentifierAttribute TypeInfo TypeInitializationException TYPELIBATTR TYPELIBATTR TypeLibConverter TypeLibFuncAttribute TypeLibImportClassAttribute TypeLibTypeAttribute TypeLibVarAttribute TypeLibVersionAttribute TypeLoadException TypeToken TypeUnloadedException UInt16 UInt32 UInt64 UIntPtr UIPermission UIPermissionAttribute UmAlQuraCalendar UnauthorizedAccessException UnhandledExceptionEventArgs UnhandledExceptionEventHandler UnicodeEncoding UnionCodeGroup UnknownWrapper UnmanagedFunctionPointerAttribute UnmanagedMarshal UnmanagedMemoryAccessor UnmanagedMemoryStream UnobservedTaskExceptionEventArgs UnsafeValueTypeAttribute UnverifiableCodeAttribute Url UrlAttribute UrlIdentityPermission UrlIdentityPermissionAttribute UrlMembershipCondition UTF32Encoding UTF7Encoding UTF8Encoding ValueType VARDESC VARDESC VariantWrapper VerificationException Version VersioningHelper Void Volatile WaitCallback WaitHandle WaitHandleCannotBeOpenedException WaitHandleExtensions WaitOrTimerCallback WeakReference WeakReference WellKnownClientTypeEntry WellKnownServiceTypeEntry WindowsIdentity WindowsImpersonationContext WindowsPrincipal WindowsRuntimeDesignerContext WindowsRuntimeMarshal WindowsRuntimeMetadata WriteOnlyArrayAttribute X509Certificate XmlSyntaxException YieldAwaitable Zone ZoneIdentityPermission ZoneIdentityPermissionAttribute ZoneMembershipCondition ',

    interfaces: 'IActivationFactory IActivator IAppDomainSetup IApplicationTrustManager IAsyncResult IAsyncStateMachine IBindCtx IChannel IChannelDataStore IChannelInfo IChannelReceiver IChannelReceiverHook IChannelSender IChannelSinkBase IClientChannelSink IClientChannelSinkProvider IClientChannelSinkStack IClientFormatterSink IClientFormatterSinkProvider IClientResponseChannelSinkStack ICloneable ICollection ICollection IComparable IComparable IComparer IComparer IConnectionPoint IConnectionPointContainer IConstructionCallMessage IConstructionReturnMessage IContextAttribute IContextProperty IContextPropertyActivator IContributeClientContextSink IContributeDynamicSink IContributeEnvoySink IContributeObjectSink IContributeServerContextSink IConvertible ICriticalNotifyCompletion ICryptoTransform ICspAsymmetricAlgorithm ICustomAdapter ICustomAttributeProvider ICustomFactory ICustomFormatter ICustomMarshaler ICustomQueryInterface IDeserializationCallback IDictionary IDictionary IDictionaryEnumerator IDisposable IDynamicMessageSink IDynamicProperty IEnumConnectionPoints IEnumConnections IEnumerable IEnumerable IEnumerator IEnumerator IEnumMoniker IEnumString IEnumVARIANT IEnvoyInfo IEqualityComparer IEqualityComparer IEquatable IEvidenceFactory IExpando IFieldInfo IFormatProvider IFormattable IFormatter IFormatterConverter IHashCodeProvider IIdentity IIdentityPermissionFactory ILease IList IList ILogicalThreadAffinative IMembershipCondition IMessage IMessageCtrl IMessageSink IMethodCallMessage IMethodMessage IMethodReturnMessage IMoniker INormalizeForIsolatedStorage INotifyCompletion IObjectHandle IObjectReference IObservable IObserver IPermission IPersistFile IPrincipal IProducerConsumerCollection IProgress IReadOnlyCollection IReadOnlyDictionary IReadOnlyList IReflect IReflectableType IRegistrationServices IRemotingFormatter IRemotingTypeInfo IResourceReader IResourceWriter IRunningObjectTable ISafeSerializationData ISecurableChannel ISecurityEncodable ISecurityPolicyEncodable ISerializable ISerializationSurrogate IServerChannelSink IServerChannelSinkProvider IServerChannelSinkStack IServerFormatterSinkProvider IServerResponseChannelSinkStack IServiceProvider ISoapMessage ISoapXsd ISponsor IStackWalk IStream IStructuralComparable IStructuralEquatable ISurrogateSelector ISymbolBinder ISymbolBinder1 ISymbolDocument ISymbolDocumentWriter ISymbolMethod ISymbolNamespace ISymbolReader ISymbolScope ISymbolVariable ISymbolWriter ITrackingHandler ITransportHeaders ITypeComp ITypeInfo ITypeInfo2 ITypeLib ITypeLib2 ITypeLibConverter ITypeLibExporterNameProvider ITypeLibExporterNotifySink ITypeLibImporterNotifySink IUnrestrictedPermission ',

    enums: 'AccessControlActions AccessControlModification AccessControlSections AccessControlType AceFlags AceQualifier AceType ActivatorLevel ApartmentState AppDomainManagerInitializationOptions ApplicationVersionMatch AssemblyBuilderAccess AssemblyContentType AssemblyHashAlgorithm AssemblyNameFlags AssemblyRegistrationFlags AssemblyVersionCompatibility AttributeTargets AuditFlags Base64FormattingOptions BindingFlags CalendarAlgorithmType CalendarWeekRule CALLCONV CALLCONV CallingConvention CallingConventions Cer CharSet CipherMode ClassInterfaceType ComInterfaceType ComMemberType CompareOptions CompilationRelaxations ComponentGuaranteesOptions CompoundAceType Consistency ConsoleColor ConsoleKey ConsoleModifiers ConsoleSpecialKey ContractFailureKind ControlFlags CryptoKeyRights CryptoStreamMode CspProviderFlags CultureTypes CustomErrorsModes CustomQueryInterfaceMode CustomQueryInterfaceResult DateTimeKind DateTimeStyles DayOfWeek DebuggerBrowsableState DESCKIND DESCKIND DigitShapes DllImportSearchPath DriveType EnumerablePartitionerOptions EnvironmentPermissionAccess EnvironmentVariableTarget EventActivityOptions EventAttributes EventChannel EventCommand EventFieldFormat EventFieldTags EventKeywords EventLevel EventManifestOptions EventOpcode EventResetMode EventSourceSettings EventTags EventTask EventWaitHandleRights ExceptionHandlingClauseOptions ExporterEventKind FieldAttributes FileAccess FileAttributes FileDialogPermissionAccess FileIOPermissionAccess FileMode FileOptions FileShare FileSystemRights FlowControl FormatterAssemblyStyle FormatterTypeStyle FromBase64TransformMode FUNCFLAGS FUNCFLAGS FUNCKIND FUNCKIND GCCollectionMode GCHandleType GCLargeObjectHeapCompactionMode GCLatencyMode GCNotificationStatus GenericParameterAttributes GregorianCalendarTypes HostProtectionResource HostSecurityManagerOptions IDispatchImplType IDLFLAG IDLFLAG ImageFileMachine IMPLTYPEFLAGS IMPLTYPEFLAGS ImporterEventKind InheritanceFlags INVOKEKIND INVOKEKIND IsolatedStorageContainment IsolatedStorageScope IsolatedStorageSecurityOptions KeyContainerPermissionFlags KeyNumber LayoutKind LazyThreadSafetyMode LeaseState LIBFLAGS LIBFLAGS LoaderOptimization LoadHint MemberTypes MethodAttributes MethodCodeType MethodImplAttributes MethodImplOptions MidpointRounding MutexRights NormalizationForm NumberStyles ObjectAceFlags OpCodeType OperandType PackingSize PaddingMode ParameterAttributes PARAMFLAG PARAMFLAG PartialTrustVisibilityLevel PEFileKinds PermissionState PlatformID PolicyLevelType PolicyStatementAttribute PortableExecutableKinds PrincipalPolicy ProcessorArchitecture PropagationFlags PropertyAttributes ReflectionPermissionFlag RegistrationClassContext RegistrationConnectionType RegistryHive RegistryKeyPermissionCheck RegistryOptions RegistryPermissionAccess RegistryRights RegistryValueKind RegistryValueOptions RegistryView ResourceAttributes ResourceLocation ResourceScope ResourceType RSAEncryptionPaddingMode RSASignaturePaddingMode SearchOption SecurityAction SecurityContextSource SecurityCriticalScope SecurityInfos SecurityPermissionFlag SecurityRuleSet SecurityZone SeekOrigin ServerProcessing SoapOption StackBehaviour StreamingContextStates StringComparison StringSplitOptions SymAddressKind SYSKIND SYSKIND TaskContinuationOptions TaskCreationOptions TaskStatus ThreadPriority ThreadState TimeSpanStyles TokenAccessLevels TokenImpersonationLevel TrustManagerUIContext TypeAttributes TypeCode TypeFilterLevel TYPEFLAGS TYPEFLAGS TYPEKIND TYPEKIND TypeLibExporterFlags TypeLibFuncFlags TypeLibImporterFlags TypeLibTypeFlags TypeLibVarFlags UIPermissionClipboard UIPermissionWindow UltimateResourceFallbackLocation UnicodeCategory UnmanagedType VarEnum VARFLAGS VARFLAGS VARKIND WellKnownObjectMode WellKnownSidType WindowsAccountType WindowsBuiltInRole X509ContentType X509KeyStorageFlags XmlFieldOrderOption '
  }

  var KEYWORDS = {
    keyword:
      // Normal keywords.
      'abstract as base bool break byte case catch char checked const continue decimal ' +
      'default delegate do double else enum event explicit extern finally fixed float ' +
      'for foreach goto if implicit in int interface internal is lock long ' +
      'object operator out override params private protected public readonly ref sbyte ' +
      'sealed short sizeof stackalloc static string struct switch this try typeof ' +
      'uint ulong unchecked unsafe ushort using virtual void volatile while ' +
      'nameof ' +
      // Contextual keywords.
      'add alias ascending async await by descending dynamic equals from get global group into join ' +
      'let on orderby partial remove select set value var where yield',
    literal:
      'null false true',
    built_in:
      SYSTEM.classes,
    class:
      SYSTEM.interfaces + SYSTEM.enums
  };

  var VERBATIM_STRING = {
    className: 'string',
    begin: '@"', end: '"',
    contains: [{begin: '""'}]
  };
  var VERBATIM_STRING_NO_LF = hljs.inherit(VERBATIM_STRING, {illegal: /\n/});
  var SUBST = {
    className: 'subst',
    begin: '{', end: '}',
    keywords: KEYWORDS
  };
  var SUBST_NO_LF = hljs.inherit(SUBST, {illegal: /\n/});
  var INTERPOLATED_STRING = {
    className: 'string',
    begin: /\$"/, end: '"',
    illegal: /\n/,
    contains: [{begin: '{{'}, {begin: '}}'}, hljs.BACKSLASH_ESCAPE, SUBST_NO_LF]
  };
  var INTERPOLATED_VERBATIM_STRING = {
    className: 'string',
    begin: /\$@"/, end: '"',
    contains: [{begin: '{{'}, {begin: '}}'}, {begin: '""'}, SUBST]
  };
  var INTERPOLATED_VERBATIM_STRING_NO_LF = hljs.inherit(INTERPOLATED_VERBATIM_STRING, {
    illegal: /\n/,
    contains: [{begin: '{{'}, {begin: '}}'}, {begin: '""'}, SUBST_NO_LF]
  });
  SUBST.contains = [
    INTERPOLATED_VERBATIM_STRING,
    INTERPOLATED_STRING,
    VERBATIM_STRING,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.C_NUMBER_MODE,
    hljs.C_BLOCK_COMMENT_MODE
  ];
  SUBST_NO_LF.contains = [
    INTERPOLATED_VERBATIM_STRING_NO_LF,
    INTERPOLATED_STRING,
    VERBATIM_STRING_NO_LF,
    hljs.APOS_STRING_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.C_NUMBER_MODE,
    hljs.inherit(hljs.C_BLOCK_COMMENT_MODE, {illegal: /\n/})
  ];
  var STRING = {
    variants: [
      INTERPOLATED_VERBATIM_STRING,
      INTERPOLATED_STRING,
      VERBATIM_STRING,
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  var TYPE_IDENT_RE = hljs.IDENT_RE + '(<' + hljs.IDENT_RE + '(\\s*,\\s*' + hljs.IDENT_RE + ')*>)?(\\[\\])?';
  return {
    aliases: ['csharp'],
    keywords: KEYWORDS,
    illegal: /::/,
    contains: [
      hljs.COMMENT(
        '///',
        '$',
        {
          returnBegin: true,
          contains: [
            {
              className: 'doctag',
              variants: [
                {
                  begin: '///', relevance: 0
                },
                {
                  begin: '<!--|-->'
                },
                {
                  begin: '</?', end: '>'
                }
              ]
            }
          ]
        }
      ),
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'meta',
        begin: '#', end: '$',
        keywords: {'meta-keyword': 'if else elif endif define undef warning error line region endregion pragma checksum'}
      },
      STRING,
      hljs.C_NUMBER_MODE,
      {
        beginKeywords: 'class', end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          {
            className: 'type',
            begin: hljs.IDENT_RE,
            relevance: 0
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: 'interface', end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          {
            className: 'class',
            begin: hljs.IDENT_RE,
            relevance: 0
          },
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        beginKeywords: 'namespace', end: /[{;=]/,
        illegal: /[^\s:]/,
        contains: [
          hljs.inherit(hljs.TITLE_MODE, {begin: '[a-zA-Z](\\.?\\w)*'}),
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: 'return throw await',
        relevance: 0
      },
      {
        // new MaClasse();
        className: 'type',
        beginKeywords: 'new', end: '[\\(<]', excludeEnd: true
      },
      {
        className: 'function',
        begin: '(' + TYPE_IDENT_RE + '\\s+)+' + hljs.IDENT_RE + '\\s*\\(', returnBegin: true,
        end: /[{;=]/, excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          /*{
            begin: hljs.IDENT_RE + '\\s*\\(', returnBegin: true,
            contains: [hljs.TITLE_MODE],
            relevance: 0
          },
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS,
            relevance: 0,
            contains: [
              STRING,
              hljs.C_NUMBER_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ]
          },*/
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE
        ]
      },
    ]
  };
}
