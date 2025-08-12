import ListUser from "./ListUser";

export default function UsersList({ users }) {

    return (
        <div>
        {
            users.map((user, i) => {
                return (
                    <ListUser key={i} user={user} />
                )
            })
        }
        </div>
    );
}