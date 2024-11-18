import { IPaths } from '@/shared/interfaces'
import styles from './styles.module.scss'
import { LoginIcon, LogoIcon, LogoutIcon, MenuIcon } from '@/shared/assets'
import { FC, useMemo, useState } from 'react'
import { ButtonIcon, DrawerPopup, Link } from 'ui-kit-cars/main'
import { EPaths } from '@/shared/enums'
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
        if (authUserStore.isAuth) {
            return paths.map((path, index) => {
                if (path.url !== EPaths.MAIN && path.url !== EPaths.SIGN_IN && path.url !== EPaths.SIGN_UP) {
                    if (path.url === EPaths.USERS && authUserStore.isAdmin) {
                        return (
                            <Link 
                                key={index}
                                url={path.url}
                            >
                                {path.title}
                            </Link>
                        )
                    }
                    return (
                        <Link 
                            key={index}
                            url={path.url}
                        >
                            {path.title}
                        </Link>
                    )
                }
            })
        } else {
            return null
        }
        
    }, [paths, authUserStore.isAuth, authUserStore.isAdmin])

    return (
        <header className={styles.SHeader}>
            <ButtonIcon
                alt='logo'
            >
                <Link 
                    url={EPaths.MAIN}
                >
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
                {!authUserStore.isAuth ? (
                <Link 
                    url={EPaths.SIGN_IN}
                >
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