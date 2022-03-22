import Footer from "../footer/footer"
import Header from "../header/header"
import style from './layout.module.scss';

export default function Layout({ children }) {
  return (
    <div className={style.layout}>
      <Header/>
      <main>{ children }</main>
      <Footer/>
    </div>
  )
}
