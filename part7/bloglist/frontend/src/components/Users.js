import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Page = styled.div`
  padding: 18px 32px;
`

const Table = styled.table`
  border-radius: 16px;
  overflow: hidden;
  td {
    background-color: #eee;
    padding: 8px 18px;
  }

  thead {
    td {
      font-weight: 700;
    }
  }
`

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <Page>
      <Table>
        <thead>
          <tr>
            <td>Users</td>
            <td>Blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Page>
  )
}

export default Users
