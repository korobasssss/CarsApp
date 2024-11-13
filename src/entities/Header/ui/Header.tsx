import { IPaths } from '@/shared/interfaces'
import styles from './styles.module.scss'
import { LoginIcon, LogoIcon, LogoutIcon } from '@/shared/assets'
import { FC } from 'react'
import { ButtonIcon, Link } from 'ui-kit-cars/main'
import { EPaths } from '@/shared/enums'

interface IHeader {
    paths: IPaths[]
}

export const Header: FC<IHeader> = (
    {
        paths
    }
) => {
    return (
        <header className={styles.SHeader}>
            <h1>
                <LogoIcon/>
            </h1>
            <nav className={styles.SNav}>
                {
                    paths.map(path => {
                        if (path.url !== EPaths.MAIN && path.url !== EPaths.SIGN_IN && path.url !== EPaths.SIGN_UP) {
                            if (path.url === EPaths.USERS) {
                                // todo если авторизован, то ссылка на пользователей
                            } else {
                                return (
                                    <Link 
                                        url={path.url}
                                    >
                                        {path.title}
                                    </Link>
                                )
                            }
                        }
                    })
                }
            </nav>
            <div className={styles.SAuthWrapper}> {/* todo проверка авторизации */}
                <span>
                    Тачковая А.В.
                </span>
                <ButtonIcon
                    alt='sign in icon'
                >
                    <LoginIcon/>
                </ButtonIcon>
                <ButtonIcon
                    alt='sign up icon'
                >
                    <LogoutIcon/>
                </ButtonIcon>
            </div>
        </header>
    )
}