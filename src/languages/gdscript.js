/*
Language: GDScript
Author: Khairul Hidayat <me@khairul.my.id>
Description: Programming language for Godot Game Engine
*/
	
function(hljs) {
	var KEYWORDS = {
		keyword:
			'do var const extends is in export onready tool ' +
			'static setget signal breakpoint switch case ' +
			'assert break continue elif else for if ' +
			'pass return while match master sync slave rpc enum',
	
		built_in:
			'Color8 ColorN abs acos asin assert atan atan2 ' +
			'bytes2var ceil char clamp convert cos cosh ' +
			'db2linear decimals dectime deg2rad dict2inst ' +
			'ease exp floor fmod fposmod funcref hash ' +
			'inst2dict instance_from_id is_inf is_nan lerp ' +
			'linear2db load log max min nearest_po2 pow ' +
			'preload print print_stack printerr printraw ' +
			'prints printt rad2deg rand_range rand_seed ' +
			'randf randi randomize range round seed sign ' +
			'sin sinh sqrt stepify str str2var tan ' +
			'tan tanh type_exist typeof var2bytes var2str ' +
			'weakref yield bool int float String NodePath ' +
			'Vector2 Rect2 Transform2D Vector3 Rect3 Plane ' +
			'Quat Basis Transform Color RID Object NodePath ' +
			'Dictionary Array PoolByteArray PoolIntArray ' +
			'PoolRealArray PoolStringArray PoolVector2Array ' +
			'PoolVector3Array PoolColorArray',
		
		literal:
			'true false null'
	};
	
	return {
		aliases: ['godot', 'gdscript'],
		keywords: KEYWORDS,
		contains: [
			hljs.NUMBER_MODE,
			hljs.HASH_COMMENT_MODE,
			{
				className: 'comment',
				begin: /"""/, end: /"""/
			},
			hljs.QUOTE_STRING_MODE,
			{
				variants: [
					{
						className: 'function',
						beginKeywords: 'func'
					},
					{
						className: 'class',
						beginKeywords: 'class'
					}
				],
				end: /:/,
				contains: [
					hljs.UNDERSCORE_TITLE_MODE
				]
			}
		]
	};
}
