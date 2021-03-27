/*
Language: SQF
Author: Søren Enevoldsen <senevoldsen90@gmail.com>
Contributors: Marvin Saignat <contact@zgmrvn.com>, Dedmen Miller <dedmen@dedmen.de>
Description: Scripting language for the Arma game series
Website: https://community.bistudio.com/wiki/SQF_syntax
Category: scripting
Last Updated: 27.03.2021, Arma 3 Version 2.02
*/

export default function(hljs) {
  // In SQF, a variable start with _
  const VARIABLE = {
    className: 'variable',
    begin: /\b_+[a-zA-Z]\w*/
  };

  // In SQF, a function should fit myTag_fnc_myFunction pattern
  // https://community.bistudio.com/wiki/Functions_Library_(Arma_3)#Adding_a_Function
  const FUNCTION = {
    className: 'title',
    begin: /[a-zA-Z][a-zA-Z0-9]+_fnc_\w*/
  };

  // In SQF strings, quotes matching the start are escaped by adding a consecutive.
  // Example of single escaped quotes: " "" " and  ' '' '.
  const STRINGS = {
    className: 'string',
    variants: [
      {
        begin: '"',
        end: '"',
        contains: [ {
          begin: '""',
          relevance: 0
        } ]
      },
      {
        begin: '\'',
        end: '\'',
        contains: [ {
          begin: '\'\'',
          relevance: 0
        } ]
      }
    ]
  };

  // list of keywords from:
  // https://community.bistudio.com/wiki/PreProcessor_Commands
  const PREPROCESSOR = {
    className: 'meta',
    begin: /#\s*[a-z]+\b/,
    end: /$/,
    keywords: {
      'meta-keyword':
        'define undef ifdef ifndef else endif include'
    },
    contains: [
      {
        begin: /\\\n/,
        relevance: 0
      },
      hljs.inherit(STRINGS, {
        className: 'meta-string'
      }),
      {
        className: 'meta-string',
        begin: /<[^\n>]*>/,
        end: /$/,
        illegal: '\\n'
      },
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE
    ]
  };

  return {
    name: 'SQF',
    case_insensitive: true,
    keywords: {
      keyword:
        'case catch default do else exit exitWith for forEach from if ' +
        'private switch then throw to try waitUntil while with',
      built_in:
        'acctime acos action actionids actionkeys ' +
        'actionkeysnames actionkeysnamesarray actionname actionparams activateaddons ' +
        'activatekey add3denconnection add3deneventhandler add3denlayer addaction ' +
        'addbackpackcargo addbackpackcargoglobal addbackpackglobal addbinocularitem addcamshake ' +
        'addcuratorcameraarea addcuratoreditableobjects addcuratoreditingarea addcuratorpoints addeditorobject ' +
        'addforce addforcegeneratorrtd addgoggles addgroupicon addhandgunitem ' +
        'additem additemcargo additemcargoglobal additempool additemtobackpack ' +
        'additemtovest addlivestats addmagazine addmagazineammocargo addmagazinecargo ' +
        'addmagazineglobal addmagazinepool addmagazines addmagazineturret addmenu ' +
        'addmissioneventhandler addmpeventhandler addmusiceventhandler addonfiles addownedmine ' +
        'addprimaryweaponitem addpublicvariableeventhandler addrating addresources addscore ' +
        'addsecondaryweaponitem addswitchableunit addteammember addtoremainscollector addtorque ' +
        'addvehicle addvest addwaypoint addweapon addweaponcargo ' +
        'addweaponglobal addweaponitem addweaponpool addweaponturret addweaponwithattachmentscargo ' +
        'admin agent agents agltoasl aimedattarget ' +
        'airdensitycurvertd airdensityrtd airplanethrottle airportside aisfinishheal ' +
        'all3denentities allactivetitleeffects alladdonsinfo allairports allcontrols ' +
        'allcutlayers alldead alldeadmen alldisplays allgroups ' +
        'allmines allmissionobjects allow3dmode allowcrewinimmobile allowcuratorlogicignoreareas ' +
        'allowdammage allowfileoperations allowfleeing allowgetin allowsprint ' +
        'allsimpleobjects allsites allturrets allunits allunitsuav ' +
        'ammo ammoonpylon and animate animatebay ' +
        'animatepylon animatesource animationnames animationphase animationsourcephase ' +
        'append apply armorypoints arrayintersect asin ' +
        'asltoatl assert assignascargo assignascargoindex assignascommander ' +
        'assignasgunner assignasturret assigncurator assignedcargo assignedcommander ' +
        'assignedgunner assigneditems assignedtarget assignedteam assignedvehicle ' +
        'assignitem assignteam assigntoairport atan atan2 ' +
        'atltoasl attachedobject attachedobjects attachedto attachobject ' +
        'attackenabled backpack backpackcargo backpackcontainer backpackitems ' +
        'backpackspacefor behaviour benchmark bezierinterpolation binocular ' +
        'binocularmagazine boundingbox boundingboxreal boundingcenter break ' +
        'breakto breakwith briefingname buildingexit buildingpos ' +
        'buldozer_isenabledroaddiag buldozer_loadnewroads buldozer_reloadopermap buttonaction buttonsetaction ' +
        'calculatepath calculateplayervisibilitybyfriendly call callextension camcommand ' +
        'camcommitprepared camcommitted camconstuctionsetparams camcreate camdestroy ' +
        'cameraeffectenablehud camerainterest cameraon cameraview campaignconfigfile ' +
        'campreloaded campreparebank campreparedir campreparedive campreparefocus ' +
        'campreparefovrange campreparepos campreparerelpos campreparetarget camsetbank ' +
        'camsetdive camsetfocus camsetfov camsetfovrange camsetpos ' +
        'camsettarget camtarget camusenvg canadd canadditemtobackpack ' +
        'canadditemtovest cancelsimpletaskdestination canfire canmove canslingload ' +
        'cansuspend cantriggerdynamicsimulation canunloadincombat canvehiclecargo captive ' +
        'cbchecked cbsetchecked ceil channelenabled cheatsenabled ' +
        'checkvisibility classname clear3denattribute clear3deninventory clearallitemsfrombackpack ' +
        'clearbackpackcargoglobal clearforcesrtd cleargroupicons clearitemcargo clearitemcargoglobal ' +
        'clearmagazinecargo clearmagazinecargoglobal clearmagazinepool clearoverlay clearradio ' +
        'clearweaponcargoglobal clearweaponpool clientowner closedialog closedisplay ' +
        'collapseobjecttree collect3denhistory collectivertd combatmode commandartilleryfire ' +
        'commander commandfire commandfollow commandfsm commandgetout ' +
        'commandmove commandradio commandstop commandsuppressivefire commandtarget ' +
        'comment commitoverlay compile compilefinal compilescript ' +
        'composetext configclasses configfile confighierarchy configname ' +
        'configof configproperties configsourceaddonlist configsourcemod configsourcemodlist ' +
        'connectterminaltouav connecttoserver continue continuewith controlnull ' +
        'copyfromclipboard copytoclipboard copywaypoints cos count ' +
        'countfriendly countside counttype countunknown create3dencomposition ' +
        'createagent createcenter createdialog creatediarylink creatediaryrecord ' +
        'createdisplay creategeardialog creategroup createguardedpoint createhashmap ' +
        'createlocation createmarker createmarkerlocal createmenu createmine ' +
        'creatempcampaigndisplay createsimpleobject createsimpletask createsite createsoundsource ' +
        'createteam createtrigger createunit createvehicle createvehiclecrew ' +
        'crew ctaddheader ctaddrow ctclear ctcursel ' +
        'ctfindheaderrows ctfindrowheader ctheadercontrols ctheadercount ctremoveheaders ' +
        'ctrlactivate ctrladdeventhandler ctrlangle ctrlanimatemodel ctrlanimationphasemodel ' +
        'ctrlautoscrollrewind ctrlautoscrollspeed ctrlchecked ctrlclassname ctrlcommit ' +
        'ctrlcreate ctrldelete ctrlenable ctrlenabled ctrlfade ' +
        'ctrlhtmlloaded ctrlidc ctrlidd ctrlmapanimadd ctrlmapanimclear ' +
        'ctrlmapanimdone ctrlmapcursor ctrlmapmouseover ctrlmapscale ctrlmapscreentoworld ' +
        'ctrlmodel ctrlmodeldirandup ctrlmodelscale ctrlmouseposition ctrlparent ' +
        'ctrlposition ctrlremovealleventhandlers ctrlremoveeventhandler ctrlscale ctrlscrollvalues ' +
        'ctrlsetangle ctrlsetautoscrolldelay ctrlsetautoscrollrewind ctrlsetautoscrollspeed ctrlsetbackgroundcolor ' +
        'ctrlsetdisabledcolor ctrlseteventhandler ctrlsetfade ctrlsetfocus ctrlsetfont ' +
        'ctrlsetfonth1b ctrlsetfonth2 ctrlsetfonth2b ctrlsetfonth3 ctrlsetfonth3b ' +
        'ctrlsetfonth4b ctrlsetfonth5 ctrlsetfonth5b ctrlsetfonth6 ctrlsetfonth6b ' +
        'ctrlsetfontheighth1 ctrlsetfontheighth2 ctrlsetfontheighth3 ctrlsetfontheighth4 ctrlsetfontheighth5 ' +
        'ctrlsetfontheightsecondary ctrlsetfontp ctrlsetfontpb ctrlsetfontsecondary ctrlsetforegroundcolor ' +
        'ctrlsetmodeldirandup ctrlsetmodelscale ctrlsetmouseposition ctrlsetpixelprecision ctrlsetposition ' +
        'ctrlsetpositionw ctrlsetpositionx ctrlsetpositiony ctrlsetscale ctrlsetscrollvalues ' +
        'ctrlsettext ctrlsettextcolor ctrlsettextcolorsecondary ctrlsettextsecondary ctrlsettextselection ' +
        'ctrlsettooltipcolorbox ctrlsettooltipcolorshade ctrlsettooltipcolortext ctrlseturl ctrlshow ' +
        'ctrlstyle ctrltext ctrltextcolor ctrltextheight ctrltextsecondary ' +
        'ctrltextwidth ctrltooltip ctrltype ctrlurl ctrlvisible ' +
        'ctrowcount ctsetcursel ctsetdata ctsetheadertemplate ctsetrowtemplate ' +
        'ctvalue curatoraddons curatorcamera curatorcameraarea curatorcameraareaceiling ' +
        'curatoreditableobjects curatoreditingarea curatoreditingareatype curatormouseover curatorpoints ' +
        'curatorselected curatorwaypointcost current3denoperation currentchannel currentcommand ' +
        'currentmagazinedetail currentmagazinedetailturret currentmagazineturret currentmuzzle currentnamespace ' +
        'currenttask currenttasks currentthrowable currentvisionmode currentwaypoint ' +
        'currentweaponmode currentweaponturret currentzeroing cursorobject cursortarget ' +
        'customradio customwaypointposition cutfadeout cutobj cutrsc ' +
        'damage date datetonumber daytime deactivatekey ' +
        'debugfsm debuglog decaygraphvalues deg delete3denentities ' +
        'deletecenter deletecollection deleteeditorobject deletegroup deletegroupwhenempty ' +
        'deletelocation deletemarker deletemarkerlocal deleterange deleteresources ' +
        'deletestatus deleteteam deletevehicle deletevehiclecrew deletewaypoint ' +
        'detectedmines diag_activemissionfsms diag_activescripts diag_activesqfscripts diag_activesqsscripts ' +
        'diag_codeperformance diag_deltatime diag_dynamicsimulationend diag_fps diag_fpsmin ' +
        'diag_lightnewload diag_log diag_scope diag_setlightnew diag_ticktime ' +
        'diaryrecordnull diarysubjectexists didjip didjipowner difficulty ' +
        'difficultyenabledrtd difficultyoption direction directsay disableai ' +
        'disableconversation disabledebriefingstats disablemapindicators disablenvgequipment disableremotesensors ' +
        'disabletiequipment disableuavconnectability disableuserinput displayaddeventhandler displayctrl ' +
        'displayparent displayremovealleventhandlers displayremoveeventhandler displayseteventhandler dissolveteam ' +
        'distance2d distancesqr distributionregion do3denaction doartilleryfire ' +
        'dofollow dofsm dogetout domove doorphase ' +
        'dosuppressivefire dotarget dowatch drawarrow drawellipse ' +
        'drawicon3d drawline drawline3d drawlink drawlocation ' +
        'drawrectangle drawtriangle driver drop dynamicsimulationdistance ' +
        'dynamicsimulationenabled dynamicsimulationsystemenabled echo edit3denmissionattributes editobject ' +
        'effectivecommander elevateperiscope emptypositions enableai enableaifeature ' +
        'enableattack enableaudiofeature enableautostartuprtd enableautotrimrtd enablecamshake ' +
        'enablechannel enablecollisionwith enablecopilot enabledebriefingstats enablediaglegend ' +
        'enabledynamicsimulationsystem enableenddialog enableengineartillery enableenvironment enablefatigue ' +
        'enableinfopanelcomponent enableirlasers enablemimics enablepersonturret enableradio ' +
        'enableropeattach enablesatnormalondetail enablesaving enablesentences enablesimulation ' +
        'enablestamina enablestressdamage enableteamswitch enabletraffic enableuavconnectability ' +
        'enablevehiclecargo enablevehiclesensor enableweapondisassembly endloadingscreen endmission ' +
        'enginesisonrtd enginespowerrtd enginesrpmrtd enginestorquertd entities ' +
        'estimatedendservertime estimatedtimeleft evalobjectargument everybackpack everycontainer ' +
        'execeditorscript execfsm execvm exitwith exp ' +
        'exportjipmessages eyedirection eyepos face faction ' +
        'faderadio fadesound fadespeech failmission fileexists ' +
        'find findcover finddisplay findeditorobject findemptyposition ' +
        'findif findnearestenemy finishmissioninit finite fire ' +
        'firstbackpack flag flaganimationphase flagowner flagside ' +
        'flatten fleeing floor flyinheight flyinheightasl ' +
        'fogforecast fogparams forceadduniform forceatpositionrtd forcecadetdifficulty ' +
        'forceend forceflagtexture forcefollowroad forcegeneratorrtd forcemap ' +
        'forcespeed forceunicode forcewalk forceweaponfire forceweatherchange ' +
        'foreachmember foreachmemberagent foreachmemberteam forgettarget format ' +
        'formationdirection formationleader formationmembers formationposition formationtask ' +
        'formleader freelook fromeditor fuel fullcrew ' +
        'gearslotammocount gearslotdata get get3denactionstate get3denattribute ' +
        'get3denconnections get3denentity get3denentityid get3dengrid get3deniconsvisible ' +
        'get3denlinesvisible get3denmissionattribute get3denmouseover get3denselected getaimingcoef ' +
        'getallhitpointsdamage getallownedmines getallpylonsinfo getallsoundcontrollers getallunittraits ' +
        'getanimaimprecision getanimspeedcoef getarray getartilleryammo getartillerycomputersettings ' +
        'getassetdlcinfo getassignedcuratorlogic getassignedcuratorunit getattacktarget getaudiooptionvolumes ' +
        'getbleedingremaining getburningvalue getcalculateplayervisibilitybyfriendly getcameraviewdirection getcargoindex ' +
        'getclientstate getclientstatenumber getcompatiblepylonmagazines getconnecteduav getcontainermaxload ' +
        'getcustomaimcoef getcustomsoundcontroller getcustomsoundcontrollercount getdammage getdescription ' +
        'getdirvisual getdiverstate getdlcassetsusage getdlcassetsusagebyname getdlcs ' +
        'geteditorcamera geteditormode geteditorobjectscope getelevationoffset getenginetargetrpmrtd ' +
        'getfatigue getfieldmanualstartpage getforcedflagtexture getfriend getfsmvariable ' +
        'getgraphvalues getgroupicon getgroupiconparams getgroupicons gethidefrom ' +
        'gethitindex gethitpointdamage getitemcargo getlighting getlightingat ' +
        'getmagazinecargo getmarkercolor getmarkerpos getmarkersize getmarkertype ' +
        'getmissionconfig getmissionconfigvalue getmissiondlcs getmissionlayerentities getmissionlayers ' +
        'getmodelinfo getmouseposition getmusicplayedtime getnumber getobjectargument ' +
        'getobjectdlc getobjectfov getobjectmaterials getobjectproxy getobjectscale ' +
        'getobjecttype getobjectviewdistance getordefault getoxygenremaining getpersonuseddlcs ' +
        'getpilotcameraposition getpilotcamerarotation getpilotcameratarget getplatenumber getplayerchannel ' +
        'getplayerscores getplayeruid getplayervonvolume getpos getposasl ' +
        'getposaslw getposatl getposatlvisual getposvisual getposworld ' +
        'getpylonmagazines getreldir getrelpos getremotesensorsdisabled getrepaircargo ' +
        'getroadinfo getrotorbrakertd getshadowdistance getshotparents getslingload ' +
        'getsoundcontrollerresult getspeed getstamina getstatvalue getsteamfriendsservers ' +
        'getsuppression getterraingrid getterrainheightasl gettext gettextraw ' +
        'gettotaldlcusagetime gettrimoffsetrtd getunitloadout getunittrait getusermfdtext ' +
        'getvariable getvehiclecargo getvehicletipars getweaponcargo getweaponsway ' +
        'getwingspositionrtd getwppos glanceat globalchat globalradio ' +
        'goto group groupchat groupfromnetid groupiconselectable ' +
        'groupid groupowner groupradio groupselectedunits groupselectunit ' +
        'gunner gusts halt handgunitems handgunmagazine ' +
        'handshit hasinterface haspilotcamera hasweapon hcallgroups ' +
        'hcleader hcremoveallgroups hcremovegroup hcselected hcselectgroup ' +
        'hcshowbar hcshownbar headgear hidebody hideobject ' +
        'hideselection hint hintc hintcadet hintsilent ' +
        'hostmission htmlload hudmovementlevels humidity image ' +
        'importance in inarea inareaarray incapacitatedstate ' +
        'inflamed infopanel infopanelcomponentenabled infopanelcomponents infopanels ' +
        'inheritsfrom initambientlife inpolygon inputaction inrangeofartillery ' +
        'inserteditorobject intersect is3den is3denmultiplayer is3denpreview ' +
        'isactionmenuvisible isagent isaimprecisionenabled isarray isautohoveron ' +
        'isautostartupenabledrtd isautotest isautotrimonrtd isbleeding isburning ' +
        'iscollisionlighton iscopilotenabled isdamageallowed isdedicated isdlcavailable ' +
        'isequalto isequaltype isequaltypeall isequaltypeany isequaltypearray ' +
        'isfilepatchingenabled isfinal isflashlighton isflatempty isforcedwalk ' +
        'isgamefocused isgamepaused isgroupdeletedwhenempty ishidden isinremainscollector ' +
        'isirlaseron iskeyactive iskindof islaseron islighton ' +
        'ismanualfire ismarkedforcollection ismultiplayer ismultiplayersolo isnil ' +
        'isnull isnumber isobjecthidden isobjectrtd isonroad ' +
        'isplayer isrealtime isremoteexecuted isremoteexecutedjip issensortargetconfirmed ' +
        'isshowing3dicons issimpleobject issprintallowed isstaminaenabled issteammission ' +
        'isstressdamageenabled istext istouchingground isturnedout istuthintsenabled ' +
        'isuavconnected isuicontext isuniformallowed isvehiclecargo isvehicleradaron ' +
        'iswalking isweapondeployed isweaponrested itemcargo items ' +
        'join joinas joinassilent joinsilent joinstring ' +
        'kbadddatabasetargets kbaddtopic kbhastopic kbreact kbremovetopic ' +
        'kbwassaid keyimage keyname keys knowsabout ' +
        'landat landresult language lasertarget lbadd ' +
        'lbcolor lbcolorright lbcursel lbdata lbdelete ' +
        'lbpicture lbpictureright lbselection lbsetcolor lbsetcolorright ' +
        'lbsetdata lbsetpicture lbsetpicturecolor lbsetpicturecolordisabled lbsetpicturecolorselected ' +
        'lbsetpicturerightcolor lbsetpicturerightcolordisabled lbsetpicturerightcolorselected lbsetselectcolor lbsetselectcolorright ' +
        'lbsettext lbsettextright lbsettooltip lbsetvalue lbsize ' +
        'lbsortbyvalue lbtext lbtextright lbvalue leader ' +
        'leaderboardgetrows leaderboardinit leaderboardrequestrowsfriends leaderboardrequestrowsglobal leaderboardrequestrowsglobalarounduser ' +
        'leaderboardsrequestuploadscorekeepbest leaderboardstate leavevehicle librarycredits librarydisclaimers ' +
        'lightattachobject lightdetachobject lightison lightnings limitspeed ' +
        'linebreak lineintersects lineintersectsobjs lineintersectssurfaces lineintersectswith ' +
        'list listobjects listremotetargets listvehiclesensors ln ' +
        'lnbaddcolumn lnbaddrow lnbclear lnbcolor lnbcolorright ' +
        'lnbdata lnbdeletecolumn lnbdeleterow lnbgetcolumnsposition lnbpicture ' +
        'lnbsetcolor lnbsetcolorright lnbsetcolumnspos lnbsetcurselrow lnbsetdata ' +
        'lnbsetpicturecolor lnbsetpicturecolorright lnbsetpicturecolorselected lnbsetpicturecolorselectedright lnbsetpictureright ' +
        'lnbsettextright lnbsettooltip lnbsetvalue lnbsize lnbsort ' +
        'lnbtext lnbtextright lnbvalue load loadabs ' +
        'loadfile loadgame loadidentity loadmagazine loadoverlay ' +
        'loaduniform loadvest local localize localnamespace ' +
        'locationposition lock lockcamerato lockcargo lockdriver ' +
        'lockedcargo lockeddriver lockedinventory lockedturret lockidentity ' +
        'lockturret lockwp log logentities lognetwork ' +
        'lookat lookatpos magazinecargo magazines magazinesallturrets ' +
        'magazinesammocargo magazinesammofull magazinesdetail magazinesdetailbackpack magazinesdetailuniform ' +
        'magazinesturret magazineturretammo mapanimadd mapanimclear mapanimcommit ' +
        'mapcenteroncamera mapgridposition markasfinishedonsteam markeralpha markerbrush ' +
        'markercolor markerdir markerpolyline markerpos markershape ' +
        'markertext markertype matrixmultiply matrixtranspose max ' +
        'menuaction menuadd menuchecked menuclear menucollapse ' +
        'menudelete menuenable menuenabled menuexpand menuhover ' +
        'menusetaction menusetcheck menusetdata menusetpicture menusetshortcut ' +
        'menuseturl menusetvalue menushortcut menushortcuttext menusize ' +
        'menutext menuurl menuvalue merge min ' +
        'minedetectedby missiletarget missiletargetpos missionconfigfile missiondifficulty ' +
        'missionnamesource missionnamespace missionstart missionversion mod ' +
        'modeltoworldvisual modeltoworldvisualworld modeltoworldworld modparams moonintensity ' +
        'morale move move3dencamera moveinany moveincargo ' +
        'moveindriver moveingunner moveinturret moveobjecttoend moveout ' +
        'moveto movetocompleted movetofailed musicvolume name ' +
        'namesound nearentities nearestbuilding nearestlocation nearestlocations ' +
        'nearestobject nearestobjects nearestterrainobjects nearobjects nearobjectsready ' +
        'nearsupplies neartargets needreload netid netobjnull ' +
        'nextmenuitemindex nextweatherchange nmenuitems not numberofenginesrtd ' +
        'objectcurators objectfromnetid objectparent objnull objstatus ' +
        'onbriefingnotes onbriefingplan onbriefingteamswitch oncommandmodechanged ondoubleclick ' +
        'ongroupiconclick ongroupiconoverenter ongroupiconoverleave onhcgroupselectionchanged onmapsingleclick ' +
        'onplayerdisconnected onpreloadfinished onpreloadstarted onshownewobject onteamswitch ' +
        'opendlcpage openmap opensteamapp openyoutubevideo or ' +
        'overcast overcastforecast owner param params ' +
        'parsesimplearray parsetext parsingnamespace particlesquality periscopeelevation ' +
        'pitch pixelgrid pixelgridbase pixelgridnouiscale pixelh ' +
        'playableslotsnumber playableunits playaction playactionnow player ' +
        'playerside playersnumber playgesture playmission playmove ' +
        'playmusic playscriptedmission playsound playsound3d position ' +
        'posscreentoworld posworldtoscreen ppeffectadjust ppeffectcommit ppeffectcommitted ' +
        'ppeffectdestroy ppeffectenable ppeffectenabled ppeffectforceinnvg precision ' +
        'preloadobject preloadsound preloadtitleobj preloadtitlersc preprocessfile ' +
        'primaryweapon primaryweaponitems primaryweaponmagazine priority processdiarylink ' +
        'profilename profilenamespace profilenamesteam progressloadingscreen progressposition ' +
        'publicvariable publicvariableclient publicvariableserver pushback pushbackunique ' +
        'queryitemspool querymagazinepool queryweaponpool rad radiochanneladd ' +
        'radiochannelinfo radiochannelremove radiochannelsetcallsign radiochannelsetlabel radiovolume ' +
        'rainbow random rank rankid rating ' +
        'registeredtasks registertask reload reloadenabled remotecontrol ' +
        'remoteexeccall remoteexecutedowner remove3denconnection remove3deneventhandler remove3denlayer ' +
        'removeall3deneventhandlers removeallactions removeallassigneditems removeallbinocularitems removeallcontainers ' +
        'removeallcuratorcameraareas removeallcuratoreditingareas removealleventhandlers removeallhandgunitems removeallitems ' +
        'removeallmissioneventhandlers removeallmpeventhandlers removeallmusiceventhandlers removeallownedmines removeallprimaryweaponitems ' +
        'removeallweapons removebackpack removebackpackglobal removebinocularitem removecuratoraddons ' +
        'removecuratoreditableobjects removecuratoreditingarea removediaryrecord removediarysubject removedrawicon ' +
        'removeeventhandler removefromremainscollector removegoggles removegroupicon removehandgunitem ' +
        'removeitem removeitemfrombackpack removeitemfromuniform removeitemfromvest removeitems ' +
        'removemagazineglobal removemagazines removemagazinesturret removemagazineturret removemenuitem ' +
        'removempeventhandler removemusiceventhandler removeownedmine removeprimaryweaponitem removesecondaryweaponitem ' +
        'removeswitchableunit removeteammember removeuniform removevest removeweapon ' +
        'removeweaponcargo removeweaponglobal removeweaponturret reportremotetarget requiredversion ' +
        'resetsubgroupdirection resize resources respawnvehicle restarteditorcamera ' +
        'revealmine reverse reversedmousey roadat roadsconnectedto ' +
        'ropeattachedobjects ropeattachedto ropeattachenabled ropeattachto ropecreate ' +
        'ropedestroy ropedetach ropeendposition ropelength ropes ' +
        'ropeunwound rotorsforcesrtd rotorsrpmrtd round runinitscript ' +
        'safezonew safezonewabs safezonex safezonexabs safezoney ' +
        'savegame saveidentity savejoysticks saveoverlay saveprofilenamespace ' +
        'savevar savingenabled say say2d say3d ' +
        'score scoreside screenshot screentoworld scriptdone ' +
        'scriptnull scudstate secondaryweapon secondaryweaponitems secondaryweaponmagazine ' +
        'selectbestplaces selectdiarysubject selectededitorobjects selecteditorobject selectionnames ' +
        'selectleader selectmax selectmin selectnoplayer selectplayer ' +
        'selectrandomweighted selectweapon selectweaponturret sendaumessage sendsimplecommand ' +
        'sendtaskresult sendudpmessage servercommand servercommandavailable servercommandexecutable ' +
        'servertime set set3denattribute set3denattributes set3dengrid ' +
        'set3denlayer set3denlinesvisible set3denlogictype set3denmissionattribute set3denmissionattributes ' +
        'set3denobjecttype set3denselected setacctime setactualcollectivertd setairplanethrottle ' +
        'setammo setammocargo setammoonpylon setanimspeedcoef setaperture ' +
        'setarmorypoints setattributes setautonomous setbehaviour setbehaviourstrong ' +
        'setbrakesrtd setcamerainterest setcamshakedefparams setcamshakeparams setcamuseti ' +
        'setcenterofmass setcollisionlight setcombatmode setcompassoscillation setconvoyseparation ' +
        'setcuratorcoef setcuratoreditingareatype setcuratorwaypointcost setcurrentchannel setcurrenttask ' +
        'setcustomaimcoef setcustommissiondata setcustomsoundcontroller setcustomweightrtd setdamage ' +
        'setdate setdebriefingtext setdefaultcamera setdestination setdetailmapblendpars ' +
        'setdir setdirection setdrawicon setdriveonpath setdropinterval ' +
        'setdynamicsimulationdistancecoef seteditormode seteditorobjectscope seteffectcondition seteffectivecommander ' +
        'setface setfaceanimation setfatigue setfeaturetype setflaganimationphase ' +
        'setflagside setflagtexture setfog setforcegeneratorrtd setformation ' +
        'setformdir setfriend setfromeditor setfsmvariable setfuel ' +
        'setgroupicon setgroupiconparams setgroupiconsselectable setgroupiconsvisible setgroupid ' +
        'setgroupowner setgusts sethidebehind sethit sethitindex ' +
        'sethorizonparallaxcoef sethudmovementlevels setidentity setimportance setinfopanel ' +
        'setlightambient setlightattenuation setlightbrightness setlightcolor setlightdaylight ' +
        'setlightflaresize setlightintensity setlightnings setlightuseflare setlocalwindparams ' +
        'setmarkeralpha setmarkeralphalocal setmarkerbrush setmarkerbrushlocal setmarkercolor ' +
        'setmarkerdir setmarkerdirlocal setmarkerpolyline setmarkerpolylinelocal setmarkerpos ' +
        'setmarkershape setmarkershapelocal setmarkersize setmarkersizelocal setmarkertext ' +
        'setmarkertype setmarkertypelocal setmass setmimic setmissiletarget ' +
        'setmouseposition setmusiceffect setmusiceventhandler setname setnamesound ' +
        'setobjectmaterial setobjectmaterialglobal setobjectproxy setobjectscale setobjecttexture ' +
        'setobjectviewdistance setovercast setowner setoxygenremaining setparticlecircle ' +
        'setparticlefire setparticleparams setparticlerandom setpilotcameradirection setpilotcamerarotation ' +
        'setpilotlight setpipeffect setpitch setplatenumber setplayable ' +
        'setplayervonvolume setpos setposasl setposasl2 setposaslw ' +
        'setposition setposworld setpylonloadout setpylonspriority setradiomsg ' +
        'setrainbow setrandomlip setrank setrectangular setrepaircargo ' +
        'setshadowdistance setshotparents setside setsimpletaskalwaysvisible setsimpletaskcustomdata ' +
        'setsimpletaskdestination setsimpletasktarget setsimpletasktype setsimulweatherlayers setsize ' +
        'setslingload setsoundeffect setspeaker setspeech setspeedmode ' +
        'setstaminascheme setstatvalue setsuppression setsystemofunits settargetage ' +
        'settaskresult settaskstate setterraingrid settext settimemultiplier ' +
        'settrafficdensity settrafficdistance settrafficgap settrafficspeed settriggeractivation ' +
        'settriggerinterval settriggerstatements settriggertext settriggertimeout settriggertype ' +
        'setunconscious setunitability setunitcombatmode setunitloadout setunitpos ' +
        'setunitrank setunitrecoilcoefficient setunittrait setunloadincombat setuseractiontext ' +
        'setusermfdvalue setvariable setvectordir setvectordirandup setvectorup ' +
        'setvehicleammodef setvehiclearmor setvehiclecargo setvehicleid setvehiclelock ' +
        'setvehicleradar setvehiclereceiveremotetargets setvehiclereportownposition setvehiclereportremotetargets setvehicletipars ' +
        'setvelocity setvelocitymodelspace setvelocitytransformation setviewdistance setvisibleiftreecollapsed ' +
        'setwaves setwaypointbehaviour setwaypointcombatmode setwaypointcompletionradius setwaypointdescription ' +
        'setwaypointformation setwaypointhouseposition setwaypointloiteraltitude setwaypointloiterradius setwaypointloitertype ' +
        'setwaypointposition setwaypointscript setwaypointspeed setwaypointstatements setwaypointtimeout ' +
        'setwaypointvisible setweaponreloadingtime setwind setwinddir setwindforce ' +
        'setwingforcescalertd setwppos show3dicons showchat showcinemaborder ' +
        'showcompass showcuratorcompass showgps showhud showlegend ' +
        'shownartillerycomputer shownchat showncompass showncuratorcompass showneweditorobject ' +
        'shownhud shownmap shownpad shownradio shownscoretable ' +
        'shownwarrant shownwatch showpad showradio showscoretable ' +
        'showuavfeed showwarrant showwatch showwaypoint showwaypoints ' +
        'sideambientlife sidechat sideempty sideenemy sidefriendly ' +
        'sideradio sideunknown simpletasks simulationenabled simulclouddensity ' +
        'simulinclouds simulweathersync sin size sizeof ' +
        'skillfinal skiptime sleep sliderposition sliderrange ' +
        'slidersetrange slidersetspeed sliderspeed slingloadassistantshown soldiermagazines ' +
        'sort soundvolume spawn speaker speed ' +
        'splitstring sqrt squadparams stance startloadingscreen ' +
        'stop stopenginertd stopped str sunormoon ' +
        'suppressfor surfaceiswater surfacenormal surfacetexture surfacetype ' +
        'switchableunits switchaction switchcamera switchgesture switchlight ' +
        'synchronizedobjects synchronizedtriggers synchronizedwaypoints synchronizeobjectsadd synchronizeobjectsremove ' +
        'synchronizewaypoint systemchat systemofunits systemtime systemtimeutc ' +
        'targetknowledge targets targetsaggregate targetsquery taskalwaysvisible ' +
        'taskcompleted taskcustomdata taskdescription taskdestination taskhint ' +
        'tasknull taskparent taskresult taskstate tasktype ' +
        'teammembernull teamname teams teamswitch teamswitchenabled ' +
        'terminate terrainintersect terrainintersectasl terrainintersectatasl text ' +
        'textlogformat tg time timemultiplier titlecut ' +
        'titleobj titlersc titletext toarray tofixed ' +
        'toloweransi tostring toupper toupperansi triggeractivated ' +
        'triggerammo triggerarea triggerattachedvehicle triggerattachobject triggerattachvehicle ' +
        'triggerinterval triggerstatements triggertext triggertimeout triggertimeoutcurrent ' +
        'trim turretlocal turretowner turretunit tvadd ' +
        'tvcollapse tvcollapseall tvcount tvcursel tvdata ' +
        'tvexpand tvexpandall tvisselected tvpicture tvpictureright ' +
        'tvsetcolor tvsetcursel tvsetdata tvsetpicture tvsetpicturecolor ' +
        'tvsetpicturecolorselected tvsetpictureright tvsetpicturerightcolor tvsetpicturerightcolordisabled tvsetpicturerightcolorselected ' +
        'tvsetselected tvsettext tvsettooltip tvsetvalue tvsort ' +
        'tvsortbyvalue tvsortbyvalueall tvtext tvtooltip tvvalue ' +
        'typename typeof uavcontrol uinamespace uisleep ' +
        'unassignitem unassignteam unassignvehicle underwater uniform ' +
        'uniformitems uniformmagazines unitaddons unitaimposition unitaimpositionvisual ' +
        'unitcombatmode unitisuav unitpos unitready unitrecoilcoefficient ' +
        'unitsbelowheight unitturret unlinkitem unlockachievement unregistertask ' +
        'updatemenuitem updateobjecttree useaiopermapobstructiontest useaisteeringcomponent useaudiotimeformoves ' +
        'vectoradd vectorcos vectorcrossproduct vectordiff vectordir ' +
        'vectordistance vectordistancesqr vectordotproduct vectorfromto vectorlinearconversion ' +
        'vectormagnitudesqr vectormodeltoworld vectormodeltoworldvisual vectormultiply vectornormalized ' +
        'vectorupvisual vectorworldtomodel vectorworldtomodelvisual vehicle vehiclecargoenabled ' +
        'vehiclemoveinfo vehicleradio vehiclereceiveremotetargets vehiclereportownposition vehiclereportremotetargets ' +
        'vehiclevarname velocity velocitymodelspace verifysignature vest ' +
        'vestitems vestmagazines viewdistance visiblecompass visiblegps ' +
        'visibleposition visiblepositionasl visiblescoretable visiblewatch waituntil ' +
        'waypointattachedobject waypointattachedvehicle waypointattachobject waypointattachvehicle waypointbehaviour ' +
        'waypointcompletionradius waypointdescription waypointforcebehaviour waypointformation waypointhouseposition ' +
        'waypointloiterradius waypointloitertype waypointname waypointposition waypoints ' +
        'waypointsenableduav waypointshow waypointspeed waypointstatements waypointtimeout ' +
        'waypointtype waypointvisible weaponaccessories weaponaccessoriescargo weaponcargo ' +
        'weaponinertia weaponlowered weapons weaponsitems weaponsitemscargo ' +
        'weaponsturret weightrtd wfsidetext wind winddir ' +
        'windstr wingsforcesrtd worldname worldsize worldtomodel worldtoscreen ',
      literal:
        'blufor civilian configNull controlNull displayNull east endl false grpNull independent lineBreak ' +
        'locationNull nil objNull opfor pi resistance scriptNull sideAmbientLife sideEmpty sideLogic ' +
        'sideUnknown taskNull teamMemberNull true west'
    },
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.NUMBER_MODE,
      VARIABLE,
      FUNCTION,
      STRINGS,
      PREPROCESSOR
    ],
    illegal: /#|^\$ /
  };
}
