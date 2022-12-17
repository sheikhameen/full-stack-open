import { useSelector } from "react-redux"

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <strong>Blogs created</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
