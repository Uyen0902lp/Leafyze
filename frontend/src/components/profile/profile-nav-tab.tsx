import React from "react";
import { useRouter } from "next/navigation";
import { userLoggedOut } from "@/redux/feature/authSlice";
import { useAppDispatch } from "@/redux/hook";

// prop type 
type IProps = {
  active?: boolean;
  id: string;
  title: string;
  icon: string;
}

function SingleNav({ active = false, id, title, icon }: IProps) {
  return (
    <button
      className={`nav-link ${active ? "active" : ""}`}
      id={`nav-${id}-tab`}
      data-bs-toggle="tab"
      data-bs-target={`#nav-${id}`}
      type="button"
      role="tab"
      aria-controls={id}
      aria-selected={active ? "true" : "false"}
    >
      <span>
        <i className={icon}></i>
      </span>
      {title}
    </button>
  );
}

const ProfileNavTab = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // handle logout
  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem('user_id');
    localStorage.removeItem('authToken');
    localStorage.removeItem("user_role");
    router.push('/')
  }
  return (
    <nav>
      <div
        className="nav nav-tabs tp-tab-menu flex-column"
        id="profile-tab"
        role="tablist"
      >
        <SingleNav
          active={true}
          id="profile"
          title="Profile"
          icon="fa-regular fa-user-pen"
        />
        <SingleNav
          id="information"
          title="Information"
          icon="fa-regular fa-circle-info"
        />
        <SingleNav
          id="order"
          title="My Orders"
          icon="fa-light fa-clipboard-list-check"
        />
        <SingleNav
          id="password"
          title="Change Password"
          icon="fa-regular fa-lock"
        />
        <button className="nav-link" onClick={handleLogout}>
          <span>
            <i className="fa-light fa-right-from-bracket"></i>
          </span>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default ProfileNavTab;
