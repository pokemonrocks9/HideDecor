(function(n,s,i){"use strict";let t=[],o=null;var c={onLoad:function(){console.log("[HideDecorations] Loading plugin..."),o=document.createElement("style"),o.id="hide-decorations-plugin",o.textContent=`
            /* Hide avatar decorations - SVG elements */
            svg[class^='avatarDecoration'],
            svg[class*=' avatarDecoration'] {
                display: none !important;
            }

            /* Hide avatar decoration images from CDN */
            img[src^="https://cdn.discordapp.com/avatar-decoration-presets/"],
            img[src*="avatar-decoration"] {
                display: none !important;
            }

            /* Hide profile effects */
            img[src^="https://cdn.discordapp.com/assets/profile_effects/"],
            video[src*="profile_effects"] {
                display: none !important;
            }

            /* Hide animated nameplates */
            video[src*="assets/collectibles/nameplates"] {
                display: none !important;
            }

            /* Hide clan tags - multiple contexts */
            span[class*="clantag" i],
            span[class*="clanTag"],
            span[class*="clanTagChiplet"],
            div[class*="compact"] span[class*="clanTagChiplet"] {
                display: none !important;
            }
        `,document.head.appendChild(o),console.log("[HideDecorations] CSS injected");try{const e=s.findByStoreName("UserStore");e?.getUser&&(t.push(i.after("getUser",e,function(l,a){a&&(a.avatarDecoration=null,a.avatarDecorationData=null)})),console.log("[HideDecorations] UserStore patched"))}catch(e){console.log("[HideDecorations] Could not patch UserStore:",e)}try{const e=s.findByStoreName("GuildMemberStore");e?.getMember&&(t.push(i.after("getMember",e,function(l,a){a&&(a.clan=null)})),console.log("[HideDecorations] GuildMemberStore patched"))}catch(e){console.log("[HideDecorations] Could not patch GuildMemberStore:",e)}console.log("[HideDecorations] Plugin loaded successfully!")},onUnload:function(){console.log("[HideDecorations] Unloading plugin..."),o?.parentNode&&(o.parentNode.removeChild(o),o=null),t.forEach(function(e){return e()}),t=[],console.log("[HideDecorations] Plugin unloaded")}};return n.default=c,Object.defineProperty(n,"__esModule",{value:!0}),n})({},vendetta.metro,vendetta.patcher);
