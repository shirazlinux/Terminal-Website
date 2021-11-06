
import aalib from "aalib.js";

export const LOGO_TYPE =
`
                                                                 #####
                                                                #######
                   #                                            ##O#O##
  ######          ###                                           #VVVVV#
    ##             #                                          ##  VVV  ##
    ##         ###    ### ####   ###    ###  ##### #####     #          ##
    ##        #  ##    ###    ##  ##     ##    ##   ##      #            ##
    ##       #   ##    ##     ##  ##     ##      ###        #            ###
    ##          ###    ##     ##  ##     ##      ###       QQ#           ##Q
    ##       # ###     ##     ##  ##     ##     ## ##    QQQQQQ#       #QQQQQQ
    ##      ## ### #   ##     ##  ###   ###    ##   ##   QQQQQQQ#     #QQQQQQQ
  ############  ###   ####   ####   #### ### ##### #####   QQQQQ#######QQQQQ
`.replaceAll("\n", "\r\n");

function preloadASCIIArt(term) {
    const companies = Object.keys(portfolio);
    for (let c of companies) {
        _loadArt(c, 0.5, 1.0, 'jpg', false);
    }

    _loadArt("rootvc-square", 1.0, term.cols >= 60 ? 0.5 : 1.0, 'png', false);
    const people = Object.keys(team);
    for (let p of people) {
        _loadArt(p, 1.0, term.cols >= 60 ? 0.5 : 1.0, 'png', true);
    }
}

// TODO: Here is where we should insert alternatives to ASCII as text
function _loadArt(term, id, ratio, scale, ext, inverse, callback) {
    const NICE_CHARSET = aalib.charset.SIMPLE_CHARSET + " ";
    const parentDiv = document.getElementById("aa-all");
    const width = Math.floor(term.cols * scale);
    const height = Math.floor(width / 2 * ratio);
    var filename = `/images/${id}.${ext}`;

    var div = document.getElementById(id);

    if (!div) {
        div = document.createElement("div");
        div.id = id;
        parentDiv.appendChild(div);
    }

    if (term.cols >= 40) {
        var aa = aalib.read.image.fromURL(filename)
            .map(aalib.aa({ width: width, height: height }));
        if (inverse) { aa = aa.map(aalib.filter.inverse()); }
        aa.map(aalib.render.html({
            el: div,
            charset: NICE_CHARSET,
        }))
            .subscribe(callback);
    } else {
        div.innerText = `[ Photo: ${document.location.href}images/${id}.${ext} ]`;
    }
}

export function getArt(id) {
    const div = document.getElementById(id);
    return div.innerText.replaceAll("\n", "\n\r");
}