import './index.css'

const Guides = props => {
  const {data} = props
  const {imageUrl, name, description} = data
  return (
    <li className="guideView">
      <img className="image" src={imageUrl} alt={name} />
      <div style={{padding: '10px'}}>
        <h2 className="name">{name}</h2>
        <p className="description">{description}</p>
      </div>
    </li>
  )
}
export default Guides
