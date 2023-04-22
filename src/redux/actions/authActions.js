import { UPDATE_ONBOARDING_STATUS } from "../constants";

export const updateOnboarding = (status) => {
  return {
    type: UPDATE_ONBOARDING_STATUS,
    status,
  };
};

// export const updateUserLogin = (user, isLoggedIn) => {
//     return {
//         type: UPDATE_USER_LOGIN,
//         user,
//         isLoggedIn
//     };
// };

// export const updateUserAccessToken = (accessToken) => {
//     return {
//         type: UPDATE_USER_ACCESS_TOKEN,
//         accessToken
//     };
// };
