import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface NavigateButtonProps {
    route: string;
    left?: boolean;
    light?: boolean;
    label: string;
};

export default function NavigateButton({ route, left, light = true, label }: NavigateButtonProps) {
    const leftProp = {
        left: 0,
    };
    const rightProp = {
        right: 0,
    };
    return <IconButton
        href={route}
        tabIndex={0}
        aria-label={label}
        sx={[
            {
                borderRadius: 0,
                padding: 0,
                position: "fixed",
                height: "30vh",
                top: "40%",
                zIndex: 3,
                backgroundColor: "transparent",
                "&:hover": {
                    backgroundColor: "gray",
                },
                "&:focus": {
                    backgroundColor: "gray",
                }
            },
            left ? leftProp : rightProp,
        ]}
    >
        {left ?
            <ChevronLeftIcon
                sx={{
                    color: light ? "black" : "white",
                }}
            />
            :<ChevronRightIcon
                sx={{
                    color: light ? "black" : "white",
                }}
            />
        }
      </IconButton>;
}