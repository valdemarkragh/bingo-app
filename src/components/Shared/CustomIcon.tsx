import { Icon, IconProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

export const CustomIcon = ({ icon, size, props }: { icon: IconType; size?: number; props?: IconProps }) => {
    return <Icon as={icon} boxSize={size} {...props} />;
};
