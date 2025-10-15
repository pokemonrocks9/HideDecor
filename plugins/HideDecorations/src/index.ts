import { logger } from "@vendetta";

let styleElement: HTMLStyleElement | null = null;

export default {
    onLoad: () => {
        logger.log("Hide Decorations plugin loading...");
        
        // Create and inject CSS to hide decorations
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
        logger.log("Hide Decorations plugin loaded! Decorations hidden.");
    },

    onUnload: () => {
        logger.log("Hide Decorations plugin unloading...");
        
        // Remove the style element
        if (styleElement?.parentNode) {
            styleElement.parentNode.removeChild(styleElement);
            styleElement = null;
        }
        
        logger.log("Hide Decorations plugin unloaded.");
    }
};
