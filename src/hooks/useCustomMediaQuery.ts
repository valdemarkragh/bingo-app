import { useMediaQuery } from "@chakra-ui/react";

export const useCustomMediaQuery = () => {
    const [isMobile] = useMediaQuery("(max-width: 700px)");
    const [isTablet] = useMediaQuery("(max-width: 1000px)");

    return {
        isMobile,
        isTablet,
    };
};
