const COLORS = {
    primary: "#BADEE3",
    secondary: "#91C9CE",
    tertiary: "#7AABAF",
    cardBackground: "#EEF8F9",

    fontColor1: "#477276",

    gray: "#83829A",
    gray2: "#C1C0C8",

    pageDotInactive: "#91C9CE",
    pageDotActive: "#7AABAF",

    white: "#F3F4F8",
    lightWhite: "#FAFAFC",
    danger: "#ef5353",
};

const FONT = {
    regular: "DMSans",
    medium: "DMMedium",
    bold: "DMBold",
};

const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
};

const SHADOWS = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 100,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    bottmMenuShadow: {
        shadowColor: "#000"
    },
};

export { COLORS, FONT, SIZES, SHADOWS };
