import LinkButton from "../communism/link-button";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Moonlightu uwu</h1>
      <div className={styles.auth}>
        <LinkButton bordered>Zaloguj się towarzyszu</LinkButton>
        <LinkButton bordered>Załóż konto towarzyszu</LinkButton>
      </div>
    </header>
  )
}
