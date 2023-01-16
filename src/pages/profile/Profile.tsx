import { useGetUserQuery } from "redux/services/user";
import { ProfileTitle, Detail, ProfileWrapper } from "./Profile.styles";

const Profile = () => {
  const {
    data: profile,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery({});

  if (isLoading) {
    return <h1>Profile is loading...</h1>;
  } else if (isSuccess) {
    return (
      <>
        <ProfileTitle>Your Profile: </ProfileTitle>
        <ProfileWrapper>
          <Detail>
            Firstname:
            <p>{profile?.firstname || "no data"}</p>
          </Detail>
          <br />
          <Detail>
            Lastname:
            <p>{profile?.lastname || "no data"}</p>
          </Detail>
          <br />
          <Detail>
            E-mail:
            <p>{profile?.username || "no data"}</p>
          </Detail>
        </ProfileWrapper>
      </>
    );
  } else if (isError) {
    return <p>Oops, something went wrong...</p>;
  } else {
    return null;
  }
};

export default Profile;
