import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface NavigateButtonProps {
    route: string;
    left?: boolean;
};

export default function NavigateButton({ route, left }: NavigateButtonProps) {
    const leftProp = {
        left: "0%",
    };
    const rightProp = {
        left: "90%",
    };
    return <IconButton
        href={route}
        sx={[
            {
                position: "fixed",
                top: "50%",
                zIndex: 3,
                backgroundColor: "white",
                "&:hover": {
                    backgroundColor: "gray",
                }
            },
            left ? leftProp : rightProp,
        ]}
    >
        {left ?
            <ChevronLeftIcon
                sx={{
                    color: "black",
                }}
            />
            :<ChevronRightIcon
                sx={{
                    color: "black",
                }}
            />
        }
      </IconButton>;
}