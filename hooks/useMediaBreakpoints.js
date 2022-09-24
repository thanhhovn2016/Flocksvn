import { useMediaQuery } from "@mui/material";

const useMediaBreakpoints = () => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"))
    const isTablet = useMediaQuery((theme) => theme.breakpoints.down("lg"))
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.down("xl"))
    const isLargeDesktop = useMediaQuery((theme) => theme.breakpoints.up("xl"));
    
    return {
        isMobile,
        isTablet,
        isDesktop,
        isLargeDesktop
    }
}

export default useMediaBreakpoints;