import { IPaths } from '@/shared/interfaces'
import styles from './styles.module.scss'
import { LoginIcon, LogoIcon, LogoutIcon, MenuIcon } from '@/shared/assets'
import { FC, useMemo, useState } from 'react'
import { ButtonIcon, DrawerPopup, Link } from 'ui-kit-cars/main'
import { EPaths, ERole } from '@/shared/enums'
import { observer } from 'mobx-react-lite'
import { authUserStore } from '@/app/store/mobxStore'

interface IHeader {
    paths: IPaths[]
    handleLogout: () => void
}

export const Header: FC<IHeader> = observer((
    {
        paths,
        handleLogout
    }
) => {

    const [isMenuClick, setMenuClick] = useState(false)

    const visiblePaths = useMemo(() => {
        if (!authUserStore.isAuth()) {
            return [];
        }
    
        return paths.map((path, index) => {
            if (path.availableRoles.includes(authUserStore.authUserData.role as ERole)) {
                return (
                    <Link key={index} url={path.url}>
                        {path.title}
                    </Link>
                )
            }
        });
    }, [paths, authUserStore.authUserData, authUserStore.isAuth()]);

    return (
        <header className={styles.SHeader}>
            <ButtonIcon alt='logo'>
                <Link url={EPaths.MAIN}>
                    <LogoIcon/>
                </Link>
            </ButtonIcon>
            <nav className={styles.SNav}>
                {visiblePaths}
            </nav>
            <nav className={styles.SNavIconMobile}>
                <ButtonIcon
                    alt='menu icon'
                    onClick={() => setMenuClick(true)}
                >
                    <MenuIcon/>
                </ButtonIcon>
            </nav>
            <DrawerPopup
                title='Меню'
                isOpen={isMenuClick}
                setIsOpen={() => setMenuClick(false)}
            >
                <div className={styles.SNavMobile}>
                    {visiblePaths}
                </div>
            </DrawerPopup>
            <div className={styles.SAuthWrapper}>
                {!authUserStore.isAuth() ? (
                <Link  url={EPaths.SIGN_IN}>
                    <LoginIcon/>
                </Link>   
                ) : (
                    <ButtonIcon
                        alt='logout icon'
                        onClick={handleLogout}
                    >
                        <LogoutIcon/>
                    </ButtonIcon>
                )}             
            </div>
        </header>
    )
})