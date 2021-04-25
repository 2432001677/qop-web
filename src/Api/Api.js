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
  console.log(req);
  try {
    const { data } = await post("/group/group/invitation", req, false, true);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getQuestionnaires, inviteUser };
