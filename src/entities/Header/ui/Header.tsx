import { IPaths } from '@/shared/interfaces'
import styles from './styles.module.scss'
import { LoginIcon, LogoIcon, LogoutIcon, MenuIcon } from '@/shared/assets'
import { FC, useMemo, useState } from 'react'
import { ButtonIcon, DrawerPopup, Link } from 'ui-kit-cars/main'
import { EPaths } from '@/shared/enums'

interface IHeader {
    paths: IPaths[]
}

export const Header: FC<IHeader> = (
    {
        paths
    }
) => {

    const [isMenuClick, setMenuClick] = useState(false)

    const visiblePaths = useMemo(() => {
        return paths.map((path, index) => {
            if (path.url !== EPaths.MAIN && path.url !== EPaths.SIGN_IN && path.url !== EPaths.SIGN_UP) {
                return (
                        <Link 
                            key={index}
                            url={path.url}
                        >
                            {path.title}
                        </Link>
                    )
                if (path.url === EPaths.USERS) {
                    // todo если авторизован, то ссылка на пользователей
                } else {
                    
                }
            }
        })
    }, [paths])

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
            <div className={styles.SAuthWrapper}> {/* todo проверка авторизации */}
                <Link 
                    url={EPaths.SIGN_IN}
                >
                    <LoginIcon/>
                </Link>                
                <ButtonIcon
                    alt='logout icon'
                >
                    <LogoutIcon/>
                </ButtonIcon>
            </div>
        </header>
    )
}