import { EPaths } from "@/shared/enums"
import { SignUpFormModel } from "@/widgets/SignUpForm"
import { Link } from "ui-kit-cars/main"
import styles from './styles.module.scss'

export const SignUpComponent = () => {
    return (
        <div className={styles.SSignUpWrapper}>
            <div className={styles.SSignUp}>
                <h1 className={styles.SSignUpTitle}>
                    Регистрация
                </h1>
                <div className={styles.SSignUpForm}>
                    <SignUpFormModel/>
                    <Link
                        url={EPaths.SIGN_IN}
                        classNames={styles.SSignUpLink}
                    >
                        Вход
                    </Link>
                </div>
            </div>
        </div>
    )
}