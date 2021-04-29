import { get, post } from "Utils/Axios";

const getQuestionnaires = async (groupId) => {
  try {
    const { data } = await get(
      `/group/group/${groupId}/questionnaires`,
      false,
      true
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const inviteUser = async (req) => {
  try {
    const { data } = await post("/group/group/invitation", req, false, true);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getMyNotifications = async (groupId) => {
  try {
    const { data } = await get(`/account/user/notification`, false, true);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const responseInvitation = async (req) => {
  try {
    const { data } = await post("/account/user/invitation", req, false, true);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getQuestionnaires,
  inviteUser,
  getMyNotifications,
  responseInvitation,
};
