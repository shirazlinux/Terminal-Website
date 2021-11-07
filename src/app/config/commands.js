
import { getFileContents } from "./fs"
// import { team } from "./team";
// import { portfolio } from "./portfolio";
import { help } from "./help";
import { colorText, filesHere } from "../utils";



export const whoisRoot = "Root Ventures is a hard tech seed fund in San Francisco with $150M AUM. We are engineers leading the first venture rounds for technical founders solving hard problems. Our typical check size is $1-2M. We don't mind leading, co-leading, or following. We aim to be your best partner and the investor who best understands your product and your technology. With 2/3 of our fund in reserve, we also want to be your longest this.term partner, investing in every round, and bridging between rounds when we have to. Try %whois% and one of avidan, kane, chrissy, lee, emily, or laelah to learn more about our team.";

export const commands = {
  help: function (term) {
    const maxCmdLength = Math.max(...Object.keys(help).map(x => x.length));
    Object.entries(help).forEach(function (kv) {
      const cmd = kv[0];
      const desc = kv[1];
      if (term.cols >= 80) {
        const rightPad = maxCmdLength - cmd.length + 2;
        const sep = " ".repeat(rightPad);
        term.stylePrint(`${cmd}${sep}${desc}`);
      } else {
        if (cmd != 'help') { // skip second leading newline
          term.writeln("");
        }
        term.stylePrint(cmd);
        term.stylePrint(desc);
      }
    })
  },

  // whois: function (args) {
  //   const name = args[0];
  //   const people = Object.keys(team);

  //   if (!name) {
  //     term.stylePrint("%whois%: Learn about the firm, or a partner - usage:\r\n");
  //     term.stylePrint("%whois% root");
  //     for (p of people) {
  //       term.stylePrint(`%whois% ${p}`);
  //     }
  //   } else if (name == "root") {
  //     const description = whoisRoot;
  //     term.printArt("rootvc-square");
  //     term.stylePrint(description);
  //   } else if (Object.keys(team).includes(name)) {
  //     const person = team[name];
  //     term.printArt(name);
  //     term.stylePrint(`\r\n${person["name"]}, ${person["title"]} - ${name}@root.vc`);
  //     term.stylePrint(`${person["linkedin"]}\r\n`);
  //     term.stylePrint(person["description"]);
  //   } else {
  //     term.stylePrint(`User ${name || ''} not found. Try:\r\n`);
  //     term.stylePrint("%whois% root");
  //     for (p of people) {
  //       term.stylePrint(`%whois% ${p}`);
  //     }
  //   }
  // },

  // tldr: function (args) {
  //   const name = (args[0] || "");
  //   if (!name) {
  //     const companies = Object.keys(portfolio);
  //     term.stylePrint("%tldr%: Learn about a portfolio company - usage:\r\n");
  //     for (c of companies.sort()) {
  //       const data = portfolio[c];
  //       const tabs = c.length > 10 ? "\t" : "\t\t";
  //       const sep = term.cols >= 76 ? tabs : "\r\n";
  //       term.stylePrint(`%tldr% ${c}${sep}${data["url"]}`);
  //       if (term.cols < 76 && c != companies[companies.length - 1]) {
  //         term.writeln("");
  //       }
  //     }
  //   } else if (!portfolio[name]) {
  //     term.stylePrint(`Portfolio company ${name} not found. Should we talk to them? Email us: hello@root.vc`);
  //   } else {
  //     const company = portfolio[name];
  //     term.cols >= 60 ? term.printArt(name) : term.writeln("");
  //     term.stylePrint(company["name"]);
  //     term.stylePrint(company["url"]);
  //     if (company["memo"]) {
  //       term.stylePrint(`Investment Memo: ${company["memo"]}`);
  //     }
  //     term.stylePrint("");
  //     term.stylePrint(company["description"]);
  //     if (company["demo"]) {
  //       term.stylePrint(`Try it with command: %${name}%`);
  //     }
  //   }
  // },

  git: function (term) {
    term.displayURL("https://github.com/vitlug");
  },

  test: function (term) {
    term.openURL("https://gfycat.com/ifr/WhiteBountifulAfricangroundhornbill");
  },

  email: function (term) {
    term.command("pine");
  },

  github: function (term) {
    term.displayURL("https://github.com/vitlug");
  },

  twitter: function (term) {
    term.displayURL("https://twitter.com/vitlug");
  },

  instagram: function (term) {
    term.displayURL("https://www.instagram.com/vit_lug");
  },

  insta: function (term) {
    term.command("instagram");
  },

  other: function (term) {
    term.stylePrint("Yeah, I didn't literally mean %other%. I mean try some Linux commands");
  },

  echo: function (term, args) {
    const message = args.join(" ");
    term.stylePrint(message);
  },

  say: function (term, args) {
    const message = args.join(" ");
    term.stylePrint(`(Robot voice): ${message}`);
  },

  pwd: function (term) {
    term.stylePrint("/" + term.cwd.replaceAll("~", `home/${term.user}`));
  },

  ls: function (term) {
    term.stylePrint(filesHere(term).join("   "));
  },

  // I am so, so sorry for this code.
  // cd: function (args) {
  //   let dir = args[0] || "~";
  //   if (dir != "/") {
  //     // strip trailing slash
  //     dir = dir.replace(/\/$/, "");
  //   }

  //   switch (dir) {
  //     case "~":
  //       term.cwd = "~";
  //       break;
  //     case "..":
  //       if (term.cwd == "~") {
  //         term.command("cd /home");
  //       } else if (["home", "bin"].includes(term.cwd)) {
  //         term.command("cd /");
  //       }
  //       break;
  //     case "../..":
  //     case "../../..":
  //     case "../../../..":
  //     case "/":
  //       term.cwd = "/";
  //       break;
  //     case "home":
  //       if (term.cwd == "/") {
  //         term.command("cd /home");
  //       } else {
  //         term.stylePrint(`You do not have permission to access this directory`);
  //       }
  //       break;
  //     case "/home":
  //       term.cwd = "home";
  //       break;
  //     case "guest":
  //     case "root":
  //       if (term.cwd == "home") {
  //         if (term.user == dir) {
  //           term.command("cd ~");
  //         } else {
  //           term.stylePrint(`You do not have permission to access this directory`);
  //         }
  //       } else {
  //         term.stylePrint(`No such directory: ${dir}`);
  //       }
  //       break;
  //     case "../home/avidan":
  //     case "../home/kane":
  //     case "../home/chrissy":
  //     case "../home/lee":
  //     case "../home/emily":
  //     case "../home/laelah":
  //       if (term.cwd == "~" || term.cwd == "bin") {
  //         term.command(`cd ${dir.split("/")[2]}`);
  //       } else {
  //         term.stylePrint(`No such directory: ${dir}`);
  //       }
  //       break;
  //     case "/home/avidan":
  //     case "/home/kane":
  //     case "/home/chrissy":
  //     case "/home/lee":
  //     case "/home/emily":
  //     case "/home/laelah":
  //     case "avidan":
  //     case "kane":
  //     case "chrissy":
  //     case "lee":
  //     case "emily":
  //     case "laelah":
  //       term.stylePrint(`You do not have permission to access this directory`);
  //       break;
  //     case "/bin":
  //       term.cwd = "bin";
  //       break;
  //     case "bin":
  //       if (term.cwd == "/") {
  //         term.cwd = "bin";
  //       } else {
  //         term.stylePrint(`No such directory: ${dir}`);
  //       }
  //       break;
  //     case ".":
  //       break;
  //     default:
  //       term.stylePrint(`No such directory: ${dir}`);
  //       break;
  //   }
  // },

  zsh: function (term) {
    term.init(term.user);
  },

  cat: function (term, args) {
    const filename = args[0];

    if (filesHere(term).includes(filename)) {
      term.writeln(getFileContents(filename));
    } else {
      term.stylePrint(`No such file: ${filename}`);
    }
    if (filename == "id_rsa") {
      term.openURL("https://gfycat.com/ifr/WhiteBountifulAfricangroundhornbill");
    }
  },

  grep: function (term, args) {
    const q = args[0];
    const filename = args[1];

    if (filename == "id_rsa") {
      term.openURL("https://gfycat.com/ifr/WhiteBountifulAfricangroundhornbill");
    }

    if (!q || !filename) {
      term.stylePrint("usage: %grep% [pattern] [filename]");
      return;
    }

    if (filesHere(term).includes(filename)) {
      var file = getFileContents(filename);
      const matches = file.matchAll(q);
      for (match of matches) {
        file = file.replaceAll(match[0], colorText(match[0], "files"));
      }
      term.writeln(file);
    } else {
      term.stylePrint(`No such file or directory: ${filename}`);
    }
  },

  // finger: function (args) {
  //   const user = args[0];

  //   switch (user) {
  //     case 'guest':
  //       term.stylePrint("Login: guest            Name: Guest");
  //       term.stylePrint("Directory: /home/guest  Shell: /bin/zsh");
  //       break;
  //     case 'root':
  //       term.stylePrint("Login: root             Name: That's Us!");
  //       term.stylePrint("Directory: /home/root   Shell: /bin/zsh");
  //       break;
  //     case 'avidan':
  //     case 'kane':
  //     case 'chrissy':
  //     case 'lee':
  //     case 'emily':
  //     case 'laelah':
  //       term.stylePrint(`Login: ${user}   Name: ${team[user]["name"]}`);
  //       term.stylePrint(`Directory: /home/${user}   Shell: /bin/zsh`);
  //       break;
  //     default:
  //       term.stylePrint(user ? `%finger%: ${user}: no such user` : "usage: %finger% [user]");
  //       break;
  //   }
  // },

  // groups: function (args) {
  //   const user = args[0];

  //   switch (user) {
  //     case 'guest':
  //       term.stylePrint("guest lps founders engineers investors");
  //       break;
  //     case 'root':
  //       term.stylePrint("wheel investors engineers hardtech firms");
  //       break;
  //     case 'avidan':
  //       term.stylePrint("wheel investors engineers managingpartner handypersons tinkers agtech foodtech foodies coffeesnobs");
  //       break;
  //     case 'kane':
  //       term.stylePrint("wheel investors engineers partners tinkers mcad motorcyclists gearheads machinepix sportshooters gamers");
  //       break;
  //     case 'chrissy':
  //       term.stylePrint("wheel investors engineers partners electrical manufacturing ecad wearables healthtech gearheads automotive sportshooters");
  //       break;
  //     case 'lee':
  //       term.stylePrint("wheel investors engineers partners software devtools data ai+ml gamers winesnobs");
  //       break;
  //     case 'emily':
  //       term.stylePrint("wheel investors engineers principals mechanical space automotive winesnobs");
  //       break;
  //     case 'laelah':
  //       term.stylePrint("wheel admin operations miracleworkers gamers");
  //       break;
  //     default:
  //       term.stylePrint(user ? `%groups%: ${user}: no such user` : "usage: %groups% [user]");
  //       break;
  //   }
  // },

  gzip: function (term) {
    term.stylePrint("What are you going to do with a zip file on a fake terminal, seriously?");
  },

  free: function (term) {
    term.stylePrint("Honestly, our memory isn't what it used to be");
  },

  tail: function (term, args) {
    term.command(`cat ${args.join(" ")}`);
  },

  less: function (term, args) {
    term.command(`cat ${args.join(" ")}`);
  },

  head: function (term, args) {
    term.command(`cat ${args.join(" ")}`);
  },

  open: function (term, args) {
    if (args[0].split(".")[1] == "htm") {
      term.openURL(`./${args[0]}`, false);
    } else {
      term.command(`cat ${args.join(" ")}`);
    }
  },

  more: function (term, args) {
    term.command(`cat ${args.join(" ")}`);
  },

  emacs: function (term) {
    term.stylePrint("%emacs% not installed. try: %vi%");
  },

  vim: function (term) {
    term.stylePrint("%vim% not installed. try: %emacs%");
  },

  vi: function (term) {
    term.stylePrint("%vi% not installed. try: %emacs%");
  },

  pico: function (term) {
    term.stylePrint("%pico% not installed. try: %vi% or %emacs%");
  },

  nano: function (term) {
    term.stylePrint("%nano% not installed. try: %vi% or %emacs%");
  },

  pine: function (term) {
    term.openURL("mailto:linux@vit.ac.in");
  },

  curl: function (term, args) {
    term.stylePrint(`Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource ${args[0]}.`);
  },

  ftp: function (term, args) {
    term.command(`curl ${args.join(" ")}`);
  },

  ssh: function (term, args) {
    term.command(`curl ${args.join(" ")}`);
  },

  sftp: function (term, args) {
    term.command(`curl ${args.join(" ")}`);
  },

  scp: function (term,args) {
    term.stylePrint(`████████████ Request Blocked: The ███████████ Policy disallows reading the ██████ resource ${args[0]}.`);
  },

  rm: function (term) {
    term.stylePrint("I can't let you do that, Dave");
  },

  mkdir: function (term) {
    term.stylePrint("Come on, don't mess with our immaculate file system");
  },

  alias: function (term) {
    term.stylePrint("Just call me Tux 🐧");
  },

  df: function (term) {
    term.stylePrint("Nice try. Just get a Dropbox");
  },

  kill: function (term) {
    term.stylePrint("Easy, killer");
  },

  locate: function (term) {
    term.stylePrint("VIT, Vellore Campus");
    term.stylePrint("Tiruvalam Rd, Katpadi, Vellore");
    term.stylePrint("Tamil Nadu 632014");
  },

  // history: function () {
  //   term.history.forEach((element, index) => {
  //     term.stylePrint(`${1000 + index}  ${element}`);
  //   })
  // },

  // find: function (args) {
  //   const file = args[0];
  //   if (Object.keys(_FILES).includes(file)) {
  //     term.stylePrint(_FULL_PATHS[file]);
  //   } else {
  //     term.stylePrint(`%find%: ${file}: No such file or directory`);
  //   }
  // },

  fdisk: function (term) {
    term.command("rm");
  },

  chown: function (term) {
    term.stylePrint("You do not have permission to %chown%");
  },

  chmod: function (term) {
    term.stylePrint("You do not have permission to %chmod%");
  },

  mv: function (term, args) {
    const src = args[0];

    if (_filesHere().includes(src)) {
      term.stylePrint(`You do not have permission to move file ${src}`);
    } else {
      term.stylePrint(`%mv%: ${src}: No such file or directory`);
    }
  },

  cp: function (term, args) {
    const src = args[0];

    if (filesHere().includes(src)) {
      term.stylePrint(`You do not have permission to copy file ${src}`);
    } else {
      term.stylePrint(`%cp%: ${src}: No such file or directory`);
    }
  },

  touch: function (term) {
    term.stylePrint("You can't %touch% this");
  },

  sudo: function (term, args) {
    if (term.user == "root") {
      term.command(args.join(" "));
    }
    else {
      term.stylePrint(`${colorText(term.user, "user")} is not in the sudoers file. This incident will be reported`);
    }
  },

  su: function (term, args) {
    user = args[0] || "root";

    if (user == "root" || user == "guest") {
      term.user = user;
      term.command("cd ~");
    } else {
      term.stylePrint("su: Sorry");
    }
  },

  quit: function (term) {
    term.command("exit");
  },

  stop: function (term) {
    term.command("exit");
  },

  whoami: function (term) {
    term.stylePrint(term.user);
  },

  passwd: function (term) {
    term.stylePrint("Wow. Maybe don't enter your password into a sketchy web-based term.command prompt?");
  },

  man: function (term, args) {
    term.command(`tldr ${args}`);
  },

  woman: function (term, args) {
    term.command(`tldr ${args}`);
  },

  ping: function (term) {
    term.stylePrint("pong");
  },

  ps: function (term) {
    term.stylePrint("PID TTY       TIME CMD");
    term.stylePrint("424 ttys00 0:00.33 %-zsh%");
    term.stylePrint("158 ttys01 0:09.70 %/bin/npm start%");
    term.stylePrint("767 ttys02 0:00.02 %/bin/sh%");
    term.stylePrint("337 ttys03 0:13.37 %/bin/cgminer -o pwn.d%");
  },

  uname: function (term, args) {
    switch (args[0]) {
      case "-a":
        term.stylePrint("VITLUGpc VITLUGpc 0.0.1 RootPC Kernel Version 0.0.1 root:xnu-31415.926.5~3/RELEASE_X86_64 x86_64");
        break;
      case "-mrs":
        term.stylePrint("VITLUGpc 0.0.1 x86_64");
        break;
      default:
        term.stylePrint("VITLUGpc");
    }
  },

  top: function (term) {
    term.command("ps");
  },

  exit: function (term) {
    term.stylePrint("Why leave");
    // term.command("open welcome.htm");
  },

  clear: function (term) {
    term.init();
  },

  zed: function (term) {
    term.stylePrint("Coming soon! ;)");
  },

  ge: function (term) {
    term.command("great_expectations");
  },

  great_expectations: function (term) {
    term.command("superconductive");
  },

  // privacy: function () {
  //   term.command("privacy_dynamics");
  // },

  // ln: function () {
  //   term.command("alan");
  // },

  // anycloud: function () {
  //   term.stylePrint("https://docs.anycloudapp.com/documentation/tutorials/aws-node");
  // },

  // eval: function (args) {
  //   term.stylePrint("please instead build a webstore with macros. in the meantime, the result is: " + eval(args.join(" ")));
  // }
}

// // Add commands for company demos
// for (kv of Object.entries(portfolio)) {
//   const key = kv[0];
//   const val = kv[1];

//   if (val["demo"]) {
//     commands[key] = () => term.displayURL(val["demo"]);
//   }
// }

// function _filesHere() {
//   return _DIRS[term.cwd].filter((e) => e != 'README.md' || term.user == "root");
// }
