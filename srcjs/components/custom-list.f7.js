export default () => {

  const ListItem = (props) => {
    return (
      <li>{props.title}</li>
    )
  }

  return () => (
    <ul>
      <ListItem title="Item 1" />
      <ListItem title="Item 2" />
      <ListItem title="Item 3" />
    </ul>
  )
}
