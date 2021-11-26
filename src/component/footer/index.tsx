import style from './style.module.less'

interface IProps {
  info: string
}

export default function Footer(props: IProps) {
  const { info } = props
  return (
    <div className={`${style['footer-wrapper']} outter-card`}>
      {`${new Date().getFullYear()} ©️${info}`}
    </div>
  )
}
