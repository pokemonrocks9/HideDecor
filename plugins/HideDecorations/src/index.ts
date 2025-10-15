import { findByStoreName } from '@vendetta/metro';
import { after } from '@vendetta/patcher';

let patches: (() => void)[] = [];
let styleElement: HTMLStyleElement | null = null;

export default {
    onLoad: () => {
        try {
            console.log("[HideDecorations] Loading plugin...");

            // Remove any existing style element first (in case of reload)
            const existing = document.getElementById('hide-decorations-plugin');
            if (existing) {
                existing.remove();
            }

            // Method 1: CSS injection (immediate effect)
            styleElement = document.createElement('style');
            styleElement.id = 'hide-decorations-plugin';
            styleElement.textContent = `
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
            `;
            
            if (document.head) {
                document.head.appendChild(styleElement);
                console.log("[HideDecorations] CSS injected successfully");
            } else {
                console.error("[HideDecorations] document.head not available!");
            }

            // Method 2: Patch stores (deeper integration)
            try {
                const UserStore = findByStoreName('UserStore');
                if (UserStore?.getUser) {
                    patches.push(
                        after('getUser', UserStore, (_, user) => {
                            if (user) {
                                user.avatarDecoration = null;
                                user.avatarDecorationData = null;
                            }
                        })
                    );
                    console.log("[HideDecorations] UserStore patched");
                }
            } catch (e) {
                console.log("[HideDecorations] Could not patch UserStore:", e);
            }

            // Try to patch clan tags
            try {
                const GuildMemberStore = findByStoreName('GuildMemberStore');
                if (GuildMemberStore?.getMember) {
                    patches.push(
                        after('getMember', GuildMemberStore, (_, member) => {
                            if (member) {
                                member.clan = null;
                            }
                        })
                    );
                    console.log("[HideDecorations] GuildMemberStore patched");
                }
            } catch (e) {
                console.log("[HideDecorations] Could not patch GuildMemberStore:", e);
            }

            console.log("[HideDecorations] Plugin loaded successfully!");
        } catch (error) {
            console.error("[HideDecorations] Failed to load plugin:", error);
            // Don't throw - allow plugin to stay enabled even if there's an error
        }
    },

    onUnload: () => {
        try {
            console.log("[HideDecorations] Unloading plugin...");
            
            // Remove CSS
            if (styleElement?.parentNode) {
                styleElement.parentNode.removeChild(styleElement);
                styleElement = null;
            }
            
            // Also try to remove by ID in case reference was lost
            const existing = document.getElementById('hide-decorations-plugin');
            if (existing) {
                existing.remove();
            }

            // Remove patches
            patches.forEach((unpatch) => {
                try {
                    unpatch();
                } catch (e) {
                    console.error("[HideDecorations] Error unpatching:", e);
                }
            });
            patches = [];
            
            console.log("[HideDecorations] Plugin unloaded successfully");
        } catch (error) {
            console.error("[HideDecorations] Error during unload:", error);
        }
    }
};
