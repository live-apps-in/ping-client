import { EventEmitter } from "src/utils";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import Slide from "@mui/material/Slide";
import { FLASH_EVENT_PROPS } from "src/model";

export const FlashMessage: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    EventEmitter.addListener("flash", (params: FLASH_EVENT_PROPS) => {
      const { message, ...rest } = params;
      enqueueSnackbar(message, {
        variant: "success",
        autoHideDuration: 2000,
        TransitionComponent: Slide,
        ...rest,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
          ...rest.anchorOrigin,
        },
      });
    });
  }, []);

  return null;
};
