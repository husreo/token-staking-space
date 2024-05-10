import { title } from "process";

interface IAlertProps {
  title?: any
  children: any
}

export default function Alert(props: IAlertProps) {
  const { title, children = null } = props
  return (
    <div className="border border-[#FF3124] bg-[#ff312433] p-6">
      {title && (<div className="font-bold text-sm">{title}</div>)}
      {children}
    </div>
  )
}