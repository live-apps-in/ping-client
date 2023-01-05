import React, { useState, useEffect, ReactElement } from 'react';
import { TabPanelProps } from '@mui/lab/TabPanel';
import { useLocation, useNavigate } from 'react-router-dom';
import SwipeableViews, { SwipeableViewsProps } from 'react-swipeable-views'
import { appendSearchString, getSearchQuery } from 'src/utils';

export interface CUSTOM_TAB_PANELS_CONTAINER_PROPS extends Omit<SwipeableViewsProps, 'children'> {
    initialActiveTabIndex?: number | string;
    // children?: ReactElement<TabsProps> //'children' prop expects a single child of type
    children?: ReactElement<TabPanelProps>[] | ReactElement<TabPanelProps>; // reference - https://stackoverflow.com/a/49408900/13686747
}

export const CustomTabPanelsContainer: React.FC<CUSTOM_TAB_PANELS_CONTAINER_PROPS> = (props) => {

    const { search, pathname } = useLocation();
    const { tab: currentActiveTab } = getSearchQuery(search) || {};
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string | number>(0);
    const { initialActiveTabIndex, ...rest } = props

    useEffect(() => {
        if(currentActiveTab !== undefined)
            setActiveTab(parseInt(`${initialActiveTabIndex || 0}`))
    }, [])

    useEffect(() => {
        let currentInitialActiveTabIndex: number | string = 0
        if(initialActiveTabIndex !== undefined) {
            currentInitialActiveTabIndex = initialActiveTabIndex
        }
        setActiveTab(parseInt(`${currentActiveTab || currentInitialActiveTabIndex}`))
    }, [currentActiveTab])

    const handleChangeIndex = (newIndex) => {
        navigate(`${pathname}?${appendSearchString([search, { tab: newIndex }])}`)
    }


    return (
        <SwipeableViews
            {...rest as any}
            index={parseInt(`${activeTab}`)}
            onChangeIndex={handleChangeIndex}
        >
            {React.Children.map(props.children, (child, index) => {
                // Checking isValidElement is the safe way and avoids a
                // typescript error too.
                if(React.isValidElement(child)) {
                    return React.cloneElement(child, { value: `${activeTab}`, tabIndex: index });
                }
            })}
        </SwipeableViews>
    )
}
