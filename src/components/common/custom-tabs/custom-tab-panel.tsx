import TabPanel, { TabPanelProps } from "@mui/lab/TabPanel";

export interface CUSTOM_TAB_PANEL_PROPS extends Omit<TabPanelProps, 'value'> {
    value?: TabPanelProps['value'];
}

export const CustomTabPanel: React.FC<CUSTOM_TAB_PANEL_PROPS> = (props) => <TabPanel {...props as any} />
