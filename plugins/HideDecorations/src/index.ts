// Hide Avatar Decorations & Clan Tags Plugin

let styleElement = null;

export default {
    onLoad: () => {
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
    },

    onUnload: () => {
        // Remove the style element
        if (styleElement?.parentNode) {
            styleElement.parentNode.removeChild(styleElement);
            styleElement = null;
        }
    }
};
