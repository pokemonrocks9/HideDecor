(function(c,r,s){"use strict";let n=[],t=null;var l={onLoad:function(){try{console.log("[HideDecorations] Loading plugin...");const o=document.getElementById("hide-decorations-plugin");o&&o.remove(),t=document.createElement("style"),t.id="hide-decorations-plugin",t.textContent=`
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
            `,document.head?(document.head.appendChild(t),console.log("[HideDecorations] CSS injected successfully")):console.error("[HideDecorations] document.head not available!");try{const e=r.findByStoreName("UserStore");e?.getUser&&(n.push(s.after("getUser",e,function(i,a){a&&(a.avatarDecoration=null,a.avatarDecorationData=null)})),console.log("[HideDecorations] UserStore patched"))}catch(e){console.log("[HideDecorations] Could not patch UserStore:",e)}try{const e=r.findByStoreName("GuildMemberStore");e?.getMember&&(n.push(s.after("getMember",e,function(i,a){a&&(a.clan=null)})),console.log("[HideDecorations] GuildMemberStore patched"))}catch(e){console.log("[HideDecorations] Could not patch GuildMemberStore:",e)}console.log("[HideDecorations] Plugin loaded successfully!")}catch(o){console.error("[HideDecorations] Failed to load plugin:",o)}},onUnload:function(){try{console.log("[HideDecorations] Unloading plugin..."),t?.parentNode&&(t.parentNode.removeChild(t),t=null);const o=document.getElementById("hide-decorations-plugin");o&&o.remove(),n.forEach(function(e){try{e()}catch(i){console.error("[HideDecorations] Error unpatching:",i)}}),n=[],console.log("[HideDecorations] Plugin unloaded successfully")}catch(o){console.error("[HideDecorations] Error during unload:",o)}}};return c.default=l,Object.defineProperty(c,"__esModule",{value:!0}),c})({},vendetta.metro,vendetta.patcher);
