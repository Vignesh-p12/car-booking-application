import { auth } from "../services/firebase";

function UserInfo() {
  const user = auth.currentUser;

  return (
    <div className="mb-4 p-4 bg-blue-100 rounded">
      <p className="text-blue-800 font-medium">
        Logged in as: {user?.email || "Guest"}
      </p>
    </div>
  );
}

export default UserInfo;
