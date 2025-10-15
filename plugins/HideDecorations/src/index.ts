import { after } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";

let patches: (() => void)[] = [];
let styleElement: HTMLStyleElement | null = null;

export default {
    onLoad: () => {
        // Inject CSS as a fallback method
        styleElement = document.createElement('style');
        styleElement.id = 'hide-decorations-plugin';
        styleElement.textContent = `
            /* Hide avatar decorations */
            [class*="avatarDecoration"],
            [class*="avatar-decoration"],
            [class*="AvatarDecoration"],
            img[class*="decoration"],
            div[class*="avatarDecoration"] > svg,
            div[class*="avatarDecoration"] > img {
                display: none !important;
            }

            /* Hide clan tags */
            [class*="clanTag"],
            [class*="clan-tag"],
            [class*="ClanTag"],
            [class*="profileClanTag"],
            [class*="userTag"] > [class*="clan"] {
                display: none !important;
            }
        `;
        document.head.appendChild(styleElement);

        // Try to patch avatar decoration rendering
        try {
            const UserStore = findByProps("getCurrentUser");
            if (UserStore) {
                patches.push(
                    after("getCurrentUser", UserStore, (args, res) => {
                        if (res?.avatarDecoration) {
                            res.avatarDecoration = null;
                        }
                        return res;
                    })
                );
            }
        } catch (e) {
            console.log("Could not patch avatar decorations:", e);
        }

        // Try to patch clan tags
        try {
            const ClanStore = findByProps("getClan", "getTag");
            if (ClanStore && ClanStore.getClan) {
                patches.push(
                    after("getClan", ClanStore, () => {
                        return null;
                    })
                );
            }
            if (ClanStore && ClanStore.getTag) {
                patches.push(
                    after("getTag", ClanStore, () => {
                        return null;
                    })
                );
            }
        } catch (e) {
            console.log("Could not patch clan tags:", e);
        }
    },

    onUnload: () => {
        // Remove CSS
        if (styleElement?.parentNode) {
            styleElement.parentNode.removeChild(styleElement);
            styleElement = null;
        }

        // Unpatch all patches
        for (const unpatch of patches) {
            unpatch();
        }
        patches = [];
    }
};
