# nvm settings
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh

# man easier
export LESS_TERMCAP_mb=$'\E[01;31m'
export LESS_TERMCAP_md=$'\E[01;31m'
export LESS_TERMCAP_me=$'\E[0m'
export LESS_TERMCAP_se=$'\E[0m'
export LESS_TERMCAP_so=$'\E[01;44;33m'
export LESS_TERMCAP_ue=$'\E[0m'
export LESS_TERMCAP_us=$'\E[01;32m'

export GREP_OPTIONS='--color=auto'
export OCI_LIB_DIR=/opt/oracle/instantclient
export OCI_INC_DIR=/opt/oracle/instantclient/sdk/include
export JAVA_HOME=/Library/Java/Home
# /Library/Java/JavaVirtualMachines/jdk1.8.0_152.jdk/Contents/Home

# soma asliases
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
alias .....="cd ../../../.."

alias ll="ls -l"
alias lo="ls -o"
alias lh="ls -lh"
alias la="ls -la"
alias sl="ls"
alias l="ls"
alias s="ls"

# alias aa="git add ."
# alias sts="git status"
# alias br="git branch"
# alias comm="git commit -m"
# alias chb="git checkout"
# alias rebase="git rebase"
# alias stash="git stash"
# alias push="git push"

#ANSI COLORS CODE for PS1
COLOR_RED="\033[0;31m"
COLOR_YELLOW="\033[0;33m"
COLOR_GREEN="\033[0;32m"
COLOR_OCHRE="\033[38;5;95m"
COLOR_BLUE="\033[0;34m"
COLOR_CYAN="\033[0;36m"
COLOR_LIGHT_GREEN="\033[1;32m"
COLOR_LIGHT_CYAN="\033[1;36m"
COLOR_WHITE="\033[0;37m"
COLOR_PINK="\033[01;35m"
COLOR_RESET="\033[0m"

function git_color {
  local git_status="$(git status 2> /dev/null)"

  if [[ ! $git_status =~ "working directory clean" ]]; then
    echo -e $COLOR_RED
  elif [[ $git_status =~ "Your branch is ahead of" ]]; then
    echo -e $COLOR_PINK "SYNC DONE!..."
  elif [[ $git_status =~ "nothing to commit" ]]; then
    echo -e $COLOR_LIGHT_GREEN
  else
    echo -e $COLOR_OCHRE "Ready to pull"
  fi
}

function git_branch {
  local git_status="$(git status 2> /dev/null)"
  local on_branch="On branch ([^${IFS}]*)"
  local on_commit="HEAD detached at ([^${IFS}]*)"

  if [[ $git_status =~ $on_branch ]]; then
    local branch=${BASH_REMATCH[1]}
    echo "($branch)"
  elif [[ $git_status =~ $on_commit ]]; then
    local commit=${BASH_REMATCH[1]}
    echo "($commit)"
  fi
}

PS1="\[$COLOR_YELLOW\]\n Route: [\w]\[$COLOR_LIGHT_CYAN\]\n [\@ - \d] \[$COLOR_LIGHT_GREEN\]user:\u @\[$COLOR_OCHRE\] Machine:[\h]  "   #base name PWD
PS1+="\$(git_color)"        # colors git status
PS1+="On branch ->>> \$(git_branch)\n"           # prints current  branch
PS1+="\[$COLOR_WHITE\$\[$COLOR_RESET\] "   # '#' for root, else '$'
export PS1

# Sources
source ./gitcompletion.bash

