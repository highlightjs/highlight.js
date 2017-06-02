/*
Language: Bash
Author: vah <vahtenberg@gmail.com>
Contributrors: Benjamin Pannell <contact@sierrasoftworks.com>
Category: common
*/

function(hljs) {
  var VAR = {
    className: 'variable',
    variants: [
      {begin: /\$[\w\d#@][\w\d_]*/},
      {begin: /\$\{(.*?)}/}
    ]
  };
  var QUOTE_STRING = {
    className: 'string',
    begin: /"/, end: /"/,
    contains: [
      hljs.BACKSLASH_ESCAPE,
      VAR,
      {
        className: 'variable',
        begin: /\$\(/, end: /\)/,
        contains: [hljs.BACKSLASH_ESCAPE]
      }
    ]
  };
  var APOS_STRING = {
    className: 'string',
    begin: /'/, end: /'/
  };

  return {
    aliases: ['sh', 'zsh'],
    lexemes: /\b-?[a-z\._]+\b/,
    keywords: {
      keyword:
        'if then else elif fi for while in do done case esac function',
      literal:
        'true false',
      built_in:
        // Shell built-ins
        // http://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
        'break cd continue eval exec exit export getopts hash pwd readonly return shift test times ' +
        'trap umask unset ' +
        // Bash built-ins
        'alias bind builtin caller command declare echo enable help let local logout mapfile printf ' +
        'read readarray source type typeset ulimit unalias ' +
        // Shell modifiers
        'set shopt ' +
        // Zsh built-ins
        'autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles ' +
        'compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate ' +
        'fc fg float functions getcap getln history integer jobs kill limit log noglob popd print ' +
        'pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit ' +
        'unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof ' +
        'zpty zregexparse zsocket zstyle ztcp ' +
        // Common shell commands
        // http://ss64.com/bash/
        //  most used in script
        'awk basename bash bc cat clear cp csplit cut date dc dd df diff dir dirname dirs egrep env ' +
        'expand expr fgrep file find fmt fold gawk grep hash head history hostname join ln logname ' +
        'ls mv nl paste pgrep printenv rcp rev sed select seq sort source split tail tee touch tr tsort ' +
        'unexpand uniq until watch wc whereis who whoami xargs yes ' +
        //  admin
        'cfdisk chgrp chmod chown chroot curl dig dmesg du fdisk fg format free fsck fuser groupadd ' +
        'groupdel groupmod groupps ifconfig ifdown ifup ip kill killall killproc link lsblk lsof ' +
        'man mkdir more most mount nc netstat nice nohup nslookup passwd ping pkill ps pv quota reboot ' +
        'restart rm rmdir rsync scp sdiff shutdown sleep ss ssh start status stop strace su sudo sync ' +
        'reload time top traceroute umount uname uptime useradd userdel usermod wget users ' +
        //  archive
        'bzip2 gzip rar tar unrar xz zip ' +
        //  package management
        'apk apt aptitude apt-get deb dnf dpkg rpm yum ' +
        //  others
        'cal chkconfig cksum cmp comm complete cron crontab ddrescue diff3 dircolors eject ethtool ' +
        'expect fdformat ftp help htop iconv import install jobs less locate look lpc lpr lprint ' +
        'lprintd lprintq lprm mkfifo mkisofs mknod mtools mtr mmv notify-send op pathchk pr printcap ' +
        'quotacheck ram rename renice remsync screen sftp slocate strip sum timeout times tput tty ' +
        'units unshar uuencode uudecode vdir vi vmstat write xdg-open',
      _:
        '-ne -eq -lt -gt -f -d -e -s -l -a' // relevance booster
    },
    contains: [
      {
        className: 'meta',
        begin: /^#![^\n]+sh\s*$/,
        relevance: 10
      },
      {
        className: 'function',
        begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
        returnBegin: true,
        contains: [hljs.inherit(hljs.TITLE_MODE, {begin: /\w[\w\d_]*/})],
        relevance: 0
      },
      hljs.HASH_COMMENT_MODE,
      QUOTE_STRING,
      APOS_STRING,
      VAR
    ]
  };
}
