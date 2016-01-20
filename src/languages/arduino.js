/*
Language: Arduino
Author: Stefania Mellai <s.mellai@arduino.cc>
Description: The Arduino® Language is a superset of C++. This rules are designed to highlight the Arduino® source code. For info about language see http://www.arduino.cc.
Category: misc
*/

function(hljs) {

	// CPP Strings
	var STRINGS = {
	    className: 'string',
	    variants: [
	      hljs.inherit(hljs.QUOTE_STRING_MODE, { begin: '((u8?|U)|L)?"' }),
	      {
	        begin: '(u8?|U)?R"', end: '"',
	        contains: [hljs.BACKSLASH_ESCAPE]
	      },
	      {
	        begin: '\'\\\\?.', end: '\'',
	        illegal: '.'
	      }
	    ]
	  };

	// CPP preprocessor
	var PREPROCESSOR =       {
	    className: 'meta',
	    begin: '#', end: '$',
	    keywords: {'meta-keyword': 'if else elif endif define undef warning error line ' +
	                  'pragma ifdef ifndef'},
	    contains: [
	      {
	        begin: /\\\n/, relevance: 0
	      },
	      {
	        beginKeywords: 'include', end: '$',
	        keywords: {'meta-keyword': 'include'},
	        contains: [
	          hljs.inherit(STRINGS, {className: 'meta-string'}),
	          {
	            className: 'meta-string',
	            begin: '<', end: '>',
	            illegal: '\\n',
	          }
	        ]
	      },
	      STRINGS,
	      hljs.C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE
	    ]
	  };

  	return {
	    keywords: {
	      keyword: 'boolean byte word string String array ' +
	      // CPP keywords
	      'int float private char export virtual operator sizeof uint8_t uint16_t ' +
	      'uint32_t uint64_t int8_t int16_t int32_t int64_t ' +
	      'dynamic_cast typedef const_cast const struct static_cast union namespace ' +
	      'unsigned long volatile static protected bool template mutable public friend ' +
	      'auto void enum extern using class asm typeid ' +
	      'short reinterpret_cast double register explicit signed typename this ' +
	      'inline delete alignof constexpr decltype ' +
	      'noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary ' +
	      'atomic_bool atomic_char atomic_schar ' +
	      'atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong ' +
	      'atomic_ullong',
	      built_in:
              'setup loop while catch for if do goto try switch case else ' +
              'default break continue return ' +
              'KeyboardController MouseController SoftwareSerial ' +
	            'EthernetServer EthernetClient LiquidCrystal ' +
	            'RobotControl GSMVoiceCall EthernetUDP EsploraTFT ' +
	            'HttpClient RobotMotor WiFiClient GSMScanner ' +
	            'FileSystem Scheduler GSMServer YunClient YunServer ' +
	            'IPAddress GSMClient GSMModem Keyboard Ethernet ' +
	            'Console GSMBand Esplora Stepper Process ' +
	            'WiFiUDP GSM_SMS Mailbox USBHost Firmata PImage ' +
	            'Client Server GSMPIN FileIO Bridge Serial ' +
	            'EEPROM Stream Mouse Audio Servo File Task ' +
	            'GPRS WiFi Wire TFT GSM SPI SD ' +
	            'runShellCommandAsynchronously analogWriteResolution ' +
	            'retrieveCallingNumber printFirmwareVersion ' +
	            'analogReadResolution sendDigitalPortPair ' +
	            'noListenOnLocalhost readJoystickButton setFirmwareVersion ' +
	            'readJoystickSwitch scrollDisplayRight getVoiceCallStatus ' +
	            'scrollDisplayLeft writeMicroseconds delayMicroseconds ' +
	            'beginTransmission getSignalStrength runAsynchronously ' +
	            'getAsynchronously listenOnLocalhost getCurrentCarrier ' +
	            'readAccelerometer messageAvailable sendDigitalPorts ' +
	            'lineFollowConfig countryNameWrite runShellCommand ' +
	            'readStringUntil rewindDirectory readTemperature ' +
	            'setClockDivider readLightSensor endTransmission ' +
	            'analogReference detachInterrupt countryNameRead ' +
	            'attachInterrupt encryptionType readBytesUntil ' +
	            'robotNameWrite readMicrophone robotNameRead cityNameWrite ' +
	            'userNameWrite readJoystickY readJoystickX mouseReleased ' +
	            'openNextFile scanNetworks noInterrupts digitalWrite ' +
	            'beginSpeaker mousePressed isActionDone mouseDragged ' +
	            'displayLogos noAutoscroll addParameter remoteNumber ' +
	            'getModifiers keyboardRead userNameRead waitContinue ' +
	            'processInput parseCommand printVersion readNetworks ' +
	            'writeMessage blinkVersion cityNameRead readMessage ' +
	            'setDataMode parsePacket isListening setBitOrder ' +
	            'beginPacket isDirectory motorsWrite drawCompass ' +
	            'digitalRead clearScreen serialEvent rightToLeft ' +
	            'setTextSize leftToRight requestFrom keyReleased ' +
	            'compassRead analogWrite interrupts WiFiServer ' +
	            'disconnect playMelody parseFloat autoscroll ' +
	            'getPINUsed setPINUsed setTimeout sendAnalog ' +
	            'readSlider analogRead beginWrite createChar ' +
	            'motorsStop keyPressed tempoWrite readButton ' +
	            'subnetMask debugPrint macAddress writeGreen ' +
	            'randomSeed attachGPRS readString sendString ' +
	            'remotePort releaseAll mouseMoved background ' +
	            'getXChange getYChange answerCall getResult ' +
	            'voiceCall endPacket constrain getSocket writeJSON ' +
	            'getButton available connected findUntil readBytes ' +
	            'exitValue readGreen writeBlue startLoop IPAddress ' +
	            'isPressed sendSysex pauseMode gatewayIP setCursor ' +
	            'getOemKey tuneWrite noDisplay loadImage switchPIN ' +
	            'onRequest onReceive changePIN playFile noBuffer ' +
	            'parseInt overflow checkPIN knobRead beginTFT ' +
	            'bitClear updateIR bitWrite position writeRGB ' +
	            'highByte writeRed setSpeed readBlue noStroke ' +
	            'remoteIP transfer shutdown hangCall beginSMS ' +
	            'endWrite attached maintain noCursor checkReg ' +
	            'checkPUK shiftOut isValid shiftIn pulseIn ' +
	            'connect println localIP pinMode getIMEI ' +
	            'display noBlink process getBand running beginSD ' +
	            'drawBMP lowByte setBand release bitRead prepare ' +
	            'pointTo readRed setMode noFill remove listen ' +
	            'stroke detach attach noTone exists buffer ' +
	            'height bitSet circle config cursor random ' +
	            'IRread setDNS endSMS getKey micros ' +
	            'millis begin print write ready flush width ' +
	            'isPIN blink clear press mkdir rmdir close ' +
	            'point yield image BSSID click delay ' +
	            'read text move peek beep rect line open ' +
	            'seek fill size turn stop home find ' +
	            'step tone sqrt RSSI SSID ' +
	            'end bit tan cos sin pow map abs max ' +
	            'min get run put',
	        literal: 'DIGITAL_MESSAGE FIRMATA_STRING ANALOG_MESSAGE ' +
	            'REPORT_DIGITAL REPORT_ANALOG INPUT_PULLUP ' +
	            'SET_PIN_MODE INTERNAL2V56 SYSTEM_RESET LED_BUILTIN ' +
	            'INTERNAL1V1 SYSEX_START INTERNAL EXTERNAL ' +
	            'DEFAULT OUTPUT INPUT HIGH LOW'
	    },
	    contains: [
	      PREPROCESSOR,
	      hljs.C_LINE_COMMENT_MODE,
	      hljs.C_BLOCK_COMMENT_MODE,
	      hljs.APOS_STRING_MODE,
	      hljs.QUOTE_STRING_MODE,
	      hljs.C_NUMBER_MODE
	    ]
    };
}
