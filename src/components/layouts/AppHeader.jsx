import React, { useEffect, useRef, useState } from 'react';
import { CHeader, CHeaderNav, CHeaderToggler, CNavItem, CNavLink } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import menuLeftDark from '../../assets/images/menu-left-dark.svg';
import menuRightDark from '../../assets/images/menu-right-dark.svg';
import menuLeftLight from '../../assets/images/menu-left-lite.svg';
import menuRightLight from '../../assets/images/menu-right-lite.svg';
import { useTheme } from '../ThemeProvider';
import AppHeaderDropdown from './header/AppHeaderDropdown';
import { fetchLogoName, fetchTenantName } from '../../redux/actions/headerTitleActions';
import { Tooltip } from 'primereact/tooltip';
const AppHeader = () => {
    const dispatch = useDispatch();

    const sidebarShow = useSelector((state) => state.sidebar.sidebarShow);
    const currentPageName = useSelector((state) => state.headerTitle.currentPageName);
    const selectedImage = useSelector((state) => state.headerTitle.selectedImage);
    const selectedTenantName = useSelector((state) => state.headerTitle.selectedTenantName);

    const { isDarkTheme } = useTheme();

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        setScrollPosition(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const awaitComponentRerender = useRef(false);
    useEffect(() => {
        if (awaitComponentRerender.current) return;
        awaitComponentRerender.current = true;
        if (!selectedImage || !selectedTenantName) {
            dispatch(fetchTenantName());
            dispatch(fetchLogoName());
        }
    }, [dispatch, selectedImage, selectedTenantName]);

    return (
        <CHeader position="sticky" className={`w-100 p-0 ${scrollPosition > 84 && 'boxShadow'}`}>
            <div className=" w-full flex justify-content-between align-items-center">
                <CHeaderNav className=" flex justify-content-center align-items-center">
                    <div>
                        {isDarkTheme ? (
                            <CHeaderToggler onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
                                {sidebarShow ? (
                                    <img src={menuLeftLight} alt="menuLeftDark" />
                                ) : (
                                    <img src={menuRightLight} alt="menuRightDark" />
                                )}
                            </CHeaderToggler>
                        ) : (
                            <CHeaderToggler onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
                                {sidebarShow ? (
                                    <img src={menuLeftDark} alt="menuLeftDark" />
                                ) : (
                                    <img src={menuRightDark} alt="menuRightDark" />
                                )}
                            </CHeaderToggler>
                        )}
                    </div>
                    <div className="d-none d-lg-block">
                        <CNavItem className="m-auto flex align-items-center justify-content-center gap-1 mr-2">
                            <div>
                                <img src={selectedImage} alt="Tenant Logo" className="cursor-pointer" width={60} />
                            </div>

                            <div className="customDivider"></div>
                        </CNavItem>
                    </div>

                    <div className="d-none d-md-block" style={{ maxWidth: '250px', wordWrap: 'break-word' }}>
                    <Tooltip target=".logo" mouseTrack mouseTrackLeft={10} />
                        <CNavItem className="">
                            <div
                                className="tenantCompanyName mr-2 logo"
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '100%',
                                }}
                                data-pr-tooltip={selectedTenantName}
                            >
                                {selectedTenantName}
                            </div>
                        </CNavItem>
                    </div>

                    <CNavItem className="flex align-items-center justify-content-center">
                        <div className="customDivider"></div>
                        <CNavLink>
                            <div>{currentPageName}</div>
                        </CNavLink>
                    </CNavItem>
                </CHeaderNav>

                <CHeaderNav className="h-100 flex justify-content-center align-items-center gap-2 p-2">
                    <div className=" flex">
                        <CHeaderNav className="d-none d-sm-block">
                            <span className="p-input-icon-left w-100">
                                <i className="pi pi-search ps-2" />
                                <InputText
                                    placeholder="Search here..."
                                    type="text"
                                    className="w-100 rounded-pill pl-5 fs-6"
                                />
                            </span>
                            <span className="p-input-icon-right mb-1">
                                <i className="pi pi-sliders-h pr-1" style={{ fontSize: '0.9rem' }} />
                            </span>
                        </CHeaderNav>
                    </div>
                    <div className="flex justify-content-center align-items-center">
                        <div className="flex justify-content-center align-items-center gap-2 mt-2">
                            <CNavItem className=" p-2">
                                <i className="pi pi-bell p-overlay-badge fs-5">
                                    <Badge value="2" severity="danger"></Badge>
                                </i>
                            </CNavItem>
                            <CNavItem className=" p-2">
                                <i className="pi pi-envelope p-overlay-badge fs-5">
                                    <Badge value="1" severity="danger"></Badge>
                                </i>
                            </CNavItem>
                            <CNavItem className="p-2 d-none d-md-block">
                                <i className="pi pi-cog fs-5"></i>
                            </CNavItem>
                        </div>

                        <CNavItem>
                            <AppHeaderDropdown />
                        </CNavItem>
                    </div>
                </CHeaderNav>
            </div>

            <div className=" d-block d-sm-none ml-2 ">
                <CHeaderNav className="pb-2">
                    <span className="p-input-icon-left w-100">
                        <i className="pi pi-search ps-2" />
                        <InputText placeholder="Search here..." type="text" className="w-100 rounded-pill pl-5 py-1" />
                    </span>
                    <span className="p-input-icon-right mb-1">
                        <i className="pi pi-sliders-h pr-2" />
                    </span>
                </CHeaderNav>
            </div>
        </CHeader>
    );
};

export default AppHeader;
