import { EPaths } from "@/shared/enums"
import { SignInFormModel } from "@/widgets/SignInForm"
import { Link } from "ui-kit-cars/main"
import styles from './styles.module.scss'

export const SignInComponent = () => {
    return (
        <div className={styles.SSignInWrapper}>
            <div className={styles.SSignIn}>
                <h1 className={styles.SSignInTitle}>
                    Вход
                </h1>
                <div className={styles.SSignInForm}>
                    <SignInFormModel/>
                    <Link
                        url={EPaths.SIGN_UP}
                        classNames={styles.SSignInLink}
                    >
                        Зарегистрироваться
                    </Link>
                </div>
            </div>
        </div>
    )
}