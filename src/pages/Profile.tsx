import { useGetUserQuery } from "redux/services/user";
import { SProfileTitle, SDetail, ProfileWrapper } from "./Profile.styles";

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
        <SProfileTitle>Your Profile: </SProfileTitle>
        <ProfileWrapper>
          <SDetail>
            Firstname:
            <p>{profile?.firstname || "no data"}</p>
          </SDetail>
          <br />
          <SDetail>
            Lastname:
            <p>{profile?.lastname || "no data"}</p>
          </SDetail>
          <br />
          <SDetail>
            E-mail:
            <p>{profile?.username || "no data"}</p>
          </SDetail>
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
