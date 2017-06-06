/*
Language: PowerShell
Author: David Mohundro <david@mohundro.com>
Contributors: Nicholas Blumhardt <nblumhardt@nblumhardt.com>, Victor Zhou <OiCMudkips@users.noreply.github.com>, Nicolas Le Gall <contact@nlegall.fr>, Dirk Schuermans <dirk@schuermans.me>
*/

function(hljs) {
  var BACKTICK_ESCAPE = {
    begin: '`[\\s\\S]',
    relevance: 0
  };
  var VAR = {
    className: 'variable',
    variants: [
      {begin: /\$[\w\d][\w\d_:]*/}
    ]
  };
  var LITERAL = {
    className: 'literal',
    begin: /\$(null|true|false)\b/
  };
  var QUOTE_STRING = {
    className: 'string',
    variants: [
      { begin: /"/, end: /"/ },
      { begin: /@"/, end: /^"@/ }
    ],
    contains: [
      BACKTICK_ESCAPE,
      VAR,
      {
        className: 'variable',
        begin: /\$[A-z]/, end: /[^A-z]/
      }
    ]
  };
  var APOS_STRING = {
    className: 'string',
    variants: [
      { begin: /'/, end: /'/ },
      { begin: /@'/, end: /^'@/ }
    ]
  };

  var PS_HELPTAGS = {
    className: 'doctag',
    variants: [
      /* no paramater help tags */ 
      { begin: /\.(synopsis|description|example|inputs|outputs|notes|link|component|role|functionality)/ },
      /* one parameter help tags */
      { begin: /\.(parameter|forwardhelptargetname|forwardhelpcategory|remotehelprunspace|externalhelp)\s+\S+/ }
    ]
  };
  var PS_COMMENT = hljs.inherit(
    hljs.COMMENT(null, null),
    {
      variants: [
        /* single-line comment */
        { begin: /#/, end: /$/ },
        /* multi-line comment */
        { begin: /<#/, end: /#>/ }
      ],
      contains: [PS_HELPTAGS]
    }
  );
  
  var VERBS = {
	className: 'built_in',
	variants: [
		{ begin: /Add-/, end: /[^A-z0-9]/ },
		{ begin: /Approve-/, end: /[^A-z0-9]/ },
		{ begin: /Assert-/, end: /[^A-z0-9]/ },
		{ begin: /Backup-/, end: /[^A-z0-9]/ },
		{ begin: /Block-/, end: /[^A-z0-9]/ },
		{ begin: /Checkpoint-/, end: /[^A-z0-9]/ },
		{ begin: /Clear-/, end: /[^A-z0-9]/ },
		{ begin: /Close-/, end: /[^A-z0-9]/ },
		{ begin: /Compare-/, end: /[^A-z0-9]/ },
		{ begin: /Complete-/, end: /[^A-z0-9]/ },
		{ begin: /Compress-/, end: /[^A-z0-9]/ },
		{ begin: /Confirm-/, end: /[^A-z0-9]/ },
		{ begin: /Connect-/, end: /[^A-z0-9]/ },
		{ begin: /Convert-/, end: /[^A-z0-9]/ },
		{ begin: /ConvertFrom-/, end: /[^A-z0-9]/ },
		{ begin: /ConvertTo-/, end: /[^A-z0-9]/ },
		{ begin: /Copy-/, end: /[^A-z0-9]/ },
		{ begin: /Debug-/, end: /[^A-z0-9]/ },
		{ begin: /Deny-/, end: /[^A-z0-9]/ },
		{ begin: /Disable-/, end: /[^A-z0-9]/ },
		{ begin: /Disconnect-/, end: /[^A-z0-9]/ },
		{ begin: /Dismount-/, end: /[^A-z0-9]/ },
		{ begin: /Edit-/, end: /[^A-z0-9]/ },
		{ begin: /Enable-/, end: /[^A-z0-9]/ },
		{ begin: /Enter-/, end: /[^A-z0-9]/ },
		{ begin: /Exit-/, end: /[^A-z0-9]/ },
		{ begin: /Expand-/, end: /[^A-z0-9]/ },
		{ begin: /Export-/, end: /[^A-z0-9]/ },
		{ begin: /Find-/, end: /[^A-z0-9]/ },
		{ begin: /Format-/, end: /[^A-z0-9]/ },
		{ begin: /Get-/, end: /[^A-z0-9]/ },
		{ begin: /Grant-/, end: /[^A-z0-9]/ },
		{ begin: /Group-/, end: /[^A-z0-9]/ },
		{ begin: /Hide-/, end: /[^A-z0-9]/ },
		{ begin: /Import-/, end: /[^A-z0-9]/ },
		{ begin: /Initialize-/, end: /[^A-z0-9]/ },
		{ begin: /Install-/, end: /[^A-z0-9]/ },
		{ begin: /Invoke-/, end: /[^A-z0-9]/ },
		{ begin: /Join-/, end: /[^A-z0-9]/ },
		{ begin: /Limit-/, end: /[^A-z0-9]/ },
		{ begin: /Lock-/, end: /[^A-z0-9]/ },
		{ begin: /Measure-/, end: /[^A-z0-9]/ },
		{ begin: /Merge-/, end: /[^A-z0-9]/ },
		{ begin: /Mount-/, end: /[^A-z0-9]/ },
		{ begin: /Move-/, end: /[^A-z0-9]/ },
		{ begin: /New-/, end: /[^A-z0-9]/ },
		{ begin: /Open-/, end: /[^A-z0-9]/ },
		{ begin: /Out-/, end: /[^A-z0-9]/ },
		{ begin: /Ping-/, end: /[^A-z0-9]/ },
		{ begin: /Pop-/, end: /[^A-z0-9]/ },
		{ begin: /Protect-/, end: /[^A-z0-9]/ },
		{ begin: /Publish-/, end: /[^A-z0-9]/ },
		{ begin: /Push-/, end: /[^A-z0-9]/ },
		{ begin: /Read-/, end: /[^A-z0-9]/ },
		{ begin: /Receive-/, end: /[^A-z0-9]/ },
		{ begin: /Redo-/, end: /[^A-z0-9]/ },
		{ begin: /Register-/, end: /[^A-z0-9]/ },
		{ begin: /Remove-/, end: /[^A-z0-9]/ },
		{ begin: /Rename-/, end: /[^A-z0-9]/ },
		{ begin: /Repair-/, end: /[^A-z0-9]/ },
		{ begin: /Reset-/, end: /[^A-z0-9]/ },
		{ begin: /Resolve-/, end: /[^A-z0-9]/ },
		{ begin: /Restore-/, end: /[^A-z0-9]/ },
		{ begin: /Request-/, end: /[^A-z0-9]/ },
		{ begin: /Restart-/, end: /[^A-z0-9]/ },
		{ begin: /Resume-/, end: /[^A-z0-9]/ },
		{ begin: /Revoke-/, end: /[^A-z0-9]/ },
		{ begin: /Save-/, end: /[^A-z0-9]/ },
		{ begin: /Search-/, end: /[^A-z0-9]/ },
		{ begin: /Select-/, end: /[^A-z0-9]/ },
		{ begin: /Send-/, end: /[^A-z0-9]/ },
		{ begin: /Set-/, end: /[^A-z0-9]/ },
		{ begin: /Show-/, end: /[^A-z0-9]/ },
		{ begin: /Skip-/, end: /[^A-z0-9]/ },
		{ begin: /Split-/, end: /[^A-z0-9]/ },
		{ begin: /Start-/, end: /[^A-z0-9]/ },
		{ begin: /Step-/, end: /[^A-z0-9]/ },
		{ begin: /Stop-/, end: /[^A-z0-9]/ },
		{ begin: /Submit-/, end: /[^A-z0-9]/ },
		{ begin: /Suspend-/, end: /[^A-z0-9]/ },
		{ begin: /Switch-/, end: /[^A-z0-9]/ },
		{ begin: /Sync-/, end: /[^A-z0-9]/ },
		{ begin: /Test-/, end: /[^A-z0-9]/ },
		{ begin: /Trace-/, end: /[^A-z0-9]/ },
		{ begin: /Unblock-/, end: /[^A-z0-9]/ },
		{ begin: /Undo-/, end: /[^A-z0-9]/ },
		{ begin: /Uninstall-/, end: /[^A-z0-9]/ },
		{ begin: /Unlock-/, end: /[^A-z0-9]/ },
		{ begin: /Unprotect-/, end: /[^A-z0-9]/ },
		{ begin: /Unpublish-/, end: /[^A-z0-9]/ },
		{ begin: /Unregister-/, end: /[^A-z0-9]/ },
		{ begin: /Update-/, end: /[^A-z0-9]/ },
		{ begin: /Use-/, end: /[^A-z0-9]/ },
		{ begin: /Wait-/, end: /[^A-z0-9]/ },
		{ begin: /Watch-/, end: /[^A-z0-9]/ },
		{ begin: /Write-/, end: /[^A-z0-9]/ }
	]
  };

  return {
    aliases: ['ps'],
    lexemes: /-?[A-z\.\-]+/,
    case_insensitive: true,
    keywords: {
      keyword: 'if else foreach return function do while until elseif begin for trap data dynamicparam end break throw param continue finally in switch exit filter try process catch',
      //built_in: 'Add-Computer Add-Content Add-History Add-JobTrigger Add-Member Add-PSSnapin Add-Type Checkpoint-Computer Clear-Content Clear-EventLog Clear-History Clear-Host Clear-Item Clear-ItemProperty Clear-Variable Compare-Object Complete-Transaction Connect-PSSession Connect-WSMan Convert-Path ConvertFrom-Csv ConvertFrom-Json ConvertFrom-SecureString ConvertFrom-StringData ConvertTo-Csv ConvertTo-Html ConvertTo-Json ConvertTo-SecureString ConvertTo-Xml Copy-Item Copy-ItemProperty Debug-Process Disable-ComputerRestore Disable-JobTrigger Disable-PSBreakpoint Disable-PSRemoting Disable-PSSessionConfiguration Disable-WSManCredSSP Disconnect-PSSession Disconnect-WSMan Disable-ScheduledJob Enable-ComputerRestore Enable-JobTrigger Enable-PSBreakpoint Enable-PSRemoting Enable-PSSessionConfiguration Enable-ScheduledJob Enable-WSManCredSSP Enter-PSSession Exit-PSSession Export-Alias Export-Clixml Export-Console Export-Counter Export-Csv Export-FormatData Export-ModuleMember Export-PSSession ForEach-Object Format-Custom Format-List Format-Table Format-Wide Get-Acl Get-Alias Get-AuthenticodeSignature Get-ChildItem Get-Command Get-ComputerRestorePoint Get-Content Get-ControlPanelItem Get-Counter Get-Credential Get-Culture Get-Date Get-Event Get-EventLog Get-EventSubscriber Get-ExecutionPolicy Get-FormatData Get-Host Get-HotFix Get-Help Get-History Get-IseSnippet Get-Item Get-ItemProperty Get-Job Get-JobTrigger Get-Location Get-Member Get-Module Get-PfxCertificate Get-Process Get-PSBreakpoint Get-PSCallStack Get-PSDrive Get-PSProvider Get-PSSession Get-PSSessionConfiguration Get-PSSnapin Get-Random Get-ScheduledJob Get-ScheduledJobOption Get-Service Get-TraceSource Get-Transaction Get-TypeData Get-UICulture Get-Unique Get-Variable Get-Verb Get-WinEvent Get-WmiObject Get-WSManCredSSP Get-WSManInstance Group-Object Import-Alias Import-Clixml Import-Counter Import-Csv Import-IseSnippet Import-LocalizedData Import-PSSession Import-Module Invoke-AsWorkflow Invoke-Command Invoke-Expression Invoke-History Invoke-Item Invoke-RestMethod Invoke-WebRequest Invoke-WmiMethod Invoke-WSManAction Join-Path Limit-EventLog Measure-Command Measure-Object Move-Item Move-ItemProperty New-Alias New-Event New-EventLog New-IseSnippet New-Item New-ItemProperty New-JobTrigger New-Object New-Module New-ModuleManifest New-PSDrive New-PSSession New-PSSessionConfigurationFile New-PSSessionOption New-PSTransportOption New-PSWorkflowExecutionOption New-PSWorkflowSession New-ScheduledJobOption New-Service New-TimeSpan New-Variable New-WebServiceProxy New-WinEvent New-WSManInstance New-WSManSessionOption Out-Default Out-File Out-GridView Out-Host Out-Null Out-Printer Out-String Pop-Location Push-Location Read-Host Receive-Job Register-EngineEvent Register-ObjectEvent Register-PSSessionConfiguration Register-ScheduledJob Register-WmiEvent Remove-Computer Remove-Event Remove-EventLog Remove-Item Remove-ItemProperty Remove-Job Remove-JobTrigger Remove-Module Remove-PSBreakpoint Remove-PSDrive Remove-PSSession Remove-PSSnapin Remove-TypeData Remove-Variable Remove-WmiObject Remove-WSManInstance Rename-Computer Rename-Item Rename-ItemProperty Reset-ComputerMachinePassword Resolve-Path Restart-Computer Restart-Service Restore-Computer Resume-Job Resume-Service Save-Help Select-Object Select-String Select-Xml Send-MailMessage Set-Acl Set-Alias Set-AuthenticodeSignature Set-Content Set-Date Set-ExecutionPolicy Set-Item Set-ItemProperty Set-JobTrigger Set-Location Set-PSBreakpoint Set-PSDebug Set-PSSessionConfiguration Set-ScheduledJob Set-ScheduledJobOption Set-Service Set-StrictMode Set-TraceSource Set-Variable Set-WmiInstance Set-WSManInstance Set-WSManQuickConfig Show-Command Show-ControlPanelItem Show-EventLog Sort-Object Split-Path Start-Job Start-Process Start-Service Start-Sleep Start-Transaction Start-Transcript Stop-Computer Stop-Job Stop-Process Stop-Service Stop-Transcript Suspend-Job Suspend-Service Tee-Object Test-ComputerSecureChannel Test-Connection Test-ModuleManifest Test-Path Test-PSSessionConfigurationFile Trace-Command Unblock-File Undo-Transaction Unregister-Event Unregister-PSSessionConfiguration Unregister-ScheduledJob Update-FormatData Update-Help Update-List Update-TypeData Use-Transaction Wait-Event Wait-Job Wait-Process Where-Object Write-Debug Write-Error Write-EventLog Write-Host Write-Output Write-Progress Write-Verbose Write-Warning Add-MDTPersistentDrive Disable-MDTMonitorService Enable-MDTMonitorService Get-MDTDeploymentShareStatistics Get-MDTMonitorData Get-MDTOperatingSystemCatalog Get-MDTPersistentDrive Import-MDTApplication Import-MDTDriver Import-MDTOperatingSystem Import-MDTPackage Import-MDTTaskSequence New-MDTDatabase Remove-MDTMonitorData Remove-MDTPersistentDrive Restore-MDTPersistentDrive Set-MDTMonitorData Test-MDTDeploymentShare Test-MDTMonitorData Update-MDTDatabaseSchema Update-MDTDeploymentShare Update-MDTLinkedDS Update-MDTMedia Update-MDTMedia Add-VamtProductKey Export-VamtData Find-VamtManagedMachine Get-VamtConfirmationId Get-VamtProduct Get-VamtProductKey Import-VamtData Initialize-VamtData Install-VamtConfirmationId Install-VamtProductActivation Install-VamtProductKey Update-VamtProduct',
	  nomarkup: '-ne -eq -lt -gt -ge -le -not -like -notlike -match -notmatch -contains -notcontains -in -notin -replace'
    },
    contains: [
      BACKTICK_ESCAPE,
      hljs.NUMBER_MODE,
      QUOTE_STRING,
      APOS_STRING,
      LITERAL,
      VAR,
      PS_COMMENT,
	  VERBS
    ]
  };
}
