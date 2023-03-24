import moduleStyles from "../../styles/Loader.module.css"


const Loader = ({width,height}) => {
  return (
    <div style={{width,height}} className={moduleStyles.loading}>
    </div>
  )
}

export default Loader
