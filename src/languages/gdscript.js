/*
Language: GDScript
Author: Geequlim <geequlim@gmail.com>
Contributors: Geequlim
Description: Language definition for GDScript. This language highlight is forked from python language.
*/

function(hljs) {
  var PROMPT = {
    className: 'meta',  begin: /^(>>>|\.\.\.) /
  };
  var STRING  = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [
      {
        begin: /(u|b)?r?'''/, end: /'''/,
        contains: [PROMPT],
        relevance: 10
      },
      {
        begin: /(u|b)?r?"""/, end: /"""/,
        contains: [PROMPT],
        relevance: 10
      },
      {
        begin: /(u|r|ur)'/, end: /'/,
        relevance: 10
      },
      {
        begin: /(u|r|ur)"/, end: /"/,
        relevance: 10
      },
      {
        begin: /(b|br)'/, end: /'/
      },
      {
        begin: /(b|br)"/, end: /"/
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };
  var NUMBER = {
    className: 'number', relevance: 0,
    variants: [
      {begin: hljs.BINARY_NUMBER_RE + '[lLjJ]?'},
      {begin: '\\b(0o[0-7]+)[lLjJ]?'},
      {begin: hljs.C_NUMBER_RE + '[lLjJ]?'}
    ]
  };
  var PARAMS = {
    className: 'params',
    begin: /\(/, end: /\)/,
    contains: ['self', PROMPT, NUMBER, STRING]
  };
  return {
    aliases: ['gd', 'godot', 'gdscript'],
    keywords: {
      keyword:
        'if elif else for in do while switch case break continue pass return class extends tool signal func static const var onready export setget breakpoint self',
      literal: 'false true null',
      built_in:
        'sin cos tan sinh cosh tanh asin acos atan atan2 sqrt fmod fposmod Nil floor ceil round abs sign pow log exp isnan isinf ease decimals lerp stepify dectime randomize randi randf rand_range seed rand_seed deg2rad deg2rad rad2deg linear2db max min clamp nearest_po2 weakref print_stack convert typeof str print printt prints printerr printraw var2str str2var var2bytes bytes2var range load inst2dict dict2inst hash Color8 instance_from_id preload yield assert call new instance '
        +
        'AABB AcceptDialog AnimatedSprite AnimatedSprite3D Animation AnimationPlayer AnimationTreePlayer Area Area2D Array AtlasTexture AudioServer AudioServerSW AudioStream AudioStreamMPC AudioStreamOGGVorbis AudioStreamOpus AudioStreamPlayback AudioStreamSpeex BackBufferCopy BakedLight BakedLightInstance BakedLightSampler BaseButton BitMap BoneAttachment bool BoxContainer BoxShape Button ButtonArray ButtonGroup Camera Camera2D CanvasItem CanvasItemMaterial CanvasItemShader CanvasItemShaderGraph CanvasLayer CanvasModulate CapsuleShape CapsuleShape2D CenterContainer CheckBox CheckButton CircleShape2D CollisionObject CollisionObject2D CollisionPolygon CollisionPolygon2D CollisionShape CollisionShape2D Color ColorArray ColorPicker ColorPickerButton ColorRamp ConcavePolygonShape ConcavePolygonShape2D ConeTwistJoint ConfigFile ConfirmationDialog Container Control ConvexPolygonShape ConvexPolygonShape2D CubeMap Curve2D Curve3D DampedSpringJoint2D Dictionary DirectionalLight Directory EditorFileDialog EditorImportPlugin EditorPlugin EditorScenePostImport EditorScript Environment EventPlayer EventStream EventStreamChibi File FileDialog FixedMaterial float Font FuncRef GDFunctionState GDNativeClass GDScript Generic6DOFJoint Geometry GeometryInstance Globals GraphEdit GraphNode GridContainer GridMap GrooveJoint2D HBoxContainer HButtonArray HingeJoint HScrollBar HSeparator HSlider HSplitContainer HTTPClient Image ImageTexture ImmediateGeometry Input InputDefault InputEvent InputEventAction InputEventJoystickButton InputEventJoystickMotion InputEventKey InputEventMouseButton InputEventMouseMotion InputEventScreenDrag InputEventScreenTouch InputMap InstancePlaceholder int IntArray InterpolatedCamera IP IP_Unix ItemList Joint Joint2D KinematicBody KinematicBody2D Label LargeTexture Light Light2D LightOccluder2D LineEdit LineShape2D MainLoop MarginContainer Marshalls Material MaterialShader MaterialShaderGraph Matrix3 Matrix32 MenuButton Mesh MeshDataTool MeshInstance MeshLibrary MultiMesh MultiMeshInstance Mutex Navigation Navigation2D NavigationMesh NavigationMeshInstance NavigationPolygon NavigationPolygonInstance Nil Node Node2D NodePath Object OccluderPolygon2D OmniLight OptionButton OS PackedDataContainer PackedDataContainerRef PackedScene PacketPeer PacketPeerStream PacketPeerUDP Panel PanelContainer ParallaxBackground ParallaxLayer ParticleAttractor2D Particles Particles2D Patch9Frame Path Path2D PathFollow PathFollow2D PathRemap PCKPacker Performance PHashTranslation Physics2DDirectBodyState Physics2DDirectBodyStateSW Physics2DDirectSpaceState Physics2DServer Physics2DServerSW Physics2DShapeQueryParameters Physics2DShapeQueryResult Physics2DTestMotionResult PhysicsBody PhysicsBody2D PhysicsDirectBodyState PhysicsDirectBodyStateSW PhysicsDirectSpaceState PhysicsServer PhysicsServerSW PhysicsShapeQueryParameters PhysicsShapeQueryResult PinJoint PinJoint2D Plane PlaneShape Polygon2D PolygonPathFinder Popup PopupDialog PopupMenu PopupPanel Portal Position2D Position3D ProgressBar ProximityGroup Quad Quat Range RawArray RayCast RayCast2D RayShape RayShape2D RealArray Rect2 RectangleShape2D Reference ReferenceFrame RegEx RemoteTransform2D RenderTargetTexture Resource ResourceImportMetadata ResourceInteractiveLoader ResourceLoader ResourcePreloader ResourceSaver RichTextLabel RID RigidBody RigidBody2D Room RoomBounds Sample SampleLibrary SamplePlayer SamplePlayer2D SceneState SceneTree Script ScrollBar ScrollContainer SegmentShape2D Semaphore Separator Shader ShaderGraph ShaderMaterial Shape Shape2D Skeleton Slider SliderJoint SoundPlayer2D SoundRoomParams Spatial SpatialPlayer SpatialSamplePlayer SpatialSound2DServer SpatialSound2DServerSW SpatialSoundServer SpatialSoundServerSW SpatialStreamPlayer SphereShape SpinBox SplitContainer SpotLight Sprite Sprite3D SpriteBase3D SpriteFrames StaticBody StaticBody2D StreamPeer StreamPeerSSL StreamPeerTCP StreamPlayer String StringArray StyleBox StyleBoxEmpty StyleBoxFlat StyleBoxImageMask StyleBoxTexture SurfaceTool TabContainer Tabs TCP_Server TestCube TextEdit Texture TextureButton TextureFrame TextureProgress Theme Thread TileMap TileSet Timer ToolButton TouchScreenButton Transform Translation TranslationServer Tree TreeItem Tween UndoRedo VBoxContainer VButtonArray Vector2 Vector2Array Vector3 Vector3Array VehicleBody VehicleWheel VideoPlayer VideoStream VideoStreamTheora Viewport ViewportSprite VisibilityEnabler VisibilityEnabler2D VisibilityNotifier VisibilityNotifier2D VisualInstance VisualServer VScrollBar VSeparator VSlider VSplitContainer WeakRef WindowDialog World World2D WorldEnvironment XMLParser YSort ',
      symbol:
        'MARGIN_LEFT MARGIN_TOP MARGIN_RIGHT MARGIN_BOTTOM VERTICAL HORIZONTAL HALIGN_LEFT HALIGN_CENTER HALIGN_RIGHT VALIGN_TOP VALIGN_CENTER VALIGN_BOTTOM SPKEY KEY_ESCAPE KEY_TAB KEY_BACKTAB KEY_BACKSPACE KEY_RETURN KEY_ENTER KEY_INSERT KEY_DELETE KEY_PAUSE KEY_PRINT KEY_SYSREQ KEY_CLEAR KEY_HOME KEY_END KEY_LEFT KEY_UP KEY_RIGHT KEY_DOWN KEY_PAGEUP KEY_PAGEDOWN KEY_SHIFT KEY_CONTROL KEY_META KEY_ALT KEY_CAPSLOCK KEY_NUMLOCK KEY_SCROLLLOCK KEY_F1 KEY_F2 KEY_F3 KEY_F4 KEY_F5 KEY_F6 KEY_F7 KEY_F8 KEY_F9 KEY_F10 KEY_F11 KEY_F12 KEY_F13 KEY_F14 KEY_F15 KEY_F16 KEY_KP_ENTER KEY_KP_MULTIPLY KEY_KP_DIVIDE KEY_KP_SUBTRACT KEY_KP_PERIOD KEY_KP_ADD KEY_KP_0 KEY_KP_1 KEY_KP_2 KEY_KP_3 KEY_KP_4 KEY_KP_5 KEY_KP_6 KEY_KP_7 KEY_KP_8 KEY_KP_9 KEY_SUPER_L KEY_SUPER_R KEY_MENU KEY_HYPER_L KEY_HYPER_R KEY_HELP KEY_DIRECTION_L KEY_DIRECTION_R KEY_BACK KEY_FORWARD KEY_STOP KEY_REFRESH KEY_VOLUMEDOWN KEY_VOLUMEMUTE KEY_VOLUMEUP KEY_BASSBOOST KEY_BASSUP KEY_BASSDOWN KEY_TREBLEUP KEY_TREBLEDOWN KEY_MEDIAPLAY KEY_MEDIASTOP KEY_MEDIAPREVIOUS KEY_MEDIANEXT KEY_MEDIARECORD KEY_HOMEPAGE KEY_FAVORITES KEY_SEARCH KEY_STANDBY KEY_OPENURL KEY_LAUNCHMAIL KEY_LAUNCHMEDIA KEY_LAUNCH0 KEY_LAUNCH1 KEY_LAUNCH2 KEY_LAUNCH3 KEY_LAUNCH4 KEY_LAUNCH5 KEY_LAUNCH6 KEY_LAUNCH7 KEY_LAUNCH8 KEY_LAUNCH9 KEY_LAUNCHA KEY_LAUNCHB KEY_LAUNCHC KEY_LAUNCHD KEY_LAUNCHE KEY_LAUNCHF KEY_UNKNOWN KEY_SPACE KEY_EXCLAM KEY_QUOTEDBL KEY_NUMBERSIGN KEY_DOLLAR KEY_PERCENT KEY_AMPERSAND KEY_APOSTROPHE KEY_PARENLEFT KEY_PARENRIGHT KEY_ASTERISK KEY_PLUS KEY_COMMA KEY_MINUS KEY_PERIOD KEY_SLASH KEY_0 KEY_1 KEY_2 KEY_3 KEY_4 KEY_5 KEY_6 KEY_7 KEY_8 KEY_9 KEY_COLON KEY_SEMICOLON KEY_LESS KEY_EQUAL KEY_GREATER KEY_QUESTION KEY_AT KEY_A KEY_B KEY_C KEY_D KEY_E KEY_F KEY_G KEY_H KEY_I KEY_J KEY_K KEY_L KEY_M KEY_N KEY_O KEY_P KEY_Q KEY_R KEY_S KEY_T KEY_U KEY_V KEY_W KEY_X KEY_Y KEY_Z KEY_BRACKETLEFT KEY_BACKSLASH KEY_BRACKETRIGHT KEY_ASCIICIRCUM KEY_UNDERSCORE KEY_QUOTELEFT KEY_BRACELEFT KEY_BAR KEY_BRACERIGHT KEY_ASCIITILDE KEY_NOBREAKSPACE KEY_EXCLAMDOWN KEY_CENT KEY_STERLING KEY_CURRENCY KEY_YEN KEY_BROKENBAR KEY_SECTION KEY_DIAERESIS KEY_COPYRIGHT KEY_ORDFEMININE KEY_GUILLEMOTLEFT KEY_NOTSIGN KEY_HYPHEN KEY_REGISTERED KEY_MACRON KEY_DEGREE KEY_PLUSMINUS KEY_TWOSUPERIOR KEY_THREESUPERIOR KEY_ACUTE KEY_MU KEY_PARAGRAPH KEY_PERIODCENTERED KEY_CEDILLA KEY_ONESUPERIOR KEY_MASCULINE KEY_GUILLEMOTRIGHT KEY_ONEQUARTER KEY_ONEHALF KEY_THREEQUARTERS KEY_QUESTIONDOWN KEY_AGRAVE KEY_AACUTE KEY_ACIRCUMFLEX KEY_ATILDE KEY_ADIAERESIS KEY_ARING KEY_AE KEY_CCEDILLA KEY_EGRAVE KEY_EACUTE KEY_ECIRCUMFLEX KEY_EDIAERESIS KEY_IGRAVE KEY_IACUTE KEY_ICIRCUMFLEX KEY_IDIAERESIS KEY_ETH KEY_NTILDE KEY_OGRAVE KEY_OACUTE KEY_OCIRCUMFLEX KEY_OTILDE KEY_ODIAERESIS KEY_MULTIPLY KEY_OOBLIQUE KEY_UGRAVE KEY_UACUTE KEY_UCIRCUMFLEX KEY_UDIAERESIS KEY_YACUTE KEY_THORN KEY_SSHARP KEY_DIVISION KEY_YDIAERESIS KEY_CODE_MASK KEY_MODIFIER_MASK KEY_MASK_SHIFT KEY_MASK_ALT KEY_MASK_META KEY_MASK_CTRL KEY_MASK_CMD KEY_MASK_KPAD KEY_MASK_GROUP_SWITCH BUTTON_LEFT BUTTON_RIGHT BUTTON_MIDDLE BUTTON_WHEEL_UP BUTTON_WHEEL_DOWN BUTTON_WHEEL_LEFT BUTTON_WHEEL_RIGHT BUTTON_MASK_LEFT BUTTON_MASK_RIGHT BUTTON_MASK_MIDDLE JOY_BUTTON_0 JOY_BUTTON_1 JOY_BUTTON_2 JOY_BUTTON_3 JOY_BUTTON_4 JOY_BUTTON_5 JOY_BUTTON_6 JOY_BUTTON_7 JOY_BUTTON_8 JOY_BUTTON_9 JOY_BUTTON_10 JOY_BUTTON_11 JOY_BUTTON_12 JOY_BUTTON_13 JOY_BUTTON_14 JOY_BUTTON_15 JOY_BUTTON_MAX JOY_SNES_A JOY_SNES_B JOY_SNES_X JOY_SNES_Y JOY_SONY_CIRCLE JOY_SONY_X JOY_SONY_SQUARE JOY_SONY_TRIANGLE JOY_SEGA_B JOY_SEGA_A JOY_SEGA_X JOY_SEGA_Y JOY_XBOX_B JOY_XBOX_A JOY_XBOX_X JOY_XBOX_Y JOY_DS_A JOY_DS_B JOY_DS_X JOY_DS_Y JOY_SELECT JOY_START JOY_DPAD_UP JOY_DPAD_DOWN JOY_DPAD_LEFT JOY_DPAD_RIGHT JOY_L JOY_L2 JOY_L3 JOY_R JOY_R2 JOY_R3 JOY_AXIS_0 JOY_AXIS_1 JOY_AXIS_2 JOY_AXIS_3 JOY_AXIS_4 JOY_AXIS_5 JOY_AXIS_6 JOY_AXIS_7 JOY_AXIS_MAX JOY_ANALOG_0_X JOY_ANALOG_0_Y JOY_ANALOG_1_X JOY_ANALOG_1_Y JOY_ANALOG_2_X JOY_ANALOG_2_Y JOY_ANALOG_L2 JOY_ANALOG_R2 OK FAILED ERR_UNAVAILABLE ERR_UNCONFIGURED ERR_UNAUTHORIZED ERR_PARAMETER_RANGE_ERROR ERR_OUT_OF_MEMORY ERR_FILE_NOT_FOUND ERR_FILE_BAD_DRIVE ERR_FILE_BAD_PATH ERR_FILE_NO_PERMISSION ERR_FILE_ALREADY_IN_USE ERR_FILE_CANT_OPEN ERR_FILE_CANT_WRITE ERR_FILE_CANT_READ ERR_FILE_UNRECOGNIZED ERR_FILE_CORRUPT ERR_FILE_MISSING_DEPENDENCIES ERR_FILE_EOF ERR_CANT_OPEN ERR_CANT_CREATE ERROR_QUERY_FAILED ERR_ALREADY_IN_USE ERR_LOCKED ERR_TIMEOUT ERR_CANT_AQUIRE_RESOURCE ERR_INVALID_DATA ERR_INVALID_PARAMETER ERR_ALREADY_EXISTS ERR_DOES_NOT_EXIST ERR_DATABASE_CANT_READ ERR_DATABASE_CANT_WRITE ERR_COMPILATION_FAILED ERR_METHOD_NOT_FOUND ERR_LINK_FAILED ERR_SCRIPT_FAILED ERR_CYCLIC_LINK ERR_BUSY ERR_HELP ERR_BUG ERR_WTF PROPERTY_HINT_NONE PROPERTY_HINT_RANGE PROPERTY_HINT_EXP_RANGE PROPERTY_HINT_ENUM PROPERTY_HINT_EXP_EASING PROPERTY_HINT_LENGTH PROPERTY_HINT_KEY_ACCEL PROPERTY_HINT_FLAGS PROPERTY_HINT_ALL_FLAGS PROPERTY_HINT_FILE PROPERTY_HINT_DIR PROPERTY_HINT_GLOBAL_FILE PROPERTY_HINT_GLOBAL_DIR PROPERTY_HINT_RESOURCE_TYPE PROPERTY_HINT_MULTILINE_TEXT PROPERTY_HINT_COLOR_NO_ALPHA PROPERTY_HINT_IMAGE_COMPRESS_LOSSY PROPERTY_HINT_IMAGE_COMPRESS_LOSSLESS PROPERTY_USAGE_STORAGE PROPERTY_USAGE_EDITOR PROPERTY_USAGE_NETWORK PROPERTY_USAGE_DEFAULT METHOD_FLAG_NORMAL METHOD_FLAG_EDITOR METHOD_FLAG_NOSCRIPT METHOD_FLAG_CONST METHOD_FLAG_REVERSE METHOD_FLAG_VIRTUAL METHOD_FLAG_FROM_SCRIPT METHOD_FLAGS_DEFAULT TYPE_NIL TYPE_BOOL TYPE_INT TYPE_REAL TYPE_STRING TYPE_VECTOR2 TYPE_RECT2 TYPE_VECTOR3 TYPE_MATRIX32 TYPE_PLANE TYPE_QUAT TYPE_AABB TYPE_MATRIX3 TYPE_TRANSFORM TYPE_COLOR TYPE_IMAGE TYPE_NODE_PATH TYPE_RID TYPE_OBJECT TYPE_INPUT_EVENT TYPE_DICTIONARY TYPE_ARRAY TYPE_RAW_ARRAY TYPE_INT_ARRAY TYPE_REAL_ARRAY TYPE_STRING_ARRAY TYPE_VECTOR2_ARRAY TYPE_VECTOR3_ARRAY TYPE_COLOR_ARRAY TYPE_MAX '
      },
    illegal: /(<\/|->|\?)/,
    contains: [
      PROMPT,
      NUMBER,
      STRING,
      hljs.HASH_COMMENT_MODE,
      {
        variants: [
          {className: 'function', beginKeywords: 'func', relevance: 10},
          {className: 'class', beginKeywords: 'class'}
        ],
        end: /:/,
        illegal: /[${=;\n,]/,
        contains: [
          hljs.UNDERSCORE_TITLE_MODE,
          PARAMS,
          {
            begin: /->/, endsWithParent: true,
            keywords: 'None'
          }
        ]
      },
      {
        className: 'meta',
        begin: /^[\t ]*@/, end: /$/
      },
      {
        begin: /\b(print|exec)\(/
      }
    ]
  };
}
