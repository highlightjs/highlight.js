/*
Language: GML
Description: Game Maker Language for GameMaker (rev. 2024.11)
Website: https://manual.gamemaker.io/
Category: scripting
*/

export default function(hljs) {

  const KEYWORDS = [
    "and",
    "begin",
    "break",
    "catch",
    "case",
    "constructor",
    "continue",
    "default",
    "delete",
    "div",
    "do",
    "else",
    "end",
    "exit",
    "finally",
    "for",
    "globalvar",
    "if",
    "mod",
    "new",
    "not",
    "or",
    "repeat",
    "return",
    "static",
    "switch",
    "then",
    "throw",
    "try",
    "until",
    "var",
    "while",
    "with",
    "xor",
  ];
  const LITERALS = [
    "audiogroup_default", 
    "GM_is_sandboxed", 
    "self", 
    "other", 
    "all", 
    "noone", 
    "GM_build_date",
    "GM_build_type",
    "GM_is_sandboxed",
    "GM_project_filename",
    "GM_runtime_version",
    "GM_version",
    "NaN",
    "_GMFILE_",
    "_GMFUNCTION_",
    "_GMLINE_",
    "all",
    "animcurvetype_bezier",
    "animcurvetype_catmullrom",
    "animcurvetype_linear",
    "asset_animationcurve",
    "asset_font",
    "asset_object",
    "asset_path",
    "asset_particlesystem",
    "asset_room",
    "asset_script",
    "asset_sequence",
    "asset_shader",
    "asset_sound",
    "asset_sprite",
    "asset_tiles",
    "asset_timeline",
    "asset_unknown",
    "audio_3d",
    "audio_bus_main", 
    "audio_falloff_exponent_distance",
    "audio_falloff_exponent_distance_clamped",
    "audio_falloff_exponent_distance_scaled",
    "audio_falloff_inverse_distance",
    "audio_falloff_inverse_distance_clamped",
    "audio_falloff_inverse_distance_scaled",
    "audio_falloff_linear_distance",
    "audio_falloff_linear_distance_clamped",
    "audio_falloff_none",
    "audio_mono",
    "audio_stereo",
    "bboxkind_diamond",
    "bboxkind_ellipse",
    "bboxkind_precise",
    "bboxkind_rectangular",
    "bboxmode_automatic",
    "bboxmode_fullimage",
    "bboxmode_manual",
    "bm_add",
    "bm_dest_alpha",
    "bm_dest_color",
    "bm_dest_colour",
    "bm_inv_dest_alpha",
    "bm_inv_dest_color",
    "bm_inv_dest_colour",
    "bm_inv_src_alpha",
    "bm_inv_src_color",
    "bm_inv_src_colour",
    "bm_max",
    "bm_normal",
    "bm_one",
    "bm_src_alpha",
    "bm_src_alpha_sat",
    "bm_src_color",
    "bm_src_colour",
    "bm_subtract",
    "bm_zero",
    "browser_chrome",
    "browser_edge",
    "browser_firefox",
    "browser_ie",
    "browser_ie_mobile",
    "browser_not_a_browser",
    "browser_opera",
    "browser_safari",
    "browser_safari_mobile",
    "browser_tizen",
    "browser_unknown",
    "browser_windows_store",
    "buffer_bool",
    "buffer_f16",
    "buffer_f32",
    "buffer_f64",
    "buffer_fast",
    "buffer_fixed",
    "buffer_grow",
    "buffer_s16",
    "buffer_s32",
    "buffer_s8",
    "buffer_seek_end",
    "buffer_seek_relative",
    "buffer_seek_start",
    "buffer_string",
    "buffer_text",
    "buffer_u16",
    "buffer_u32",
    "buffer_u64",
    "buffer_u8",
    "buffer_vbuffer",
    "buffer_wrap",
    "c_aqua",
    "c_black",
    "c_blue",
    "c_dkgray",
    "c_dkgrey",
    "c_fuchsia",
    "c_gray",
    "c_green",
    "c_grey",
    "c_lime",
    "c_ltgray",
    "c_ltgrey",
    "c_maroon",
    "c_navy",
    "c_olive",
    "c_orange",
    "c_purple",
    "c_red",
    "c_silver",
    "c_teal",
    "c_white",
    "c_yellow",
    "cache_directory",
    "cmpfunc_always",
    "cmpfunc_equal",
    "cmpfunc_greater",
    "cmpfunc_greaterequal",
    "cmpfunc_less",
    "cmpfunc_lessequal",
    "cmpfunc_never",
    "cmpfunc_notequal",
    "cr_appstart",
    "cr_arrow",
    "cr_beam",
    "cr_cross",
    "cr_default",
    "cr_drag",
    "cr_handpoint",
    "cr_hourglass",
    "cr_none",
    "cr_size_all",
    "cr_size_nesw",
    "cr_size_ns",
    "cr_size_nwse",
    "cr_size_we",
    "cr_uparrow",
    "cull_clockwise",
    "cull_counterclockwise",
    "cull_noculling",
    "device_emulator",
    "device_ios_ipad",
    "device_ios_ipad_retina",
    "device_ios_iphone",
    "device_ios_iphone5",
    "device_ios_iphone6",
    "device_ios_iphone6plus",
    "device_ios_iphone_retina",
    "device_ios_unknown",
    "device_tablet",
    "display_landscape",
    "display_landscape_flipped",
    "display_portrait",
    "display_portrait_flipped",
    "dll_cdecl",
    "dll_stdcall",
    "ds_type_grid",
    "ds_type_list",
    "ds_type_map",
    "ds_type_priority",
    "ds_type_queue",
    "ds_type_stack",
    "ef_cloud",
    "ef_ellipse",
    "ef_explosion",
    "ef_firework",
    "ef_flare",
    "ef_rain",
    "ef_ring",
    "ef_smoke",
    "ef_smokeup",
    "ef_snow",
    "ef_spark",
    "ef_star",
    "ev_alarm",
    "ev_animation_end",
    "ev_animation_event",
    "ev_animation_update",
    "ev_async_audio_playback",
    "ev_async_audio_playback_ended",
    "ev_async_audio_recording",
    "ev_async_dialog",
    "ev_async_push_notification",
    "ev_async_save_load",
    "ev_async_save_load",
    "ev_async_social",
    "ev_async_system_event",
    "ev_async_web",
    "ev_async_web_cloud",
    "ev_async_web_iap",
    "ev_async_web_image_load",
    "ev_async_web_networking",
    "ev_async_web_steam",
    "ev_boundary",
    "ev_boundary_view0",
    "ev_boundary_view1",
    "ev_boundary_view2",
    "ev_boundary_view3",
    "ev_boundary_view4",
    "ev_boundary_view5",
    "ev_boundary_view6",
    "ev_boundary_view7",
    "ev_broadcast_message",
    "ev_cleanup",
    "ev_collision",
    "ev_create",
    "ev_destroy",
    "ev_draw",
    "ev_draw_begin",
    "ev_draw_end",
    "ev_draw_post",
    "ev_draw_pre",
    "ev_end_of_path",
    "ev_game_end",
    "ev_game_start",
    "ev_gesture",
    "ev_gesture_double_tap",
    "ev_gesture_drag_end",
    "ev_gesture_drag_start",
    "ev_gesture_dragging",
    "ev_gesture_flick",
    "ev_gesture_pinch_end",
    "ev_gesture_pinch_in",
    "ev_gesture_pinch_out",
    "ev_gesture_pinch_start",
    "ev_gesture_rotate_end",
    "ev_gesture_rotate_start",
    "ev_gesture_rotating",
    "ev_gesture_tap",
    "ev_global_gesture_double_tap",
    "ev_global_gesture_drag_end",
    "ev_global_gesture_drag_start",
    "ev_global_gesture_dragging",
    "ev_global_gesture_flick",
    "ev_global_gesture_pinch_end",
    "ev_global_gesture_pinch_in",
    "ev_global_gesture_pinch_out",
    "ev_global_gesture_pinch_start",
    "ev_global_gesture_rotate_end",
    "ev_global_gesture_rotate_start",
    "ev_global_gesture_rotating",
    "ev_global_gesture_tap",
    "ev_global_left_button",
    "ev_global_left_press",
    "ev_global_left_release",
    "ev_global_middle_button",
    "ev_global_middle_press",
    "ev_global_middle_release",
    "ev_global_right_button",
    "ev_global_right_press",
    "ev_global_right_release",
    "ev_gui",
    "ev_gui_begin",
    "ev_gui_end",
    "ev_joystick1_button1",
    "ev_joystick1_button2",
    "ev_joystick1_button3",
    "ev_joystick1_button4",
    "ev_joystick1_button5",
    "ev_joystick1_button6",
    "ev_joystick1_button7",
    "ev_joystick1_button8",
    "ev_joystick1_down",
    "ev_joystick1_left",
    "ev_joystick1_right",
    "ev_joystick1_up",
    "ev_joystick2_button1",
    "ev_joystick2_button2",
    "ev_joystick2_button3",
    "ev_joystick2_button4",
    "ev_joystick2_button5",
    "ev_joystick2_button6",
    "ev_joystick2_button7",
    "ev_joystick2_button8",
    "ev_joystick2_down",
    "ev_joystick2_left",
    "ev_joystick2_right",
    "ev_joystick2_up",
    "ev_keyboard",
    "ev_keypress",
    "ev_keyrelease",
    "ev_left_button",
    "ev_left_press",
    "ev_left_release",
    "ev_middle_button",
    "ev_middle_press",
    "ev_middle_release",
    "ev_mouse",
    "ev_mouse_enter",
    "ev_mouse_leave",
    "ev_mouse_wheel_down",
    "ev_mouse_wheel_up",
    "ev_no_button",
    "ev_no_more_health",
    "ev_no_more_lives",
    "ev_other",
    "ev_outside",
    "ev_outside_view0",
    "ev_outside_view1",
    "ev_outside_view2",
    "ev_outside_view3",
    "ev_outside_view4",
    "ev_outside_view5",
    "ev_outside_view6",
    "ev_outside_view7",
    "ev_right_button",
    "ev_right_press",
    "ev_right_release",
    "ev_room_end",
    "ev_room_start",
    "ev_step",
    "ev_step_begin",
    "ev_step_end",
    "ev_step_normal",
    "ev_trigger",
    "ev_user0",
    "ev_user1",
    "ev_user10",
    "ev_user11",
    "ev_user12",
    "ev_user13",
    "ev_user14",
    "ev_user15",
    "ev_user2",
    "ev_user3",
    "ev_user4",
    "ev_user5",
    "ev_user6",
    "ev_user7",
    "ev_user8",
    "ev_user9",
    "fa_bottom",
    "fa_center",
    "fa_left",
    "fa_middle",
    "fa_right",
    "fa_top",
    "fa_archive",
    "fa_directory",
    "fa_hidden",
    "fa_readonly",
    "fa_sysfile",
    "fa_volumeid",
    "false",
    "gamespeed_fps",
    "gamespeed_microseconds",
    "global",
    "gp_axis_acceleration_x",
    "gp_axis_acceleration_y",
    "gp_axis_acceleration_z",
    "gp_axis_angular_velocity_x",
    "gp_axis_angular_velocity_y",
    "gp_axis_angular_velocity_z",
    "gp_axis_orientation_w",
    "gp_axis_orientation_x",
    "gp_axis_orientation_y",
    "gp_axis_orientation_z",
    "gp_axislh",
    "gp_axislv",
    "gp_axisrh",
    "gp_axisrv",
    "gp_face1",
    "gp_face2",
    "gp_face3",
    "gp_face4",
    "gp_padd",
    "gp_padl",
    "gp_padr",
    "gp_padu",
    "gp_select",
    "gp_shoulderl",
    "gp_shoulderlb",
    "gp_shoulderr",
    "gp_shoulderrb",
    "gp_start",
    "gp_stickl",
    "gp_stickr",
    "iap_available",
    "iap_canceled",
    "iap_ev_consume",
    "iap_ev_product",
    "iap_ev_purchase",
    "iap_ev_restore",
    "iap_ev_storeload",
    "iap_failed",
    "iap_purchased",
    "iap_refunded",
    "iap_status_available",
    "iap_status_loading",
    "iap_status_processing",
    "iap_status_restoring",
    "iap_status_unavailable",
    "iap_status_uninitialised",
    "iap_storeload_failed",
    "iap_storeload_ok",
    "iap_unavailable",
    "infinity",
    "kbv_autocapitalize_characters",
    "kbv_autocapitalize_none",
    "kbv_autocapitalize_sentences",
    "kbv_autocapitalize_words",
    "kbv_returnkey_continue",
    "kbv_returnkey_default",
    "kbv_returnkey_done",
    "kbv_returnkey_emergency",
    "kbv_returnkey_go",
    "kbv_returnkey_google",
    "kbv_returnkey_join",
    "kbv_returnkey_next",
    "kbv_returnkey_route",
    "kbv_returnkey_search",
    "kbv_returnkey_send",
    "kbv_returnkey_yahoo",
    "kbv_type_ascii",
    "kbv_type_default",
    "kbv_type_email",
    "kbv_type_numbers",
    "kbv_type_phone",
    "kbv_type_phone_name",
    "kbv_type_url",
    "layerelementtype_background",
    "layerelementtype_instance",
    "layerelementtype_oldtilemap",
    "layerelementtype_particlesystem",
    "layerelementtype_sequence",
    "layerelementtype_sprite",
    "layerelementtype_tile",
    "layerelementtype_tilemap",
    "layerelementtype_undefined",
    "leaderboard_type_number",
    "leaderboard_type_time_mins_secs",
    "lighttype_dir",
    "lighttype_point",
    "m_axisx",
    "m_axisx_gui",
    "m_axisy",
    "m_axisy_gui",
    "m_scroll_down",
    "m_scroll_up",
    "matrix_projection",
    "matrix_view",
    "matrix_world",
    "mb_any",
    "mb_left",
    "mb_middle",
    "mb_none",
    "mb_right",
    "mb_side1",
    "mb_side2",
    "mip_markedonly",
    "mip_off",
    "mip_on",
    "network_config_avoid_time_wait",
    "network_config_connect_timeout",
    "network_config_disable_multicast",
    "network_config_disable_reliable_udp",
    "network_config_enable_multicast",
    "network_config_enable_reliable_udp",
    "network_config_use_non_blocking_socket",
    "network_config_websocket_protocol",
    "network_connect_active",
    "network_connect_blocking",
    "network_connect_nonblocking",
    "network_connect_none",
    "network_connect_passive",
    "network_send_binary",
    "network_send_text",
    "network_socket_bluetooth",
    "network_socket_tcp",
    "network_socket_udp",
    "network_socket_ws",
    "network_socket_wss",
    "network_type_connect",
    "network_type_data",
    "network_type_disconnect",
    "network_type_down",
    "network_type_non_blocking_connect",
    "network_type_up",
    "network_type_up_failed",
    "nineslice_blank",
    "nineslice_bottom",
    "nineslice_center",
    "nineslice_centre",
    "nineslice_hide",
    "nineslice_left",
    "nineslice_mirror",
    "nineslice_repeat",
    "nineslice_right",
    "nineslice_stretch",
    "nineslice_top",
    "noone",
    "os_android",
    "os_gdk",
    "os_gxgames",
    "os_ios",
    "os_linux",
    "os_macosx",
    "os_operagx",
    "os_permission_denied",
    "os_permission_denied_dont_request",
    "os_permission_granted",
    "os_ps3",
    "os_ps4",
    "os_ps5",
    "os_psvita",
    "os_switch",
    "os_tvos",
    "os_unknown",
    "os_uwp",
    "os_win8native",
    "os_windows",
    "os_winphone",
    "os_xboxone",
    "os_xboxseriesxs",
    "other",
    "path_action_continue",
    "path_action_restart",
    "path_action_reverse",
    "path_action_stop",
    "phy_debug_render_aabb",
    "phy_debug_render_collision_pairs",
    "phy_debug_render_coms",
    "phy_debug_render_core_shapes",
    "phy_debug_render_joints",
    "phy_debug_render_obb",
    "phy_debug_render_shapes",
    "phy_joint_anchor_1_x",
    "phy_joint_anchor_1_y",
    "phy_joint_anchor_2_x",
    "phy_joint_anchor_2_y",
    "phy_joint_angle",
    "phy_joint_angle_limits",
    "phy_joint_damping_ratio",
    "phy_joint_frequency",
    "phy_joint_length_1",
    "phy_joint_length_2",
    "phy_joint_lower_angle_limit",
    "phy_joint_max_force",
    "phy_joint_max_length",
    "phy_joint_max_motor_force",
    "phy_joint_max_motor_torque",
    "phy_joint_max_torque",
    "phy_joint_motor_force",
    "phy_joint_motor_speed",
    "phy_joint_motor_torque",
    "phy_joint_reaction_force_x",
    "phy_joint_reaction_force_y",
    "phy_joint_reaction_torque",
    "phy_joint_speed",
    "phy_joint_translation",
    "phy_joint_upper_angle_limit",
    "phy_particle_data_flag_category",
    "phy_particle_data_flag_color",
    "phy_particle_data_flag_colour",
    "phy_particle_data_flag_position",
    "phy_particle_data_flag_typeflags",
    "phy_particle_data_flag_velocity",
    "phy_particle_flag_colormixing",
    "phy_particle_flag_colourmixing",
    "phy_particle_flag_elastic",
    "phy_particle_flag_powder",
    "phy_particle_flag_spring",
    "phy_particle_flag_tensile",
    "phy_particle_flag_viscous",
    "phy_particle_flag_wall",
    "phy_particle_flag_water",
    "phy_particle_flag_zombie",
    "phy_particle_group_flag_rigid",
    "phy_particle_group_flag_solid",
    "pi",
    "pointer_invalid",
    "pointer_null",
    "pr_linelist",
    "pr_linestrip",
    "pr_pointlist",
    "pr_trianglefan",
    "pr_trianglelist",
    "pr_trianglestrip",
    "ps_distr_gaussian",
    "ps_distr_invgaussian",
    "ps_distr_linear",
    "ps_mode_burst",
    "ps_mode_stream",
    "ps_shape_diamond",
    "ps_shape_ellipse",
    "ps_shape_line",
    "ps_shape_rectangle",
    "pt_shape_circle",
    "pt_shape_cloud",
    "pt_shape_disk",
    "pt_shape_explosion",
    "pt_shape_flare",
    "pt_shape_line",
    "pt_shape_pixel",
    "pt_shape_ring",
    "pt_shape_smoke",
    "pt_shape_snow",
    "pt_shape_spark",
    "pt_shape_sphere",
    "pt_shape_square",
    "pt_shape_star",
    "rollback_chat_message",
    "rollback_connect_info",
    "rollback_connected_to_peer",
    "rollback_connection_rejected",
    "rollback_disconnected_from_peer",
    "rollback_end_game",
    "rollback_game_full",
    "rollback_game_info",
    "rollback_game_interrupted",
    "rollback_game_resumed",
    "rollback_high_latency",
    "rollback_player_prefs",
    "rollback_protocol_rejected",
    "rollback_synchronized_with_peer",
    "rollback_synchronizing_with_peer",
    "self",
    "seqaudiokey_loop",
    "seqaudiokey_oneshot",
    "seqdir_left",
    "seqdir_right",
    "seqinterpolation_assign",
    "seqinterpolation_lerp",
    "seqplay_loop",
    "seqplay_oneshot",
    "seqplay_pingpong",
    "seqtextkey_bottom",
    "seqtextkey_center",
    "seqtextkey_justify",
    "seqtextkey_left",
    "seqtextkey_middle",
    "seqtextkey_right",
    "seqtextkey_top",
    "seqtracktype_audio",
    "seqtracktype_bool",
    "seqtracktype_clipmask",
    "seqtracktype_clipmask_mask",
    "seqtracktype_clipmask_subject",
    "seqtracktype_color",
    "seqtracktype_colour",
    "seqtracktype_empty",
    "seqtracktype_graphic",
    "seqtracktype_group",
    "seqtracktype_instance",
    "seqtracktype_message",
    "seqtracktype_moment",
    "seqtracktype_particlesystem",
    "seqtracktype_real",
    "seqtracktype_sequence",
    "seqtracktype_spriteframes",
    "seqtracktype_string",
    "seqtracktype_text",
    "sprite_add_ext_error_cancelled",
    "sprite_add_ext_error_decompressfailed",
    "sprite_add_ext_error_loadfailed",
    "sprite_add_ext_error_setupfailed",
    "sprite_add_ext_error_spritenotfound",
    "sprite_add_ext_error_unknown",
    "spritespeed_framespergameframe",
    "spritespeed_framespersecond",
    "surface_r16float",
    "surface_r32float",
    "surface_r8unorm",
    "surface_rg8unorm",
    "surface_rgba16float",
    "surface_rgba32float",
    "surface_rgba4unorm",
    "surface_rgba8unorm",
    "texturegroup_status_fetched",
    "texturegroup_status_loaded",
    "texturegroup_status_loading",
    "texturegroup_status_unloaded",
    "tf_anisotropic",
    "tf_linear",
    "tf_point",
    "tile_flip",
    "tile_index_mask",
    "tile_mirror",
    "tile_rotate",
    "tileset_get_name",
    "time_source_global",
    "time_source_game",
    "time_source_units_seconds",
    "time_source_units_frames",
    "time_source_expire_nearest",
    "time_source_expire_after",
    "time_source_state_initial",
    "time_source_state_active",
    "time_source_state_paused",
    "time_source_state_stopped",
    "timezone_local",
    "timezone_utc",
    "tm_countvsyncs",
    "tm_sleep",
    "tm_systemtiming",
    "true",
    "ty_real",
    "ty_string",
    "undefined",
    "vertex_type_color",
    "vertex_type_colour",
    "vertex_type_float1",
    "vertex_type_float2",
    "vertex_type_float3",
    "vertex_type_float4",
    "vertex_type_ubyte4",
    "vertex_usage_binormal",
    "vertex_usage_blendindices",
    "vertex_usage_blendweight",
    "vertex_usage_color",
    "vertex_usage_colour",
    "vertex_usage_depth",
    "vertex_usage_fog",
    "vertex_usage_normal",
    "vertex_usage_position",
    "vertex_usage_psize",
    "vertex_usage_sample",
    "vertex_usage_tangent",
    "vertex_usage_texcoord",
    "video_format_rgba",
    "video_format_yuv",
    "video_status_closed",
    "video_status_paused",
    "video_status_playing",
    "video_status_preparing",
    "vk_add",
    "vk_alt",
    "vk_anykey",
    "vk_backspace",
    "vk_control",
    "vk_decimal",
    "vk_delete",
    "vk_divide",
    "vk_down",
    "vk_end",
    "vk_enter",
    "vk_escape",
    "vk_f1",
    "vk_f10",
    "vk_f11",
    "vk_f12",
    "vk_f2",
    "vk_f3",
    "vk_f4",
    "vk_f5",
    "vk_f6",
    "vk_f7",
    "vk_f8",
    "vk_f9",
    "vk_home",
    "vk_insert",
    "vk_lalt",
    "vk_lcontrol",
    "vk_left",
    "vk_lshift",
    "vk_multiply",
    "vk_nokey",
    "vk_numpad0",
    "vk_numpad1",
    "vk_numpad2",
    "vk_numpad3",
    "vk_numpad4",
    "vk_numpad5",
    "vk_numpad6",
    "vk_numpad7",
    "vk_numpad8",
    "vk_numpad9",
    "vk_pagedown",
    "vk_pageup",
    "vk_pause",
    "vk_printscreen",
    "vk_ralt",
    "vk_rcontrol",
    "vk_return",
    "vk_right",
    "vk_rshift",
    "vk_shift",
    "vk_space",
    "vk_subtract",
    "vk_tab",
    "vk_up",
  ];
  // many of these look like enumerables to me (see comments below)
  const LANGUAGE_VARIABLES = [
    "wallpaper_config", 
    "wallpaper_subscription_data", 
    "argument",
    "argument0",
    "argument1",
    "argument2",
    "argument3",
    "argument4",
    "argument5",
    "argument6",
    "argument7",
    "argument8",
    "argument9",
    "argument10",
    "argument11",
    "argument12",
    "argument13",
    "argument14",
    "argument15",
    "argument_count",
    "x",
    "y",
    "xprevious",
    "yprevious",
    "xstart",
    "ystart",
    "hspeed",
    "vspeed",
    "direction",
    "display_aa",
    "drawn_by_sequence",
    "font_texture_page_size",
    "speed",
    "friction",
    "gravity",
    "gravity_direction",
    "path_index",
    "path_position",
    "path_positionprevious",
    "path_speed",
    "path_scale",
    "path_orientation",
    "path_endaction",
    "object_index",
    "id",
    "image_alpha",
    "image_angle",
    "image_blend",
    "image_index",
    "image_number",
    "image_speed",
    "image_xscale",
    "image_yscale",
    "in_collision_tree",
    "in_sequence",
    "solid",
    "persistent",
    "mask_index",
    "depth",
    "visible",
    "layer",
    "instance_count",
    "instance_id",
    "fps",
    "fps_real",
    "current_time",
    "current_year",
    "current_month",
    "current_day",
    "current_weekday",
    "current_hour",
    "current_minute",
    "current_second",
    "alarm",
    "timeline_index",
    "timeline_position",
    "timeline_speed",
    "timeline_running",
    "timeline_loop",
    "room",
    "room_first",
    "room_last",
    "room_width",
    "room_height",
    "room_caption",
    "room_persistent",
    "score",
    "lives",
    "health",
    "application_surface",
    "keyboard_key",
    "keyboard_lastchar",
    "keyboard_lastkey",
    "keyboard_string",
    "mouse_x",
    "mouse_y",
    "mouse_button",
    "mouse_lastbutton",
    "cursor_sprite",
    "sprite_index",
    "sprite_width",
    "sprite_height",
    "sprite_xoffset",
    "sprite_yoffset",
    "bbox_left",
    "bbox_right",
    "bbox_top",
    "bbox_bottom",
    "view_enabled",
    "view_current",
    "view_visible",
    "view_xview",
    "view_yview",
    "view_wview",
    "view_hview",
    "view_xport",
    "view_yport",
    "view_wport",
    "view_hport",
    "view_angle",
    "view_hborder",
    "view_vborder",
    "view_hspeed",
    "view_vspeed",
    "view_object",
    "view_surface_id",
    "view_camera",
    "game_id",
    "game_display_name",
    "game_project_name",
    "game_save_id",
    "working_directory",
    "temp_directory",
    "program_directory",
    "browser_width",
    "browser_height",
    "os_type",
    "os_device",
    "os_browser",
    "os_version",
    "async_load",
    "delta_time",
    "webgl_enabled",
    "event_data",
    "phy_rotation",
    "phy_position_x",
    "phy_position_y",
    "phy_angular_velocity",
    "phy_linear_velocity_x",
    "phy_linear_velocity_y",
    "phy_speed_x",
    "phy_speed_y",
    "phy_speed",
    "phy_angular_damping",
    "phy_linear_damping",
    "phy_bullet",
    "phy_fixed_rotation",
    "phy_active",
    "phy_mass",
    "phy_inertia",
    "phy_com_x",
    "phy_com_y",
    "phy_dynamic",
    "phy_kinematic",
    "phy_sleeping",
    "phy_collision_points",
    "phy_collision_x",
    "phy_collision_y",
    "phy_col_normal_x",
    "phy_col_normal_y",
    "phy_position_xprevious",
    "phy_position_yprevious",
    "player_id",
    "player_local",
    "player_avatar_url",
    "player_avatar_sprite",
    "player_user_id",
    "player_type",
    "managed",
    "rollback_current_frame",
    "rollback_event_id",
    "rollback_event_param",
    "rollback_game_running",
    "rollback_confirmed_frame",
    "rollback_api_server",
    "player_avatar_sprite",
    "player_avatar_url",
    "player_user_id",
    "player_type"
  ];
  /**
   * Regex for some sort of identifier - i.e, a valid name of something in code.
   */
  const VALID_IDENTIFIER_RE = /[a-zA-Z_][a-zA-Z0-9_]*/;
  /**
   * Regex for a dot separating some LHS and RHS expression with optional whitespace (as this is
   * supported in the engine.)
   */
  const DOT_ACCESSOR_RE = /\b\.\b/;

  /**
   * Expressions, which form part of a valid statement.
   * @type {Object[]}
   */
  const EXPRESSION = [];

  /**
   * A single-line comment.
   */
  const COMMENT_LINE = hljs.COMMENT('//', /$/);

  const JSDOC_TYPE_PARAM_RE = /{ *?[a-zA-Z_][a-zA-Z0-9_\.<>\|]*? *?} *?/;

  const JSDOC_ANNOTATIONS = [
    {
      match: /@((desc(ription)?)|ignore|pure|deprecated|(func(tion)?))\b/,
      scope: "doctag"
    },
    {
      match: [
        /@(self|context) *?/,
        JSDOC_TYPE_PARAM_RE
      ],
      scope: {
        1: "doctag",
        2: "type",
      }
    },
    {
      match: [
        /(@return)s? *?/,
        JSDOC_TYPE_PARAM_RE
      ],
      scope: {
        1: "doctag",
        2: "type",
      }
    },
    {
      match: [
        /@((param(eter)?)|arg(ument)?) *?/,
        JSDOC_TYPE_PARAM_RE,
        /\[?/,
        VALID_IDENTIFIER_RE,
        /(( *=[^\n]+?)?\])? *?/
      ],
      scope: {
        1: "doctag",
        2: "type",
        3: "variable",
        4: "variable",
        5: "variable",
      }
    }
  ];

  /**
   * A comment that documents a function using the same style as JSDoc for JavaScript.
   */
  const COMMENT_JSDOC = {
    begin: /\/\/\//,
    end: /$/,
    scope: "comment",
    contains: JSDOC_ANNOTATIONS
  };

  /**
   * A comment that documents a function using the same style as JSDoc for JavaScript.
   */
  const COMMENT_BLOCK_JSDOC = {
    begin: /\/\*\*/,
    end: /\*\//,
    scope: "comment",
    contains: JSDOC_ANNOTATIONS
  };

  /**
   * Modes for the types of comments supported in GML.
   */
  const COMMENT = {
    variants: [
      COMMENT_JSDOC,
      COMMENT_BLOCK_JSDOC,
      COMMENT_LINE,
      hljs.C_BLOCK_COMMENT_MODE,
    ]
  };

  /**
   * A template string substitution. `contains` is filled in after `EXPRESSION` is defined due to
   * nesting.
   */
  const STRING_SUBSTITUTION = {
    begin: /{/,
    end: /}/,
    beginScope: "subst",
    endScope: "subst",
    contains: EXPRESSION
  };

  /**
   * A template string substitution for use with the older `string()` optional args with `"{0}"`,
   * etc.
   */
  const STRING_NUMERICAL_SUBSTITUTION = {
    match: /{[0-9]+}/,
    scope: "subst"
  };

  /**
   * An escape sequence in a string.
   */
  const STRING_ESCAPE = {
    scope: "char.escape",
    variants: [
      { match: /\\u[a-fA-F0-9]{1,6}/ },
      { match: /\\[^\n]/ }
    ]
  };

  /**
   * Various types of strings supported in the engine.
   */
  const STRING = {
    variants: [
      {
        begin: /\$"/,
        end: "\"",
        beginScope: "string",
        endScope: "string",
        contains: [
          STRING_ESCAPE,
          STRING_SUBSTITUTION,
          {
            match: /[^\n"{]/,
            scope: "string"
          }
        ]
      },
      {
        scope: "string",
        begin: "@'",
        end: "'",
        contains: [STRING_NUMERICAL_SUBSTITUTION]
      },
      {
        scope: "string",
        begin: "@\"",
        end: "\"",
        contains: [STRING_NUMERICAL_SUBSTITUTION]
      },
      {
        scope: "string",
        begin: /"/,
        end: /"/,
        illegal: "\\n",
        contains: [
          STRING_ESCAPE, 
          STRING_NUMERICAL_SUBSTITUTION
        ]
      }
    ]
  };

  /**
   * Various representations of numbers
   */
  const NUMBER = {
    scope: "number",
    variants: [
      { match: /(\B|^)\$[0-9a-fA-F]+/ },
      { match: /(\B|^)#[0-9a-fA-F]+/ },
      { match: /\b0x[0-9a-fA-F][0-9a-fA-F_]*/ },
      { match: /\b0b[01][01_]*/ },
      { match: /\b[0-9][0-9_.]*/ }
    ]
  };

  const COMMENT_LINE_INNER = {
    match: /[^\n]+/,
    scope: "comment"
  };

  /**
   * Dot accessor usage with a special highlighting case for `global`.
   */
  const PROP_ACCESS = [
    {
      match: [
        "global",
        DOT_ACCESSOR_RE,
        VALID_IDENTIFIER_RE
      ],
      scope: {
        1: "literal",
        3: "property"
      }
    },
    {
      match: [
        DOT_ACCESSOR_RE,
        VALID_IDENTIFIER_RE,
        /\s*\(/
      ],
      scope: {
        2: "title.function.invoke"
      }
    },
    {
      match: [
        DOT_ACCESSOR_RE,
        VALID_IDENTIFIER_RE
      ],
      scope: {
        2: "property"
      }
    },
  ];

  /**
   * Function call sites, just looking for `<ident>(`. This creates false positives
   * for keywords such as `if (<condition>)`, so has lower priority in the mode `contains` list.
   */
  const FUNCTION_CALL = {
    begin: [
      VALID_IDENTIFIER_RE,
      /\s*?/,
      /\(/
    ],
    scope: {
      1: "title.function.invoke"
    }
  };

  /**
   * The manual likes using `obj_` and such to define assets. Sneaky trick to make it look nicer :P
   */
  const USER_ASSET_CONSTANT = {
    scope: "variable.constant",
    end: VALID_IDENTIFIER_RE,
    variants: [
      { begin: "spr_" },
      { begin: "obj_" },
    ]
  };

  /**
   * A ternary expression, matching partial ternary as `? <EXPRESSION> :`.
   * Effectively exists to prevent {@link STRUCT_LITERAL_MEMBER} from stealing `<EXPRESSION> :`.
   */
  const TERNARY = {
    begin: /\?/,
    end: /:/,
    contains: EXPRESSION
  };

  const SWITCH_CASE = {
    begin: [
      /case/,
      /\s+/
    ],
    end: /:/,
    scope: {
      1: "keyword"
    },
    contains: EXPRESSION
  };
  
  /**
   * A struct variable declaration, of `<ident>:`
   */
  const STRUCT_LITERAL_MEMBER = {
    match: [
      /\b/,
      VALID_IDENTIFIER_RE,
      /\s*:/
    ],
    scope: {
      2: "variable"
    },
  };

  /**
   * A function declaration matching for:
   * ```gml
   * function <ident>(
   * ```
   */
  const FUNCTION_DECLARATION = {
    match: [
      "function",
      /\s+/,
      VALID_IDENTIFIER_RE,
      /\s*?\(/
    ],
    scope: {
      1: "keyword",
      3: "title.function"
    }
  };

  /**
   * An enum definition in the form:
   * ```gml
   * enum <ident> {
   *     <ident> [= <expr>][,]
   * }
   * ```
   */
  const ENUM_DEFINITION = {
    begin: [
      /enum/,
      /\s+/,
      VALID_IDENTIFIER_RE,
      /\s*{/
    ],
    end: "}",
    scope: {
      1: "keyword",
      3: "variable.constant"
    },
    contains: [
      COMMENT,
      {
        begin: [
          VALID_IDENTIFIER_RE,
          /\s*=\s*/
        ],
        end: /,|$|}/,
        scope: {
          1: "variable.constant"
        },
        contains: EXPRESSION
      },
      {
        match: VALID_IDENTIFIER_RE,
        scope: "variable.constant"
      }
    ]
  };

  EXPRESSION.push(
    STRING,
    TERNARY,
    PROP_ACCESS,
    NUMBER,
    FUNCTION_CALL,
    USER_ASSET_CONSTANT,
    {
      match: VALID_IDENTIFIER_RE,
      keywords: {
        keyword: KEYWORDS,
        literal: LITERALS,
        symbol: LANGUAGE_VARIABLES
      },
    }
  );

  /**
   * Pre-processor modes for macro definitions and regions.
   */
  const PREPROCESSOR = {
    end: /$/,
    variants: [
      {
        begin: [
          /#macro\s+/,
          VALID_IDENTIFIER_RE
        ],
        scope: {
          1: "keyword",
          2: "variable.constant"
        },
        contains: [
          ...EXPRESSION,
          COMMENT,
          {
            match: /\\\n/
          }
        ]
      },
      {
        begin: "#define"
      },
      {
        begin: /#(end)?region\b/,
        beginScope: "keyword",
        contains: [COMMENT_LINE_INNER]
      },
    ]
  };

  return {
    name: 'GML',
    keywords: {
      keyword: KEYWORDS,
      literal: LITERALS,
      "variable.language": LANGUAGE_VARIABLES
    },
    contains: [
      COMMENT,
      PREPROCESSOR,
      NUMBER,
      STRING,
      ENUM_DEFINITION,
      SWITCH_CASE,
      {
        // Prevent keywords being taken by function calls.
        beginKeywords: KEYWORDS.join(" ")
      },
      TERNARY,
      STRUCT_LITERAL_MEMBER,
      FUNCTION_DECLARATION,
      FUNCTION_CALL,
      USER_ASSET_CONSTANT,
      PROP_ACCESS
    ]
  };
}
